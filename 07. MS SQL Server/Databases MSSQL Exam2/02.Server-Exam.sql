CREATE DATABASE Airport	
USE Airport

--Problem 01
CREATE TABLE Passengers (
	Id INT PRIMARY KEY IDENTITY,
	FullName VARCHAR(100) UNIQUE NOT NULL,
	Email VARCHAR(50) UNIQUE NOT NULL 
)

CREATE TABLE Pilots (
	Id INT PRIMARY KEY IDENTITY,
	FirstName VARCHAR(30) UNIQUE NOT NULL,
	LastName VARCHAR(30) UNIQUE NOT NULL,
	Age TINYINT NOT NULL CHECK(Age >= 21 AND Age <= 62),
	Rating FLOAT NULL CHECK(Rating >= 0.0 AND Rating <= 10.0)
)

CREATE TABLE AircraftTypes (
	Id INT PRIMARY KEY IDENTITY,
	TypeName VARCHAR(30) UNIQUE NOT NULL
)

CREATE TABLE Aircraft (
	Id INT PRIMARY KEY IDENTITY,
	Manufacturer VARCHAR(25) NOT NULL,
	Model VARCHAR(30) NOT NULL,
	[Year] INT NOT NULL,
	FlightHours INT NULL,
	Condition CHAR NOT NULL,
	TypeId INT NOT NULL FOREIGN KEY REFERENCES AircraftTypes(Id) 
)

CREATE TABLE PilotsAircraft (
	AircraftId INT NOT NULL FOREIGN KEY REFERENCES Aircraft(Id),
	PilotId INT NOT NULL FOREIGN KEY REFERENCES Pilots(Id),
	PRIMARY KEY (AircraftId, PilotId)
)

CREATE TABLE Airports (
	Id INT PRIMARY KEY IDENTITY,
	AirportName VARCHAR(70) UNIQUE NOT NULL,
	Country VARCHAR(100) UNIQUE NOT NULL
)

CREATE TABLE FlightDestinations (
	Id INT PRIMARY KEY IDENTITY,
	AirportId INT NOT NULL FOREIGN KEY REFERENCES Airports(Id),
	[Start] DATETIME NOT NULL, 
	AircraftId INT NOT NULL FOREIGN KEY REFERENCES Aircraft(Id),
	PassengerId INT NOT NULL FOREIGN KEY REFERENCES Passengers(Id),
	TicketPrice DECIMAL(18,2) NOT NULL DEFAULT 15
)

-- Problem 02
INSERT INTO Passengers (FullName, Email)
SELECT 
	CONCAT(FirstName, ' ', LastName),
	CONCAT(FirstName, LastName, '@gmail.com')
FROM Pilots WHERE Id >= 5 AND Id <= 15

-- Problem 03
UPDATE Aircraft
SET Condition = 'A'
WHERE (Condition = 'C' OR Condition = 'B')
AND [YEAR] >= 2013
AND (FlightHours IS NULL OR FlightHours <= 100)

-- Problem 04
DELETE FROM Passengers WHERE LEN(FullName) <= 10

--Problem 05
SELECT Manufacturer, Model, FlightHours, Condition
FROM Aircraft
ORDER BY FlightHours DESC

--Problem 06
SELECT p.FirstName, p.LastName, a.Manufacturer, a.Model, a.FlightHours
FROM Pilots AS p
JOIN PilotsAircraft AS pa ON p.Id = pa.PilotId
JOIN Aircraft AS a ON a.Id = pa.AircraftId
WHERE a.FlightHours < 304
ORDER BY a.FlightHours DESC, p.FirstName

--Problem 07
SELECT TOP(20)
fd.Id AS DestinationId, fd.[Start], p.FullName, a.AirportName, fd.TicketPrice
FROM Airports AS a
JOIN FlightDestinations AS fd ON fd.AirportId = a.Id
JOIN Passengers AS p ON p.Id = fd.PassengerId
WHERE DATEPART(DAY, fd.[Start]) % 2 = 0
ORDER BY fd.TicketPrice DESC, a.AirportName

--Problem 08
SELECT a.Id AS AircraftId, 
a.Manufacturer, a.FlightHours, 
COUNT(fd.Id) AS FlightDestinationCount,
ROUND(AVG(fd.TicketPrice), 2) AS AvgPrice
FROM Aircraft AS a
JOIN FlightDestinations AS fd ON a.Id = fd.AircraftId
GROUP BY a.Id, a.Manufacturer, a.FlightHours
HAVING COUNT(fd.Id) >= 2
ORDER BY 4 DESC, 1

--Problem 09
SELECT p.FullName,
COUNT(a.Id) AS CountOfAircraft,
SUM(fd.TicketPrice) AS TotalPayed
FROM Aircraft AS a
JOIN FlightDestinations AS fd ON a.Id = fd.AircraftId
JOIN Passengers AS p ON p.Id = fd.PassengerId
WHERE SUBSTRING(p.FullName, 2, 1) = 'a'
GROUP BY p.Id, p.FullName
HAVING COUNT(a.Id) > 1
ORDER BY p.FullName 

--Problem 10
SELECT a.AirportName, 
fd.[Start], 
fd.TicketPrice, 
p.FullName, 
ac.Manufacturer, 
ac.Model
FROM FlightDestinations AS fd
JOIN Airports AS a ON fd.AirportId = a.Id
JOIN Passengers AS p ON fd.PassengerId = p.Id
JOIN Aircraft AS ac ON fd.AircraftId = ac.Id 
WHERE DATEPART(HOUR, fd.[Start]) >= 6 
AND DATEPART(HOUR, fd.[Start]) <= 20
AND TicketPrice > 2500 
ORDER BY ac.Model

--Problem 11
GO
CREATE FUNCTION udf_FlightDestinationsByEmail (@email VARCHAR(50))
RETURNS INT
AS
BEGIN
	RETURN(SELECT COUNT(*)
	FROM FlightDestinations AS fd
	JOIN Passengers AS p ON fd.PassengerId = p.Id
	WHERE p.Email = @email)
END
Go

SELECT dbo.udf_FlightDestinationsByEmail ('PierretteDunmuir@gmail.com')
SELECT dbo.udf_FlightDestinationsByEmail('Montacute@gmail.com')

--Problem 12
GO

CREATE PROC usp_SearchByAirportName(@airportName VARCHAR(70))
AS
BEGIN
	SELECT a.AirportName,
	p.FullName,
	CASE WHEN fd.TicketPrice <= 400 THEN 'Low'
	WHEN fd.TicketPrice BETWEEN 401 AND 1500 THEN 'Medium'
	ELSE 'High' END AS LevelOfTickerPrice,
	ac.Manufacturer,
	ac.Condition,
	[at].TypeName
	FROM FlightDestinations AS fd
	JOIN Airports AS a ON fd.AirportId = a.Id
	JOIN Passengers AS p ON fd.PassengerId = p.Id
	JOIN Aircraft AS ac ON fd.AircraftId = ac.Id 
	JOIN AircraftTypes AS at ON ac.TypeId = [at].Id
	WHERE a.AirportName = @airportName
	ORDER BY ac.Manufacturer, p.FullName
END

EXEC usp_SearchByAirportName 'Sir Seretse Khama International Airport'

GO