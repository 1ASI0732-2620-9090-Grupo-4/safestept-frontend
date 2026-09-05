-- SafeStep Web App - Database Schema Simplificado
-- Modelo pensado para exposicion y diagrama ERD legible.
-- Resume las entidades principales de la aplicacion.

-- ============================================================
-- IDENTIDAD Y ACCESO
-- ============================================================

CREATE TABLE users (
  id VARCHAR(50) PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  role VARCHAR(100) NOT NULL,
  city VARCHAR(100),
  level INTEGER NOT NULL DEFAULT 1,
  xp INTEGER NOT NULL DEFAULT 0,
  safe_coins INTEGER NOT NULL DEFAULT 0,
  streak_days INTEGER NOT NULL DEFAULT 0,
  completed_simulations INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE notifications (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  title VARCHAR(120) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ============================================================
-- SIMULACION MEDICA
-- ============================================================

CREATE TABLE medical_simulations (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  emergency_type VARCHAR(80) NOT NULL,
  difficulty VARCHAR(40) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  xp_reward INTEGER NOT NULL,
  coin_reward INTEGER NOT NULL,
  image_url VARCHAR(255),
  description TEXT NOT NULL
);

CREATE TABLE simulation_steps (
  id VARCHAR(50) PRIMARY KEY,
  simulation_id VARCHAR(50) NOT NULL,
  step_order INTEGER NOT NULL,
  prompt TEXT NOT NULL,
  correct_option TEXT NOT NULL,
  FOREIGN KEY (simulation_id) REFERENCES medical_simulations(id)
);

CREATE TABLE simulation_attempts (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  simulation_id VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL,
  total_steps INTEGER NOT NULL,
  correct_steps INTEGER NOT NULL,
  accuracy DECIMAL(5, 2) NOT NULL,
  xp_earned INTEGER NOT NULL,
  completed_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (simulation_id) REFERENCES medical_simulations(id)
);

-- ============================================================
-- GAMIFICACION
-- ============================================================

CREATE TABLE missions (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  cadence VARCHAR(40) NOT NULL,
  goal INTEGER NOT NULL,
  reward_xp INTEGER NOT NULL,
  reward_coins INTEGER NOT NULL,
  status VARCHAR(40) NOT NULL,
  instructions TEXT,
  unlock_requirement TEXT
);

CREATE TABLE user_missions (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  mission_id VARCHAR(50) NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(40) NOT NULL,
  completed_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (mission_id) REFERENCES missions(id)
);

CREATE TABLE badges (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  rarity VARCHAR(40) NOT NULL,
  description TEXT NOT NULL,
  unlock_requirement TEXT
);

CREATE TABLE user_badges (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  badge_id VARCHAR(50) NOT NULL,
  unlocked BOOLEAN NOT NULL DEFAULT FALSE,
  unlocked_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (badge_id) REFERENCES badges(id)
);

CREATE TABLE leaderboard_entries (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id VARCHAR(50),
  rank_position INTEGER NOT NULL,
  display_name VARCHAR(120) NOT NULL,
  xp INTEGER NOT NULL,
  streak INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE coin_transactions (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  simulation_id VARCHAR(50),
  earned_coins INTEGER NOT NULL,
  balance_before INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  accuracy DECIMAL(5, 2) NOT NULL,
  multiplier DECIMAL(8, 4) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (simulation_id) REFERENCES medical_simulations(id)
);

-- ============================================================
-- ECOMMERCE
-- ============================================================

CREATE TABLE products (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  category VARCHAR(120) NOT NULL,
  product_type VARCHAR(40) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  old_price DECIMAL(10, 2),
  rating DECIMAL(3, 2) NOT NULL DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  image_url VARCHAR(255),
  description TEXT NOT NULL,
  is_popular BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE coupons (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  cost_coins INTEGER NOT NULL,
  discount VARCHAR(80) NOT NULL
);

CREATE TABLE cart_items (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  product_id VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL,
  added_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL,
  product_id VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_reviews (
  id VARCHAR(50) PRIMARY KEY,
  product_id VARCHAR(50) NOT NULL,
  user_id VARCHAR(50),
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ============================================================
-- ESTADISTICAS
-- ============================================================
-- El modulo de progreso no necesita muchas tablas propias.
-- Sus datos se calculan principalmente desde:
-- users, simulation_attempts, coin_transactions, missions,
-- user_missions, badges, user_badges, orders y product_reviews.

CREATE TABLE progress_recommendations (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  title VARCHAR(180) NOT NULL,
  action_text VARCHAR(180) NOT NULL,
  priority VARCHAR(40) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ============================================================
-- INDICES BASICOS
-- ============================================================

CREATE INDEX idx_attempts_user ON simulation_attempts(user_id);
CREATE INDEX idx_attempts_simulation ON simulation_attempts(simulation_id);
CREATE INDEX idx_coin_transactions_user ON coin_transactions(user_id);
CREATE INDEX idx_cart_items_user ON cart_items(user_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_reviews_product ON product_reviews(product_id);
