const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const subjectSchema=new Schema({
    subject1:String,
    subject2:String,
    subject3:String,
    subject4:String,
    subject5:String,
    subject6:String,
    subject7:String,
    subject8:String,
    subject9:String,
    subject10:String,
  
  });

module.exports=mongoose.model('subject',subjectSchema);