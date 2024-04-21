-- Create a database called birthmark
CREATE DATABASE birthmark WITH OWNER devdeedee

-- Connected to the birthmark database
\c birthmark;

-- Create a schema called celebration
CREATE SCHEMA IF NOT EXISTS celebration AUTHORIZATION devdeedee;

-- Create a table called user to hold information of the users
CREATE TABLE IF NOT EXISTS celebration.user(
    id SERIAL PRIMARY KEY,
    phone_number varchar(32) NOT NULL UNIQUE,
    password varchar(32) NOT NULL,
    api_key varchar(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a table called celebrants for storing registered celebrants informations
CREATE TABLE IF NOT EXISTS celebration.celebrants (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    gender CHAR(1) CHECK (gender IN ('M', 'F', 'O')),
    email VARCHAR(255),
    phone_number VARCHAR(32),
    birthdate_id INTEGER NOT NULL,
    channel_id INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a table called birthdates for storing birthdates of the celebrants along with their corresponding month and years
CREATE TABLE IF NOT EXISTS celebration.birthdates (
    id SERIAL PRIMARY KEY,
    day INTEGER CHECK (day >= 1 AND day <= 31),
    month INTEGER CHECK (month >= 1 AND month <= 12),
    year INTEGER CHECK (year IS NULL OR (EXTRACT(YEAR FROM CURRENT_DATE) - year <= 70))
);

-- Create a table called channels for storing the channels through which birthday wishes are sent to the celebrants
CREATE TABLE IF NOT EXISTS celebration.channels (
    id SERIAL PRIMARY KEY,
    mode_name INTEGER NOT NULL,
    is_disabled Boolean DEFAULT FALSE,
    descriiption TEXT DEFAULT NULL
);

-- Create a table called birthday_wishes for storing scheduled birthday wishes
CREATE TABLE IF NOT EXISTS celebration.birthday_wishes (
    id SERIAL PRIMARY KEY,
    celebrant_id INTEGER NOT NULL,
    message Varchar(3000) NOT NULL,
    scheduled_time TIMESTAMP NOT NULL
);

-- Create a table called birthday_wish_logs for storing logs of sent birthday wishes
CREATE TABLE IF NOT EXISTS celebration.birthday_wish_logs (
    id SERIAL PRIMARY KEY,
    birthday_wishes_id INTEGER NOT NULL,
    time_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(32) CHECK (status IN ('Successful', 'Pending', 'Failed'))
);

-- Create a table called bg_jobs_status for storing status of background jobs
CREATE TABLE IF NOT EXISTS celebration.bg_jobs_status (
    id SERIAL PRIMARY KEY,
    job_name VARCHAR(255) NOT NULL,
    status VARCHAR(32) CHECK (status IN ('Running', 'Completed', 'Failed')),
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP DEFAULT NULL,
    duration INTERVAL DEFAULT NULL
);

-- List all the tables in the celebration schema
SELECT table_name FROM information_schema.tables WHERE table_schema = 'celebration';


-- Add Foreign Key Constraints to Celebrant Table
ALTER TABLE celebration.celebrants
    ADD FOREIGN KEY (birthdate_id) REFERENCES celebration.birthdates(id),
    ADD FOREIGN KEY (channel_id) REFERENCES celebration.channels(id);

-- Add Foreign Key Constraints to Birthday_wishes Table
ALTER TABLE celebration.birthday_wishes
    ADD FOREIGN KEY (celebrant_id) REFERENCES celebration.celebrants(id);

-- Add Foreign Key Constraints to Birthday_wish_logs Table
ALTER TABLE celebration.birthday_wish_logs
    ADD FOREIGN KEY (birthday_wishes_id) REFERENCES celebration.birthday_wishes(id);

-- Rename a column in birthday_wish_log table
ALTER TABLE celebration.birthday_wish_logs
    RENAME COLUMN sent_time TO time_sent;

-- Ensuring that the year column in birthdates table is nullable/optional
ALTER TABLE celebration.birthdates
    DROP CONSTRAINT birthdates_year_check;

ALTER TABLE celebration.birthdates
    ADD CONSTRAINT birthdates_year_check CHECK (year IS NULL OR (EXTRACT(YEAR FROM CURRENT_DATE) - year <= 70));