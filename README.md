# spring-boot-prj1


Create DB


CREATE SCHEMA `training` DEFAULT CHARACTER SET utf8;

create user 'training'@'%' identified by 'dodol123';

grant all privileges on training.* to 'training'@'%';


====
TOOLS

npm init

npm install -g npm-check-updates


=====
UI BASIC

npm install --save react react-router envify alt

npm install --save-dev webpack jsx-loader babel-loader babel-core



====
UI CSS

npm install --save-dev style-loader css-loader file-loader url-loader extract-text-webpack-plugin



====
UI BOOTSTRAP

npm install --save jquery bootstrap react-bootstrap


====
UI Fixed Data Table

npm install --save fixed-data-table



