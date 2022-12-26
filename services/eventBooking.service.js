import logger from "../logger/logger.js";
import { EventBooking } from "../Models/EventBooking.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class EventBookingService {
  /**
   * @method:  Create EventBooking.
   */

  async createEventBooking(EventBookingDoc, next) {
    try {
     const similarEventBooking = await new CrudOperations(
        EventBooking
      ).getDocument({"timeSlots":EventBookingDoc.timeSlots,userId:EventBookingDoc.userId,venueId:EventBookingDoc.venue }, {});
      if (similarEventBooking) {
        return next("EventBooking already exists");
      }
      EventBookingDoc.isDeleted = false;
      const eventBooking = new EventBooking(EventBookingDoc);
      
      await new CrudOperations(EventBooking)
        .save(eventBooking)
        .then(async (result) => {
        next(null, result);

        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateEventBookings->", err);
      next("Something went wrong");
    }
  }

  async updateEventBooking(id ,EventBookingDoc, next) {
    try {
      const oldEventBookingDoc = await new CrudOperations(
        EventBooking
      ).getDocument({ _id: id, isDeleted: false}, {});

      const updatedEventBookingDoc = _.extend(oldEventBookingDoc, EventBookingDoc);

      await new CrudOperations(EventBooking)
        .save(updatedEventBookingDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update EventBookings->", err);
      next("Something went wrong");
    }
  }

 
  //   /**
  //    * @method:  Delete EventBooking.
  //    */
  async deleteEventBooking(id,next) {
    try {
        const eventBooking = await new CrudOperations(EventBooking).getDocument({ _id: id, isDeleted: false }, { });
          if(eventBooking){
            eventBooking.isDeleted =true;
            const deletedEventBooking = await new CrudOperations(EventBooking).updateDocument({ _id: id }, eventBooking );
            next(null, deletedEventBooking);
         } else {
        next("No EventBooking Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteEventBooking->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get EventBooking.
  //    */
  async getEventBooking(clauses, projections, options, sort, next) {
    try {
      logger.info(clauses);

      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        EventBooking
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(EventBooking).getAllDocuments(
        clauses,
        projections,
        options,
        sort
      );
      logger.info(results);

      const response = { results: results, totalResult: totalResult };
      next(null, response);
    } catch (err) {
      logger.info(err);
      
      logger.error("GetEventBooking-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new EventBookingService();
