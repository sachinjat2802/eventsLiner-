import mongoose, { Mongoose } from "mongoose";



const VenuePackageSchema = new mongoose.Schema({
    venue:{type:mongoose.Schema.Types.ObjectId,required:false,ref:"Venue"},
    name: { type: String, required: true, index: true },
    coverImage: { type: Object, required: false },
    bio: { type: String, required: false },
    isPackageActive:{ type: Boolean, required: true },
    isDeleted: { type: Boolean, required: false, default:false},
    type:{ type: String, required: false },
    rating:{type:Number,required:false,default:0},
    totalReviews:{type:Number,required:false,default:0},
    addOnService: {type:[mongoose.Types.ObjectId], required:false},
    guestCapacity:{type:Number,required:false},
    offers:{type:[String], required:false}
    });

VenuePackageSchema.set("timestamps", true);

VenuePackageSchema.statics.build = (attrs) => {
    return new Venue(attrs);
};

const VenuePackage = mongoose.model(
    "VenuePackage",
    VenuePackageSchema
);

export { VenuePackage };