import mongoose from "mongoose";

const SellerHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true},
    sellers :{type:[Object]}
});

SellerHistorySchema.set("timestamps", true);

SellerHistorySchema.statics.build = (attrs) => {
    return new SellerHistory(attrs);
};

const SellerHistory = mongoose.model(
    "SellerHistory",
    SellerHistorySchema
);

export { SellerHistory };