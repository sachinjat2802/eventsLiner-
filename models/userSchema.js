import mongoose from "mongoose";
import { Password } from "../utils/index.js";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: false, index: true, unique: true },
    typeOfLogin:{type: [String], required:true },
    phone:{type:Number, required:false},
    userName:{type:String, required:false},
    is18AndAbove:{type:Boolean, default: false},
    isVerified:{type:Boolean, default:false},
    isDeleted:{type:Boolean, default:false},
    isBanned:{type:Boolean, default:false},
    isBlocked:{type:Boolean, default:false},
    address:{type:Object, required:false},
    isVenuePartner:{type:Boolean, default: false},
    isAddOnSeller:{type:Boolean, default:false},
    name: { type: String, required: false },
    password: { type: String, required: false },
    role: { type: String, required: false, default: "USER" },
    profilePicture: { type: Object, required: false },
    uuid:{ type:String},
    venueId:{type:mongoose.Types.ObjectId, ref:'venue'},
    location:{type:Object},
    deviceInfo:{type:Object},
    addToFavourites:{type:[Object]},
    // sellerHistory:{type:[Object]},
    last_logged_in_time:{type:Date, default:Date.now},
    bookMarks:{type: [String], required: false }

}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
}
);

UserSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get("password"));
        this.set("password", hashed);
    }
    done();
});

UserSchema.set("timestamps", true);

UserSchema.statics.build = (attrs) => {
    return new User(attrs);
};

const User = mongoose.model(
    "User",
    UserSchema
);

export { User, UserSchema};
