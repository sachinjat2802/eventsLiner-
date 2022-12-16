import mongoose from "mongoose";



const VenueMenusSchema = new mongoose.Schema({
    venue:{type:mongoose.Schema.Types.ObjectId,required:true},
    assert:{type:Object,required:true},
    isDeleted: {type:Boolean,default:false}
    });

VenueMenusSchema.set("timestamps", true);

VenueMenusSchema.statics.build = (attrs) => {
    return new VenueMenus(attrs);
};

const VenueMenus = mongoose.model(
    "VenueMenus",
    VenueMenusSchema
);

export { VenueMenus };