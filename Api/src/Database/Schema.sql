CREATE DATABASE IF NOT EXISTS book_my_event;

USE book_my_event;

-- Users table
CREATE TABLE users (
    user_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_no VARCHAR(12) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Venue table
CREATE TABLE IF NOT EXISTS venue(
    venue_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    venue_name VARCHAR(100) NOT NULL,
    venue_address VARCHAR(150) NOT NULL,
    venue_map_link VARCHAR(2048) NOT NULL,
    owned_by CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owned_by) REFERENCES users(user_id)
);

-- Screens table
CREATE TABLE IF NOT EXISTS screens(
    screen_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    screen_name VARCHAR(100) NOT NULL,
    venue_id_ref CHAR(36) NOT NULL,
    total_seats INT,
    FOREIGN KEY (venue_id_ref) REFERENCES venue(venue_id)
);

-- Seats table 
CREATE TABLE IF NOT EXISTS seats(
    seat_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    screen_id_ref CHAR(36) NOT NULL,
    row_label VARCHAR(5) NOT NULL,
    seat_number INT NOT NULL,
    seat_type VARCHAR(50),
    FOREIGN KEY (screen_id_ref) REFERENCES screens(screen_id)
);

-- Events table 
CREATE TABLE IF NOT EXISTS events(
    event_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    event_name VARCHAR(100) NOT NULL,
    event_description VARCHAR(500) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_image VARCHAR(2048) NOT NULL,
    event_duration VARCHAR(20) NOT NULL,
    released_at VARCHAR(25) NOT NULL,
    min_age int NOT NULL,
    genere VARCHAR(50),
    language VARCHAR(50) NOT NULL
);

-- Show table
CREATE TABLE IF NOT EXISTS shows (
    show_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    event_id_ref CHAR(36) NOT NULL,
    screen_id_ref CHAR(36) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    show_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (event_id_ref) REFERENCES events(event_id),
    FOREIGN KEY (screen_id_ref) REFERENCES screens(screen_id)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    booking_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    booked_by CHAR(36) NOT NULL,
    show_id CHAR(36) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('BOOKED', 'PROCESSING', 'FAILED')
        NOT NULL DEFAULT 'PROCESSING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (booked_by) REFERENCES users(user_id),
    FOREIGN KEY (show_id) REFERENCES shows(show_id)
);

-- Show seat
CREATE TABLE IF NOT EXISTS show_seats (
    show_seat_id CHAR(36) PRIMARY KEY,
    show_id_ref CHAR(36) NOT NULL,
    seat_id_ref CHAR(36) NOT NULL,
    status ENUM('BOOKED', 'LOCKED', 'OPEN')
        NOT NULL DEFAULT 'OPEN',
    price DECIMAL(10,2) NOT NULL,

    UNIQUE (show_id_ref, seat_id_ref),

    FOREIGN KEY (show_id_ref) REFERENCES shows(show_id),
    FOREIGN KEY (seat_id_ref) REFERENCES seats(seat_id)
);

-- Booking seats table
CREATE TABLE IF NOT EXISTS booking_seats (
    booking_seat_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    booking_id_ref CHAR(36) NOT NULL,
    show_seat_id_ref CHAR(36) NOT NULL,
    price DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (booking_id_ref) REFERENCES bookings(booking_id),
    FOREIGN KEY (show_seat_id_ref) REFERENCES show_seats(show_seat_id)
);
-- Payments table
CREATE TABLE IF NOT EXISTS payment_info (
    payment_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    booking_id_ref CHAR(36) NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status ENUM('PROCESSING', 'COMPLETED', 'FAILED')
        NOT NULL DEFAULT 'PROCESSING',
    completed_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (booking_id_ref) REFERENCES bookings(booking_id),
    UNIQUE (transaction_id)
);