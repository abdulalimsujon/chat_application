
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const path = require('path');
const cookieParser = require('cookie-parser');


const loginRouter = require('./routers/LoginRouter')
const usersRouter = require('./routers/usersRouter')
const inboxRouter = require('./routers/inboxRouter')
//internal imports

const {NotFoundHandler,errorHandler} = require("./middlewares/common/errorHandler")

const app = express();

dotenv.config();




//database conncetion 

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})

    .then(() => console.log('database connected successfully'))
    .catch((error) => console.log('database error =>>>', error))

// request parser

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//view engine 

app.set('view engine', "ejs")

// set static folder 

app.use(express.static(path.join(__dirname, "public")))

//cookie parser 

app.use(cookieParser(process.env.COOKIE_SECRATE));


//routing  setup

app.use('/',loginRouter)
app.use('/inbox',inboxRouter)
app.use('/users',usersRouter)


//not found handler
app.use(NotFoundHandler);

//common error handler
app.use(errorHandler);

// error handling

app.listen(process.env.PORT, () => {
    console.log(`app is lisenning on ${process.env.PORT}`)
})