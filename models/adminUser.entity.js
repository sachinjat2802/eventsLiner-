import mongoose from "mongoose";
import { Password } from "../utils/index.js";

const AdminUserSchema = new mongoose.Schema({
    email: { type: String, required: false, index: true, unique: true },
    name: { type: String, required: false },
    isDeleted: { type: Boolean, required: true },
    password: { type: String, required: false },
    role: { type: String, required: false, default: "ADMIN" },
    profilePicture: { type: Object, required: false },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
},
);

AdminUserSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get("password"));
        this.set("password", hashed);
    }
    done();
});

AdminUserSchema.set("timestamps", true);

AdminUserSchema.statics.build = (attrs) => {
    return new AdminUser(attrs);
};

const AdminUser = mongoose.model(
    "AdminUser",
    AdminUserSchema
);

export { AdminUser, AdminUserSchema};
