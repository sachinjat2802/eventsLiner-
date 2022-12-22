import mongoose from "mongoose";

const EventVisitHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true},
    event:{ type: mongoose.Types.ObjectId, required: true},
    isDeleted: { type:Boolean , default: false},
});

EventVisitHistorySchema.set("timestamps", true);

EventVisitHistorySchema.statics.build = (attrs) => {
    return new EventVisitHistory(attrs);
};

const EventVisitHistory = mongoose.model(
    "EventVisitHistory",
    EventVisitHistorySchema
);

export { EventVisitHistory };