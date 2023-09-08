const exp = require("express");
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
    const productCollection = dbObj.collection('products')
    const eventCollection = dbObj.collection('events')
    console.log('db connection success');
    //share collections to API
    app.set('productCollection',productCollection)
    app.set('eventsCollection',eventCollection)
})
.catch(err=>console.log('error in db is ',err))

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

