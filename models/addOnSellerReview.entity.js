import mongoose from "mongoose";



const AddOnSellerReviewsSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    addOnSeller:{type:mongoose.Schema.Types.ObjectId,required:true},
    rating:{type:Number,required:true},
    review:{type:String,required:false},
    isDeleted:{type:Boolean,default:false},
    type:{type:String, default:false}
 } );

AddOnSellerReviewsSchema.set("timestamps", true);

AddOnSellerReviewsSchema.statics.build = (attrs) => {
    return new AddOnSellerReviews(attrs);
};

const AddOnSellerReviews = mongoose.model(
    "AddOnSellerReviews",
    AddOnSellerReviewsSchema
);

export { AddOnSellerReviews };