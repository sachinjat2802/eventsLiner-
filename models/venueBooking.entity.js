import mongoose from "mongoose";



const VenueBookingSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    venue:{type:mongoose.Schema.Types.ObjectId,required:true},
    date:{type:Date,required:false},
    time:{type:String,required:false},
    availability:{type:String,required:false},
    timeSlots:{type:[String],required:false},
    noOfGuest:{type:Number,required:false},
    status:{type:String,required:false},
    bookingType:{type:String,required:true},
    paymentType:{type:String,required:false},
    paymentStatus:{type:String,required:false}
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