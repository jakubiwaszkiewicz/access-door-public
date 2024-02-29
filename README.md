# Mobile applications project "Access to Door"

Table of Content

Mobile applications project "Access to Door"

- [1. Informations about passing the course](#1-informations-about-passing-the-course)
  - [1.1 Important things](#11-important-things)
  - [1.2 Steps](#12-steps)
  - [1.3 Timeline](#13-timeline)
- [2. Ideas or Inspirations](#2-ideas-or-inspirations)
- [3. Tools](#3-tools)
  - [3.1 Enviroment](#31-enviroment)
  - [3.2 Front-end](#32-front-end)
  - [3.3 Back-end](#33-back-end)
  - [3.4 Database](#34-database)
  - [3.5 Documentation](#35-documentation)
  - [3.6 ORM](#36-orm)
- [4. True Documentation](#4-true-documentation)
  - [4.1 Overleaf](#41-overleaf)
  - [4.2 ERD](#42-erd)
  - [4.3 CRUD Description](#43-crud-description)
  - [4.4 Description-pl](#44-description-pl)
- [5. Questions to our course leader](#5-questions-to-our-course-leader)
- [6. Edu. Materials for collaborators](#6-edu-materials-for-collaborators)

Documentation for our database project for Database course on our University, title of our project is **Door Access**.

## 1. Informations about passing the course

Our problem is called "Access to Door"

### 1.1 Important things

### 1.2 Steps

1. **Submission of the project topic**
   Topic; Description of problem 1; DBMS used and tools.

2. **Project Funcionalities**
   Funcionalities of project like endpoints, CRUD operations, REST-Api ideas.

3. **Database Scheme**
   ERD Diagram, REST-Api funcionalities

4. **Designing data operations**
   Define commands in SQL for the implementation of typical operations (insertion, deletion, modification, selection/presentation); The result will be a script in SQL containing a set of sample commands for editing and handling data (forms - insertion of data, reports - presentation of data, control panel) In the future, these queries could be used directly in the graphical interface.

5. **Presentation of Project - the last activity**
   Ready to use project

### 1.3 Timeline

1. **Submission of the project topic** -> till 17.10.2023 18:55
2. **Project Funcionalities** -> 31.10.2023 18:55
3. **Database implementation** -> 28.11.2023 21:55
4. **Presentation of Project - the last activity** -> 9.01.2024 18:55

## 2. Ideas or Inspirations

Listed project which help us to connect our stack (front-end, back-end, db)

- <a href="https://blog.logrocket.com/getting-started-with-postgres-in-your-react-app/">React app with PostgresSQL as Database</a>
- [Express.js app with MySQL](https://blog.logrocket.com/build-rest-api-node-express-mysql/)
  <br/>
- [Auth app with Express.js and React](https://www.bezkoder.com/react-express-authentication-jwt/)

## 3. Tools

### 3.1 Enviroment

While doing this project this software is crucial (c) or optional.

- [Node.js](https://nodejs.org/en) (c)
- [Git](https://git-scm.com/download/win) (c)
- Github (c!!!) + [freecodecamp tutorial](https://www.youtube.com/watch?v=RGOj5yH7evk) (c!!!)
- [Create React App](https://create-react-app.dev/docs/getting-started/)
- Database local enviroment (still not choosen)
- [VSCode](https://code.visualstudio.com/) (c)
  - Auto Commit Message (faster commits)
  - GitHub Copilot (AI which help with code)
  - Github Theme (same colors)
  - Material Icon Theme (same icons)
  - npm Intellisense (c)
  - Git Extansion Pack (c)

Credentials for AWS MySQL Database:
<br />
endpoint:`mappsdbv3.cyw1dvcizo18.eu-north-1.rds.amazonaws.com`
<br />
login: `admin`
<br />
password: `GY4D5Gxmrp5RDe`
<br />

.env file for MySQL for express.js:
<br/>
`DB_HOST = mappsdbv3.cyw1dvcizo18.eu-north-1.rds.amazonaws.com`
<br/>
`DB_USER = mapps_pwr`
<br/>
`DB_PASSWORD = GY4D5Gxmrp5RDe`
<br/>
`DB_DATABASE = Mapps`
<br/>
`DB_PORT = 3306`

### 3.2 Front-end

Easiest way of creating clean interface of our app.

- [React.js](https://react.dev/), [Tutorial](https://www.youtube.com/watch?v=bMknfKXIFA8)

### 3.3 Back-end

Back-end will be crucial to make REST API calls from database and pass it to the application which will be able to display the information included in the DB.

- [Node.js](https://nodejs.org/en) + [Express.js](https://expressjs.com/), [codefreecamp tutorial](https://www.youtube.com/watch?v=Oe421EPjeBE)

### 3.4 Database

We have to take a SQL database (source: eportal) we've got some options to choose from I found some and listed below to choose from:

- [PostgresSQL](https://www.postgresql.org.pl/) (used before - dont have to add it to server [easier debugging localy]) + [codefreecamp tutorial](https://www.youtube.com/watch?v=qw--VYLpxG4&t=3463s)

### 3.5 Documentation

Tools to help us to create ERD diagrams, app diagram, write docs.
**ToDO: create a overleaf document with table of content provided by tutor (marcinek)**

- How to [ERD](https://www.youtube.com/watch?v=QpdhBUYk7Kk) [must to watch]

### 3.6 ORM

Prisma

## 4. True Documentation

### 4.1 Overleaf

- [Overleaf document](https://www.overleaf.com/1639154345ynzffcjvpqfk)

### 4.2 ERD

- [Lucid Chart](https://lucid.app/lucidchart/09e2cbbe-3f0f-42bf-b48c-9a9dd4b38f76/edit?viewport_loc=-323%2C32%2C3072%2C1527%2C0_0&invitationId=inv_c41baf48-489e-48c7-b14c-401bc9cb395b)
- [PostgresSQL Data Types](https://www.geeksforgeeks.org/postgresql-data-types/)

### 4.3 CRUD Description

Application "Access to Door" is for company to grant access to door for Labourers who is working currently in this company, administrator can do everything and labourers can send notification for privilige for door.

<pre>
ADMINISTRATOR:
create DOORs
create LABOURERs
read DOORs
read LABOURERs
read CHANGE-PREMISSION
read NOTIFICATION
UPDATE DOOR
UPDATE LABOURERs
delete DOORs
delete LABOURERS

LABOURER:
create NOTIFICATIONs
read DOOR
delete NOTIFICATIONs
</pre>

<pre>

Funkcjonalności:
  Administrator:
    Tworzyć drzwi
    Usuwać drzwi
    Tworzyć konta pracowników
    Usunąć konto pracowników
    Przyznawać dostępu pracownikom do drzwi
    Usuwać dostępy pracownikom do drzwi
  Pracownik:
    przeglądać drzwi do których ma dostęp
    tworzyć zapytanie o dostęp do drzwi
  Niezalogowany:
    Przeglądać manu
    zalogować się jako administrator i jako pracownik
</pre>

### 4.4 Description pl

Aplikacja "dostęp do drzwi" jest dla zakładu pracy i umożliwia dostęp do drzwi dla pracowników, który obecnie są w nim zatrudnieni. Aplikacja jest przeznaczona dla intranetu danego zakładu pracy. Użytkownicy niezalogowani mogą zalogować się jako pracownicy lub jak administrator, w zależności od tego czy dany użytkownik odpowiada za dostęp do drzwi. Administrator ma dostęp do wszystkich informacji jak i usług w firmie, czyli: może przyznawać dostępy do drzwi dla pracowników, może także usuwać te dostępy. Dodatkowo w każdej chwili może zmienić uprawienenia dostępu do drzwi w zależności od różnych sytuacji. Administrator dostaje prośbe o dostęp do drzwi w formie powiadomienia w momencie kiedy pracownik ją wyśle. Może zaakceptować albo anulować request. Co również odróznia administratora to fakt, że ma on wgląd w całą historie przyznawania dostępu do drzwi, przez siebie jak i przez innych administratorów. Pracownik może odcztać jakie ma przyznane dostępy do drzwi oraz wysłać prośbe o dostęp do nowych i tę prośbe również usunąć.

## 5. Questions to our course leader

## 6. Edu. Materials for collaborators

Important things to do to have comfortable view on our project
**ToDo: check the first 5 points from below and point about Github and ERD deeply** (krzysiu, marcinek)

- [Install and prepare enviroment](#31-enviroment)
- [Github tutorial](https://www.youtube.com/watch?v=RGOj5yH7evk)
- [README.MD syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) + [cheatsheet](https://github.com/tchapi/markdown-cheatsheet/blob/master/README.md) + [TOF generator](https://ecotrust-canada.github.io/markdown-toc/)
  (documentation)
- [REST Api](https://www.youtube.com/watch?v=P9b8-BrWdYs)
- [ERD tutorial](https://www.youtube.com/watch?v=QpdhBUYk7Kk)
- Database tutorial
- [Javascript ES7 tutorial](https://www.youtube.com/watch?v=W6NZfCO5SIk&t=1s)
- [JS Promises](https://www.youtube.com/watch?v=DHvZLI7Db8E)
- [Node.js tutorial](https://www.youtube.com/watch?v=Oe421EPjeBE) (server stuff, optional)
- [React.js tutorial](https://www.youtube.com/watch?v=bMknfKXIFA8) (making interface tutorial, optional)
