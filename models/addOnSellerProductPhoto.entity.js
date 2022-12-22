import mongoose from "mongoose";



const AddOnSellerProductPhotoSchema = new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId,required:true},
    assert:{type:Object,required:false} ,   
    isDeleted:{type:Boolean,default:false}});

AddOnSellerProductPhotoSchema.set("timestamps", true);

AddOnSellerProductPhotoSchema.statics.build = (attrs) => {
    return new AddOnSellerProductPhoto(attrs);
};

const AddOnSellerProductPhoto = mongoose.model(
    "AddOnSellerProductPhoto",
    AddOnSellerProductPhotoSchema
);

export { AddOnSellerProductPhoto };