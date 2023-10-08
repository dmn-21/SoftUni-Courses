CREATE DATABASE Zoo
USE Zoo

-- Problem 01
CREATE TABLE Owners (
	Id INT IDENTITY PRIMARY KEY,
	[Name] VARCHAR(50) NOT NULL,
	PhoneNumber VARCHAR(15) NOT NULL,
	[Address] VARCHAR(50) 
)

CREATE TABLE AnimalTypes (
	Id INT IDENTITY PRIMARY KEY,
	AnimalType VARCHAR(30) NOT NULL,
)

CREATE TABLE Cages (
	Id INT IDENTITY PRIMARY KEY,
	AnimalTypeId INT NOT NULL FOREIGN KEY REFERENCES AnimalTypes(Id) 
)

CREATE TABLE Animals (
	Id INT IDENTITY PRIMARY KEY,
	[Name] VARCHAR(30) NOT NULL,
	BirthDate DATE NOT NULL,
	OwnerId INT FOREIGN KEY REFERENCES Owners(Id),
	AnimalTypeId INT NOT NULL FOREIGN KEY REFERENCES AnimalTypes(Id)
)

CREATE TABLE AnimalsCages (
	CageId INT NOT NULL FOREIGN KEY REFERENCES Cages(Id),
	AnimalId INT NOT NULL FOREIGN KEY REFERENCES Animals(Id),
	PRIMARY KEY (CageId, AnimalId)
)

CREATE TABLE VolunteersDepartments (
	Id INT IDENTITY PRIMARY KEY,
	DepartmentName VARCHAR(30) NOT NULL,
)

CREATE TABLE Volunteers (
	Id INT IDENTITY PRIMARY KEY,
	[Name] VARCHAR(50) NOT NULL,
	PhoneNumber VARCHAR(15) NOT NULL,
	[Address] VARCHAR(50),
	AnimalId INT FOREIGN KEY REFERENCES Animals(Id),
	DepartmentId INT NOT NULL FOREIGN KEY REFERENCES VolunteersDepartments(Id)
)

-- Problem 02
INSERT INTO Volunteers([Name], PhoneNumber, [Address], AnimalId, DepartmentId) VALUES
('Anita Kostova', '0896365412', 'Sofia, 5 Rosa str.', 15, 1),
('Dimitur Stoev', '0877564223', NULL, 42, 4),
('Kalina Evtimova', '0896321112', 'Silistra, 21 Breza str.', 9, 7),
('Stoyan Tomov', '0898564100', 'Montana, 1 Bor str.', 18, 8),
('Boryana Mileva', '0888112233', NULL, 31, 5)

INSERT INTO Animals([Name], BirthDate, OwnerId, AnimalTypeId) VALUES
('Giraffe', '2018-09-21', 21, 1),
('Harpy Eagle', '2015-04-17', 15, 3),
('Hamadryas Baboon', '2017-11-02', NULL, 1),
('Tuatara', '2021-06-30', 2, 4)

-- Problem 03
SELECT * FROM Animals
UPDATE Animals
SET OwnerId = 4
WHERE OwnerId IS NULL

-- Problem 04
DELETE FROM Volunteers
WHERE DepartmentId = 2

SELECT * FROM VolunteersDepartments
DELETE FROM VolunteersDepartments
WHERE Id = 2

-- Problem 05
SELECT [Name], PhoneNumber, [Address], AnimalId, DepartmentId
FROM Volunteers
ORDER BY [Name], AnimalId, DepartmentId

-- Problem 06
SELECT [Name], AnimalType, FORMAT(BirthDate, 'dd.MM.yyyy') AS BirthDate
FROM Animals AS a
JOIN AnimalTypes AS at
ON a.AnimalTypeId = at.Id
ORDER BY [Name]

-- Problem 07
SELECT TOP(5) o.[Name] AS [Owner], COUNT(*) AS CountOfAnimals 
FROM Animals AS a
JOIN Owners AS o
ON a.OwnerId = o.Id
GROUP BY o.[Name]
ORDER BY CountOfAnimals DESC, o.[Name]

-- Problem 08
SELECT CONCAT(o.[Name], '-', a.[Name]) AS OwnersAnimals, o.PhoneNumber, c.Id AS CageId
FROM Owners AS o 
JOIN Animals AS a ON o.Id = a.OwnerId
JOIN AnimalTypes AS at ON at.Id = a.AnimalTypeId
JOIN AnimalsCages AS ac ON ac.AnimalId = a.Id
JOIN Cages AS c ON c.Id = ac.CageId
WHERE at.AnimalType = 'Mammals'
ORDER BY o.[Name], a.[Name] DESC

-- Problem 09
SELECT v.[Name], v.PhoneNumber, v.[Address],
SUBSTRING([Address], CHARINDEX(',', [Address]) + 2, LEN(v.[Address])) AS [Address]
FROM Volunteers AS v
WHERE v.DepartmentId = 2 AND v.[Address] LIKE '%Sofia%'
ORDER BY  v.[Name]

-- Problem 10
SELECT a.[Name], YEAR(a.BirthDate) AS BirthYear, at.AnimalType
FROM Animals AS a
JOIN AnimalTypes at ON a.AnimalTypeId = at.Id
WHERE a.OwnerId IS NULL
AND at.AnimalType <> 'Birds'
AND DATEDIFF(YEAR, a.BirthDate, '01/01/2022') < 5
ORDER BY a.[Name]

-- Problem 11
GO
CREATE FUNCTION udf_GetVolunteersCountFromADepartment (@VolunteersDepartment VARCHAR(30))
RETURNS INT
AS
BEGIN
	RETURN(SELECT COUNT(*)
	FROM Volunteers AS v
	JOIN VolunteersDepartments AS vd ON v.DepartmentId = vd.Id
	WHERE vd.DepartmentName = @VolunteersDepartment)
END
Go

SELECT dbo.udf_GetVolunteersCountFromADepartment ('Education program assistant')

-- Problem 12
GO

CREATE PROC usp_AnimalsWithOwnersOrNot(@AnimalName VARCHAR(30))
AS
BEGIN
	SELECT a.[Name], 
	ISNULL(o.[Name], 'For adoption') 
	AS OwnersName
	FROM Animals AS a
	LEFT JOIN Owners AS o ON a.OwnerId = o.Id
	WHERE a.[Name] = @AnimalName
END

EXEC usp_AnimalsWithOwnersOrNot 'Pumpkinseed Sunfish'

GO