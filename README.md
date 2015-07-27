# spring-boot-prj1


Create DB


CREATE SCHEMA `training` DEFAULT CHARACTER SET utf8;

create user 'training'@'%' identified by 'dodol123';

grant all privileges on training.* to 'training'@'%';


