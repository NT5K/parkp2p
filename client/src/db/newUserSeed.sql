-- DROP TABLE users
CREATE TABLE users
(
ID INT AUTO_INCREMENT NOT NULL,
-- LOGIN
Email VARCHAR (80) NOT NULL,
Pass VARCHAR (80) NOT NULL,
-- USER INFO
First_Name VARCHAR (100),
Last_Name VARCHAR (100),
Phone_Number VARCHAR (15),
-- ADDRESS
Address VARCHAR (100),
Address_Extra VARCHAR (100),
City VARCHAR (100),
State VARCHAR (100),
Zip INTEGER (10), 
-- LONG/LAT
Longitude INTEGER (20), 
Latitude INTEGER (20), 
-- CUSTOMER CAR
Car_Make VARCHAR (100),
Car_Model VARCHAR (100),
-- # SPOTS AVAILABLE
Spots INTEGER (10),
-- Active driveway
Active_State BOOLEAN,
-- RATES
Hourly INTEGER (10),
Daily INTEGER (10),
Weekly INTEGER  (10),
Monthly INTEGER (10),
Overnight INTEGER (10),
-- ACCOUNT BALANCE
Balance INTEGER (10),
PRIMARY KEY (ID)
);

    USE PARKP2P;
    INSERT INTO users
        (Email, Pass, First_Name, Last_Name, Phone_Number, Address, Address_Extra, City, State, Zip, Longitude, Latitude, Car_Make, Car_Model, Spots, Active_State, Hourly, Daily, Weekly, Monthly, Overnight, Balance)
    values
        ("test@gmail.com", "hashedpassword", null, null, null, null, null, null, null, null, null, null, null, null, null, false, null, null, null, null, null, null)