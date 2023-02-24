<!-- <div align="center">  -->
![logo-no-background](https://user-images.githubusercontent.com/100809078/205174958-cda24005-d80a-4691-a300-04103b5274b0.png)


---

## 🔎 Contents

<!-- - [Features](https://github.com/elizawimberly/flickr_group_project/new/main?readme=1#features)
- [Download](https://github.com/elizawimberly/flickr_group_project/new/main?readme=1#download)
- [Upcoming](https://github.com/elizawimberly/flickr_group_project/new/main?readme=1#upcoming)
- [Tech Stack](https://github.com/elizawimberly/flickr_group_project/new/main?readme=1#tech-stack)
- [Demo](https://github.com/elizawimberly/flickr_group_project/new/main?readme=1#demo)
- [Connect](https://github.com/elizawimberly/flickr_group_project/new/main?readme=1#connect) -->

- Features
- Download
- Upcoming
- Tech Stack
- Connect

---

## 📸 Features

---

### Splash Page and User

---

When first landing on NatureNook home page the user sees a nature photo with a navbar that has spots, login, and sign up accessed by clicking on icons on the top right navigation bar.

---

![Screenshot from 2022-12-01 16-08-59](https://user-images.githubusercontent.com/100809078/205185368-17a1137d-2f34-43f1-97ca-549e9dadc2f7.png)


---

If the user selects sign up, they are directed to a sign up form. Alternately, if the user selects log in, the user can log in as a returning user or chose an option to log in as a demo user.

---

![Screenshot from 2022-12-01 16-06-06](https://user-images.githubusercontent.com/100809078/205184996-a34ae6e2-e314-44f2-9e05-29f73fb07cc3.png)

---


![Screenshot from 2022-12-01 16-05-55](https://user-images.githubusercontent.com/100809078/205185007-b45cf0dd-2746-418e-bff9-246f659a161a.png)

---

### Spots

---

If the user selects the spots option from the landing page, they are directed to a feed of all the spots in the library. This allows us to feature the interactive spot element of the app.

---

![Screenshot from 2022-12-01 16-03-16](https://user-images.githubusercontent.com/100809078/205185062-5bc8079b-b4a4-4096-bf1e-c7abb8798a12.png)

---

When a user wants to upload a spot, while logged in there is a icon displayed in the upper right navigation bar. When a user hovers over this icon a dropdown menu is displayed the dropdown has a option to create a spot. When create a spot is clicked a modal opens and the user can put in basic spot information as well as a url for the main spot Image.

---


![Screenshot from 2022-12-01 16-02-16](https://user-images.githubusercontent.com/100809078/205185427-812125c6-f894-4ad8-90bf-eab81e1a0e9c.png)

---

![Screenshot from 2022-12-01 16-04-44](https://user-images.githubusercontent.com/100809078/205185467-bdea9664-9e70-491a-8d20-a05ccf7408c7.png)

---

Once a user submits their spot information successfully, they are redirected to a spot details page that will feature the spot photo and information they have uploaded.

---

![Screenshot from 2022-12-01 16-03-34](https://user-images.githubusercontent.com/100809078/205185487-8286ddf4-dac1-45af-9b04-6a138691aeec.png)


---

If a user now navigates back to the spots page they will see their uploaded spot amongst the other spots.


---

### Reviews

---

A user can read reviews that are added for a specific spot on the spot detail page. A logged in user is given the option to add their own review or delete and/or edit any previous reviews they have left.

---

![Screenshot from 2022-12-01 16-03-49](https://user-images.githubusercontent.com/100809078/205185558-b0aaf021-57e4-4969-91ec-94432f6c52c4.png)

---
![Screenshot from 2022-12-01 16-04-13](https://user-images.githubusercontent.com/100809078/205185584-f667f5c4-08fe-46c9-92c7-354cddd92246.png)


---


## 📁 Download

- Clone this repository

- Install dependencies

  ```bash
  pipenv install -r requirements.txt
  ```

- Create a **.env** file based on the example with proper settings for your
  development environment

- Make sure the SQLite3 database connection URL is in the **.env** file

- This starter organizes all tables inside the `flask_schema` schema, defined
  by the `SCHEMA` environment variable. Replace the value for
  `SCHEMA` with a unique name, **making sure you use the snake_case
  convention**.

- Get into your pipenv, migrate your database, seed your database, and run your Flask app

  ```bash
  pipenv shell
  ```

  ```bash
  flask db upgrade
  ```

  ```bash
  flask seed all
  ```

  ```bash
  flask run
  ```

- cd into the react-app directory and install dependancies

  ```
  npm install
  ```

- then run your react front end and your browser should automatically open the app on http://localhost:3000/

  ```
  npm start
  ```

---

## ⏱ Upcoming

Upcoming features will include full CRUD functionality on bookings feature, CRD on spotImages, and CRD on messages!

---

## 📚 Tech Stack

### Framework:

<p>
<img src='https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white' alt='' />
<img src='https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white' alt='' />
<img src='https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white' alt='' />
<img src='https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white' alt='' />
<br>

### Frontend:

<p>
<img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' alt='' />
<img src='https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white' alt='' />
<br>

### Backend:

<p>
<img src='https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white' alt='' />
<img src='https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white' alt='' />
<img src='https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white' alt='' />
<img src='https://img.shields.io/badge/Express.js-404D59?style=for-the-badge' alt='' />
<img src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white' alt='' />
<br>

---

## 🖱 Demo

Check out NatureNook for yourself. Click the icon below to be redirected to Render, the current hosting site for the fullstack API:

<a href="https://nature-nook-deploy.onrender.com/" target="_blank">![logo-no-background](https://user-images.githubusercontent.com/100809078/205174694-07cd2bfa-b2c7-46f8-afdc-ad0044b8b95e.png)
</a> 

---

## 🤝 Connect

This API was brought to you by

<p>
  <a href="https://www.linkedin.com/in/yasamine-cruz-7b6867256/"><img align="justify" src="https://user-images.githubusercontent.com/100809078/205176187-33cf6829-c3d9-4345-a03f-4270b7095793.png" alt="Yasamine profile pic" width="150"></a>
</p>

<!-- </div> -->
