const mongoose = require('mongoose')

const peopleSchema = mongoose.Schema(


    {
        "name":{
            type:String,
            required: true,
            trim: true,
        },
        "email":{
            type:String,
            required:true,
            trim:true,
            lowercase:true,
        },
        "mobile":{
            type:String,
            required:true,
        },
        "password":{
            type:String,
            required:true,
        },
        "avatar":{
            type:String
           
        },
        "role":{
            type:String,
            enum:["users","admin"],
            default:"users",
        },
    },
        {
            timestamps:true,versionKey:false

        }

);

const people = mongoose.model('People',peopleSchema);

module.exports = people;