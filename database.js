const monogoose=require("mongoose");


class database{

    constructor(){
        this.connect();
    }

    connect(){
        
        monogoose.connect("mongodb+srv://rohithreddyn013:mongodb1234@cluster1.2k2yl5o.mongodb.net/?retryWrites=true&w=majority",{ 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(()=>{
            console.log("connection succesfull");
        })
        .catch((err)=>{
            console.log("connection not succesfull"+err);
        })
    }
}

module.exports=new database();

