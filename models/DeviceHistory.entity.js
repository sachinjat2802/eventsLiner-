import mongoose from "mongoose";

const DeviceHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true},
    devices :{type:[Object]}
});

DeviceHistorySchema.set("timestamps", true);

DeviceHistorySchema.statics.build = (attrs) => {
    return new DeviceHistory(attrs);
};

const DeviceHistory = mongoose.model(
    "DeviceHistory",
    DeviceHistorySchema
);

export { DeviceHistory };