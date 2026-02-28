import app from './src/app.js';
import db  from './src/db/db.js';


const PORT = process.env.PORT || 8000;


db().then(() => {
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Failed to connect database", err);
});
 