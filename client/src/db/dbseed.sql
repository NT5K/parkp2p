-- DROP DATABASE IF EXISTS PARKP2P;
-- CREATE DATABASE PARKP2P;
USE PARKP2P;
CREATE TABLE driveways
(

    ID INT
    AUTO_INCREMENT NOT NULL,
	First_Name VARCHAR(100) NOT NULL,
	Last_Name VARCHAR(100) NOT NULL,
    Username VARCHAR(15) NOT NULL,
	Phone_Number VARCHAR(15) NOT NULL,
	Email VARCHAR(80) NOT NULL,
	Pass VARCHAR(15) NOT NULL,
	Address VARCHAR(100) NOT NULL,
    Address_Extra VARCHAR(100),
	City VARCHAR(100) NOT NULL,
	State VARCHAR(100) NOT NULL,
	Zip INTEGER(10) NOT NULL, 
	Spots INTEGER(10),
	Active_State BOOLEAN,
	Hourly INTEGER(10),
	Daily INTEGER(10),
	Weekly INTEGER(10),
	Monthly INTEGER(10),
	Overnight INTEGER(10),
    Balance INTEGER(10),
	PRIMARY KEY(ID)
);

    USE PARKP2P;
    INSERT INTO driveways
        (First_Name, Last_Name, Username, Phone_Number, Email, Pass, Address, Address_Extra, City, State, Zip, Spots, Active_State,
         Hourly, Daily, Weekly, Monthly, Overnight, Balance)
    values
        ("Nick", "Tysh", "NT5K", "2163211234", "nicholastysh@gmail.com", "hashedpassword", "1480 Felton Rd", 
        null, "South Euclid", "OHIO", "44121", "1", true, 2, 12, null, null, 10, 100)
	
		