import mongoose from "mongoose";



const AddOnSellerPhotoSchema = new mongoose.Schema({
    addOnSeller:{type:mongoose.Schema.Types.ObjectId,required:true},
    assert:{type:Object,required:false} ,   
    isDeleted:{type:Boolean,default:false}});

AddOnSellerPhotoSchema.set("timestamps", true);

AddOnSellerPhotoSchema.statics.build = (attrs) => {
    return new AddOnSellerPhoto(attrs);
};

const AddOnSellerPhoto = mongoose.model(
    "AddOnSellerPhoto",
    AddOnSellerPhotoSchema
);

export { AddOnSellerPhoto };