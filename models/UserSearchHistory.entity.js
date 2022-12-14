import mongoose from "mongoose";

const UserSearchHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true},
    searchText :{type:[Object]}
});

UserSearchHistorySchema.set("timestamps", true);

UserSearchHistorySchema.statics.build = (attrs) => {
    return new UserSearchHistory(attrs);
};

const UserSearchHistory = mongoose.model(
    "UserSearchHistory",
    UserSearchHistorySchema
);

export { UserSearchHistory };