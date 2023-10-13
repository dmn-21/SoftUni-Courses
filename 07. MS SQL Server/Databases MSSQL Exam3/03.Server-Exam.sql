CREATE DATABASE Boardgames
USE Boardgames

--Problem 01
CREATE TABLE Categories (
	Id INT PRIMARY KEY IDENTITY,
	[Name] VARCHAR(50) NOT NULL
)

CREATE TABLE Addresses (
	Id INT PRIMARY KEY IDENTITY,
	StreetName NVARCHAR(100) NOT NULL,
	StreetNumber INT NOT NULL,
	Town VARCHAR(30) NOT NULL,
	Country VARCHAR(50) NOT NULL,
	ZIP INT NOT NULL
)

CREATE TABLE Publishers (
	Id INT PRIMARY KEY IDENTITY,
	[Name] VARCHAR(30) UNIQUE NOT NULL,
	AddressId INT NOT NULL FOREIGN KEY REFERENCES Addresses(Id),
	Website NVARCHAR(40),
	Phone NVARCHAR(20)
)

CREATE TABLE PlayersRanges (
	Id INT PRIMARY KEY IDENTITY,
	PlayersMin INT NOT NULL,
	PlayersMax INT NOT NULL
)

CREATE TABLE Boardgames (
	Id INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(30) NOT NULL,
	YearPublished INT NOT NULL,
	Rating DECIMAL(10,2) NOT NULL,
	CategoryId INT NOT NULL FOREIGN KEY REFERENCES Categories(Id),
	PublisherId INT NOT NULL FOREIGN KEY REFERENCES Publishers(Id),
	PlayersRangeId INT NOT NULL FOREIGN KEY REFERENCES PlayersRanges(Id)
)

CREATE TABLE Creators (
	Id INT PRIMARY KEY IDENTITY,
	FirstName NVARCHAR(30) UNIQUE NOT NULL,
	LastName NVARCHAR(30) UNIQUE NOT NULL,
	Email NVARCHAR(30) UNIQUE NOT NULL
)

CREATE TABLE CreatorsBoardgames (
	CreatorId INT NOT NULL FOREIGN KEY REFERENCES Creators(Id),
	BoardgameId INT NOT NULL FOREIGN KEY REFERENCES Boardgames(Id),
	PRIMARY KEY (CreatorId, BoardgameId)
)

--Problem 02
INSERT INTO Boardgames([Name], YearPublished, Rating, CategoryId,
PublisherId, PlayersRangeId) VALUES
('Deep Blue', '2019', 5.67, 1, 15, 7),
('Paris', '2016', 9.78, 7, 1, 5),
('Catan: Starfarers', '2021', 9.87, 7, 13, 6),
('Bleeding Kansas', '2020', 3.25, 3, 7, 4),
('One Small Step', '2019', 5.75, 5, 9, 2)

INSERT INTO Publishers([Name], AddressId, Website, Phone) VALUES
('Agman Games', 5, 'www.agmangames.com', '+16546135542'),
('Amethyst Games', 7, 'www.amethystgames.com', '+15558889992'),
('BattleBooks', 13, 'www.battlebooks.com', '+12345678907')

-- Problem 03
UPDATE PlayersRanges 
SET PlayersMax += 1
WHERE (PlayersMin = 2 AND PlayersMax = 2)

UPDATE Boardgames
SET [Name] = [Name] + 'V2'
WHERE YearPublished >= 2020

-- Problem 04
DELETE FROM CreatorsBoardgames WHERE BoardgameId IN (1, 16, 31, 47)
DELETE FROM Boardgames WHERE PublisherId IN (1, 16)
DELETE FROM Publishers WHERE AddressId = 5
DELETE FROM Addresses WHERE LEFT(Town, 1) = 'L'

-- Problem 05
SELECT [Name], Rating
FROM Boardgames
ORDER BY YearPublished, [Name] DESC

-- Problem 06
SELECT b.Id, b.[Name], b.YearPublished, c.[Name] AS CategoryName
FROM Boardgames AS b
JOIN Categories AS c ON b.CategoryId  = c.Id
WHERE (c.[Name] = 'Strategy Games' OR c.[Name] = 'Wargames') 
ORDER BY b.YearPublished DESC

-- Problem 07
SELECT c.Id, CONCAT(c.[FirstName], ' ', c.[LastName]) AS CreatorName, c.Email
FROM Creators AS c
LEFT JOIN CreatorsBoardgames AS cb ON cb.CreatorId = c.Id
WHERE cb.BoardgameId IS NULL
ORDER BY CreatorName

-- Problem 08
SELECT TOP(5) b.[Name], b.Rating, c.[Name] AS CategoryName
FROM Boardgames AS b
JOIN PlayersRanges AS pr ON b.PlayersRangeId = pr.Id
JOIN Categories AS C ON b.CategoryId = c.Id
WHERE (b.Rating > 7.00 AND b.[Name] LIKE '%a%') 
   OR (b.Rating > 7.50 AND pr.PlayersMin >= 2 AND pr.PlayersMax <= 5)
ORDER BY b.[Name], b.Rating DESC

-- Problem 09
SELECT CONCAT(c.[FirstName], ' ', c.[LastName]) AS FullName,
Email, MAX(b.Rating)
FROM Creators AS c
JOIN CreatorsBoardgames AS cb ON cb.CreatorId = c.Id
JOIN Boardgames AS b ON cb.BoardgameId = b.Id
WHERE RIGHT(Email, 3) = 'com'
GROUP BY c.FirstName, c.LastName, c.Email 
ORDER BY FullName

-- Problem 10
SELECT c.LastName, CEILING(AVG(b.Rating)) AS AverageRating,
p.[Name] AS PublisherName
FROM Creators AS c
JOIN CreatorsBoardgames AS cb ON cb.CreatorId = c.Id
JOIN Boardgames AS b ON cb.BoardgameId = b.Id
JOIN Publishers AS p ON b.PublisherId = p.Id
WHERE p.[Name] = 'Stonemaier Games'
GROUP BY c.LastName, p.[Name]
ORDER BY AVG(b.Rating) DESC

-- Problem 11
GO
CREATE FUNCTION udf_CreatorWithBoardgames(@name NVARCHAR(30))
RETURNS INT
AS
BEGIN
	RETURN(SELECT COUNT(*)
	FROM Creators AS c
	JOIN CreatorsBoardgames AS cb ON cb.CreatorId = c.Id
	JOIN Boardgames AS b ON cb.BoardgameId = b.Id
	WHERE c.FirstName = @name)
END

Go
SELECT dbo.udf_CreatorWithBoardgames('Bruno')

-- Problem 12
GO

CREATE PROC usp_SearchByCategory(@category VARCHAR(50))
AS
BEGIN
	SELECT b.[Name], b.YearPublished, b.Rating, c.[Name] AS CategoryName,
	p.[Name] AS PublisherName, CONCAT(pr.PlayersMin, ' ' ,'people') AS MinPlayers,
	CONCAT(pr.PlayersMax, ' ' ,'people') AS MaxPlayers
	FROM Boardgames AS b
	JOIN Categories AS c ON b.CategoryId = c.Id
	JOIN Publishers AS p ON B.PublisherId = p.Id
	JOIN PlayersRanges AS pr ON b.PlayersRangeId = pr.Id
	WHERE c.[Name] = @category
	ORDER BY p.[Name], b.YearPublished DESC
END

EXEC usp_SearchByCategory 'Wargames'

GO