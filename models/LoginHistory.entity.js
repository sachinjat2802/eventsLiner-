import mongoose from "mongoose";

const LoginHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true},
    date :{type:[Date]}
});

LoginHistorySchema.set("timestamps", true);

LoginHistorySchema.statics.build = (attrs) => {
    return new LoginHistory(attrs);
};

const LoginHistory = mongoose.model(
    "LoginHistory",
    LoginHistorySchema
);

export { LoginHistory };