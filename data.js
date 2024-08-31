import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import axios from "axios";
import { Sign} from "./models/sign.models.js";

const app = express();
app.use(express.json({limit:'1mb'}));
app.use(cors());
const PORT=3000;
connectDB().then(()=>
{
    app.listen(PORT,()=>
    {
        console.log(`Server is running at http://127.0.0.1:${PORT}/api`);
    })
}).catch((error)=>{
    console.log(`MongoDB connection failed:${error}`);
}
);
try {
    app.post('/api',async (req,res)=>{
        try{
            const {input}=req.body;
            console.log({input});
            res.status(200).json({ message: 'Input received' });
        }
        catch(error)
        {
            console.error("ERROR:",error);
            res.status(500).json({ message: 'Error getting input', error });
        }
    })
} catch (error) {
    console.error("ERROR IS:",error);
}
app.post('/val',async(req,res)=>{
    try {
        const {values}=req.body;
        console.log({values});
        const newsign=new Sign({
            firstname:values.firstname,
            lastname:values.lastname,
            mobileno:values.mobileno,
            email:values.email,
            password:values.password
        })
        await newsign.save();
        res.status(200).json({ message: 'Input received' });

        
    } catch (error) {
        console.error("ERROR:",error);
        res.status(500).json({ message: 'Error getting input', error });
        
    }
})
