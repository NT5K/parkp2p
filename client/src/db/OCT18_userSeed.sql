-- DROP TABLE users;
CREATE TABLE users
(
    ID INT AUTO_INCREMENT NOT NULL,
    -- LOGIN
    Email VARCHAR (80) UNIQUE NOT NULL,
    Pass CHAR (60) NOT NULL,
    -- USER INFO
    Name VARCHAR (100),
    Phone_Number VARCHAR (15),
    -- ADDRESS
    Address VARCHAR (100),
    City VARCHAR (100),
    State VARCHAR (100),
    Zipcode VARCHAR (10), 
    -- LONG/LAT
    Longitude DECIMAL (20, 10), 
    Latitude DECIMAL (20, 10), 
    -- CUSTOMER CAR
    Car_Year INT (10),
    Car_Make VARCHAR (100),
    Car_Model VARCHAR (100),
    Car_Color VARCHAR (100),
    -- # SPOTS AVAILABLE
    Spots INTEGER (10),
    -- ACTIVE DRIVEWAY
    Active_State BOOLEAN,
    -- RATES
    Hourly DECIMAL (20, 2), 
    Daily DECIMAL (20, 2), 
    Weekly DECIMAL (20, 2), 
    Monthly DECIMAL (20, 2), 
    Overnight DECIMAL (20, 2), 
    -- ACCOUNT BALANCE/SUBSCRIPTION
    Balance DECIMAL (20, 2), 
    Subscription INT (10),
    -- LOCATION DESCRIPTION
    Description VARCHAR (1000),
    Instructions VARCHAR (1000),
    
    -- TIMESTAMP
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ID)
    );

    -- USE PARKP2P;

    insert into users
        (Email, Pass, Name, Phone_Number, Address, City, State, Zipcode, Longitude, Latitude, Car_Year, Car_Make, Car_Model, Car_Color, Spots, Active_State, Hourly, Daily, Weekly, Monthly, Overnight, Balance, Subscription, Description, Instructions)
    values
        ('kavaughn@gmail.com', '123', 'Dominga Pinnock', "2163211234", '1480 Felton Rd', 'South Euclid', 'OH', '44120', '-81.532300', '41.519640', 2000, 'Volkswagen', 'GLI', 'red', 2, true, 7.49, 3.41, 2.41, 8.49, 6.49, 843, 1, "House", "Instructions Stuff"),
        ('fcraddock1@uiuc.edu', 'oRkOoqxBEb', 'Felipa Craddock', "2160938909", '12805 Shaker Blvd', 'Cleveland', 'OH', '44120', '-81.592520', '41.484450', 2001, 'Infiniti', 'EX', 'blue', 3, true, 2.49, 4.49, 8.49, 1.41, 9.49, 834, 2, "Apartment Building", "Instructions Stuff"),
        ('kboam2@blogspot.com', 'c1a3S6XLQ', 'Katee Boam', "4401298474", '2872 Mayfield Rd', 'Cleveland Heights', 'OH', '44118', '-81.576700', '41.512260', 2002, 'Toyota',  'Celica', 'green', 6, true, 10.49, 1.49, 9.49, 1.41, 1.49, 666, 3, "Apartment Building", "Instructions Stuff"),
        ('lbilbey3@ycombinator.com', 'mHnAyY', 'Leonelle Bilbey', "8943093909", '230 W Huron Rd', 'Cleveland', 'OH', '44113', '-81.694020', '41.497170', 2004, 'Chevrolet', 'Corvette', 'purle', 6, false, 8.41, 9.49, 8.49, 3.49, 1.41, 223, 3, "Tower City", "Instructions Stuff")