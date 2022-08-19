const SigninSignupRoutes = require('express').Router();
const app = require('../server');
const { userController, signinController, updateuserController, getuserController, verifyAccountController,fileUploadcontroller } = require('../controolers/students');
const { add_validator, signin_validator } = require('../validation/user_validation');
const { token_parser } = require('../token/jwt_token')
const { result_validator } = require('../middleware/globalmiddleware');

(() => {
  post_requests();

  patch_requests();
  //  patch_requests();
  get_requests();
  //  delte_requests();
})();
function post_requests() {

  SigninSignupRoutes.post("/signup", add_validator(), result_validator, userController);
  SigninSignupRoutes.post("/signin", signin_validator(), result_validator, signinController);
  SigninSignupRoutes.post("/upload",result_validator,fileUploadcontroller)
}

function patch_requests() {
  SigninSignupRoutes.patch("/update", updateuserController);
  SigninSignupRoutes.patch("/verify-account", verifyAccountController)
}
function get_requests() {
  SigninSignupRoutes.get("/find", getuserController);
}
module.exports = SigninSignupRoutes