# Connect4

## Usage
Clone the repository:

```sh
git clone git@github.com:serkansokmen/connect4.git
cd connect4
npm install
npm run dev
Browse to http://localhost:8080
```
If you just want to start a new project without all the commit history then do:

```sh
git clone --depth=1 git@github.com:serkansokmen/connect4 <your-project-name>
cd <your-project-name>
npm install
npm run dev
Browse to http://localhost:8080
```

__Special note for windows users__

`npm run dev` relies on being able to run two commands simultaneously, the server and the webpack dev server. This does not work on windows so you will need to open to command windows and run these commands:

```sh
npm run dev-web
```

```sh
npm run dev-server
```

You can now browse to `http://localhost:8080`

##Live Reload

In `App` you'll find the single page reach app. Try opening `Components/Header.js' and modifying the text. Hit save and the browser should update with your changes.

In `Server` you'll find a minimal express server. Currently it serves content from the build directory and has 1 api call to get the current time.

Try adding a new api endpoint and modify `Components/Content.js` so that it hits your new endpoint.

You should be able to make all these changes without restarting the server manually as it should auto detect the changes and restart/reload as necessary.

## Running in Development Mode
```sh
npm run dev
```
This will start the webpack dev server on the defuault port (8080). It will also start the express server from `server/index.js` using nodemon.

Webpack dev server will watch for changes in the files from the `App` folder and hot load any changed modules.

nodemon will watch files in the `server` folder and restart the express server if any files change.

This means that you can update both your single page app and your backend during development and have the changes available immediately.

## Building for Production
```sh
npm run build
```
This will build the app and output the files to the `build` directory.

---
Connect4 matching algorithms borrowed from [react-native-connect4](https://github.com/sergiocruz/react-native-connect4) by permission from [Sergio Cruz](https://github.com/sergiocruz)
