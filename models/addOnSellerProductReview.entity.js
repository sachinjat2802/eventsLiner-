import mongoose from "mongoose";



const ProductReviewsSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    Product:{type:mongoose.Schema.Types.ObjectId,required:true},
    rating:{type:Number,required:false},
    review:{type:String,required:false},
    isDeleted:{type:Boolean,default:false},
    type:{type:String, default:false}
 } );

ProductReviewsSchema.set("timestamps", true);

ProductReviewsSchema.statics.build = (attrs) => {
    return new ProductReviews(attrs);
};

const ProductReviews = mongoose.model(
    "ProductReviews",
    ProductReviewsSchema
);

export { ProductReviews };