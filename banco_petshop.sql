create database pet;
use pet;

CREATE TABLE users(
	id int auto_increment primary key,
    name varchar(255) not null,
   	email varchar(255) not null unique,
	password varchar(255) not null
);

create table images(
	id int auto_increment primary key,
    filename varchar(255) not null,
    filepath varchar(255) not null,
    uploaded_at timestamp default current_timestamp
);

create table pet(
	id int auto_increment primary key,
    servico varchar(255) not null,
	nome varchar(255) not null,
    raca varchar(255) not null,
    data date not null,
    horario time not null unique,
    observacoes varchar(255)
);


describe users;
select * from users;
SELECT * FROM users ORDER BY id;
DELETE FROM users WHERE id = 3;

select * from images;
select * from pet;


drop table images;
drop table users;
drop table pet;
