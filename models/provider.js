const mongoose = require("mongoose");
const { Schema } = mongoose;

let providerSchema = new Schema({
  time_stamp : { type: Date,  default: Date.now},
  IP_address: { type: String },
  user_id: { type: Number},
  organizer_type: {type: String},
  business_type: { type: String},
  comp_name: {type: String},
  website: {type: String},
  instagram: {type: String},
  service_details: {type: String},
  standard_packages: {type: String},
  email_id: {type: String},
  phone_number: {type: String},
  name: {type: String},
  designation: {type: String}

});

module.exports = mongoose.model("webprovider", providerSchema);