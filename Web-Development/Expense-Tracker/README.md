# Expense Tracker

An application where we can add our daily income and express.

## Technologies Used
- ReactJS 
- NodeJS

## How to set up the application

>Set up react app (Front-end)
```bash
cd client && npm install
```
>Set up node app (Back-end)
```bash
cd server && npm install
```
create the `.env` file inside the server folder.
```bash
touch .env
```
add these variables into `.env`
```bash
MONGO_DB_URI = mongodb+srv://...
JWT_SECRET = uid459345455cn3
PORT = 8080
```
replace `MONGO_DB_URI` with your MongoDB URI.

## How to start the application

>Start the server (Back-end)
```bash
npm run dev
```
The server will listen on `PORT 8080` which is defined in the `.env` file. 
[http://localhost:8080](http://localhost:8080). Replace the `"host"` URL in the `swagger.json` file with `localhost:8080`.

For API references you can open the `Swagger API` docs.[http://localhost:8080/api-docs](http://localhost:8080/api-docs)

>Start the react app (Front-end)

Replace `"proxy"` URL with the local server URL `http://localhost:8080` in `package.json` file in the `client` folder. 
```bash
npm run start
```
The app will start on `PORT 3000`.
[http://localhost:3000](http://localhost:3000)

## Usage
Now create your account with a dummy email and password and start adding your daily transactions. 

## Screenshots

![Image](./screenshot.png)