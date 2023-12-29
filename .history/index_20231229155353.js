const express = require('express')
const app = express()
const port = 42600
const hostname = '0.0.0.0'
const WebSocket = require('ws');
const adminRouter = require("./routes/adminRouter");
const authRouter = require("./routes/historyRouter");
const userRouter = require("./routes/userRouter");


app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(userRouter);