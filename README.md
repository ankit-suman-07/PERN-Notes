# Notes 

A note-taking web app.
- Deployed directly from Github repositories, hence no build files are required.
- Any changes in the repository leads to the changes in the deployed App.
- Backend Deployed URL: [backend](https://notes-server-y9yv.onrender.com/)
- Frontend Deployed URL : [front-end]( https://mern-notes-nine.vercel.app/)

Table of Contents
- [Notes](#notes)
    - [Deployed Link](#deployed-link)
  - [Technologies Used](#technologies-used)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [User Authentication](#user-authentication)
    - [Deployment Technology](#deployment-technology)
  - [Setting Up the Application](#setting-up-the-application)
    - [Prerequisites](#prerequisites)
    - [Steps to run locally](#steps-to-run-locally)
  - [Setting Up PostgreSQL with Prisma and ElephantSQL](#setting-up-postgresql-with-prisma-and-elephantsql)
    - [Step 1: Create an ElephantSQL Account](#step-1-create-an-elephantsql-account)
    - [Step 2: Install Prisma CLI](#step-2-install-prisma-cli)
    - [Step 3: Initialize Prisma in Your Project](#step-3-initialize-prisma-in-your-project)
    - [Step 4: Configure schema.prisma](#step-4-configure-schemaprisma)
    - [Step 5: Generate Prisma Client](#step-5-generate-prisma-client)
    - [Now, you can use the generated Prisma client in your application code to interact with the PostgreSQL database.](#now-you-can-use-the-generated-prisma-client-in-your-application-code-to-interact-with-the-postgresql-database)
  - [Summary](#summary)
    - [Features:](#features)

### Deployed Link

[Motes.](https://mern-notes-nine.vercel.app/)

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **HTML/CSS**: Basic building blocks for web development.
- **JavaScript**: Programming language for enhancing user interactivity.

### Backend
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Node.js**: JavaScript runtime for server-side development.
- **PostgreSQL**: An open-source relational database management system (RDBMS)
- **Prisma**: An open-source database toolkit that simplifies database access and management in modern web development.
- **ElephantSQL**: A Database as a Service (DBaaS) provider that specializes in offering PostgreSQL databases in the cloud.

### User Authentication
- **Firebase**

### Deployment Technology
- **Frontend**: vercel.com
- **Backend**: render.com


## Setting Up the Application

### Prerequisites
- Node.js installed on your machine

### Steps to run locally

1. **Fork the Repository**

   Click on the 'Fork' button on the top right corner of this repository's page. This will create a copy of the repository in your GitHub account.

2. **Clone the Repository**

   ```bash
   git clone https://github.com/ankit-suman-07/MERN-Notes.git

3. **Move to folder**

   ```bash
   cd MERN-notes
   cd notes-ui

4. **Install Dependencies**

   ```bash
   npm install

5. **Run the Project**

   ```bash
   npm start

The project will now be running locally on http://localhost:3000.

## Setting Up PostgreSQL with Prisma and ElephantSQL


### Step 1: Create an ElephantSQL Account

1. Go to the ElephantSQL website and sign up for an account.
2. Create a new instance (database) in ElephantSQL. Note the connection details (URL, username, password, etc.) provided by ElephantSQL.

### Step 2: Install Prisma CLI

1. Open your terminal and install the Prisma CLI globally:
   ```bash
   npm install -g prisma

### Step 3: Initialize Prisma in Your Project

1. In your project directory, run the following commands:
   ```bash
   prisma init

This command will create a prisma directory with a schema.prisma file.

### Step 4: Configure schema.prisma

1. Open the schema.prisma file in the prisma directory.
2. Update the DATABASE_URL with the connection details provided by ElephantSQL:
   ```bash
    datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
    }
    

### Step 5: Generate Prisma Client

   ```prisma genreate```


### Now, you can use the generated Prisma client in your application code to interact with the PostgreSQL database.


## Summary

This web app is a note-taking app with responsive UI. Users are first asked to SignIn using Google after which they can create personal notes which only they can view or edit. 

### Features:

- **Visually appealing & Responsive UI**: The platform features a user-friendly interface where all the added notes are available specific to the user. The app is responsive with beautiful views on every device.

- **User Authentication**: User authentication has been implemented using Firebase which maintains user's privacy. A user can only view, edit or delete the notes created by them.

- **CRUD Operations**: Create a personalised note, edit them, delete them or just view them.
