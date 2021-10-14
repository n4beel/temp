const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
module.exports = () => {
    global.RPC_USER = process.env.RPC_USER;
    global.RPC_PASSWORD = process.env.RPC_PASSWORD;
    global.BTC_RPC_HEADERS = {
        "content-type": "text/plain;"
      };
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(require("./routes"))
    return app;
}