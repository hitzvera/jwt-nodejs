CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE jwttutorial;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users(name, email, password) VALUES('Mujahid', 'mujahid@gmail.com', 'mujahid')
INSERT INTO users(name, email, password) VALUES('Farhan', 'farhan@gmail.com', 'farhan')
