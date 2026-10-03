create schema RSVLab

create table RSVLAB.usuario
(
	idusuario int identity primary key,
	email varchar(100) not null unique,
	senhaHash varchar(255) not null,
	dataCadastro datetime2 not null default sysdatetime(),
	dataAcesso datetime2 null,
	cpf char(11) not null unique,
	nome varchar(100) not null,
	nascimento date not null,
	celular varchar(15) not null
)

create table RSVLAB.acesso
(
	idAcesso int identity primary key,
	datahora datetime2 not null default sysdatetime(),
	idusuario int not null,
	foreign key(idusuario)
		references RSVLAB.usuario(idusuario)
)

create table RSVLAB.status
(
	codstatus int identity primary key not null,
	nome varchar(100) not null
)

insert into RSVLAB.status (nome)
values ('Livre'), ('Ocupado'), ('Bloqueado'), ('Reservado');

create table RSVLAB.recurso
(
	codRecurso int identity primary key,
	tipo varchar(11) not null check(tipo in('laboratorio', 'sala')),
	nome varchar(100) not null,
	capacidade int not null check(capacidade>0),
	localizacao varchar(50) not null
)

create table RSVLAB.reserva
(
	codreserva int identity primary key,
	idusuario int not null,
	codstatus int not null,
	codrecurso int not null,
	dataInicial date not null,
	dataFinal date not null,
	horaInicial time not null,
	horaFinal time not null,
	dtCriacao datetime2 not null default sysdatetime(),
	constraint CK_Reserva_Datas check (dataFinal >= dataInicial),
	constraint CK_Reserva_Horas check (horaFinal > horaInicial),
	foreign key(codrecurso)
		references RSVLAB.recurso(codRecurso),
	foreign key(idusuario)
		references RSVLAB.usuario(idusuario),
	foreign key(codstatus)
		references RSVLAB.status(codstatus)
)


