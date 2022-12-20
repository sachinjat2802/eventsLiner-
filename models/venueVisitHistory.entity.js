import mongoose from "mongoose";

const VenueVisitHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true},
    venue:{ type: mongoose.Types.ObjectId, required: true},
    isDeleted: { type:Boolean , default: false},
});

VenueVisitHistorySchema.set("timestamps", true);

VenueVisitHistorySchema.statics.build = (attrs) => {
    return new VenueVisitHistory(attrs);
};

const VenueVisitHistory = mongoose.model(
    "VenueVisitHistory",
    VenueVisitHistorySchema
);

export { VenueVisitHistory };