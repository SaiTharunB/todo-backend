const express = require('express')
const app=express()
const {updateTasks,getTasks} = require('./dynamo')
const port = pricess.env.port || 3001;

app.listen(port,()=>{
    console.log("server started and listening to "+port);
})
app.use(express.json())
app.get('/tasks/:id',async (req,res)=>{
    try{
      const resp =await getTasks(req.params.id);
      res.json(resp);
    }
    catch(err){
        console.error(err);
        res.status(500).json({err:"Internal Server Error"})
    }
})


app.post("/update",async (req,res)=>{
    
    const item=req.body;
    try{
        const resp =await updateTasks(item);
        res.json(resp);
      }
      catch(err){
          console.error(err);
          res.status(500).json({err:"Internal Server Error"})
      }
})