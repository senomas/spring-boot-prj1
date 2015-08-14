# spring-boot-prj1


Create DB


CREATE SCHEMA `training` DEFAULT CHARACTER SET utf8;

create user 'training'@'%' identified by 'dodol123';

grant all privileges on training.* to 'training'@'%';


====
TOOLS

Download atom (text editor) https://atom.io/
  - Install packages
    - atom-react (enable for all javascript in option)
    - jshint (enable support JSX in option)

====
Run

npm install

Run project
mvn clean spring-boot:run -DDB_SERVER=dbserver:3306

Run watchify
npm start


====
For documentation only no need to run

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



