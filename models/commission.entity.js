import mongoose from "mongoose";

const CommissionSchema = new mongoose.Schema({
 "name":{type:String,required:true},
 "type":{type:String,required:true},
 "percent":{type:Number,required:true},
 "isDeleted":{type:Boolean,default:false},
});

CommissionSchema.set("timestamps", true);

CommissionSchema.statics.build = (attrs) => {
    return new Commission(attrs);
};

const Commission = mongoose.model(
    "Commission",
    CommissionSchema
);

export { Commission };