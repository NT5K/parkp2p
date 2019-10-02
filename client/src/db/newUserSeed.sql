-- DROP TABLE users
CREATE TABLE Users
(

    ID INT AUTO_INCREMENT NOT NULL,
Email VARCHAR (80) NOT NULL,
Pass BINARY (60) NOT NULL,
First_Name VARCHAR (100),
Last_Name VARCHAR (100),
Phone_Number VARCHAR (15),
Address VARCHAR (100),
Address_Extra VARCHAR (100),
City VARCHAR (100),
State VARCHAR (100),
Zip INTEGER (10), 
Longitude INTEGER (20), 
Latitude INTEGER (20), 
Spots INTEGER (10),
Active_State BOOLEAN,
Hourly INTEGER (10),
Daily INTEGER (10),
Weekly INTEGER  (10),
Monthly INTEGER (10),
Overnight INTEGER (10),
Balance INTEGER (10),
PRIMARY KEY (ID)
);

    USE PARKP2P;
    INSERT INTO Users
        (Email, Pass, First_Name, Last_Name, Phone_Number, Address, Address_Extra, City, State, Zip, Longitude, Latitude, Spots, Active_State, Hourly, Daily, Weekly, Monthly, Overnight, Balance)
    values
        ("test@gmail.com", "hashedpassword", null, null, null, null, null, null, null, null, null, null, null, false, null, null, null, null, null, null)