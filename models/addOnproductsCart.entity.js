import mongoose from "mongoose";



const AddOnProductCartSchema = new mongoose.Schema({
    userId : { type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true },
    items : [{
        productId: { type: mongoose.Types.ObjectId, ref: "AddOnSellerProduct", required: true},
        quantity: { type: Number,default:1 }
    }],
    totalPrice: { type: Number, required: true },
    totalItems: { type : Number, required: true}
 }
);

AddOnProductCartSchema.set("timestamps", true);

AddOnProductCartSchema.statics.build = (attrs) => {
    return new AddOnProductCart(attrs);
};

const AddOnProductCart = mongoose.model(
    "AddOnProductCart",
    AddOnProductCartSchema
);

export { AddOnProductCart };