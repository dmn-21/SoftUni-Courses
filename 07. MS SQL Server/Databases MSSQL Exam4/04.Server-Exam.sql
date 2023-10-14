CREATE DATABASE Accounting 
USE Accounting 

--Problem 01
CREATE TABLE Countries (
	Id INT PRIMARY KEY IDENTITY,
	[Name] VARCHAR(10) NOT NULL
)

CREATE TABLE Addresses (
	Id INT PRIMARY KEY IDENTITY,
	StreetName NVARCHAR(20) NOT NULL,
	StreetNumber INT,
	PostCode INT NOT NULL,
	City VARCHAR(25) NOT NULL,
	CountryId INT NOT NULL FOREIGN KEY REFERENCES Countries(Id)
)

CREATE TABLE Vendors (
	Id INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(25) NOT NULL,
	NumberVAT NVARCHAR(15) NOT NULL,
	AddressId INT NOT NULL FOREIGN KEY REFERENCES Addresses(Id)
)

CREATE TABLE Clients (
	Id INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(25) NOT NULL,
	NumberVAT NVARCHAR(15) NOT NULL,
	AddressId INT NOT NULL FOREIGN KEY REFERENCES Addresses(Id)
)

CREATE TABLE Categories (
	Id INT PRIMARY KEY IDENTITY,
	[Name] VARCHAR(10) NOT NULL
)

CREATE TABLE Products (
	Id INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(35) NOT NULL,
	Price DECIMAL(18,2) NOT NULL,
	CategoryId INT NOT NULL FOREIGN KEY REFERENCES Categories(Id),
	VendorId INT NOT NULL FOREIGN KEY REFERENCES Vendors(Id)
)

CREATE TABLE Invoices (
	Id INT PRIMARY KEY IDENTITY,
	Number INT UNIQUE NOT NULL,
	IssueDate DATETIME2 NOT NULL,
	DueDate DATETIME2 NOT NULL,
	Amount DECIMAL(18,2) NOT NULL,
	Currency VARCHAR(5) NOT NULL,
	ClientId INT NOT NULL FOREIGN KEY REFERENCES Clients(Id)
)

CREATE TABLE ProductsClients (
	ProductId INT NOT NULL FOREIGN KEY REFERENCES Products(Id),
	ClientId INT NOT NULL FOREIGN KEY REFERENCES Clients(Id),
	PRIMARY KEY (ProductId, ClientId)
)

--Problem 02
INSERT INTO Products([Name], Price, CategoryId, VendorId) VALUES
('SCANIA Oil Filter XD01', 78.69, 1, 1),
('MAN Air Filter XD01', 97.38, 1, 5),
('DAF Light Bulb 05FG87', 55.00, 2, 13),
('ADR Shoes 47-47.5', 49.85, 3, 5),
('Anti-slip pads S', 5.87, 5, 7)

INSERT INTO Invoices(Number, IssueDate, DueDate, Amount, Currency, ClientId)
VALUES
(1219992181, '2023-03-01', '2023-04-30', 180.96, 'BGN', 3),
(1729252340, '2022-11-06', '2023-01-04', 158.18, 'EUR', 13),
(1950101013, '2023-02-17', '2023-04-18', 615.15, 'USD', 19)

--Problem 03
UPDATE Invoices
SET DueDate = '2023-04-01'
WHERE IssueDate BETWEEN '2022-11-01' AND '2022-11-30'

UPDATE Clients SET AddressId = 3 WHERE [Name] LIKE '%CO%'

--Problem 04
DELETE FROM Invoices WHERE ClientId = 11
DELETE FROM ProductsClients WHERE ClientId = 11
DELETE FROM Clients WHERE LEFT(NumberVAT, 2) = 'IT'

--Problem 05
SELECT Number, Currency 
FROM Invoices
ORDER BY Amount DESC, DueDate

--Problem 06
SELECT p.Id, p.[Name], p.Price, c.[Name] AS CategoryName
FROM Products AS p
JOIN Categories AS c ON p.CategoryId = c.Id
WHERE c.[Name] = 'ADR' OR c.[Name] = 'Others'
ORDER BY Price DESC

--Problem 07
SELECT c.Id, c.[Name] AS Client, 
CONCAT(a.StreetName, ' ', a.StreetNumber, ', ', a.City, ', ', a.PostCode, ', ', cs.[Name])
AS [Address]
FROM Clients AS c
LEFT JOIN ProductsClients AS pc ON pc.ClientId = c.Id
JOIN Addresses AS a ON c.AddressId = a.Id
JOIN Countries AS cs ON a.CountryId = cs.Id
WHERE pc.ProductId IS NULL
ORDER BY c.[Name]

--Problem 08
SELECT TOP(7) i.Number, i.Amount, c.[Name] AS Client
FROM Invoices AS i
JOIN Clients AS c ON i.ClientId = c.Id
WHERE IssueDate < '2023-01-01' AND Currency = 'EUR' OR Amount > 500.00 
AND LEFT(c.NumberVAT, 2) = 'DE'
ORDER BY i.Number, i.Amount DESC

--Problem 09
SELECT c.[Name] AS Client, 
MAX(p.Price) AS Price, 
c.NumberVAT AS [VAT Number]
FROM Clients AS c
JOIN ProductsClients AS pc ON pc.ClientId = c.Id
JOIN Products AS p ON pc.ProductId = p.Id
WHERE RIGHT(c.[Name], 2) <> 'KG'
GROUP BY c.[Name], c.NumberVAT
ORDER BY MAX(p.Price) DESC

--Problem 10
SELECT c.[Name] AS Client, 
Floor(Avg(p.Price)) AS [Average Price]
FROM Clients AS c
JOIN ProductsClients AS pc ON pc.ClientId = c.Id
JOIN Products AS p ON pc.ProductId = p.Id
JOIN Vendors AS v ON p.VendorId = v.Id
WHERE v.NumberVAT LIKE '%FR%'
GROUP BY c.[Name]
ORDER BY Avg(p.Price), c.[Name] DESC

--Problem 11
GO
CREATE FUNCTION udf_ProductWithClients(@name NVARCHAR(35))
RETURNS INT
AS
BEGIN
	RETURN(SELECT COUNT(*)
	FROM Products AS p
	JOIN ProductsClients AS pc ON pc.ProductId = p.Id 
	JOIN Clients AS c ON pc.ClientId = c.Id
	WHERE p.[Name] = @name)
END

SELECT dbo.udf_ProductWithClients('DAF FILTER HU12103X')
Go

--Problem 12
GO

CREATE PROC usp_SearchByCountry(@country VARCHAR(10))
AS
BEGIN
	SELECT v.[Name] AS Vendor, v.NumberVAT AS VAT, 
	CONCAT(a.StreetName, ' ', a.StreetNumber) AS [Street Info],
	CONCAT(a.City, ' ',a.PostCode) AS [City Info]
	FROM Vendors AS v
	JOIN Addresses AS a ON v.AddressId = a.Id
	JOIN Countries AS c ON a.CountryId = c.Id
	WHERE c.[Name] = @country
	ORDER BY v.[Name], a.City
END

EXEC usp_SearchByCountry 'France'

GO