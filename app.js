const express=require('express')

const app=express();

app.use(express.json())
const indexRouter=require('./Router/index')
app.use('/',indexRouter)





app.listen(3000,()=>{
    console.log("app is listening on port 3000")
})


