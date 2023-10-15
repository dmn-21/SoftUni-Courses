CREATE DATABASE TouristAgency 
USE TouristAgency

CREATE TABLE Countries (
	Id INT IDENTITY PRIMARY KEY,
	[Name] NVARCHAR(50) NOT NULL
)

CREATE TABLE Destinations (
	Id INT IDENTITY PRIMARY KEY,
	[Name] VARCHAR(50) NOT NULL,
	CountryId INT NOT NULL FOREIGN KEY REFERENCES Countries(Id)
)

CREATE TABLE Rooms (
	Id INT IDENTITY PRIMARY KEY,
	Type VARCHAR(40) NOT NULL,
	Price DECIMAL(18,2) NOT NULL,
	BedCount INT NOT NULL CHECK(BedCount > 0 AND BedCount <= 10),
)

CREATE TABLE Hotels (
	Id INT IDENTITY PRIMARY KEY,
	[Name] VARCHAR(50) NOT NULL,
	DestinationId INT NOT NULL FOREIGN KEY REFERENCES Destinations(Id)
)

CREATE TABLE Tourists (
	Id INT IDENTITY PRIMARY KEY,
	[Name] NVARCHAR(80) NOT NULL,
	PhoneNumber VARCHAR(20) NOT NULL,
	Email VARCHAR(80),
	CountryId INT NOT NULL FOREIGN KEY REFERENCES Countries(Id)
)

CREATE TABLE Bookings (
	Id INT IDENTITY PRIMARY KEY,
	ArrivalDate DATETIME2 NOT NULL, 
	DepartureDate DATETIME2 NOT NULL,
	AdultsCount INT NOT NULL CHECK(AdultsCount >= 1 AND AdultsCount <= 10),
	ChildrenCount INT NOT NULL CHECK(ChildrenCount >= 0 AND ChildrenCount <= 9),
	TouristId INT NOT NULL FOREIGN KEY REFERENCES Tourists(Id),
	HotelId INT NOT NULL FOREIGN KEY REFERENCES Hotels(Id),
	RoomId INT NOT NULL FOREIGN KEY REFERENCES Rooms(Id)
)

CREATE TABLE HotelsRooms (
	HotelId INT NOT NULL FOREIGN KEY REFERENCES Hotels(Id),
	RoomId INT NOT NULL FOREIGN KEY REFERENCES Rooms(Id),
	PRIMARY KEY (HotelId, RoomId)
)

-- Problem 02
INSERT INTO Tourists([Name], PhoneNumber, Email, CountryId) VALUES
('John Rivers', '653-551-1555', 'john.rivers@example.com', 6),
('Adeline Aglaé', '122-654-8726', 'adeline.aglae@example.com', 2),
('Sergio Ramirez', '233-465-2876', 's.ramirez@example.com', 3),
('Johan Müller', '322-876-9826', 'j.muller@example.com', 7),
('Eden Smith', '551-874-2234', 'eden.smith@example.com', 6)

INSERT INTO Bookings(ArrivalDate, DepartureDate, AdultsCount, ChildrenCount, 
TouristId, HotelId, RoomId) VALUES
('2024-03-01', '2024-03-11', 1, 0, 21, 3, 5),
('2023-12-28', '2024-01-06', 2, 1, 22, 13, 3),
('2023-11-15', '2023-11-20', 1, 2, 23, 19, 7),
('2023-12-05', '2023-12-09', 4, 0, 24, 6, 4),
('2024-05-01', '2024-05-07', 6, 0, 25, 14, 6)

-- Problem 03
UPDATE Bookings
SET DepartureDate = DATEADD(day,1,DepartureDate)
WHERE DepartureDate >= '2023-12-01'

UPDATE Tourists SET Email = NULL WHERE [Name] LIKE '%MA%'

-- Problem 04
DELETE FROM Bookings WHERE TouristId IN (6, 16, 25)
DELETE FROM Tourists WHERE [Name] LIKE '%Smith%'

-- Problem 05
SELECT FORMAT(b.ArrivalDate, 'yyyy-MM-dd'), b.AdultsCount, b.ChildrenCount
FROM Bookings AS b
JOIN Rooms AS r ON b.RoomId = r.Id
ORDER BY r.Price DESC, b.ArrivalDate

-- Problem 06
SELECT h.Id, h.[Name]	
FROM Hotels AS h
JOIN Bookings AS b ON b.HotelId = h.Id
JOIN HotelsRooms AS hr ON hr.HotelId = h.Id
JOIN Rooms AS r ON hr.RoomId = r.Id
WHERE r.[Type] = 'VIP Apartment'
GROUP BY h.Id, h.[Name]
ORDER BY COUNT(h.id) DESC

-- Problem 07
SELECT t.Id, t.[Name], t.PhoneNumber
FROM Tourists AS t
LEFT JOIN Bookings AS b ON t.Id = b.TouristId
LEFT JOIN Hotels AS h ON h.Id = b.HotelId
WHERE h.Id IS NULL
ORDER BY t.[Name]

-- Problem 08
SELECT TOP(10) h.[Name] AS HotelName, d.[Name] AS DestinationName, c.[Name] AS CountryName
FROM Bookings AS b
JOIN Hotels AS h ON b.HotelId = h.Id
JOIN Destinations AS d ON h.DestinationId = d.Id
JOIN Countries AS c ON d.CountryId = c.Id
WHERE DATEDIFF(YEAR, b.ArrivalDate, '2023-12-31') < 2024
AND h.Id % 2 <> 0
ORDER BY c.[Name], b.ArrivalDate 

-- Problem 09
SELECT h.[Name] AS HotelName, r.Price AS RoomPrice
FROM Tourists AS t
JOIN Bookings AS b ON t.Id = b.TouristId
JOIN Hotels AS h ON b.HotelId = h.Id
JOIN Rooms AS r ON r.Id = b.RoomId
WHERE NOT t.[Name] LIKE '%EZ'
ORDER BY r.Price DESC

-- Problem 10
SELECT h.[Name] AS HotelName,
SUM(DATEDIFF(DAY, b.ArrivalDate, b.DepartureDate) * r.Price) AS HotelRevenue
FROM Tourists AS t
JOIN Bookings AS b ON t.Id = b.TouristId
JOIN Hotels AS h ON b.HotelId = h.Id
JOIN Rooms AS r ON r.Id = b.RoomId
GROUP BY h.[Name]
ORDER BY HotelRevenue DESC

-- Problem 11
GO
CREATE FUNCTION udf_RoomsWithTourists(@name VARCHAR(40))
RETURNS INT
AS
BEGIN
	RETURN (SELECT SUM(b.AdultsCount + b.ChildrenCount)
	FROM Tourists AS t
	JOIN Bookings AS b ON b.TouristId = t.Id
	JOIN Rooms AS r ON b.RoomId = r.Id
	WHERE r.[Type] = @name)
END
	SELECT dbo.udf_RoomsWithTourists('Double Room')
Go
	
-- Problem 12
GO

CREATE PROC usp_SearchByCountry(@country NVARCHAR(50))
AS
BEGIN
	SELECT t.[Name], t.PhoneNumber, t.Email, COUNT(*) AS CountOfBooking
	FROM Tourists AS t
	JOIN Bookings AS b ON t.Id = b.TouristId
	JOIN Countries AS c ON c.Id = t.CountryId
	WHERE C.[Name] = @country
	GROUP BY t.[Name], t.PhoneNumber, t.Email
END

GO