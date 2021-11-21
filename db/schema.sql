-- Creating table
-- USE SOURCE db/schema.sql in CL to create the table and call this file
CREATE TABLE candidates (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT Null,
    last_name VARCHAR(30) NOT NULL,
    industry_connected BOOLEAN NOT NULL
);