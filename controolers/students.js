
const userschema = require("../models/user_shema");
const { generate_token } = require("../token/jwt_token");
const { response } = require("../server");
const { sendMobileSMS } = require("../utilities/twilioSMS");
const multer = require("multer");
//const express_validation=require(express_validation);

exports.userController = async (req, res) => {//data base save ho rh
  console.log("ggggg", req.body);
  req.body.phone = "+91" + req.body.phone
  req.body.status = "review"
  req.body.statusBy = ""
  const phone = req.body.phone;
  var val = Math.floor(1000 + Math.random() * 9000);
  // req.body.phone = val
  const msg = `Hello friends! verification code ${val}`

  const userDetail = userschema(req.body);
  userDetail.otp = val
  console.log(",,,,,,,,,,,", userDetail);
  userDetail.save((err, userDetail) => {
    const smsresult = sendMobileSMS(msg, phone)
    if (err) {
      res.status(500).send({ err })
    }
    else {
      res.status(200).send({ data: userDetail })
    }
  })

}
exports.updateuserController = async (req, res, next) => {
  const { otp } = req?.body
  const { _id } = req?.query;

  userschema.findOne({ _id }, async (err, result) => {
    console.log("hhhhhhhh", result)
    if (err) {
      next(err)
    } if (result) {
      if (otp == result.otp) {
        const updateAccount = await userschema.findByIdAndUpdate(_id, { is_Verified: 1 }, { new: true })

        res?.status(200).send({ msg: "You has been successfully registered", data: updateAccount });
      } else {
        res.status(500).send({ msg: 'otp is incorrect' });
      }
    }
  })
}
exports.verifyAccountController = async (req, res) => {
  const { _id } = req.query;
  const { statusBy, role, status } = req.body

  const detail = await userschema.findOneAndUpdate({ _id }, { $set: { action: { role: role, status: status, statusBy: statusBy } } }, { new: true })
  console.log(detail)
  detail.save((err, result) => {
    if (result) {
      res.status(200).send({ detail, msg: "approved succesfully" })
    } else {
      res.status(400).send(err)
    }

  })

}
exports.fileUploadcontroller = async (req, res) => {

  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads")
      },
      filename: function (req, res, cb) {
        cb(null, file.filename + "-" + Date.now() + ".jpg")
      }
    })


  }).single("user_file")
  res.send("file upload")


}
exports.getuserController = async (req, res) => {// find kar rahe h
  const { city, gender, category, } = req.query
  // console.log("======>>>>>",city);
  await userschema.find(req.query)

    .then(user => {
      console.log(user);

      if (user) {

        res.status(200).send({ msg: 'success', data: user })
      }
      else {
        console.log('user Does Not Exits');
      }
    })
}

exports.signinController = async (req, res) => {
  // updated_on set in signup schema
  const token = await generate_token(req.body?.userInfo);
  res.status(200).send({ userInfo: req.body.userInfo, token });
};


