const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")


dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
    credentials: true, // Required for cookies
}));
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/users', require('./routes/userRoutes'));



const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT , () => {
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch((err) => console.log(err))
