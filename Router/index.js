const express=require('express');

const slist=require('../Controller/studentlist')
const router=express.Router()



router.get('/getdata',slist.getdata)
router.post('/insertdata',slist.postdata)
router.delete('/removedata/:id',slist.deletedata)
router.put('/update/:id',slist.updateData)
router.post('/find',slist.find)

   



module.exports=router