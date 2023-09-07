//create mini express application(a router)
const exp = require("express");
//it imports a function createApplication
const productApp=exp.Router();
const errorHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const verifyToken=require('./middlewares/verifyToken');
//get user
productApp.get('/get-product',errorHandler(async(request,response)=>{
    const productCollection = request.app.get('productCollection')
    //find method returns cursor so to pack all documents use to array
    let products = await productCollection.find().toArray()
    response.status(200).send({message:"List of products",payload:users})
}))
//get user by id
productApp.get('/get-product/:product',verifyToken,errorHandler(async(request,response)=>{
    const productCollection = request.app.get('productCollection')
    let name = request.params.product
    //there is no point of sending password to user so remove it 
    let obj = await productCollection.findOne({product:name})
    if (obj===null){
        response.status(200).send({message:"product not found"})
    }else{
        delete obj.password 
        response.status(200).send({message:"product",payload:obj})
    }
    
}))
//create user
productApp.post('/product-signup',errorHandler(async (request,response)=>{
    const productCollection=request.app.get('productCollection')
    const newUser = request.body;
    //to add user we have to check for duplicate user and hash there password for security
    let pro = await productCollection.findOne({product:newUser.product})
    if (pro!= null){
        response.status(200).send({message:"product already exists"})
    }else{
        //hash password and add user to db,2nd parameter is how many times hasing to be done
        let hpassword = await bcryptjs.hash(newUser.password,4)
        newUser.password = hpassword
        await productCollection.insertOne(newUser)
        response.status(201).send({message:"user created"})
    }
}))

//user login, verify username and compare plain password with hashed and create JWT token, send it to client
productApp.post('/product-login',errorHandler(async(request,response)=>{
    const productCollection = request.app.get('productCollection')
    let Obj = request.body
    console.log(Obj)
    let pro = await productCollection.findOne({product:Obj.product})
    if(Obj.product == "admin" && Obj.product == "admin"){
        let jwtToken = jwt.sign({ product: Obj.product }, '123456', { expiresIn: '1d' });
        response.status(200).send({ message: 'valid', token: jwtToken, pro: { product: 'admin' } });
    }
    if (pro===null){
        response.status(200).send({message:"iu"})
    }else{
        let isEqual = await bcryptjs.compare(Obj.password,pro.password)
        if (isEqual===false){
            response.status(200).send({message:"ip"})
        }else{
            Obj = pro
            let jwtToken = jwt.sign({product:Obj.product},'123456',{expiresIn:"1d"})
            delete Obj.password;
            response.status(200).send({message:"valid",token:jwtToken,pro:Obj})
        }
    }
}))
//update 
productApp.put('/update-product',errorHandler(async(request,response)=>{
    const  productCollection = request.app.get('productCollection');
    const modifiedUser = request.body
    let dbres = await productCollection.updateOne({id:modifiedUser.id},{$set:{...modifiedUser}})
    response.status(200).send({message:"user updated"})
}))
//delete
productApp.delete('/delete-product/:id',errorHandler(async(request,response)=>{
    const productCollection = request.app.get('productCollection')
    let userId = +request.params.id
    let dbres = await productCollection.deleteOne({id:userId})
    response.send({message:"deleted user"})
}))
//export productApp
module.exports = productApp;
