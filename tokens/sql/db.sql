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
   CONSTRAINT passwordLength CHECK (DATALENGTH([Pass]) >= 5 AND DATALENGTH([Pass]) <= 10)
)   
 
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
    DateReview1 DATE,
    DateReview2 DATE,
    PicturePath VARCHAR(100) NOT NULL,
    Category VARCHAR(100) NOT NULL,
    Latitude FLOAT,
    Longitude FLOAT,
    
    CONSTRAINT [PK_poi] PRIMARY KEY (POI_name),    
    FOREIGN KEY (Category) REFERENCES Categories (CategoryName),
    CONSTRAINT RangeLimit CHECK (POI_rank >= 0 AND POI_rank <= 100)
)

GO
CREATE TABLE POIsForUser  
(   
    POI_name VARCHAR(100) NOT NULL,
    UserName VARCHAR(100) NOT NULL,
    Position INT,

    CONSTRAINT [PK_POIsUsers] PRIMARY KEY (POI_name, UserName),    
    FOREIGN KEY (UserName) REFERENCES RegisteredUsers (UserName),
    FOREIGN KEY (POI_name) REFERENCES POI (POI_name)    
   
)    


