import mongoose from "mongoose";



const VenueSchema = new mongoose.Schema({
    organization:{type:mongoose.Schema.Types.ObjectId,required:false,ref:"Organization"},
    name: { type: String, required: true, index: true },
    contactPersonName: { type: String, required: false },
    contactPersonNumber: { type: Object, required: false },
    logo: { type: Object, required: false },
    coverImage: { type: Object, required: false },
    bio: { type: String, required: false },
    isVenueActive:{ type: Boolean, required: true },
    isDeleted: { type: Boolean, required: true },
    socialMediaDetails: { type: Object, required: false },
    VenueRating: { type: Number, required: false },
    kycVerified: { type: Boolean, required: false, default: false },
    block: { type: Boolean, required: false },
    ban: { type: Boolean, required: false },
    type:{ type: String, required: false },
    cusineCategory:{type: [String], required: false},
    cusineType:{type: String, required: false},
    address: { type: String, required: false },
    region:{ type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required:false},
    timing:{ type: String, required: false },
    location:{type: Object, required: false},
    rating:{type:Number,required:false,default:0},
    totalReviews:{type:Number,required:false,default:0},
    kycDocuments: { type: Object, required: false }

    });

VenueSchema.set("timestamps", true);

VenueSchema.statics.build = (attrs) => {
    return new Venue(attrs);
};

const Venue = mongoose.model(
    "Venue",
    VenueSchema
);

export { Venue };