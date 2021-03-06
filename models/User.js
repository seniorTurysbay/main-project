const {Schema, model} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique:true},
    password:{type:String,required:true},
    // links : [{type:Types.ObjectID,ref:'Link'}]
});

module.exports = model('User',schema);