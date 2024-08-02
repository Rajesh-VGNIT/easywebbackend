const mongoose = require('mongoose');

// const DB="mongodb://127.0.0.1:27017/e-commerce"
const DB = "mongodb+srv://rajeshkumar05071999:qFNaUVUMkGNTYl4w@cluster0.6e0x86v.mongodb.net/"
mongoose.connect(DB).then(() => {
    console.log("mongodb is connected")
}).catch((error) => console.log("mongodb is not conected", error));


// qFNaUVUMkGNTYl4w

