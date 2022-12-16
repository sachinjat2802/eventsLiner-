import mongoose from "mongoose";



const VenuePhotosSchema = new mongoose.Schema({
    venue:{type:mongoose.Schema.Types.ObjectId,required:true},
    assert:{type:Object,required:false} ,   
    isDeleted:{type:Boolean,default:false}});

VenuePhotosSchema.set("timestamps", true);

VenuePhotosSchema.statics.build = (attrs) => {
    return new VenuePhotos(attrs);
};

const VenuePhotos = mongoose.model(
    "VenuePhotos",
    VenuePhotosSchema
);

export { VenuePhotos };