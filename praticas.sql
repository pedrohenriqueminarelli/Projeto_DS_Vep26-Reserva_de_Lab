create schema RSVLab
create table RSVlab.usuario
(
	email varchar(50) primary key not null,
	senha varchar(30) not null,
	dtcadastro date not null,
	dtacesso date
);
create table RSVLab.dadosUsers
(
	cpf int primary key not null,
	nome varchar(100) not null,
	nascimento date not null,
	celular int,
	email varchar(50) foreign key
)