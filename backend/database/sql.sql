create database crime_management;

use crime_management;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,   -- store SHA-256/BCrypt hash
    role ENUM('Admin','Officer') NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE officers (
    officer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(50),
    department VARCHAR(100),
    contact VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
CREATE TABLE criminals (
    criminal_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    alias VARCHAR(100),
    dob DATE,
    gender ENUM('Male','Female','Other'),
    address TEXT,
    crime_history TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE criminal_faces (
    face_id INT AUTO_INCREMENT PRIMARY KEY,
    criminal_id INT NOT NULL,
    face_encoding BLOB NOT NULL,   -- store vector/encoding
    image_path VARCHAR(255),       -- optional file path
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (criminal_id) REFERENCES criminals(criminal_id) ON DELETE CASCADE
);

CREATE TABLE cases (
    case_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('Pending','Ongoing','Closed') DEFAULT 'Pending',
    officer_id INT,   -- assigned officer
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (officer_id) REFERENCES officers(officer_id)
);

CREATE TABLE victims (
    victim_id INT AUTO_INCREMENT PRIMARY KEY,
    case_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    dob DATE,
    contact VARCHAR(100),
    statement TEXT,
    FOREIGN KEY (case_id) REFERENCES cases(case_id) ON DELETE CASCADE
);

CREATE TABLE incidents (
    incident_id INT AUTO_INCREMENT PRIMARY KEY,
    reported_by VARCHAR(100),   -- could be officer/public
    description TEXT NOT NULL,
    location VARCHAR(255),
    status ENUM('Reported','Investigating','Resolved') DEFAULT 'Reported',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE evidence (
    evidence_id INT AUTO_INCREMENT PRIMARY KEY,
    case_id INT NOT NULL,
    description TEXT,
    file_path VARCHAR(255),   -- image/video/doc path
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(case_id) ON DELETE CASCADE
);

CREATE TABLE login_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    activity TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
CREATE TABLE otp_codes (
    otp_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    otp_code VARCHAR(10) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
CREATE TABLE recognition_logs (
    rec_id INT AUTO_INCREMENT PRIMARY KEY,
    criminal_id INT,
    confidence DECIMAL(5,2),
    matched BOOLEAN,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(100),   -- webcam/live/upload
    FOREIGN KEY (criminal_id) REFERENCES criminals(criminal_id)
);
