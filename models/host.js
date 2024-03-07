const mongoose = require("mongoose");
const { Schema } = mongoose;

let hostSchema = new Schema({
  time_stamp : { type: Date, default: Date.now},
  IP_address: { type: String },
  user_id: { type: Number},
  event_type: {type: String},
  preferred_date: { type: Date },
  preferred_venue: { type: String},
  ticketed_event: {type: Boolean},
  guest_count: {type: String},
  total_budget: {type: String},
  support_needed: [String],
  name: {type: String},
  email_id: {type: String},
  phone_number: {type: String},
  notes: {type: String}

  
});

module.exports = mongoose.model("webHost", hostSchema);