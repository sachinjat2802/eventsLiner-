import mongoose from "mongoose";

const TaxSchema = new mongoose.Schema({
 "name":{type:String,required:true},
 "type":{type:String,required:true},
 "percent":{type:Number,required:true},
 "isDeleted":{type:Boolean,default:false},
 "taxDescription":{type:Object,required:false}
});

TaxSchema.set("timestamps", true);

TaxSchema.statics.build = (attrs) => {
    return new Tax(attrs);
};

const Tax = mongoose.model(
    "Tax",
    TaxSchema
);

export { Tax };