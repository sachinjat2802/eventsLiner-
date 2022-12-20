import mongoose from "mongoose";



const VenueSlotsSchema = new mongoose.Schema({
    venue:{type:mongoose.Schema.Types.ObjectId,required:true},
    availableCapacity:{type:Number,required:false},
    bookedCapacity:{type:Number,required:false},
    totalCapacity:{type:Number,required:false},
    diningType:{type:String,required:false},
    earlyBird:{type:Boolean,required:false,default:false},
    lateBird:{type:Boolean,required:false,default:false},
    flexiSlot:{type:Boolean,required:false,default:false},
    slotDesc:{type:String,required:false,default:"slot1"},
    slotStartTime:{type:Date,required:true},
    slotStopTime:{type:Date,required:true},
    slotStatus:{type:Boolean,required:true,default:true},
    isDeleted:{type:Boolean,required:false,default:false}
}
);

VenueSlotsSchema.set("timestamps", true);

VenueSlotsSchema.statics.build = (attrs) => {
    return new VenueSlots(attrs);
};

const VenueSlots = mongoose.model(
    "VenueSlots",
    VenueSlotsSchema
);

export { VenueSlots };