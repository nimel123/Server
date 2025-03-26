const express=require('express')
const cors=require('cors')

const app=express();

app.use(cors());
app.use(express.json())
const indexRouter=require('./Router/index')
app.use('/',indexRouter)





app.listen(3000,()=>{
    console.log("app is listening on port 3000")
})


