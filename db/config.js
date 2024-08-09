const mongoose = require('mongoose');

// const DB="mongodb://127.0.0.1:27017/e-commerce"  
const DB= process.env.DB_NAME
mongoose.connect(DB).then(() => {
    console.log("mongodb is connected")
}).catch((error) => console.log("mongodb is not conected", error));




