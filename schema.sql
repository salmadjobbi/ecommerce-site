-- Creating the users table schema

CREATE DATABASE IF NOT EXISTS ecommerce;

USE ecommerce;

-- Creating the users table
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- You can add other tables here if needed
