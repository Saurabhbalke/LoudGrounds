const mongoose = require("mongoose");
const { Schema } = mongoose;
let counterSchema = new Schema({}, { strict: false });
const counter = mongoose.model('counter', counterSchema);

exports.getNextSequence = async (name) => {
    
    await counter.findOneAndUpdate({ _id: name }, { $inc: { seq: 1 } }, { upsert: true, returnDocument: 'after' });
      
    return 2;
 }