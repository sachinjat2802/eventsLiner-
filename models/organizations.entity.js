import mongoose from "mongoose";



const OrganizationSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    contactPersonUsername: { type: String, required: false },
    contactPersonName: { type: String, required: false },
    contactPersonNumber: { type: Object, required: false },
    logo: { type: Object, required: false },
    coverImage: { type: Object, required: false },
    bio: { type: String, required: false },
    members: { type: Object, required: true },
    isDeleted: { type: Boolean, required: true },
    isOrganizationActive: { type: Boolean, required: true },
    socialMediaDetails: { type: Object, required: false },
    organizationRating: { type: Number, required: false },
    notifications: { type: Object, required: false },
    kycVerified: { type: Boolean, required: false, default: false },
    isVerified:{ type: Boolean, required: false, default: false},
    rating:{ type: Number, required: false },
    isBettingEnabled: { type: Boolean, required: false, default: false },
    block: { type: Boolean, required: false },
    ban: { type: Boolean, required: false },
    den:{ type: mongoose.Types.ObjectId, required: false, ref: "DenProfile", default:null},


});

OrganizationSchema.set("timestamps", true);

OrganizationSchema.statics.build = (attrs) => {
    return new Organization(attrs);
};

const Organization = mongoose.model(
    "Organization",
    OrganizationSchema
);

export { Organization };