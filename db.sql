CREATE TABLE RegisteredUsers   
(   
   UserName VARCHAR(100) NOT NULL UNIQUE, 
   Pass VARCHAR(100)  NOT NULL , 
   FirstName VARCHAR(100)  NOT NULL ,
   LastName VARCHAR(100)  NOT NULL,
   City VARCHAR(100)  NOT NULL,
   Country VARCHAR(100)  NOT NULL,
   Email VARCHAR(100) NOT NULL,
   Answer1 VARCHAR(100) NOT NULL,
   Answer2 VARCHAR(100) NOT NULL,
   NumOfFavorites INT NOT NULL,

   CONSTRAINT [PK_RegisteredUsers] PRIMARY KEY (UserName), 
   CONSTRAINT userNameLength CHECK (DATALENGTH([UserName]) >= 3 AND DATALENGTH([UserName]) <= 8),
   CONSTRAINT passwordLength CHECK (DATALENGTH([Pass]) >= 3 AND DATALENGTH([Pass]) <= 8)
)   
 



 
 --Insert into HotelMaster(RoomNo,RoomType,Prize) Values('101','Single','50$')
  --Insert into HotelMaster(RoomNo,RoomType,Prize) Values('102','Double','80$')
 
--select * from HotelMaster 
 
   
--IF EXISTS ( SELECT [name] FROM sys.tables WHERE [name] = 'RoomBooking' )   
--DROP TABLE RoomBooking   
GO   
CREATE TABLE Categories  
(   
    CategoryName VARCHAR(100) NOT NULL UNIQUE,

    CONSTRAINT [PK_Catergories] PRIMARY KEY (CategoryName),    
)  

GO
CREATE TABLE CategoriesForUser  
(   
    CategoryName VARCHAR(100) NOT NULL,
    UserName VARCHAR(100) NOT NULL,

    CONSTRAINT [PK_CatergoriesUsers] PRIMARY KEY (CategoryName, UserName),    
    CONSTRAINT fk_userName FOREIGN KEY (UserName) REFERENCES RegisteredUsers (UserName),
    CONSTRAINT fk_category FOREIGN KEY (CategoryName) REFERENCES Categories (CategoryName)    
   
)    

GO
CREATE TABLE POI
(
    POI_name VARCHAR(100) UNIQUE NOT NULL,
    NumOfViews INT NOT NULL,
    POI_description VARCHAR(1000) NOT NULL,
    POI_rank FLOAT,
    NumOfRanks INT NOT NULL,
    Review1 VARCHAR(100),
    Review2 VARCHAR(100),
    PicturePath VARCHAR(100) NOT NULL,
    Category VARCHAR(100) NOT NULL,
    
    CONSTRAINT [PK_poi] PRIMARY KEY (POI_name),    
    FOREIGN KEY (Category) REFERENCES Categories (CategoryName),
    CONSTRAINT RangeLimit CHECK (POI_rank >= 0 AND POI_rank <= 100)
)

GO
CREATE TABLE POIsForUser  
(   
    POI_name VARCHAR(100) NOT NULL,
    UserName VARCHAR(100) NOT NULL,
    CreatedAt DATETIME NOT NULL,

    CONSTRAINT [PK_POIsUsers] PRIMARY KEY (POI_name, UserName),    
    FOREIGN KEY (UserName) REFERENCES RegisteredUsers (UserName),
    FOREIGN KEY (POI_name) REFERENCES POI (POI_name)    
   
)    



   /*
GO   


CREATE TABLE Questions   
(   
    QuestionID VARCHAR(100) NOT NULL UNIQUE,
    QuestionContent VARCHAR(300) NOT NULL,    
    CONSTRAINT [PK_Questions] PRIMARY KEY (QuestionID)   
) 

GO
CREATE TABLE IdentificationQuestions   
(   
    QuestionID VARCHAR(100) NOT NULL UNIQUE,
    UserName VARCHAR(100) NOT NULL UNIQUE,
    Answer VARCHAR(100) NOT NULL,
    CONSTRAINT [PK_IdentificationQuestions] PRIMARY KEY (QuestionID, UserName),    
    FOREIGN KEY (UserName) REFERENCES RegisteredUsers (UserName),
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID)  
)    
*/




