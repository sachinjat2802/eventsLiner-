import mongoose from "mongoose";



const VenueReviewsSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    venue:{type:mongoose.Schema.Types.ObjectId,required:true},
    rating:{type:Number,required:true},
    review:{type:String,required:false},
    isDeleted:{type:Boolean,default:false},
    type:{type:String, default:false}
 } );

VenueReviewsSchema.set("timestamps", true);

VenueReviewsSchema.statics.build = (attrs) => {
    return new VenueReviews(attrs);
};

const VenueReviews = mongoose.model(
    "VenueReviews",
    VenueReviewsSchema
);

export { VenueReviews };