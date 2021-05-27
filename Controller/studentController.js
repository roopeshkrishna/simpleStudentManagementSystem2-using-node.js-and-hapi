'use strict'

const student=require('../Model/studentModel');
const subject=require('../Model/subjectSchema');
const marks=require('../Model/markSchema')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var data={ };
var details={ };
var subjectDetails={ };
var sub={ };
const fs=require('fs')

const  handleFileUpload = async file   => {

    return new  Promise (async(resolve, reject) => {

        const filename  = await file.hapi.file
        
        const data = await file._data
        fs.writeFile('./public/' + filename, data, err => {
            if (err) {
              reject(err)                
            }
            resolve(filename)
          })

    setTimeout(async function(){ 
      fs.rename('./public/undefined','./public/images/'+file.hapi.filename,function(err){
        if(err) throw err;
        console.log('file renamed')
      })

    },2000)
    
    })    
} 
module.exports={
    
     async create(req,h){
        await handleFileUpload(req.payload.image);
        var img=req.payload.image.hapi.filename
        console.log(img)

       student.create({
            name:req.payload.name,
            email:req.payload.email,
            password:req.payload.password,
            standard:req.payload.standard,
            image:img
              
        },(err,saveUser)=>{
            if(err){
                return reply(err).code(500);
            }
            return saveUser
        });
        await  MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("examdb");
            
           dbo.collection("students").find({}).toArray(function(err, result) {
              data=result;
              if (err) throw err;
              db.close(); 
            });
      
          });
       
        return h.view('addStudent',{data})
       
    },

    async findOne(req, reply) {
        console.log(req.params.id)
        await student.findById(req.params.id, (err,person) => {
            if (err) {
                return reply(err).code(404);
            }
             details=person; 
                 
        })   
        
        return reply.view('editStudent',{id:details.id,name:details.name,email:details.email,password:details.password,standard:details.standard,image:details.image})     
    
    },
   async update(req, reply) {
        if (!req.params.id) {
            return reply({err: 'id is required param'}).code(400);
        }
        await handleFileUpload(req.payload.image);
        var img=req.payload.image.hapi.filename
        console.log("image"+img)
        let attributes = {};
 
        if (req.payload.name) {
            attributes.name = req.payload.name;
        }
        if (req.payload.email) {
            attributes.email = req.payload.email;
        }
        if (req.payload.password) {
            attributes.password = req.payload.password;
        }
        if (req.payload.standard) {
            attributes.standard = req.payload.standard;
        }
        if (img) {
            attributes.image = img;
        }
        
        student.findByIdAndUpdate(req.params.id, attributes, {new: true}, (err, company) => {
            if (err) {
                return reply(err).code(500);
            }
            return reply.response(company);
        })
        return reply.view('addStudent')
    },
    async delete(req, reply) { 
      
        await student.findByIdAndRemove(req.params.id, (err, result) => {
          
            if (err) {
                return reply(err).code(500);
            }
            console.log("deleted")
        })
        return reply.view('addStudent')
    },

    async subCreate(req,h){

        subject.create({
             subject1:req.payload.subject1,
             subject2:req.payload.subject2,
             subject3:req.payload.subject3,
             subject4:req.payload.subject4,
             subject5:req.payload.subject5,
             subject6:req.payload.subject6,
             subject7:req.payload.subject7,
             subject8:req.payload.subject8,
             subject9:req.payload.subject9,
             subject10:req.payload.subject10

             
             
         },(err,saveUser)=>{
             if(err){
                 return reply(err).code(500);
             }
             return saveUser
         });
         await  MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("examdb");
            
           dbo.collection("subjects").find({}).toArray(function(err, result) {
              data=result;
              if (err) throw err;
              db.close(); 
            });
      
          });
        
         return h.view('addSubject',{data})
        
    },
    async findOneSubject(req, reply) {
        console.log(req.params.id)
        await subject.findById(req.params.id, (err,person) => {
            if (err) {
                return reply(err).code(404);
            }
             subjectDetails=person; 
                 
        })   
        
        return reply.view('editSubject',{id:subjectDetails.id,subject1:subjectDetails.subject1,subject2:subjectDetails.subject2,subject3:subjectDetails.subject3,subject4:subjectDetails.subject4,subject5:subjectDetails.subject5,subject6:subjectDetails.subject6,subject7:subjectDetails.subject7,subject8:subjectDetails.subject8,subject9:subjectDetails.subject9,subject10:subjectDetails.subject10})     
    
    },
    subjectUpdate(req, reply) {
        if (!req.params.id) {
            return reply({err: 'id is required param'}).code(400);
        }
        let attributes = {};
 
        if (req.payload.subject1) {
            attributes.subject1 = req.payload.subject1;
        }
        if (req.payload.subject2) {
            attributes.subject2 = req.payload.subject2;
        }
        if (req.payload.subject3) {
            attributes.subject3 = req.payload.subject3;
        }
        if (req.payload.subject4) {
            attributes.subject4 = req.payload.subject4;
        }
        if (req.payload.subject5) {
            attributes.subject5 = req.payload.subject5;
        }
        if (req.payload.subject6) {
            attributes.subject6 = req.payload.subject6;
        }
        if (req.payload.subject7) {
            attributes.subject7 = req.payload.subject7;
        }
        if (req.payload.subject8) {
            attributes.subject8 = req.payload.subject8;
        }
        if (req.payload.subject9) {
            attributes.subject9 = req.payload.subject9;
        }
        if (req.payload.subject10) {
            attributes.subject10 = req.payload.subject10;
        }
        subject.findByIdAndUpdate(req.params.id, attributes, {new: true}, (err, company) => {
            if (err) {
                return reply(err).code(500);
            }
            return reply.response(company);
        })
        return reply.view('addSubject')
    },
    async subjectDelete(req, reply) { 
      
        await subject.findByIdAndRemove(req.params.id, (err, result) => {
          
            if (err) {
                return reply(err).code(500);
            }
            console.log("deleted")
        })
        return reply.view('addSubject')
    },

    async findName(request,reply){ 
    
        await  MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("examdb");
          
         dbo.collection("students").find({}).toArray(function(err, result) {
            data=result;
            if (err) throw err;
            db.close(); 
          });
          dbo.collection("subjects").find({}).toArray(function(err, subject) {
            sub=subject;
            if (err) throw err;
            db.close(); 
          });
        });
        return reply.view('addMarks',{data,sub})
    
    },
    async markCreate(req,h){

        marks.create({
             name:req.payload.name,
             subject1:req.payload.subject1,
             mark1:req.payload.mark1,

             subject2:req.payload.subject2,
             mark2:req.payload.mark2,

             subject3:req.payload.subject3,
             mark3:req.payload.mark3,

             subject4:req.payload.subject4,
             mark4:req.payload.mark4,

             subject5:req.payload.subject5,
             mark5:req.payload.mark5,

             subject6:req.payload.subject6,
             mark6:req.payload.mark6,

             subject7:req.payload.subject7,
             mark7:req.payload.mark7,

             subject8:req.payload.subject8,
             mark8:req.payload.mark8,

             subject9:req.payload.subject9,
             mark9:req.payload.mark9,

             subject10:req.payload.subject10,
             mark10:req.payload.mark10,   
             
         },(err,saveUser)=>{
             if(err){
                 return reply(err).code(500);
             }
             return saveUser
         });
         await  MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("examdb");
            
           dbo.collection("marks").find({}).toArray(function(err, result) {
              data=result;
              if (err) throw err;
              db.close(); 
            });
      
          });
                
         return h.view('addMarks',{data})
        
    },

}