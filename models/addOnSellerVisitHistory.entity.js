import mongoose from "mongoose";

const AddOnSellerVisitHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true},
    addOnSeller:{ type: mongoose.Types.ObjectId, required: true},
    isDeleted: { type:Boolean , default: false},
});

AddOnSellerVisitHistorySchema.set("timestamps", true);

AddOnSellerVisitHistorySchema.statics.build = (attrs) => {
    return new AddOnSellerVisitHistory(attrs);
};

const AddOnSellerVisitHistory = mongoose.model(
    "AddOnSellerVisitHistory",
    AddOnSellerVisitHistorySchema
);

export { AddOnSellerVisitHistory };