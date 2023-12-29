const express = require('express')
const app = express()
const port = 42600
const hostname = '0.0.0.0'
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const mongoose = require("mongoose");
const adminRouter = require("./routes/adminRouter");
const authRouter = require("./routes/historyRouter");
const userRouter = require("./routes/userRouter");


app.use(express.json());