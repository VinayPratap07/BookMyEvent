CREATE DATABASE IF NOT EXISTS book_my_event;

USE book_my_event;

-- Users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_no VARCHAR(12) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

-- Venue table
CREATE TABLE venue(
    venue_id INT AUTO_INCREMENT PRIMARY KEY,
    venue_name VARCHAR(100) NOT NULL,
    venue_address VARCHAR(150) NOT NULL,
    venue_map_link VARCHAR(100) NOT NULL,
    owned_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owned_by) REFERENCES users(user_id)
);

--Screens table
CREATE TABLE screens(
    screen_id INT AUTO_INCREMENT PRIMARY KEY,
    screen_name VARCHAR(100) NOT NULL,
    venue_id_ref INT,
    total_seats INT,
    FOREIGN KEY (venue_id_ref) REFERENCES venue(venue_id)
);

--Seats table 
CREATE TABLE seats(
    seat_id INT AUTO_INCREMENT PRIMARY KEY,
    screen_id_ref INT,
    row_label VARCHAR(5) NOT NULL,
    seat_number INT NOT NULL,
    seat_type VARCHAR(50),
    FOREIGN KEY (screen_id_ref) REFERENCES screens(screen_id)
);

--Events table 
CREATE TABLE events(
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    event_description VARCHAR(500) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_image VARCHAR(100) NOT NULL,
    event_duration VARCHAR(20) NOT NULL,
    released_at VARCHAR(25) NOT NULL,
    min_age int NOT NULL,
    genere VARCHAR(50),
    language VARCHAR(50) NOT NULL
);

--Show table
CREATE TABLE shows(
    show_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id_ref INT,
    screen_id_ref INT,
    start_time VARCHAR(20) NOT NULL,
    end_time VARCHAR(20) NOT NULL,
    show_date VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (event_id_ref) REFERENCES events(event_id)
    FOREIGN KEY (screen_id_ref) REFERENCES screens(screen_id)
);

--Bookings table
CREATE TABLE bookings(
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    booked_by INT,
    show_id INT,
    total_amount INT,
    status ENUM('BOOKED', 'PROCESSING','FAILED') NOT NULL DEFAULT 'PROCESSING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

--Show seat
CREATE TABLE show_seats(
    show_seat_id INT AUTO_INCREMENT PRIMARY KEY,
    show_id_ref INT,
    seat_id_ref INT,
    status ENUM('BOOKED', 'LOCKED','OPEN') NOT NULL DEFAULT 'OPEN',
    price INT NOT NULL,

    
    FOREIGN KEY (show_id_ref) REFERENCES shows(show_id)
    FOREIGN KEY (seat_id_ref) REFERENCES seats(seat_id)
);

--Booking seats table
CREATE TABLE booking_seats(
    booking_seat_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id_ref INT,
    show_seat_id_ref INT,
    price INT Not NULL,

    FOREIGN KEY (booking_id_ref) REFERENCES bookings(booking_id)
    FOREIGN KEY (show_seat_id_ref) REFERENCES show_seats(show_seat_id)
);

--Payments table
CREATE TABLE payment_info(
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id_ref INT,
    transaction_id INT NOT NULL,
    amount INT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status ENUM('PROCESSING', 'COMPLETED','FAILED') NOT NULL DEFAULT 'PROCESSING',
    completed_at INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (booking_id_ref) REFERENCES bookings(booking_id)
);