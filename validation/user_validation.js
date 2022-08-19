
const { check } = require('express-validator');
const user_shema=require('../models/user_shema')

exports.add_validator = () => {
    return [
      check('password')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('must contain a number'),
  
      check('phone').isLength({max:10}).withMessage('Invalid Number'),
      check('email').isEmail()
      .custom((email,{req})=> {
        return user_shema.findOne({ email:email }).then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        });
      }),
      
      check('name').isLength({ max: 10 }).withMessage("Name Length must be less then 10")
    ]
  }

//  exports.add_validator = () => {
//   return [
//      check('phone')
//     .isLength({ min: 10,})
    


//      .withMessage('must be at least 10 Number')
    
     
//     .matches(/\d/)
//     .withMessage('must contain a number'),
//     check('name').isLength({max: 13}).withMessage("'Name' Lenght mus be less then 13"),
//    // check('Number').isNumeric().withMessage('Invalid Number'),
//     check("phone")
//    .isNumeric()
//    .custom((phone)=>{
//     return user_shema.findOne({phone}).then((user)=>{
//         if (user){
//             return Promise.reject("user all ready exist")
//         }
  
//     })
//     }),
// ]
//  }

// 
//    


  

//     //check('email').isEmail().withMessage('Invalid Email'),
    // check('mobile').isLength({max:10}).withMessage('must at least 10 digit number'),
 //check('gender').isString().valid("male","female","other").withMessage('must be char log'),
    
  

//  exports.signin_validator = () => {
//      return [
//      check('phone')
//       .isLength({ min: 10 })
//  .matches(/\d/)
//       .withMessage('must contain a number'),
//        check('phone')
//       .custom( async (phone, { req })=>{
//        const phone = req.body.phone    
//         //  MongoDB
//        .withMessage('must be at least 10 number')
//           const result = await signupModel.findOne({phone, name },
//                        {__v:false,password:false});
//        if(!result){ throw new Error("Invalid number"); }
        
//          req.body.userInfo = result;
  
//        return true
//       }),
//      ]
  
//  }

exports.signin_validator= () => {
    return [
      check('password')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('must contain a number'),
  
      check('email').custom(async (email, { req }) => {
        const user = req.body
     
        const result = await user_shema.findOne({ email}, { __v: false, _id: false,  });
        
        if (!result) {
          throw new Error("user not exist")
        } else {
          req.body.userInfo = result;
        }
        return true
  
      }),
    ]
  }