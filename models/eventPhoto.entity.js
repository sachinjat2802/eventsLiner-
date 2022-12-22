import mongoose from "mongoose";



const EventPhotosSchema = new mongoose.Schema({
    event:{type:mongoose.Schema.Types.ObjectId,required:true},
    assert:{type:Object,required:false} ,   
    isDeleted:{type:Boolean,default:false}});

EventPhotosSchema.set("timestamps", true);

EventPhotosSchema.statics.build = (attrs) => {
    return new EventPhotos(attrs);
};

const EventPhotos = mongoose.model(
    "EventPhotos",
    EventPhotosSchema
);

export { EventPhotos };