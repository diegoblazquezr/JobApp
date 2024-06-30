-- Crear users
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(40) NOT NULL
);

-- Crear favorites
CREATE TABLE favorites (
  fav_id SERIAL PRIMARY KEY,
  user_id INT,
  job_id VARCHAR(255) NOT NULL
);

-- Foreign Key user_id
ALTER TABLE favorites ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

-- Insertar datos en tabla users
INSERT INTO users (name, email, password, role)
VALUES
('Admin', 'admin@gmail.com', '123456', 'admin'),
('Edu', 'edu@gmail.com', '123456', 'user'),
('Emilio', 'emilio@gmail.com', '123456', 'user'),
('Diego', 'diego@gmail.com', '123456', 'user');

-- Insertar datos en tabla favorites
INSERT INTO favorites (user_id, job_id)
VALUES
(2, '1'),
(2, '2'),
(3, '2'),
(3, '3'),
(3, '4'),
(4, '1'),
(4, '3');

-----------------------------------------------------------------------------------------------------------------------

-- CRUD users
-- CREATE
INSERT INTO users(name, email, password, role)
VALUES ('Prueba', 'prueba@gmail.com', '123456', 'user');
-- READ
SELECT *
FROM users;
-- UPDATE
UPDATE users
SET name = 'Prueba2',
email = 'prueba2@gmail.com',
password = '123456123456',
role = 'user'
WHERE email = 'prueba@gmail.com';
-- DELETE
DELETE FROM users
WHERE email = 'prueba2@gmail.com';

-- CRXD favorites
-- CREATE
INSERT INTO favorites(user_id, job_id)
VALUES(4, 2);
-- READ
SELECT *
FROM favorites;
-- DELETE
DELETE FROM favorites
WHERE user_id = 4 AND job_id = '2';

-- Pruebas de Queries
SELECT * FROM public.users;

SELECT * FROM public.favorites;

SELECT u.email, f.job_id
FROM public.favorites f
INNER JOIN public.users u ON u.user_id = f.user_id;