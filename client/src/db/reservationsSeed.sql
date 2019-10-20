-- DROP TABLE reservations;
CREATE TABLE reservations
(
    ID INT AUTO_INCREMENT NOT NULL,
    -- unique based on token pull from columns where token === local storage
    Token VARCHAR(100) NOT NULL, 
    MakerId VARCHAR(100) NOT NULL, 
    -- lat of driveway / long of driveway
	Longitude DECIMAL (20, 10), 
    Latitude DECIMAL (20, 10),  
    -- address of driveway 
    -- will combine from address,city,state,zip from owners driveway information
	Address VARCHAR (100),
    City VARCHAR (100),
    State VARCHAR (100),
    Zipcode VARCHAR (10), 
	-- type of stay choice, true/false
    Stay_Type VARCHAR (100),
    -- start time/date to keep track of timer
    Start_Date VARCHAR (150),
    End_Date VARCHAR (150),
    Start_Time VARCHAR (150),
    End_Time VARCHAR (150),
	-- the type of car that will be parked
    -- will combine from make, model, color from owners driveway information
    Car VARCHAR (150),
    -- rate of stay
    Rate DECIMAL (20, 2),
    -- fee pr/
    Fee DECIMAL (20, 2),
    -- final cost with fees
    Cost DECIMAL (20, 2),
    -- active state?
    Active BOOLEAN, 
    -- TIMESTAMP
	starttimer TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ID)
    );

    insert into reservations
        (Token, MakerId, Longitude, Latitude, Address, City, State, Zipcode, Stay_Type, Start_Date, End_Date, Start_Time, End_Time, Car, Rate, Fee, Cost, Active)
    values
       (2, 2, '-81.5323000000', '41.5366400000', '1412382 F432n Rd', 'Cleveland', 'OH', '12354', 'Hourly', '07:14:2054', '07:16:2041', '12:32 P.M.', '6:00 P.M.', 'Honda Civiccc', 1.25, .25, 0, false),
       (1, 3, '-81.5323000000', '41.5766400000', '1483 Fel321on Rd', 'Cleveland', 'OH', '54312', 'Hourly', '07:14:2076', '07:17:2041', '12:31 P.M.', '8:00 P.M.', 'Honda Civicdsds', 1.25, .25, 0, false)