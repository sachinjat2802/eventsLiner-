import mongoose from "mongoose";

const VenueHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true},
    venues :{type:[Object]}
});

VenueHistorySchema.set("timestamps", true);

VenueHistorySchema.statics.build = (attrs) => {
    return new VenueHistory(attrs);
};

const VenueHistory = mongoose.model(
    "VenueHistory",
    VenueHistorySchema
);

export { VenueHistory };