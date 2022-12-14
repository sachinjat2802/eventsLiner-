import mongoose from "mongoose";

const LocationHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true},
    locations :{type:[Object]}
});

LocationHistorySchema.set("timestamps", true);

LocationHistorySchema.statics.build = (attrs) => {
    return new LocationHistory(attrs);
};

const LocationHistory = mongoose.model(
    "LocationHistory",
    LocationHistorySchema
);

export { LocationHistory };