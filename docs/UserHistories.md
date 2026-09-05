# 3.1. User Stories - SafeStep


<table>
  <thead>
    <tr>
      <th>Epic / Story ID</th>
      <th>Titulo</th>
      <th>Descripcion</th>
      <th>Criterios de Aceptacion</th>
      <th>Relacionado con (Epic ID)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>EP01</b></td>
      <td>Identidad, acceso y perfil de usuario</td>
      <td><b>Como</b> usuario de SafeStep, <b>quiero</b> gestionar mi acceso, perfil, idioma y saldo de SafeCoins, <b>para</b> usar la aplicacion con una identidad personalizada.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US01</b></td>
      <td>Iniciar sesion en la aplicacion</td>
      <td><b>Como</b> usuario registrado, <b>quiero</b> iniciar sesion <b>para</b> acceder a mi dashboard, simulaciones, progreso, gamificacion y tienda.</td>
      <td>- <b>Dado que</b> el usuario se encuentra en la pantalla de acceso, <b>Y</b> ingresa credenciales validas, <b>Cuando</b> selecciona la opcion de ingresar, <b>Entonces</b> el sistema permite el acceso, <b>Y</b> redirige al usuario al dashboard principal<br><br>- <b>Dado que</b> el usuario se encuentra en la pantalla de acceso, <b>Y</b> ingresa datos incompletos o invalidos, <b>Cuando</b> intenta ingresar, <b>Entonces</b> el sistema no permite continuar, <b>Y</b> muestra una indicacion para corregir los datos</td>
      <td>EP01</td>
    </tr>
    <tr>
      <td><b>US02</b></td>
      <td>Registrarse en SafeStep</td>
      <td><b>Como</b> visitante, <b>quiero</b> crear una cuenta <b>para</b> guardar mi avance y acceder a las funcionalidades de entrenamiento.</td>
      <td>- <b>Dado que</b> el visitante esta en la pantalla de registro, <b>Cuando</b> ingresa sus datos requeridos correctamente, <b>Entonces</b> el sistema crea la cuenta, <b>Y</b> le permite acceder a la aplicacion<br><br>- <b>Dado que</b> el visitante deja campos obligatorios vacios, <b>Cuando</b> intenta crear su cuenta, <b>Entonces</b> el sistema solicita completar la informacion requerida</td>
      <td>EP01</td>
    </tr>
    <tr>
      <td><b>US03</b></td>
      <td>Visualizar perfil de usuario</td>
      <td><b>Como</b> usuario autenticado, <b>quiero</b> visualizar mi perfil <b>para</b> revisar mi informacion personal, nivel, XP, SafeCoins y racha.</td>
      <td>- <b>Dado que</b> el usuario tiene una sesion activa, <b>Cuando</b> ingresa al perfil, <b>Entonces</b> el sistema muestra su nombre, correo, rol, ciudad, nivel, XP, SafeCoins y racha<br><br>- <b>Dado que</b> el sistema no puede cargar la informacion del usuario, <b>Cuando</b> el usuario ingresa al perfil, <b>Entonces</b> se muestra un estado informativo indicando que no se pudo cargar la informacion</td>
      <td>EP01</td>
    </tr>
    <tr>
      <td><b>US04</b></td>
      <td>Cambiar idioma de la aplicacion</td>
      <td><b>Como</b> usuario, <b>quiero</b> cambiar entre espanol e ingles <b>para</b> usar la aplicacion en el idioma que prefiera.</td>
      <td>- <b>Dado que</b> la aplicacion esta en espanol, <b>Cuando</b> el usuario selecciona EN en el toolbar, <b>Entonces</b> los textos disponibles cambian a ingles<br><br>- <b>Dado que</b> la aplicacion esta en ingles, <b>Cuando</b> el usuario selecciona ES en el toolbar, <b>Entonces</b> los textos disponibles cambian a espanol</td>
      <td>EP01</td>
    </tr>
    <tr>
      <td><b>US05</b></td>
      <td>Ver saldo de SafeCoins en la navegacion</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver mi saldo de SafeCoins en la interfaz principal <b>para</b> saber cuantos puntos puedo usar.</td>
      <td>- <b>Dado que</b> el usuario tiene SafeCoins registradas, <b>Cuando</b> navega por la aplicacion, <b>Entonces</b> el sistema muestra su saldo actualizado en la interfaz<br><br>- <b>Dado que</b> el usuario completa una simulacion y gana monedas, <b>Cuando</b> vuelve al dashboard, gamificacion o tienda, <b>Entonces</b> el sistema muestra el nuevo saldo de SafeCoins</td>
      <td>EP01</td>
    </tr>
    <tr>
      <td><b>EP02</b></td>
      <td>Dashboard principal</td>
      <td><b>Como</b> usuario de SafeStep, <b>quiero</b> visualizar un dashboard principal con mi avance, entrenamientos, misiones y productos sugeridos, <b>para</b> decidir rapidamente que hacer despues.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US06</b></td>
      <td>Visualizar resumen general de entrenamiento</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver un resumen de mi progreso al entrar a la aplicacion <b>para</b> saber mi estado actual.</td>
      <td>- <b>Dado que</b> el usuario tiene simulaciones, XP y racha registrada, <b>Cuando</b> ingresa al dashboard, <b>Entonces</b> el sistema muestra metricas principales de su progreso<br><br>- <b>Dado que</b> el usuario aun no tiene suficientes datos, <b>Cuando</b> ingresa al dashboard, <b>Entonces</b> el sistema muestra valores iniciales o recomendaciones para empezar</td>
      <td>EP02</td>
    </tr>
    <tr>
      <td><b>US07</b></td>
      <td>Continuar con el siguiente entrenamiento</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver la siguiente simulacion sugerida <b>para</b> continuar mi aprendizaje sin buscar manualmente.</td>
      <td>- <b>Dado que</b> hay simulaciones no completadas, <b>Cuando</b> el usuario entra al dashboard, <b>Entonces</b> el sistema muestra una simulacion recomendada para continuar<br><br>- <b>Dado que</b> el dashboard muestra una simulacion recomendada, <b>Cuando</b> el usuario selecciona practicar, <b>Entonces</b> el sistema abre el detalle de esa simulacion</td>
      <td>EP02</td>
    </tr>
    <tr>
      <td><b>US08</b></td>
      <td>Ver misiones activas desde el dashboard</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver misiones activas en el dashboard <b>para</b> recordar objetivos que puedo completar.</td>
      <td>- <b>Dado que</b> existen misiones activas, <b>Cuando</b> el usuario ingresa al dashboard, <b>Entonces</b> el sistema muestra una vista breve de misiones activas y su progreso<br><br>- <b>Dado que</b> el usuario desea ver mas misiones, <b>Cuando</b> selecciona la opcion de abrir gamificacion, <b>Entonces</b> el sistema lo lleva al apartado de gamificacion</td>
      <td>EP02</td>
    </tr>
    <tr>
      <td><b>US09</b></td>
      <td>Ver productos sugeridos desde el dashboard</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver productos sugeridos <b>para</b> mi preparacion para acceder rapidamente a la tienda.</td>
      <td>- <b>Dado que</b> existen productos recomendados, <b>Cuando</b> el usuario entra al dashboard, <b>Entonces</b> el sistema muestra productos destacados con su imagen, categoria y precio<br><br>- <b>Dado que</b> el usuario visualiza productos sugeridos, <b>Cuando</b> selecciona la opcion de ir a tienda, <b>Entonces</b> el sistema abre el catalogo de productos</td>
      <td>EP02</td>
    </tr>
    <tr>
      <td><b>EP03</b></td>
      <td>Simulaciones medicas</td>
      <td><b>Como</b> usuario en entrenamiento, <b>quiero</b> practicar emergencias mediante simulaciones medicas interactivas, <b>para</b> aprender a tomar mejores decisiones en primeros auxilios.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US10</b></td>
      <td>Visualizar catalogo de simulaciones</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver todas las simulaciones disponibles <b>para</b> elegir que emergencia practicar.</td>
      <td>- <b>Dado que</b> existen simulaciones registradas, <b>Cuando</b> el usuario entra a Simulaciones, <b>Entonces</b> el sistema muestra cartas con imagen, dificultad, duracion, XP y SafeCoins<br><br>- <b>Dado que</b> el usuario ya completo una simulacion, <b>Cuando</b> visualiza el catalogo, <b>Entonces</b> la carta indica que fue completada y cuantas veces se completo</td>
      <td>EP03</td>
    </tr>
    <tr>
      <td><b>US11</b></td>
      <td>Buscar simulaciones por nombre</td>
      <td><b>Como</b> usuario, <b>quiero</b> buscar simulaciones por nombre <b>para</b> encontrar rapidamente el entrenamiento que necesito.</td>
      <td>- <b>Dado que</b> el usuario esta en el listado de simulaciones, <b>Cuando</b> escribe el nombre de una simulacion existente, <b>Entonces</b> el sistema muestra solo las simulaciones que coinciden<br><br>- <b>Dado que</b> el usuario escribe una palabra sin coincidencias, <b>Cuando</b> el filtro se aplica, <b>Entonces</b> el sistema muestra un estado indicando que no hay resultados</td>
      <td>EP03</td>
    </tr>
    <tr>
      <td><b>US12</b></td>
      <td>Revisar detalle de una simulacion antes de iniciar</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver la informacion de una simulacion antes de empezarla <b>para</b> saber que aprendere y que recompensas ofrece.</td>
      <td>- <b>Dado que</b> el usuario selecciona una simulacion, <b>Cuando</b> se abre su detalle, <b>Entonces</b> el sistema muestra objetivos, dificultad, duracion, XP disponible y SafeCoins base<br><br>- <b>Dado que</b> el usuario intenta abrir una simulacion que no existe, <b>Cuando</b> el sistema no encuentra el identificador, <b>Entonces</b> muestra un mensaje de simulacion no encontrada</td>
      <td>EP03</td>
    </tr>
    <tr>
      <td><b>US13</b></td>
      <td>Responder pasos de una simulacion</td>
      <td><b>Como</b> usuario, <b>quiero</b> elegir respuestas en cada escenario <b>para</b> practicar decisiones ante emergencias.</td>
      <td>- <b>Dado que</b> el usuario esta realizando una simulacion, <b>Cuando</b> selecciona una opcion de un paso, <b>Entonces</b> el sistema registra la respuesta seleccionada<br><br>- <b>Dado que</b> el usuario selecciona una respuesta, <b>Cuando</b> el sistema evalua la opcion, <b>Entonces</b> la respuesta correcta e incorrecta se distinguen visualmente</td>
      <td>EP03</td>
    </tr>
    <tr>
      <td><b>US14</b></td>
      <td>Finalizar una simulacion</td>
      <td><b>Como</b> usuario, <b>quiero</b> finalizar la simulacion cuando responda todos los pasos <b>para</b> recibir mi resultado.</td>
      <td>- <b>Dado que</b> el usuario respondio todos los pasos, <b>Cuando</b> selecciona finalizar, <b>Entonces</b> el sistema calcula respuestas correctas, errores, precision, XP y monedas<br><br>- <b>Dado que</b> el usuario aun no respondio todos los pasos, <b>Cuando</b> intenta finalizar, <b>Entonces</b> el sistema no permite finalizar hasta completar la simulacion</td>
      <td>EP03</td>
    </tr>
    <tr>
      <td><b>US15</b></td>
      <td>Recibir SafeCoins por completar una simulacion</td>
      <td><b>Como</b> usuario, <b>quiero</b> recibir monedas al completar una simulacion exitosa <b>para</b> usarlas en la tienda.</td>
      <td>- <b>Dado que</b> el usuario completa una simulacion con precision suficiente, <b>Y</b> es su primera finalizacion exitosa de esa simulacion, <b>Cuando</b> el sistema calcula la recompensa, <b>Entonces</b> recibe el 100% de las SafeCoins correspondientes segun su precision<br><br>- <b>Dado que</b> el usuario ya completo antes la misma simulacion, <b>Cuando</b> la completa nuevamente con precision suficiente, <b>Entonces</b> recibe una recompensa reducida segun el multiplicador de repeticion</td>
      <td>EP03</td>
    </tr>
    <tr>
      <td><b>US16</b></td>
      <td>Ver resumen final de simulacion</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver un resumen final <b>para</b> entender mi rendimiento y recompensa.</td>
      <td>- <b>Dado que</b> el usuario finalizo una simulacion, <b>Cuando</b> se muestra la pantalla final, <b>Entonces</b> el sistema muestra respuestas correctas, errores, XP ganado, monedas ganadas, saldo anterior y saldo nuevo<br><br>- <b>Dado que</b> el calculo de recompensa resulta en cero monedas, <b>Cuando</b> se muestra el resumen final, <b>Entonces</b> el sistema indica claramente que no se ganaron monedas adicionales</td>
      <td>EP03</td>
    </tr>
    <tr>
      <td><b>US17</b></td>
      <td>Ver productos sugeridos segun errores</td>
      <td><b>Como</b> usuario, <b>quiero</b> recibir sugerencias de productos relacionadas con mi simulacion <b>para</b> prepararme mejor.</td>
      <td>- <b>Dado que</b> una simulacion tiene productos sugeridos, <b>Cuando</b> el usuario revisa el detalle o resultado, <b>Entonces</b> el sistema muestra productos relacionados con esa emergencia<br><br>- <b>Dado que</b> la simulacion no tiene productos asociados, <b>Cuando</b> el usuario revisa el resultado, <b>Entonces</b> el sistema no muestra recomendaciones de tienda</td>
      <td>EP03</td>
    </tr>
    <tr>
      <td><b>EP04</b></td>
      <td>Progreso y estadisticas</td>
      <td><b>Como</b> usuario, <b>quiero</b> consultar estadisticas reales de mi aprendizaje, <b>para</b> identificar avances, errores y acciones de mejora.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US18</b></td>
      <td>Visualizar resumen general de progreso</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver indicadores generales de mi avance <b>para</b> entender mi desempeno.</td>
      <td>- <b>Dado que</b> el usuario tiene intentos y recompensas registradas, <b>Cuando</b> ingresa a Progreso, <b>Entonces</b> el sistema muestra simulaciones completadas, intentos, precision promedio, XP, SafeCoins y tiempo entrenado<br><br>- <b>Dado que</b> el usuario no tiene intentos registrados, <b>Cuando</b> ingresa a Progreso, <b>Entonces</b> el sistema muestra metricas en cero o mensajes para empezar</td>
      <td>EP04</td>
    </tr>
    <tr>
      <td><b>US19</b></td>
      <td>Revisar rendimiento por simulacion</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver mi rendimiento por cada simulacion <b>para</b> saber cuales domino y cuales debo repetir.</td>
      <td>- <b>Dado que</b> una simulacion tiene intentos del usuario, <b>Cuando</b> se muestra el rendimiento, <b>Entonces</b> el sistema indica intentos, completaciones, mejor puntaje, precision promedio y ultimo intento<br><br>- <b>Dado que</b> una simulacion nunca fue iniciada, <b>Cuando</b> se muestra el rendimiento, <b>Entonces</b> el sistema indica que aun esta pendiente o sin intentos</td>
      <td>EP04</td>
    </tr>
    <tr>
      <td><b>US20</b></td>
      <td>Identificar errores frecuentes</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver mis errores mas repetidos <b>para</b> mejorar en pasos concretos.</td>
      <td>- <b>Dado que</b> el usuario cometio errores en intentos anteriores, <b>Cuando</b> abre el apartado de errores, <b>Entonces</b> el sistema muestra los errores mas frecuentes y una recomendacion asociada<br><br>- <b>Dado que</b> el usuario no tiene errores registrados, <b>Cuando</b> abre el apartado de errores, <b>Entonces</b> el sistema muestra un mensaje positivo o de estado vacio</td>
      <td>EP04</td>
    </tr>
    <tr>
      <td><b>US21</b></td>
      <td>Recibir recomendaciones accionables</td>
      <td><b>Como</b> usuario, <b>quiero</b> recibir recomendaciones basadas en mi rendimiento <b>para</b> saber que hacer despues.</td>
      <td>- <b>Dado que</b> el usuario tiene baja precision en una simulacion, <b>Cuando</b> el sistema genera recomendaciones, <b>Entonces</b> sugiere repetir esa simulacion<br><br>- <b>Dado que</b> el usuario tiene insignias pendientes, <b>Cuando</b> el sistema genera recomendaciones, <b>Entonces</b> sugiere desbloquear una insignia con su requisito</td>
      <td>EP04</td>
    </tr>
    <tr>
      <td><b>US22</b></td>
      <td>Consultar progreso de gamificacion desde Progreso</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver mis misiones e insignias dentro del progreso <b>para</b> relacionar mi aprendizaje con logros.</td>
      <td>- <b>Dado que</b> hay datos de gamificacion, <b>Cuando</b> el usuario revisa Progreso, <b>Entonces</b> el sistema muestra misiones completadas, misiones activas e insignias desbloqueadas<br><br>- <b>Dado que</b> existe ranking semanal, <b>Cuando</b> el usuario revisa su progreso, <b>Entonces</b> el sistema muestra su posicion semanal</td>
      <td>EP04</td>
    </tr>
    <tr>
      <td><b>EP05</b></td>
      <td>Gamificacion</td>
      <td><b>Como</b> usuario, <b>quiero</b> acceder a niveles, misiones, insignias, ranking y SafeCoins, <b>para</b> mantenerme motivado a practicar primeros auxilios.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US23</b></td>
      <td>Visualizar resumen de gamificacion</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver mi nivel, XP, racha, ranking y monedas <b>para</b> conocer mi estado competitivo.</td>
      <td>- <b>Dado que</b> el usuario tiene datos de gamificacion, <b>Cuando</b> ingresa a Gamificacion, <b>Entonces</b> el sistema muestra nivel, XP, racha, ranking semanal y SafeCoins<br><br>- <b>Dado que</b> el sistema no puede cargar gamificacion, <b>Cuando</b> el usuario ingresa al apartado, <b>Entonces</b> se muestra un mensaje de error comprensible</td>
      <td>EP05</td>
    </tr>
    <tr>
      <td><b>US24</b></td>
      <td>Ver misiones activas resumidas</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver solo algunas misiones activas inicialmente <b>para</b> no saturarme de informacion.</td>
      <td>- <b>Dado que</b> existen varias misiones activas, <b>Cuando</b> el usuario entra a Gamificacion, <b>Entonces</b> el sistema muestra solo tres misiones activas en la vista principal<br><br>- <b>Dado que</b> el usuario quiere revisar todo el listado, <b>Cuando</b> selecciona ver todas las misiones, <b>Entonces</b> el sistema abre el inventario completo de misiones</td>
      <td>EP05</td>
    </tr>
    <tr>
      <td><b>US25</b></td>
      <td>Revisar inventario de misiones</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver misiones activas, disponibles y bloqueadas <b>para</b> planificar mis objetivos.</td>
      <td>- <b>Dado que</b> existen misiones activas, <b>Cuando</b> el usuario abre el inventario, <b>Entonces</b> el sistema muestra su progreso, recompensa e instrucciones<br><br>- <b>Dado que</b> existen misiones bloqueadas, <b>Cuando</b> el usuario abre el inventario, <b>Entonces</b> el sistema muestra el requisito de desbloqueo</td>
      <td>EP05</td>
    </tr>
    <tr>
      <td><b>US26</b></td>
      <td>Consultar ranking semanal</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver el ranking semanal <b>para</b> comparar mi progreso con otros usuarios.</td>
      <td>- <b>Dado que</b> existe ranking semanal, <b>Cuando</b> el usuario abre Gamificacion, <b>Entonces</b> el sistema muestra los cinco primeros puestos<br><br>- <b>Dado que</b> el usuario no esta entre los cinco primeros, <b>Cuando</b> se muestra el ranking, <b>Entonces</b> el sistema muestra tambien la posicion actual del usuario</td>
      <td>EP05</td>
    </tr>
    <tr>
      <td><b>US27</b></td>
      <td>Ver insignias desbloqueadas</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver mis insignias desbloqueadas <b>para</b> reconocer mis logros.</td>
      <td>- <b>Dado que</b> el usuario tiene insignias desbloqueadas, <b>Cuando</b> ingresa a Gamificacion, <b>Entonces</b> el sistema muestra una vista resumida de cinco insignias<br><br>- <b>Dado que</b> una insignia tiene rareza comun, rara, epica o legendaria, <b>Cuando</b> se renderiza la carta, <b>Entonces</b> el sistema usa un color visual asociado a su rareza</td>
      <td>EP05</td>
    </tr>
    <tr>
      <td><b>US28</b></td>
      <td>Ver inventario completo de insignias</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver todas mis insignias y las bloqueadas <b>para</b> saber que logros puedo perseguir.</td>
      <td>- <b>Dado que</b> el usuario abre el inventario de insignias, <b>Cuando</b> existen insignias desbloqueadas, <b>Entonces</b> el sistema las muestra en cartas con nombre, rareza y descripcion<br><br>- <b>Dado que</b> existen insignias bloqueadas, <b>Cuando</b> el usuario revisa el inventario, <b>Entonces</b> el sistema muestra el requisito para desbloquearlas</td>
      <td>EP05</td>
    </tr>
    <tr>
      <td><b>US29</b></td>
      <td>Consultar historial de SafeCoins</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver mi historial reciente de SafeCoins <b>para</b> entender de donde vienen mis monedas.</td>
      <td>- <b>Dado que</b> el usuario gano monedas por simulaciones, <b>Cuando</b> abre Gamificacion, <b>Entonces</b> el sistema muestra simulacion, precision, multiplicador y monedas ganadas<br><br>- <b>Dado que</b> el usuario aun no gano monedas, <b>Cuando</b> abre el historial de SafeCoins, <b>Entonces</b> el sistema muestra un estado vacio</td>
      <td>EP05</td>
    </tr>
    <tr>
      <td><b>EP06</b></td>
      <td>Tienda, carrito y compras</td>
      <td><b>Como</b> usuario comprador, <b>quiero</b> explorar productos, kits, cupones, carrito, pago e historial de compras, <b>para</b> equiparme ante emergencias.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US30</b></td>
      <td>Visualizar productos relevantes en tienda</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver productos relevantes al entrar a la tienda <b>para</b> encontrar rapidamente insumos utiles para mi entrenamiento.</td>
      <td>- <b>Dado que</b> existen recomendaciones y productos populares, <b>Cuando</b> el usuario entra a la tienda, <b>Entonces</b> el sistema muestra productos relevantes con imagen, categoria, rating, stock y precio<br><br>- <b>Dado que</b> no hay recomendaciones personalizadas suficientes, <b>Cuando</b> el usuario entra a la tienda, <b>Entonces</b> el sistema muestra productos populares o primeros productos del catalogo</td>
      <td>EP06</td>
    </tr>
    <tr>
      <td><b>US31</b></td>
      <td>Buscar productos o kits</td>
      <td><b>Como</b> usuario, <b>quiero</b> buscar productos o kits por texto <b>para</b> encontrar rapidamente lo que necesito.</td>
      <td>- <b>Dado que</b> el usuario esta en la tienda, <b>Cuando</b> escribe el nombre o etiqueta de un producto, <b>Entonces</b> el sistema filtra el catalogo con coincidencias<br><br>- <b>Dado que</b> no existen productos relacionados con la busqueda, <b>Cuando</b> se aplica el filtro, <b>Entonces</b> el sistema muestra un estado de categoria vacia</td>
      <td>EP06</td>
    </tr>
    <tr>
      <td><b>US32</b></td>
      <td>Filtrar productos por categoria</td>
      <td><b>Como</b> usuario, <b>quiero</b> filtrar por categoria <b>para</b> ver solo productos de un tipo especifico.</td>
      <td>- <b>Dado que</b> el usuario selecciona una categoria, <b>Cuando</b> el filtro se aplica, <b>Entonces</b> el sistema muestra solo productos de esa categoria<br><br>- <b>Dado que</b> el usuario selecciona Kits, <b>Cuando</b> el filtro se aplica, <b>Entonces</b> el sistema muestra productos tipo kit y kits de emergencia comprables</td>
      <td>EP06</td>
    </tr>
    <tr>
      <td><b>US33</b></td>
      <td>Volver a vista principal de tienda</td>
      <td><b>Como</b> usuario, <b>quiero</b> regresar a todos los productos <b>para</b> ver nuevamente la vista principal de la tienda.</td>
      <td>- <b>Dado que</b> el usuario esta viendo una categoria filtrada, <b>Cuando</b> selecciona Todos los productos, <b>Entonces</b> el sistema vuelve a la vista principal con productos relevantes y catalogo</td>
      <td>EP06</td>
    </tr>
    <tr>
      <td><b>US34</b></td>
      <td>Ver detalle de producto</td>
      <td><b>Como</b> usuario, <b>quiero</b> abrir un producto <b>para</b> revisar imagenes, descripcion, especificaciones y valoraciones.</td>
      <td>- <b>Dado que</b> el usuario hace click en una carta de producto, <b>Cuando</b> se abre el detalle, <b>Entonces</b> el sistema muestra galeria, descripcion, precio, rating, stock y valoraciones<br><br>- <b>Dado que</b> el producto no tiene resenas, <b>Cuando</b> el usuario abre el detalle, <b>Entonces</b> el sistema muestra un mensaje indicando que aun no hay valoraciones</td>
      <td>EP06</td>
    </tr>
    <tr>
      <td><b>US35</b></td>
      <td>Ver detalle de kit de emergencia</td>
      <td><b>Como</b> usuario, <b>quiero</b> abrir un kit <b>para</b> conocer su contenido general, nivel, precio y ahorro.</td>
      <td>- <b>Dado que</b> el usuario hace click en una carta de kit, <b>Cuando</b> se abre el detalle, <b>Entonces</b> el sistema muestra imagen, descripcion extendida, nivel, precio individual, ahorro y precio final<br><br>- <b>Dado que</b> el usuario visualiza una carta de kit, <b>Cuando</b> selecciona Agregar kit, <b>Entonces</b> el sistema agrega el kit al carrito sin abrir accidentalmente el detalle</td>
      <td>EP06</td>
    </tr>
    <tr>
      <td><b>US36</b></td>
      <td>Agregar productos al carrito</td>
      <td><b>Como</b> usuario, <b>quiero</b> agregar productos al carrito <b>para</b> preparar una compra.</td>
      <td>- <b>Dado que</b> el producto no esta en el carrito, <b>Cuando</b> el usuario selecciona Agregar, <b>Entonces</b> el sistema crea un item de carrito con cantidad uno<br><br>- <b>Dado que</b> el producto ya esta en el carrito, <b>Cuando</b> el usuario vuelve a agregarlo, <b>Entonces</b> el sistema aumenta su cantidad</td>
      <td>EP06</td>
    </tr>
    <tr>
      <td><b>US37</b></td>
      <td>Modificar cantidades en carrito</td>
      <td><b>Como</b> usuario, <b>quiero</b> aumentar o disminuir cantidades en el carrito <b>para</b> ajustar mi compra.</td>
      <td>- <b>Dado que</b> el carrito tiene un producto, <b>Cuando</b> el usuario presiona aumentar, <b>Entonces</b> la cantidad del producto incrementa en uno<br><br>- <b>Dado que</b> el carrito tiene un producto con cantidad mayor a uno, <b>Cuando</b> el usuario presiona disminuir, <b>Entonces</b> la cantidad disminuye en uno</td>
      <td>EP06</td>
    </tr>
    <tr>
      <td><b>US38</b></td>
      <td>Quitar productos del carrito</td>
      <td><b>Como</b> usuario, <b>quiero</b> eliminar productos del carrito <b>para</b> comprar solo lo necesario.</td>
      <td>- <b>Dado que</b> el producto esta en el carrito, <b>Cuando</b> el usuario selecciona eliminar, <b>Entonces</b> el sistema remueve el producto del carrito<br><br>- <b>Dado que</b> un producto tiene cantidad uno, <b>Cuando</b> el usuario presiona disminuir, <b>Entonces</b> el sistema elimina ese item del carrito</td>
      <td>EP06</td>
    </tr>
    <tr>
      <td><b>US39</b></td>
      <td>Revisar resumen de compra</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver el total de productos y el monto a pagar antes de comprar.</td>
      <td>- <b>Dado que</b> el carrito contiene productos o kits, <b>Cuando</b> el usuario abre el carrito, <b>Entonces</b> el sistema muestra items, cantidades, subtotales y total<br><br>- <b>Dado que</b> el carrito no tiene productos, <b>Cuando</b> el usuario abre el carrito, <b>Entonces</b> el sistema muestra que el carrito esta vacio</td>
      <td>EP06</td>
    </tr>
    <tr>
      <td><b>US40</b></td>
      <td>Completar pago ficticio</td>
      <td><b>Como</b> usuario, <b>quiero</b> llenar una pasarela de pago ficticia <b>para</b> simular la compra de productos.</td>
      <td>- <b>Dado que</b> el carrito tiene productos, <b>Y</b> el usuario completa todos los datos de pago, <b>Cuando</b> confirma la compra, <b>Entonces</b> el sistema registra la orden, <b>Y</b> muestra el mensaje Producto comprado<br><br>- <b>Dado que</b> el usuario deja campos de pago vacios, <b>Cuando</b> intenta confirmar la compra, <b>Entonces</b> el sistema solicita completar todos los datos</td>
      <td>EP06</td>
    </tr>
    <tr>
      <td><b>US41</b></td>
      <td>Consultar historial de compras</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver mis productos comprados <b>para</b> revisar compras anteriores.</td>
      <td>- <b>Dado que</b> el usuario tiene compras registradas, <b>Cuando</b> abre Historial, <b>Entonces</b> el sistema muestra orden, fecha, estado, productos, cantidades y total<br><br>- <b>Dado que</b> el usuario no tiene compras registradas, <b>Cuando</b> abre Historial, <b>Entonces</b> el sistema muestra un mensaje indicando que aun no hay productos comprados</td>
      <td>EP06</td>
    </tr>
    <tr>
      <td><b>US42</b></td>
      <td>Canjear puntos por cupones</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver cupones canjeables con SafeCoins <b>para</b> obtener descuentos.</td>
      <td>- <b>Dado que</b> el usuario tiene SafeCoins suficientes para un cupon, <b>Cuando</b> abre Canjear puntos, <b>Entonces</b> el sistema marca el cupon como canjeable<br><br>- <b>Dado que</b> el usuario no tiene monedas suficientes, <b>Cuando</b> revisa un cupon, <b>Entonces</b> el sistema indica cuantas SafeCoins le faltan</td>
      <td>EP06</td>
    </tr>
    <tr>
      <td><b>US43</b></td>
      <td>Leer resenas de productos</td>
      <td><b>Como</b> usuario, <b>quiero</b> leer resenas de otros usuarios <b>para</b> decidir mejor mi compra.</td>
      <td>- <b>Dado que</b> existen resenas registradas, <b>Cuando</b> el usuario navega por la tienda o detalle de producto, <b>Entonces</b> el sistema muestra nombre, rating y comentario<br><br>- <b>Dado que</b> el producto seleccionado no tiene resenas, <b>Cuando</b> se abre su detalle, <b>Entonces</b> el sistema muestra un estado sin valoraciones</td>
      <td>EP06</td>
    </tr>
    <tr>
      <td><b>EP07</b></td>
      <td>Navegacion y experiencia general de la aplicacion</td>
      <td><b>Como</b> usuario de la aplicacion, <b>quiero</b> navegar por una interfaz clara y responsiva, <b>para</b> usar SafeStep desde diferentes dispositivos.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US44</b></td>
      <td>Navegar por los modulos principales</td>
      <td><b>Como</b> usuario, <b>quiero</b> usar un menu lateral <b>para</b> moverme entre dashboard, simulaciones, progreso, gamificacion y tienda.</td>
      <td>- <b>Dado que</b> el usuario esta autenticado, <b>Cuando</b> selecciona una opcion del menu lateral, <b>Entonces</b> el sistema abre la seccion correspondiente<br><br>- <b>Dado que</b> el usuario esta en una seccion, <b>Cuando</b> observa el menu lateral, <b>Entonces</b> el sistema resalta la opcion activa</td>
      <td>EP07</td>
    </tr>
    <tr>
      <td><b>US45</b></td>
      <td>Ver notificaciones visuales en toolbar</td>
      <td><b>Como</b> usuario, <b>quiero</b> ver indicadores en el toolbar <b>para</b> reconocer alertas o actividad pendiente.</td>
      <td>- <b>Dado que</b> hay notificaciones disponibles, <b>Cuando</b> el usuario observa el toolbar, <b>Entonces</b> el sistema muestra un indicador visual de notificaciones</td>
      <td>EP07</td>
    </tr>
    <tr>
      <td><b>US46</b></td>
      <td>Usar la aplicacion en pantallas pequenas</td>
      <td><b>Como</b> usuario movil, <b>quiero</b> que la aplicacion sea usable desde una pantalla pequena <b>para</b> practicar o comprar desde mi dispositivo.</td>
      <td>- <b>Dado que</b> el usuario abre la aplicacion en una pantalla pequena, <b>Cuando</b> navega por las secciones, <b>Entonces</b> los contenidos se reorganizan sin perder informacion principal<br><br>- <b>Dado que</b> el usuario visualiza productos, misiones o simulaciones, <b>Cuando</b> usa una pantalla pequena, <b>Entonces</b> las cartas se muestran en una sola columna o en una disposicion legible</td>
      <td>EP07</td>
    </tr>
    <tr>
      <td><b>EP08</b></td>
      <td>Landing page publica</td>
      <td><b>Como</b> visitante interesado, <b>quiero</b> conocer la propuesta de valor de SafeStep en una landing page publica, <b>para</b> decidir si me registro en la plataforma.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US47</b></td>
      <td>Visualizar propuesta de valor en la landing page</td>
      <td><b>Como</b> visitante, <b>quiero</b> ver rapidamente que es SafeStep <b>para</b> entender si me ayuda a aprender primeros auxilios.</td>
      <td>- <b>Dado que</b> el visitante ingresa a la landing page, <b>Cuando</b> la pagina carga, <b>Entonces</b> el sistema muestra logo, navegacion, hero principal, propuesta de valor y llamados a la accion<br><br>- <b>Dado que</b> el visitante esta en el hero, <b>Cuando</b> lee el contenido principal, <b>Entonces</b> entiende que SafeStep ofrece simulaciones interactivas para prepararse ante emergencias</td>
      <td>EP08</td>
    </tr>
    <tr>
      <td><b>US48</b></td>
      <td>Navegar por secciones de la landing</td>
      <td><b>Como</b> visitante, <b>quiero</b> navegar por las secciones de la landing <b>para</b> conocer funcionalidades, simulaciones, gamificacion, tienda y preguntas frecuentes.</td>
      <td>- <b>Dado que</b> el visitante visualiza el menu de la landing, <b>Cuando</b> selecciona una seccion, <b>Entonces</b> la pagina se desplaza a la seccion correspondiente<br><br>- <b>Dado que</b> el visitante esta en un dispositivo movil, <b>Cuando</b> abre el menu, <b>Entonces</b> puede acceder a las mismas secciones principales</td>
      <td>EP08</td>
    </tr>
    <tr>
      <td><b>US49</b></td>
      <td>Conocer las simulaciones ofrecidas</td>
      <td><b>Como</b> visitante, <b>quiero</b> revisar ejemplos de simulaciones <b>para</b> saber que emergencias puedo practicar.</td>
      <td>- <b>Dado que</b> el visitante llega a la seccion de simulaciones, <b>Cuando</b> revisa las tarjetas informativas, <b>Entonces</b> el sistema muestra emergencias como RCP, quemaduras, atragantamiento y sismos<br><br>- <b>Dado que</b> el visitante encuentra una simulacion de interes, <b>Cuando</b> selecciona un llamado a la accion, <b>Entonces</b> el sistema lo dirige hacia registro o acceso</td>
      <td>EP08</td>
    </tr>
    <tr>
      <td><b>US50</b></td>
      <td>Conocer el sistema de gamificacion</td>
      <td><b>Como</b> visitante, <b>quiero</b> conocer las mecanicas de niveles, rachas, ranking, misiones e insignias <b>para</b> saber como la plataforma motiva el aprendizaje.</td>
      <td>- <b>Dado que</b> el visitante llega a la seccion de gamificacion, <b>Cuando</b> lee los beneficios, <b>Entonces</b> el sistema explica niveles, XP, rachas, misiones y recompensas<br><br>- <b>Dado que</b> el visitante revisa la gamificacion, <b>Cuando</b> observa las recompensas, <b>Entonces</b> entiende que puede ganar puntos y avanzar practicando</td>
      <td>EP08</td>
    </tr>
    <tr>
      <td><b>US51</b></td>
      <td>Conocer la tienda de productos</td>
      <td><b>Como</b> visitante, <b>quiero</b> saber que SafeStep tiene una tienda de productos y kits <b>para</b> complementar mi preparacion.</td>
      <td>- <b>Dado que</b> el visitante revisa la landing, <b>Cuando</b> llega a la informacion de tienda, <b>Entonces</b> el sistema comunica que existen productos, botiquines y kits de emergencia<br><br>- <b>Dado que</b> el visitante lee sobre la tienda, <b>Cuando</b> compara la oferta con las simulaciones, <b>Entonces</b> entiende que los productos recomendados ayudan a prepararse ante emergencias reales</td>
      <td>EP08</td>
    </tr>
    <tr>
      <td><b>US52</b></td>
      <td>Leer testimonios de usuarios</td>
      <td><b>Como</b> visitante, <b>quiero</b> leer testimonios <b>para</b> confiar en la utilidad de SafeStep.</td>
      <td>- <b>Dado que</b> el visitante llega a la seccion de testimonios, <b>Cuando</b> revisa las opiniones, <b>Entonces</b> el sistema muestra experiencias positivas de usuarios<br><br>- <b>Dado que</b> el visitante lee un testimonio relevante, <b>Cuando</b> considera registrarse, <b>Entonces</b> tiene mas informacion para decidir probar la aplicacion</td>
      <td>EP08</td>
    </tr>
    <tr>
      <td><b>US53</b></td>
      <td>Consultar preguntas frecuentes</td>
      <td><b>Como</b> visitante, <b>quiero</b> revisar preguntas frecuentes <b>para</b> resolver dudas antes de registrarme.</td>
      <td>- <b>Dado que</b> el visitante abre la seccion de preguntas frecuentes, <b>Cuando</b> revisa la pregunta sobre precio, <b>Entonces</b> el sistema explica el acceso gratuito o planes disponibles segun la propuesta<br><br>- <b>Dado que</b> el visitante duda si necesita experiencia medica, <b>Cuando</b> revisa la pregunta correspondiente, <b>Entonces</b> el sistema aclara que SafeStep esta disenado para principiantes</td>
      <td>EP08</td>
    </tr>
    <tr>
      <td><b>US54</b></td>
      <td>Acceder a registro desde la landing</td>
      <td><b>Como</b> visitante interesado, <b>quiero</b> acceder al registro desde la landing <b>para</b> empezar a usar SafeStep.</td>
      <td>- <b>Dado que</b> el visitante esta en la landing, <b>Cuando</b> selecciona comenzar o registrarse, <b>Entonces</b> el sistema lo dirige a la pantalla de registro o acceso<br><br>- <b>Dado que</b> el visitante llega al final de la landing, <b>Cuando</b> selecciona empezar ahora, <b>Entonces</b> el sistema lo dirige a la experiencia de acceso</td>
      <td>EP08</td>
    </tr>
    <tr>
      <td><b>US55</b></td>
      <td>Visualizar la landing en dispositivos moviles</td>
      <td><b>Como</b> visitante movil, <b>quiero</b> que la landing se vea correctamente en mi celular <b>para</b> conocer SafeStep sin problemas de lectura.</td>
      <td>- <b>Dado que</b> el visitante abre la landing desde un celular, <b>Cuando</b> se carga la primera vista, <b>Entonces</b> el hero, texto y botones se adaptan al ancho disponible<br><br>- <b>Dado que</b> el visitante navega por la landing en movil, <b>Cuando</b> revisa tarjetas, testimonios y preguntas frecuentes, <b>Entonces</b> los elementos se muestran de forma legible y ordenada</td>
      <td>EP08</td>
    </tr>
    <tr>
      <td><b>US56</b></td>
      <td>Ver informacion de contacto y marca</td>
      <td><b>Como</b> visitante, <b>quiero</b> ver informacion final de marca y contacto <b>para</b> identificar a SafeStep y sus canales.</td>
      <td>- <b>Dado que</b> el visitante llega al final de la landing, <b>Cuando</b> revisa el footer, <b>Entonces</b> el sistema muestra marca, enlaces relevantes y derechos reservados<br><br>- <b>Dado que</b> el visitante quiere mas informacion, <b>Cuando</b> revisa los enlaces del footer, <b>Entonces</b> puede encontrar canales o secciones relacionadas con SafeStep</td>
      <td>EP08</td>
    </tr>
    <tr>
      <td><b>EP09</b></td>
      <td>Soporte tecnico y arquitectura de la aplicacion</td>
      <td><b>Como</b> equipo de desarrollo, <b>quiero</b> mantener una base tecnica ordenada, modular y verificable, <b>para</b> sostener la evolucion de SafeStep sin afectar la experiencia del usuario.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>TS01</b></td>
      <td>Configuracion base del proyecto Angular</td>
      <td><b>Como</b> developer, <b>quiero</b> configurar la aplicacion Angular con dependencias, scripts y build funcional, <b>para</b> contar con una base estable de desarrollo.</td>
      <td>- <b>Dado que</b> el proyecto se instala con sus dependencias, <b>Cuando</b> se ejecuta el build, <b>Entonces</b> la aplicacion compila sin errores.<br><br>- <b>Dado que</b> el equipo ejecuta el proyecto localmente, <b>Cuando</b> inicia el servidor de desarrollo, <b>Entonces</b> la aplicacion queda disponible desde el navegador.</td>
      <td>EP09</td>
    </tr>
    <tr>
      <td><b>TS02</b></td>
      <td>Routing, layout principal y responsive shell</td>
      <td><b>Como</b> developer, <b>quiero</b> configurar rutas, shell principal, toolbar y navegacion responsive, <b>para</b> permitir el acceso ordenado a todos los modulos de SafeStep.</td>
      <td>- <b>Dado que</b> el usuario ingresa a una ruta valida, <b>Cuando</b> Angular resuelve la ruta, <b>Entonces</b> se carga el componente correspondiente dentro del shell.<br><br>- <b>Dado que</b> el usuario usa una pantalla pequena, <b>Cuando</b> abre la aplicacion, <b>Entonces</b> el menu lateral se comporta como drawer movil y no genera desplazamiento horizontal.</td>
      <td>EP09</td>
    </tr>
    <tr>
      <td><b>TS03</b></td>
      <td>Estructura por bounded context</td>
      <td><b>Como</b> developer, <b>quiero</b> organizar cada modulo con domain, infrastructure, application y presentation, <b>para</b> alinear el frontend con la arquitectura del curso.</td>
      <td>- <b>Dado que</b> se revisa la estructura del proyecto, <b>Cuando</b> se inspecciona cada bounded context principal, <b>Entonces</b> existen carpetas domain, infrastructure, application y presentation.<br><br>- <b>Dado que</b> se agrega una nueva funcionalidad, <b>Cuando</b> se ubica su codigo, <b>Entonces</b> cada archivo pertenece a la capa que corresponde.</td>
      <td>EP09</td>
    </tr>
    <tr>
      <td><b>TS04</b></td>
      <td>Capa application para orquestacion de datos</td>
      <td><b>Como</b> developer, <b>quiero</b> que presentation consuma stores de application en vez de APIs directas, <b>para</b> separar la UI de la infraestructura.</td>
      <td>- <b>Dado que</b> un componente necesita datos, <b>Cuando</b> ejecuta una carga o actualizacion, <b>Entonces</b> usa un store de application.<br><br>- <b>Dado que</b> un store necesita persistir datos, <b>Cuando</b> realiza la operacion, <b>Entonces</b> delega la comunicacion HTTP a infrastructure.</td>
      <td>EP09</td>
    </tr>
    <tr>
      <td><b>TS05</b></td>
      <td>Integracion con json-server</td>
      <td><b>Como</b> developer, <b>quiero</b> conectar el frontend con json-server, <b>para</b> simular un backend REST durante el desarrollo.</td>
      <td>- <b>Dado que</b> json-server esta activo, <b>Cuando</b> la aplicacion solicita datos, <b>Entonces</b> recibe respuestas desde los endpoints configurados.<br><br>- <b>Dado que</b> json-server no esta activo, <b>Cuando</b> una vista intenta cargar datos, <b>Entonces</b> la aplicacion informa el problema sin romper la interfaz completa.</td>
      <td>EP09</td>
    </tr>
    <tr>
      <td><b>TS06</b></td>
      <td>Persistencia temporal en db.json</td>
      <td><b>Como</b> developer, <b>quiero</b> persistir cambios de usuario en db.json, <b>para</b> conservar carritos, compras, intentos y SafeCoins entre recargas.</td>
      <td>- <b>Dado que</b> el usuario completa una accion persistente, <b>Cuando</b> el store ejecuta una actualizacion, <b>Entonces</b> db.json refleja el cambio.<br><br>- <b>Dado que</b> la pagina se recarga despues de una actualizacion, <b>Cuando</b> se cargan los datos nuevamente, <b>Entonces</b> el estado previo se mantiene.</td>
      <td>EP09</td>
    </tr>
    <tr>
      <td><b>TS07</b></td>
      <td>Internacionalizacion espanol e ingles</td>
      <td><b>Como</b> developer, <b>quiero</b> configurar traducciones ES/EN con un selector de idioma, <b>para</b> que la aplicacion pueda cambiar textos principales sin modificar el codigo.</td>
      <td>- <b>Dado que</b> el usuario selecciona un idioma, <b>Cuando</b> el servicio de traduccion aplica el cambio, <b>Entonces</b> los textos configurados se actualizan.<br><br>- <b>Dado que</b> existe una clave de traduccion en los archivos i18n, <b>Cuando</b> se usa en una plantilla, <b>Entonces</b> se muestra el texto correspondiente al idioma activo.</td>
      <td>EP09</td>
    </tr>
    <tr>
      <td><b>TS08</b></td>
      <td>Calculo persistente de SafeCoins por simulacion</td>
      <td><b>Como</b> developer, <b>quiero</b> calcular monedas ganadas segun precision y repeticiones, <b>para</b> sostener la regla de recompensas de las simulaciones.</td>
      <td>- <b>Dado que</b> una simulacion se completa con precision suficiente, <b>Cuando</b> se calcula la recompensa, <b>Entonces</b> se aplica la recompensa base, precision y multiplicador de repeticion.<br><br>- <b>Dado que</b> el resultado calculado es menor a una moneda, <b>Cuando</b> se normaliza la recompensa, <b>Entonces</b> se registra cero monedas ganadas.</td>
      <td>EP03</td>
    </tr>
    <tr>
      <td><b>TS09</b></td>
      <td>Sincronizacion de saldo y transacciones de SafeCoins</td>
      <td><b>Como</b> developer, <b>quiero</b> sincronizar identityAccess, gamification y el wallet compartido, <b>para</b> que el saldo de SafeCoins sea consistente en toda la app.</td>
      <td>- <b>Dado que</b> el usuario gana SafeCoins, <b>Cuando</b> se persiste la recompensa, <b>Entonces</b> identityAccess y gamification guardan el mismo saldo.<br><br>- <b>Dado que</b> la interfaz muestra el saldo en toolbar, sidebar, gamificacion o tienda, <b>Cuando</b> el saldo cambia, <b>Entonces</b> todas las vistas reflejan el valor actualizado.</td>
      <td>EP05</td>
    </tr>
    <tr>
      <td><b>TS10</b></td>
      <td>Persistencia de carrito, checkout ficticio e historial</td>
      <td><b>Como</b> developer, <b>quiero</b> manejar carrito, ordenes e historial desde ecommerce, <b>para</b> simular un flujo de compra completo.</td>
      <td>- <b>Dado que</b> el usuario agrega o modifica items del carrito, <b>Cuando</b> se guarda el cambio, <b>Entonces</b> cartItems se actualiza en db.json.<br><br>- <b>Dado que</b> el usuario completa el checkout ficticio, <b>Cuando</b> confirma la compra, <b>Entonces</b> se crea una orden y el carrito del usuario queda vacio.</td>
      <td>EP06</td>
    </tr>
    <tr>
      <td><b>TS11</b></td>
      <td>Estadisticas calculadas desde datos reales</td>
      <td><b>Como</b> developer, <b>quiero</b> calcular progreso desde intentos, simulaciones y transacciones, <b>para</b> evitar depender de metricas ficticias prearmadas.</td>
      <td>- <b>Dado que</b> existen intentos de simulacion, <b>Cuando</b> el usuario abre Progreso, <b>Entonces</b> se calculan intentos, precision, errores y rendimiento por simulacion.<br><br>- <b>Dado que</b> existen transacciones de SafeCoins, <b>Cuando</b> se calcula el resumen, <b>Entonces</b> se muestran monedas y XP derivados de actividad real.</td>
      <td>EP04</td>
    </tr>
    <tr>
      <td><b>TS12</b></td>
      <td>Gestion de assets locales para productos, kits y simulaciones</td>
      <td><b>Como</b> developer, <b>quiero</b> referenciar imagenes locales desde los datos del proyecto, <b>para</b> que las cartas y detalles muestren recursos visuales consistentes.</td>
      <td>- <b>Dado que</b> un producto o kit tiene una ruta de imagen local, <b>Cuando</b> se renderiza su carta, <b>Entonces</b> se muestra la imagen correspondiente.<br><br>- <b>Dado que</b> una imagen esta ubicada en assets publicos, <b>Cuando</b> el navegador solicita la ruta, <b>Entonces</b> el recurso carga sin depender de servicios externos.</td>
      <td>EP06</td>
    </tr>
  </tbody>
</table>
