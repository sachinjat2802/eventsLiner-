import mongoose from "mongoose";



const PaymentOrderSchema = new mongoose.Schema({
    orderId:  { type: String, required: false },
        entity:  { type: String, required: false },
        amount: { type: Number, required: false },
        currency: { type: String, required: false ,default: "INR" },
        paymentMethod: { type: String, required: false },
        receipt: { type: String, required: false },
        offer_id:{ type: String, required: false },
        status: { type: String, required: false ,enum :["created","attempted","paid"] },
        attempts:{ type: Number, required: false },
        notes: {
            userId:{type:mongoose.Schema.Types.ObjectId,required:false,ref:"User"},
            venue:{type:mongoose.Schema.Types.ObjectId,required:false,ref:"Venue"},
            addOnSeller:{type:mongoose.Schema.Types.ObjectId,required:false,ref:"AddOnSeller"},
            event:{type:mongoose.Schema.Types.ObjectId,required:false,ref:"Event"},
            note:  { type: String, required: false },
        },

});

PaymentOrderSchema.set("timestamps", true);

PaymentOrderSchema.statics.build = (attrs) => {
    return new PaymentOrder(attrs);
};

const PaymentOrder = mongoose.model(
    "PaymentOrder",
    PaymentOrderSchema
);

export { PaymentOrder };