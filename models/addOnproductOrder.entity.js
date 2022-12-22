import mongoose from "mongoose";



const AddOnProductOrderSchema = new mongoose.Schema({
    userId : { type: mongoose.Types.ObjectId, ref: "User", required: true },
    items : [{
        productId: { type: mongoose.Types.ObjectId, ref: "AddOnSellerProduct", required: true},
        quantity: { type: Number,default:1 }
    }],  
    totalPrice: { type: Number, required: true },
    totalItems: { type : Number, required: true}, 
    cancellable:{type:Boolean, default:true},
    paymentType:{type:String, default: 'online', enum:["online", "cod"]},
    paymentId:{type:mongoose.Types.ObjectId, ref:"Payment",required:false},
    paymentStatus:{type:String,required:false},
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