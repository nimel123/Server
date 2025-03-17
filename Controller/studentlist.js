const { ObjectId } = require('mongodb');
const dbnew = require('../Database/db');

const getdata = async (req, res) => {
    try {
        const db = await dbnew.main();
        const clct = db.collection('users');
        const findResult = await clct.find({}).toArray();
        res.send({
            status: 200,
            message: findResult
        })
    }
    catch (err) {
        res.send({
            message: "somehthing went wrong" + err

        })
    }
}

const postdata = async (req, res) => {
    try {
        const db = await dbnew.main();
        const collection = db.collection('users');
        const {name,email,password}=req.body;
        const result=await collection.insertOne({name,email,password});
      
        res.send({
            message:"Data Iserted Successfully",
            status:result
        });
        
    }
    catch (err) {
        res.send('something wrong' + err)
    }
}

const deletedata=async(req,res)=>{
    try{
        const db=await dbnew.main();
        const collection=db.collection('users');
        const userId=new ObjectId(req.params.id)
        const result=await collection.findOneAndDelete({_id:userId});
        if(result){
            res.send('Data deleted successfully'+result)
        }
        else{
            res.send("Please Check Input Id")
        }
        
    }
    catch(err){
        res.send('Something went wrong'+ err);
    }
    
}


const updateData=async(req,res)=>{
    try{
        const db=await dbnew.main();
        const collection=db.collection('users');
        const userId=new ObjectId(req.params.id)
        const {name,email,password}=req.body;
        const result=await collection.findOneAndUpdate(
              { _id:userId},
               {
                $set:{name,email,password}
               }
           
        );
         if(result){
            res.send('User Updated')
         }
         else{
            res.send('No User Updated')
         }
        
    }
    catch(err){
        res.send('Something wrong',err)
    }
}

module.exports = { getdata,postdata,deletedata,updateData }