USE nodedb;
CREATE TABLE IF NOT EXISTS Usuarios (
    ID int NOT NULL AUTO_INCREMENT,
    Nome varchar(255) NOT NULL,
    Email varchar(255),
    PRIMARY KEY (ID)
    );

SET character_set_client = utf8;
SET character_set_connection = utf8;
SET character_set_results = utf8;
SET collation_connection = utf8_general_ci;