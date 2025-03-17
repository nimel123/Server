const {MongoClient}=require('mongodb');
const client=new MongoClient('mongodb+srv://rameshnimel934:hEY6jaI6DeBVjrSB@demo.71bws.mongodb.net/?retryWrites=true&w=majority&appName=Demo')
let dbName='test'
async function main() {
    try{
        await client.connect();
        console.log("DataBase Connected");
        const db =  client.db(dbName);
        return db;
    }
    catch (error){
           console.log("Something Wrong",error)
    }
}

 
 module.exports={main}