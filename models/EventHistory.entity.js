import mongoose from "mongoose";

const EventHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true},
    events :{type:[Object]}
});

EventHistorySchema.set("timestamps", true);

EventHistorySchema.statics.build = (attrs) => {
    return new EventHistory(attrs);
};

const EventHistory = mongoose.model(
    "EventHistory",
    EventHistorySchema
);

export { EventHistory };