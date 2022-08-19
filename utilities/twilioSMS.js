const accountSid = 'AC0dc67b3ed763baa101096a174775160f';
const authToken = '3ff2c58db68835205278b754195954e6';
const client = require('twilio')(accountSid, authToken);


exports.sendMobileSMS = async ( body , to) => {
 return await client.messages .create({
      body,
      to,
      from: '+12567980230' });
}