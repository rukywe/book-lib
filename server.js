if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3030 ; 
const indexRoute = require('./routes/index')
const authorRoute = require("./routes/authors");



app.set('view engine', 'ejs')
app.set('views', path.join(__dirname ,'views'))
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ limit: "10mb", extended: false }));





const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});


//Routes
app.use('/', indexRoute)
app.use("/authors", authorRoute);

app.listen(PORT, () => { 
    console.log(`Server is currently on ${PORT}`)
})