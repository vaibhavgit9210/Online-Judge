const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require('./models/Users')

const app = express()

app.use(express.json())
app.use(cors())

const CONNECTION_URL = 'mongodb+srv://vaibhavpro9210:g25PrcS9W3VinRs1@online-judge.uyuimlo.mongodb.net/?retryWrites=true&w=majority&appName=online-judge'

const PORT = process.env.PORT || 8080;

mongoose.connect(CONNECTION_URL, {useUnifiedTopology: true})
.then(()=> app.listen(PORT,()=>console.log(`Connected to MongoDB Atlas, server running on PORT: ${PORT}`)))
.catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

app.post('/register',(req,res)=>{
    UserModel.create(req.body).then(users => res.json(users))
    .catch(err => res.json(err))
})