import mongoose from "mongoose";



const AddOnProductOrderSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    product:[{
     productId:{type:mongoose.Schema.Types.ObjectId,ref:"AddOnSellerProduct"},
     quantity:{type:Number , required:true}
    }],
    totalPrice:{type:Number,required:true},
    totalItems:{type:Number, required:true},
    totalQuantity:{type:Number, required:true},
    cancellable:{type:Boolean, default:true},
    status:{ type:String, default: 'pending', enum:["pending", "completed", "cancelled"]},
    deletedAt:{type:Date, required:false},
    isDeleted:{type:Boolean, default:false },
    placeBefore:{type:Date, required:false}
 }
);

AddOnProductOrderSchema.set("timestamps", true);

AddOnProductOrderSchema.statics.build = (attrs) => {
    return new AddOnProductOrder(attrs);
};

const AddOnProductOrder = mongoose.model(
    "AddOnProductOrder",
    AddOnProductOrderSchema
);

export { AddOnProductOrder };