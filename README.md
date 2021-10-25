# Start / Build
1. Go to main directory
2. run "docker-compose up --build"
3. Done!

# Accessing website
1. Navigate to your browser
2. Type "localhost:3050"

# Database
To connect to the database check the docker-copose.yml file to find the requiremnts of the connction.
The database contains 2 tables --> Users(USER_ID, USER_NAME, USER_EMAIL, USER_PASSWORD) AND DATA(USER_ID, FILE_NAME, FILE_CREATION)
The tables are related through a combined primary key using USER_NAME and FILE_NAME.
The idea is to store the files creating a folder per user in the server.
When the user uploads a file, the file is stored in the server, and the path is what we use to store in the table data.
I decided not to go for uploding the files straight into the datbase because that is much more complicated. I think this is a simple solution that works for this class project.