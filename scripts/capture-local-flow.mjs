import { writeFile } from 'node:fs/promises';

const [outputPath, englishPath, simulationsPath] = process.argv.slice(2);
const username = process.env.SAFESTEP_TEST_USERNAME;
const password = process.env.SAFESTEP_TEST_PASSWORD;
if (!outputPath || !username || !password) {
  throw new Error('Set SAFESTEP_TEST_USERNAME and SAFESTEP_TEST_PASSWORD, then pass an output PNG path.');
}

const pages = await fetch('http://127.0.0.1:9229/json/list').then((response) => response.json());
const page = pages.find((entry) => entry.type === 'page');
if (!page) throw new Error('No Chrome page is available on debugging port 9229.');
const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

let nextId = 0;
const pending = new Map();
socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  const callback = pending.get(message.id);
  if (!callback) return;
  pending.delete(message.id);
  if (message.error) callback.reject(new Error(message.error.message));
  else callback.resolve(message.result);
});
function send(method, params = {}) {
  const id = ++nextId;
  const promise = new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
  socket.send(JSON.stringify({ id, method, params }));
  return promise;
}
async function click(x, y) {
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
}

try {
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440, height: 900, deviceScaleFactor: 1, mobile: false,
    screenWidth: 1440, screenHeight: 900,
  });
  await send('Page.navigate', { url: 'http://127.0.0.1:4200/' });
  await new Promise((resolve) => setTimeout(resolve, 2500));
  await click(1100, 325);
  await send('Input.insertText', { text: username });
  await click(1100, 418);
  await send('Input.insertText', { text: password });
  await click(1100, 560);
  await new Promise((resolve) => setTimeout(resolve, 2500));
  const location = await send('Runtime.evaluate', { expression: 'location.href', returnByValue: true });
  if (!location.result.value.includes('/app/')) {
    throw new Error(`Sign-in did not navigate to the app: ${location.result.value}`);
  }
  async function saveScreenshot(path) {
    const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    await writeFile(path, Buffer.from(screenshot.data, 'base64'));
  }
  await saveScreenshot(outputPath);
  const adminControl = await send('Runtime.evaluate', {
    expression: "document.body.innerText.includes('Administrar simulaciones')",
    returnByValue: true,
  });
  if (adminControl.result.value) throw new Error('A regular user can see the simulation administration control.');
  process.stdout.write(`Signed in; route ${location.result.value}; screenshot ${outputPath}\n`);
  if (englishPath) {
    await click(1018, 34);
    await new Promise((resolve) => setTimeout(resolve, 600));
    await saveScreenshot(englishPath);
    process.stdout.write(`English switch screenshot ${englishPath}\n`);
  }
  if (simulationsPath) {
    await send('Page.navigate', { url: 'http://127.0.0.1:4200/app/simulations/admin' });
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const adminRoute = await send('Runtime.evaluate', { expression: 'location.pathname', returnByValue: true });
    if (adminRoute.result.value === '/app/simulations/admin') {
      throw new Error('A regular user can open the simulation administration route.');
    }
    process.stdout.write(`Admin route denied; redirected to ${adminRoute.result.value}\n`);
    await send('Page.navigate', { url: 'http://127.0.0.1:4200/app/simulations' });
    await new Promise((resolve) => setTimeout(resolve, 1600));
    await saveScreenshot(simulationsPath);
    process.stdout.write(`Simulation list screenshot ${simulationsPath}\n`);
  }
} finally {
  socket.close();
}
