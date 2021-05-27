const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const markSchema= new Schema({
    
    name:String,
    subject1:String,
    mark1:String,
    subject2:String,
    mark2:String,
    subject3:String,
    mark3:String,
    subject4:String,
    mark4:String,
    subject5:String,
    mark5:String,
    subject6:String,
    mark6:String,
    subject7:String,
    mark7:String,
    subject8:String,
    mark8:String,
    subject9:String,
    mark9:String,
    subject10:String,
    mark10:String,


});

module.exports=mongoose.model('marks',markSchema);