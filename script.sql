USE test;

create table users(
    id int(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(100),
    fathers_lastname varchar(100),
    mothers_lastname varchar(100),
    age varchar(3),
    email varchar(100),
    phone varchar(15),
    state varchar(100),
    town varchar(100),
    code_postal varchar(5),
    suburb varchar(100),
    street varchar(100),
    no_street varchar(100)
);

DESCRIBE users;