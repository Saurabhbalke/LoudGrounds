const mongoose = require("mongoose");
const { Schema } = mongoose;
let counterSchema = new Schema({
    key: {type: String},
    seq: {type: Number}
}, { strict: false });
const counter = mongoose.model('counter', counterSchema);

exports.getNextSequence = async (name) => {
    
    const data = await counter.findOneAndUpdate({ key: name }, { $inc: { seq: 1 } }, { upsert: true, returnDocument: 'after' });
    
    return data.seq;
}