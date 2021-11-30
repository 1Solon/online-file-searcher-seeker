# Prequisites
- Docker installed
# Start / Build
1. Go to root directory (same folder as docker-compose)
2. run ```docker-compose up --build```
3. Wait a 2-5 min
4. Done!
# Accessing website
1. Navigate to your browser
2. Type ```localhost:3000``` (It is possible to change this in the ```docker-compose``` file)

# Database
To connect to the database check the docker-copose.yml file to find the requiremnts of the connction.
The database contains 2 tables --> Users(USER_ID, USER_NAME, USER_EMAIL, USER_PASSWORD) AND DATA(USER_ID, FILE_NAME, FILE_CREATION)
The tables are related through a combined primary key using USER_NAME and FILE_NAME.
The idea is to store the files creating a folder per user in the server.
When the user uploads a file, the file is stored in the server, and the path is what we use to store in the table data.
I decided not to go for uploding the files straight into the datbase because that is much more complicated. I think this is a simple solution that works for this class project.

# Frontend
## Components
### Sidebar
```Sidebar``` is a component to allow user to navigate between pages, it also has a script to allow it to open the sidebar and push content when opened according to in which page the user is (Userpage or Homepage)
### Topbar
```Topbar``` Mostly aesthetic but when the user clicks on the image or username, it brings them to the userpage
### Popup
```Popup``` is a form to change the user details, when button is clicked it opens a form window that pop ups in the middle of the screen  

### Card 
Card.js handles displaying the files on our server. This is acomplished by grabbing our database, and generating react-bootstrap cards for each element on our database. We included
user functionality by writing only returning the database entries associated with the current user. We also introduced search logic, by filtering the displayed cards based on user entry

## Pages
Here the main pages of the website will be described

### App.js
Here all the ```routes``` are set, allowing us to navigate through pages when needed, creating a url path for every page in the website

### Register
```Register``` handles the call fo the endpoint of ```'/api/register``` to create the user into the database. It also handles the email validation

### Login
```Login``` page handles the call of the enpoint of ```'/api/login'``` to check if the user is alreday registered. It also contains the html form of the login as well as the style of the loin

### Homepage
```Homepage``` is our main page which utilizes most the componets. It also handles the endopoint ```'/api/uploadFile'``` which let's us uppload files and display them. Here it is possible to delete files, and download files individuale. Finally, in the homepage it is also possible to search files

### Userpage
```UserPage``` Shows the user information such as their username, email and password (Hashtags so its secure), user is able to update their username and their password from this page, it also allows user to delete their account and all files 

# Backend
As mentioned extensivily in index.js comments our backend revolves around the database (mentioned above) and fileStore (which refers to our local files)

## index.js
```Index.js``` contains the various api requests for our server, we mainly used the axios library for our server. Due to it's out-of-box asyncronicity and general ease-of-use. Index.js contains
various GET and POST requests handling a variety of functions. Further details can be found in comments on index.js

## localStore && dataStore
As a service meant to store files online, seeker uses a local folder called ```"seeker/files"```  which contains all the uploaded files. We keep track of who owns these files, and where they are, by storing the files paths and names in the database, we can easily retrieve them by just specifying the path of the file as stored on the database

## docker
We initially decided to use docker for several reasons, mainly so that we could share a 'golden image' in which all our code would run the same way on each of machines. This became a
necessity early on, because some of us used Windows, and other used macOS. Additonally, docker made it very easy to run our code all at once in a single command. Instead of having to mess
around with running several instances of node

## Nginx
```Nginx``` is currently configured as a router and reverse-proxy, this allowed us to edit our frontend and backend in real time. Without having to recompile. This saved us a alot of time when editing our code, in addition to teaching us about an industry-leading technology

| Contribution |
|-|-|
|[Saul Burgess](https://github.com/1Solon "Solon#4472 on Discord")| File Storage Backend && Card Logic
|[Nicholas Alvarez](https://github.com/NicolasAlvarez16 "https://www.linkedin.com/in/nicoalvarezgarrido/")| Datbase && Register/Login Management
|[Abraham Izarra](https://github.com/abrahax01 "https://www.linkedin.com/in/abraham-izarra-14848a208/")| Frontend && User Experience

*hover for discord usernames, click for social media*