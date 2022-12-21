import mongoose from "mongoose";



const AddOnSellerProductSchema = new mongoose.Schema({
    addOnSeller:{type:mongoose.Schema.Types.ObjectId,required:false,ref:"AddOnSeller"},
    name: { type: String, required: true, index: true },
    contactPersonName: { type: String, required: false },
    contactPersonNumber: { type: Object, required: false },
    isService:{type:Boolean, required:false},
    isProduct:{type:Boolean, required:false},
    logo: { type: Object, required: false },
    coverImage: { type: Object, required: false },
    bio: { type: String, required: false },
    productFeature:{type:[String],required: false},
    isDeleted: { type: Boolean, required: false ,default:false},
    productCategory:{type: [String], required: false},
    productType:{type: String, required: false},
    rating:{type:Number,required:false,default:0},
    totalReviews:{type:Number,required:false,default:0},
    quantity:{type:Number, required:false},
    pricePerItem:{type:Number, required:false},
    isVerifiedByAdmin:{ type: Boolean, required: false, default:false },

   
});

AddOnSellerProductSchema.set("timestamps", true);

AddOnSellerProductSchema.statics.build = (attrs) => {
    return new AddOnSellerProduct(attrs);
};

const AddOnSellerProduct = mongoose.model(
    "AddOnSellerProduct",
    AddOnSellerProductSchema
);

export { AddOnSellerProduct };