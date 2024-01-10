CREATE TABLE ratings (
  id TEXT PRIMARY KEY
);

CREATE TABLE categories (
  id TEXT PRIMARY KEY
);

CREATE TABLE shows (
  id          TEXT PRIMARY KEY,
  year        INT NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  rating_id   TEXT NOT NULL REFERENCES ratings(id) ON DELETE CASCADE,
  title       TEXT NOT NULL
);

CREATE TABLE trending_shows (
  show_id TEXT PRIMARY KEY REFERENCES shows(id) ON DELETE CASCADE
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE bookmarks (
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  show_id TEXT NOT NULL REFERENCES shows(id) ON DELETE CASCADE,
  PRIMARY KEY(user_id, show_id)
);
