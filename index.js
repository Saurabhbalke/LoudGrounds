require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const cors =require('cors')
const app = express();
const PORT = process.env.PORT || 8200;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log("DB Connected");
}).catch((error)=> {
    console.log("error",error );
})
app.get('/', (req, res) => {
    res.json('LoudGrounds is working!!')
})
app.use('/api', require("./routes/routes"))

app.listen(PORT, ()=>{
    console.log(`server started  at port ${PORT}`);
})