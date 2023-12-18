const auth = `CREATE TABLE chatauth(
    a_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    a_name VARCHAR(20),
    a_username VARCHAR(40) UNIQUE,
    a_email VARCHAR(100),
    a_password VARCHAR(1000),
    a_image VARCHAR(1000)
)`;

const messages = `CREATE TABLE chatmessages(
    message_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sender_id VARCHAR(255) UNIQUE,
    receiver_id VARCHAR(255) UNIQUE,
    message_text TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
)`