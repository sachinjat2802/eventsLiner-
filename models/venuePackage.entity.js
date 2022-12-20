import mongoose, { Mongoose } from "mongoose";



const VenuePackageSchema = new mongoose.Schema({
    venue:{type:mongoose.Schema.Types.ObjectId,required:false,ref:"Venue"},
    name: { type: String, required: true, index: true },
    coverImage: { type: Object, required: false },
    bio: { type: String, required: false },
    isPackageActive:{ type: Boolean, required: true },
    isDeleted: { type: Boolean, required: true },
    type:{ type: String, required: false },
    rating:{type:Number,required:false,default:0},
    totalReviews:{type:Number,required:false,default:0},
    addOnService: {type:[Mongoose.Types.ObjectId], required:false},
    guestCapacity:{type:Number,required:false},
    offers:{type:[String], required:false}
    });

VenuePackageSchema.set("timestamps", true);

VenuePackageSchema.statics.build = (attrs) => {
    return new Venue(attrs);
};

const Venue = mongoose.model(
    "VenuePackage",
    VenuePackageSchema
);

export { Venue };