
const Mongoose = require('mongoose');

const user_schema = new Mongoose.Schema({

   // _id:Mongoose.Schema.Types.ObjectId,
   city: {
      type: String,
      // required:true,
   },
   email: {
      type: String,
      require: true,
   },
   password: {
      type: String
   },
   name: {
      type: String,
      required: true,


   },
   gender: {
      type: String,
      //required:true,

   },
   father: {
      type: String,
      //  required:true,

   },
   mother: {
      type: String,
      // required:true,

   },
   education: {
      type: String,
      //required:true,
   },

   phone: {
      type: String,
      required: true,
   },

   otp: {
      type: Number,
   },
   image: {
      type: String,
   },
   age: {
      type: Number,
      //required:true,
   },
   addressprov: {
      type: String,
      // required: true,

   },
   category: {
      type: String,
      //  required: true,

   },

   is_Verified: 0,
   created_on: {
      type: Date,
      default: new Date()
   },
   updated_on: {
      type: Date,
      default: new Date()
   },
   action: {
      status: {
         type: String,
         //default:[],
      },
      statusBy: {
         type: String,
         //default: [],
      },
      role: {
         type: String,
         //   required:true,

      }
   },


});

const userschema = Mongoose.model("signup", user_schema);

module.exports = userschema;