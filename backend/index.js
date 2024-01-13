const express=require('express');
const dbsetup=require('./model/dbSetUp');
const bodyParser=require('body-parser');

const app=express();

const router=require('./routes/api');

app.use(bodyParser.json());
app.use('/',router);

app.use('/setUpDb' , async(req,res)=>{
    try {
        console.log("first");
        let data=await dbsetup.setUpDb();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send("Error 1");
    }
})

app.listen(4000 , ()=>{
    console.log("Server is running on port 4000");
});