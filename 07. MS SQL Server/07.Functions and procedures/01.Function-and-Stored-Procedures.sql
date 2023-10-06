USE SoftUni

-- Problem 01
CREATE PROCEDURE usp_GetEmployeesSalaryAbove35000
			  AS
		   BEGIN
				 SELECT FirstName,
						LastName
				   FROM Employees
				  WHERE Salary > 35000
		     END

EXEC dbo.usp_GetEmployeesSalaryAbove35000
		        
-- Problem 02
CREATE PROCEDURE usp_GetEmployeesSalaryAboveNumber @minSalary DECIMAL(18, 4)
			  AS
		   BEGIN
				 SELECT FirstName,
						LastName
				   FROM Employees
				  WHERE Salary >= @minSalary
		     END

EXEC dbo.usp_GetEmployeesSalaryAboveNumber 48100

--Problem 04
CREATE PROCEDURE usp_GetEmployeesFromTown @townName VARCHAR(50)
			  AS
		   BEGIN
				 SELECT e.FirstName,
						e.LastName
				   FROM Employees
				     AS e
				   JOIN Addresses
				     AS a
					 ON e.AddressID = a.AddressID
				   JOIN Towns
				     AS t
					 ON a.TownID = t.TownID
				  WHERE t.Name = @townName
		     END

EXEC dbo.usp_GetEmployeesFromTown 'Sofia'

--Problem 05
CREATE FUNCTION ufn_GetSalaryLevel (@salary DECIMAL(18,4))
RETURNS VARCHAR(8)
AS
BEGIN
	DECLARE @salaryLevel VARCHAR(8)

	IF @salary < 30000
	BEGIN
		SET @salaryLevel = 'Low'
    END
	ELSE IF @salary BETWEEN 30000 AND 50000
	BEGIN
		SET @salaryLevel = 'Average'
	END
	ELSE IF @salary > 50000
	BEGIN	
		SET @salaryLevel = 'High'
	END

	RETURN @salaryLevel
END

--Problem 06
CREATE PROCEDURE usp_EmployeesBySalaryLevel @salaryLevel VARCHAR(8)
			  AS
		   BEGIN
				 SELECT FirstName,
						LastName
				   FROM Employees
				  WHERE dbo.ufn_GetSalaryLevel(Salary) = @salaryLevel
		     END

EXEC dbo.usp_EmployeesBySalaryLevel  'High'

-- Problem 07
CREATE FUNCTION ufn_IsWordComprised(@setOfLetters VARCHAR(50), @word VARCHAR(50))
    RETURNS BIT
			 AS
		  BEGIN 
				DECLARE @wordIndex INT = 1;
				WHILE (@wordIndex <= LEN(@word))
				BEGIN
					  DECLARE @currentCharacter CHAR = SUBSTRING(@word, @wordIndex, 1)

					  IF CHARINDEX(@currentCharacter, @setOfLetters) = 0
					  BEGIN
						RETURN 0;
					  END

					  SET @wordIndex += 1;
				END
				RETURN 1;

		   END

SELECT dbo.ufn_IsWordComprised('oistmiahf', 'Sofia')				