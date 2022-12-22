import mongoose from "mongoose";



const EventSlotsSchema = new mongoose.Schema({
    event:{type:mongoose.Schema.Types.ObjectId,required:true},
    availableCapacity:{type:Number,required:false},
    bookedCapacity:{type:Number,required:false},
    totalCapacity:{type:Number,required:false},
    eventType:{type:String,required:false},
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

EventSlotsSchema.set("timestamps", true);

EventSlotsSchema.statics.build = (attrs) => {
    return new EventSlots(attrs);
};

const EventSlots = mongoose.model(
    "EventSlots",
    EventSlotsSchema
);

export { EventSlots };