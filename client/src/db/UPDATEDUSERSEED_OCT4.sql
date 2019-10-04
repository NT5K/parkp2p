    USE parkp2p;
    -- DROP TABLE users;
    CREATE TABLE users
    (
        ID INT AUTO_INCREMENT NOT NULL,
    -- LOGIN
    Email VARCHAR (80) UNIQUE NOT NULL,
    Pass CHAR (60) NOT NULL,
    -- USER INFO
    First_Name VARCHAR (100),
    Last_Name VARCHAR (100),
    Phone_Number VARCHAR (15),
    -- ADDRESS
    Address VARCHAR (100),
    City VARCHAR (100),
    State VARCHAR (100),
    Zip INTEGER (10), 
    -- LONG/LAT
    Longitude DECIMAL (20, 10), 
    Latitude DECIMAL (20, 10), 
    -- CUSTOMER CAR
    Car_Make VARCHAR (100),
    Car_Model VARCHAR (100),
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
    -- ACCOUNT BALANCE
    Balance DECIMAL (20, 2), 
    -- LOCATION DESCRIPTION
    Description VARCHAR (500),
    -- TIMESTAMP
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ID)
    );

        USE PARKP2P;

        insert into users
            (Email, Pass, First_Name, Last_Name, Phone_Number, Address, City, State, Zip, Longitude, Latitude, Car_Make, Car_Model, Spots, Active_State, Hourly, Daily, Weekly, Monthly, Overnight, Balance, Description)
        values
            ('dpinnock0@apache.org', 'Po8wqpqF', 'Dominga', 'Pinnock', 2163211234, '1480 Felton Rd', 'South Euclid', 'OH', 44120, '-81.532300', '41.519640', 'Volkswagen', 'GLI', 2, true, 7.49, 3.41, 2.41, 8.49, 6.49, 843, "House"),
            ('fcraddock1@uiuc.edu', 'oRkOoqxBEb', 'Felipa', 'Craddock', 2160938909, '12805 Shaker Blvd', 'Cleveland', 'OH', 44120, '-81.592520', '41.484450', 'Infiniti', 'EX', 3, true, 2.49, 4.49, 8.49, 1.41, 9.49, 834, "Apartment Building"),
            ('kboam2@blogspot.com', 'c1a3S6XLQ', 'Katee', 'Boam', 4401298474, '2872 Mayfield Rd', 'Cleveland Heights', 'OH', 44118, '-81.576700', '41.512260', 'Toyota', 'Celica', 6, true, 10.49, 1.49, 9.49, 1.41, 1.49, 666, "Apartment Building"),
            ('lbilbey3@ycombinator.com', 'mHnAyY', 'Leonelle', 'Bilbey', 89430938909, '230 W Huron Rd', 'Cleveland', 'OH', 44113, '-81.694020', '41.497170', 'Chevrolet', 'Corvette', 6, false, 8.41, 9.49, 8.49, 3.49, 1.41, 223, "Tower City"),
            ('bleadston4@independent.co.uk', '8vrtqQvHo0Zr', 'Blakeley', 'Leadston', 1234323454, '1501 Euclid Ave', 'Cleveland', 'OH', 44115, '-82.3932', '34.8001', 'Lincoln', 'Mark LT', 1, true, 6.49, 5.41, 7.49, 7.49, 8.49, 917, "Playhouse Square");