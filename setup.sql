CREATE DATABASE IF NOT EXISTS room_assets_db;
USE room_assets_db;

-- Rooms Table
CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100)
);

-- Assets Table
CREATE TABLE IF NOT EXISTS assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT,
    item_type ENUM('Digital Equipment', 'Furniture'),
    item_name VARCHAR(100),
    quantity INT,
    model VARCHAR(100),
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Sample Room Data
INSERT INTO rooms (name, location) VALUES 
('Chemistry Lab', '1st Floor'),
('Physics Lab', '2nd Floor'),
('Computer Lab', '3rd Floor'),
('Conference Room', 'Ground Floor'),
('Library Room', '1st Floor');
