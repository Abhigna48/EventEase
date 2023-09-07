const exp = require("express");//it imports a function createApplication
const app=exp();
app.listen(4803,()=>console.log("web server listening in port 4803!!"));
//connect react field
const path = require("path")
app.use(exp.static(path.join(__dirname,'./build')))



app.use(exp.json())
//To craete db client and connect with respetive db and collectons
const mclient = require("mongodb").MongoClient;
mclient.connect("mongodb://127.0.0.1:27017")
.then((dbRef)=>{
    const dbObj = dbRef.db('bdb');
    const userCollection = dbObj.collection('users')
    const productCollection = dbObj.collection('products')
    const eventCollection = dbObj.collection('events')
    console.log('db connection success');
    //share collections to API
    app.set('userCollection',userCollection)
    app.set('productCollection',productCollection)
    app.set('eventsCollection',eventCollection)
})
.catch(err=>console.log('error in db is ',err))





//import userApp
const userApp = require("./APIs/userApi");

//execute use api when the request has user-api
app.use('/user-api',userApp);

const productApp = require("./APIs/productsApi");
app.use('/product-api',productApp);

const eventApp = require("./APIs/eventApi");
app.use('/event-api',eventApp);
//page refresh middleware
const pageRefresh=(request,response,next)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
}
app.use('*',pageRefresh)
// to handle with error in path
const invalidmiddleare=(request,response,next)=>{
    response.send({message:"invalid path"})
}
app.use('*',invalidmiddleare);
//error handling middleware
//has to be placed at the bottom for errors in routes
const ehmiddleware = (error,request,response,next)=>{
    response.send({message:error.message});
};
app.use(ehmiddleware);


/*create middleware(if we make requests it wont be responded because it is a function and has to be called)
//method1 executes for every req
const middleware1 = (request,response,next)=>{
    console.log("middle ware is called")
    // forward middleware to next
    next()
    // can respond to client
    //response.send({message:"unauthorised"})
}
//app.use(middleware)
const middleware2 = (request,respond,next)=>{
    console.log("2 executed")
    next()//next should be called otherwise request stops here
}
app.use(middleware2)
//create middleware for specific request by making it an argument in a request
app.get('/get-product',middleware1,(request,response)=>{
    response.send({message:"all products",payload:products});
})
//USER API
//products


//users
let users=[]
const middleware1 = (request,respond,next)=>{
    console.log("middleware for every request is called")
    next()
}
const middleware2 = (request,respond,next)=>{
    console.log("middleware 2 executed")
    next()
}
const middleware3 = (request,respond,next)=>{
    console.log("middleware 3 executed")
    next()
}*/