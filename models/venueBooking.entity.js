import mongoose from "mongoose";



const VenueBookingSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    venue:{type:mongoose.Schema.Types.ObjectId,required:true},
    date:{type:Date,required:false},
    time:{type:String,required:false},
    timeSlots:{type:[mongoose.Schema.Types.ObjectId],required:false},
    noOfGuest:{type:Number,required:false},
    status:{type:String,required:false},
    bookingType:{type:String,required:false},
    paymentType:{type:String,required:false},
    paymentStatus:{type:String,required:false},
    isDeleted:{type:Boolean,default:false},
    isCanceled:{type:Boolean,default:false},
    canceledBy:{type:String,default:false},
    canceledDescription:{type:String,default:false},
    canceledAt:{type:Date,default:false}
    }
);

VenueBookingSchema.set("timestamps", true);

VenueBookingSchema.statics.build = (attrs) => {
    return new VenueBooking(attrs);
};

const VenueBooking = mongoose.model(
    "VenueBooking",
    VenueBookingSchema
);

export { VenueBooking };