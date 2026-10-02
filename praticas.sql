create schema RSVLab
create table RSVlab.login
(
	email varchar(50) primary key not null,
	senha varchar(30) not null,
	dtcadastro date not null,
	dtacesso date not null
);
create table RSVLab.dadosUsers
(
	cpf int primary key not null,
	nome varchar(100) not null,
	nascimento date not null,
	celular int not null,
	email varchar(50) not null,
	foreign key(email)
		references RSVLab.login(email)
)
create table RSVLAB.laboratorios
(
	codLab int identity primary key not null,
	nome varchar (100) not null,
	capacidade int not null,
	localizacao varchar(50) not null
)
create table RSVLAB.salas
(
	codsala int identity primary key not null,
	nome varchar (100) not null,
	capacidade int not null,
	localizacao varchar(50) not null,
	codstatus int not null,
	foreign key(codstatus) 
		references RSVLAB.status(codstatus)
)
create table RSVLAB.status
(
	codstatus int identity primary key not null,
	nome varchar (100) not null,
	capacidade int not null,
	localizacao varchar(50) not null
)
create table RSVLAB.reserva
(
	datainicial date not null,
	datafinal date not null,
	horainicial time not null,
	horariofinal time not null,
	cpf int not null,
	foreign key(cpf)
		references RSVLAB.dadosUsers(cpf)
)

