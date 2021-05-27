const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const markSchema=new Schema({
  physics: String,
  english:String,
  chemistry:String

});

const studentSchema=new Schema({
  name:String,
  email:String,
  standard:String,
  password:String,
  image:String,
  marks:[markSchema],

});

const student=mongoose.model('student',studentSchema)
module.exports=student;