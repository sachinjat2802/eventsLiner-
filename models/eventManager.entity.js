import mongoose from "mongoose";



const EventManagerSchema = new mongoose.Schema({
    organization:{type:mongoose.Schema.Types.ObjectId,required:false,ref:"Organization"},
    name: { type: String, required: true, index: true },
    contactPersonName: { type: String, required: false },
    contactPersonNumber: { type: Object, required: false },
    logo: { type: Object, required: false },
    coverImage: { type: Object, required: false },
    bio: { type: String, required: false },
    isEventManagerActive:{ type: Boolean, required: false },
    isDeleted: { type: Boolean, required: true },
    socialMediaDetails: { type: Object, required: false },
    EventManagerRating: { type: Number, required: false },
    kycVerified: { type: Boolean, required: false, default: false },
    block: { type: Boolean, required: false },
    ban: { type: Boolean, required: false },
    type:{ type: String, required: false },
    productCategory:{type: [String], required: false},
    productType:{type: String, required: false},
    address: { type: String, required: false },
    region:{ type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required:false},
    timing:{ type: String, required: false },
    location:{type: Object, required: false},
    rating:{type:Number,required:false,default:0},
    totalReviews:{type:Number,required:false,default:0},
    kycDocuments: { type: Object, required: false },
    members:{type:[mongoose.Types.ObjectId],required:false},
    commissions:{type:mongoose.Types.ObjectId,required:false,ref :"Commission"},
    tax:{type:mongoose.Types.ObjectId,required:false,ref :"Tax"}


    });

EventManagerSchema.set("timestamps", true);

EventManagerSchema.statics.build = (attrs) => {
    return new EventManager(attrs);
};

const EventManager = mongoose.model(
    "EventManager",
    EventManagerSchema
);

export { EventManager };