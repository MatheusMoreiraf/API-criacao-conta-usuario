import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
const Schema = mongoose.Schema;
const AutoIncrement = mongooseSequence(mongoose);

const accountModel = new Schema({
    _id: Number
},{
    _id: false
});

accountModel.plugin(AutoIncrement, {
    collection_name: "account_counter"
});
export default mongoose.model("accounts", accountModel);