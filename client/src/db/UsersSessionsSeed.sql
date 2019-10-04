-- DROP DATABASE IF EXISTS PARKP2P;
-- CREATE DATABASE PARKP2P;
-- DROP TABLE UserSessions;
USE PARKP2P;
DROP TABLE UserSessions
CREATE TABLE UserSessions
(

    userId INT AUTO_INCREMENT NOT NULL,
    _id VARCHAR(100) UNIQUE NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    idDeleted BOOLEAN DEFAULT false,
	PRIMARY KEY(userId)
);

    -- USE PARKP2P;
    -- INSERT INTO UserSessions(_id)
    -- values()