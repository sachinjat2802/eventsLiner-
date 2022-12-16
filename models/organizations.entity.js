import mongoose from "mongoose";



const OrganizationSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    contactPersonName: { type: String, required: false },
    contactPersonNumber: { type: Object, required: false },
    logo: { type: Object, required: false },
    coverImage: { type: Object, required: false },
    bio: { type: String, required: false },
    members: { type: [String], required: true },
    isDeleted: { type: Boolean, required: true },
    isOrganizationActive: { type: Boolean, required: true },
    socialMediaDetails: { type: Object, required: false },
    kycVerified: { type: Boolean, required: false, default: false },
    block: { type: Boolean, required: false },
    ban: { type: Boolean, required: false },
    kycDocuments: { type: Object, required: false }
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