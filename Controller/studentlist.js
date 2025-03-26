const { ObjectId } = require('mongodb');
const dbnew = require('../Database/db');
const { json } = require('express');
var jwt = require('jsonwebtoken');
let jwtSecretKey = "abchg@123";



const getdatawithouttoken = async (req, res) => {
    try {
     
            const db = await dbnew.main();
            const clct = db.collection('users');
            const findResult = await clct.find({}).toArray();
            res.send({
                status: 200,
                message: findResult
            });
         }
    

    
    catch (err) {
        res.send({
            message: "somehthing went wrong" + err

        })
    }
}



//REGISTER API
const postdata = async (req, res) => {
    try {
        const db = await dbnew.main();
        const collection = db.collection('users');
        const { name, email, password } = req.body;
        const result = await collection.insertOne({ name, email, password });
            if(result){
                const token = jwt.sign(
                    {
                        data: result.name
                    }, jwtSecretKey, { expiresIn: '1d' });
                res.send({
                    status: 200,
                    message: "Data Iserted Successfully",
                    status: result,
                    authkey: token
                })
            }
            else{
                res.send('Some Error')
            }
    }
    catch (err) {
        res.send('something wrong' + err)
    }
}

//Get DATA API
const getdata = async (req, res) => {
    try {
      jwt.verify(req.body.token,jwtSecretKey,async (err)=>{
         if(err) 
         {
            res.send({
                status: 400,
                message: "token Wrong or Expired"
            });
         }
         else 
         {
            const db = await dbnew.main();
            const clct = db.collection('users');
            const findResult = await clct.find({}).toArray();
            res.send({
                status: 200,
                message: findResult
            });
         }
      })

    }
    catch (err) {
        res.send({
            message: "somehthing went wrong" + err

        })
    }
}



//FIND API
const find = async (req, res) => {
    try {
        jwt.verify(req.body.token,jwtSecretKey,async(err)=>{
            if(err){
                res.send({
                    status:400,
                    message:'Invalid Token'
                })
            }
            else{
                const db = await dbnew.main();
        const collection = db.collection('users');
        const result = await collection.findOne({ 
            $and:[
                {name:req.body.name},
                {password:req.body.password}, 
            ]
         })
        if (result) {
             res.send(result)
        }
        else {
            res.send('User Not Found')
        }
            }
        })
        

    }
    catch (err) {
        res.send('Something went wrong' + err)
    }
}





//DELETE API
const deletedata = async (req, res) => {
    try {
        jwt.verify(req.body.token,jwtSecretKey,async (err)=>{
            if(err){
                res.send({
                    status: 400,
                    message: "token Wrong or Expired"
                });
            }
            else{
                const db = await dbnew.main();
                const collection = db.collection('users');
                const userId = new ObjectId(req.params.id)
                const result = await collection.findOneAndDelete({ _id: userId });
                if (result) {
                    res.send('Data deleted successfully' + result)
                }
                else {
                    res.send("Please Check Input Id")
                }
            }
        })            
        }

    catch (err) {
        res.send('Something went wrong' + err);
    }
}

//UPDATE API
const updateData = async (req, res) => {
    try {
        jwt.verify(req.body.token,jwtSecretKey, async(err)=>{
            if(err){
                res.send({
                    status:400,
                    message:"Token Invalid or Expired"
                });
            }
            else{
                const db = await dbnew.main();
                const collection = db.collection('users');
                const userId = new ObjectId(req.params.id)
                const { name, email, password } = req.body;
                const result = await collection.findOneAndUpdate(
                    { _id: userId },
                    {
                        $set: { name,password }
                    }
                );
                if (result) {
                    res.send('User Updated')
                }
                else {
                    res.send('No User Updated')
                }
            }
        })
    }
    catch (err) {
        res.send('Something wrong', err)
    }
}

module.exports = { getdata, postdata, deletedata, updateData, find }
