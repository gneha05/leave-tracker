const express=require('express');
const dbsetup=require('./model/dbSetUp');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();

const router=require('./routes/api');

app.use(cors());
app.use(bodyParser.json());

app.use('/',router);

app.use('/setUpDb' , async(req,res)=>{
    try {
        console.log("setting up db");
        let data=await dbsetup.setUpDb();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send("Error in setting up DB");
    }
})

app.listen(4000 , ()=>{
    console.log("Server is running on port 4000");
});