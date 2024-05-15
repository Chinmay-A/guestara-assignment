# Guestara Node Intern Assignment

Please follow the following steps to run the app locally:

1. Download the zip file from github
2. Unzip to local system
3. Open terminal in the root directory (the one with package.json)
4. Create a .env file and assign two variables PORT and DBURI, DBURI is supposed to be the link to the remote mongo server

   - Note that the DBURI has to be obtained from the mongo atlas server if you wish to run the app locally.
   - My URI is embedded in the environment of my deployed app on Vercel and present on my local machine

5. Run the command 'npm install' to install all dependencies
6. Run the command 'node index.js' to start the server
7. Follow the url logged on the terminal to reach the home of the app
