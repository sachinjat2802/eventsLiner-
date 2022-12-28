import mongoose from "mongoose";



const PaymentTxnSchema = new mongoose.Schema({
    "razorpay_order_id":{type:String,unique:true},
    "razorpay_signature":{type:String,required:false},
    "transactionamount":{type:Number,required:false},
    "transactionid":{type:String,required:false},
    "userId":{type:mongoose.Types.ObjectId(),required:false},
    "currency":{type:Number,required:false},
    "status":{type:String,required:false,enum:["created","authorized","captured","refunded","failed"]},
    "order_id":{type:String,required:false},
    "invoice_id":{type:String,required:false},
    "international":{type:Boolean,required:false},
    "method":{type:String,required:false},
    "amount_refunded":{type:Number,required:false},
    "refund_status":{type:String,required:false},
    "captured":{type:Boolean,required:false},
    "description":{type:String,required:false},
    "card_id":{type:String,required:false},
    "bank":{type:String,required:false},
    "wallet":{type:String,required:false},
    "vpa":{type:String,required:false},
    "email":{type:String,required:false},
    "contact": {type:String,required:false},
    "notes": {type:[String],required:false},
    "fee":{type:Number,required:false},
    "tax":{type:Number,required:false},
    "discount":{type:Number,required:false},       
    "error_code" :{type:String,required:false},
    "error_description":{type:String,required:false},
    "error_source":{type:String,required:false},
    "error_step":{type:String,required:false},
    "error_reason":{type:String,required:false},
    "acquirer_data": {
            "transaction_id":{type:String,required:false},
        }
});

PaymentTxnSchema.set("timestamps", true);

PaymentTxnSchema.statics.build = (attrs) => {
    return new PaymentTxn(attrs);
};

const PaymentTxn = mongoose.model(
    "PaymentTxn",
    PaymentTxnSchema
);

export { PaymentTxn };