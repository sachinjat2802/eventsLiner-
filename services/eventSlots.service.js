import logger from "../logger/logger.js";
import { EventSlots } from "../Models/EventSlots.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class EventSlotsService {
  /**
   * @method:  Create EventSlots.
   */

  async createEventSlots(EventSlotsDoc, next) {
    try {
     
      const similarEventSlots = await new CrudOperations(
        EventSlots
      ).getDocument({"slotStartTime":EventSlotsDoc.slotStartTime }, {});
      if (similarEventSlots) {
        return next("EventSlots already exists");
      }
      EventSlotsDoc.isDeleted = false;
      const eventSlots = new EventSlots(EventSlotsDoc);
      
      await new CrudOperations(EventSlots)
        .save(eventSlots)
        .then(async (result) => {
        next(null, result);

        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateEventSlotss->", err);
      next("Something went wrong");
    }
  }

  async updateEventSlots(id ,EventSlotsDoc, next) {
    try {
      const oldEventSlotsDoc = await new CrudOperations(
        EventSlots
      ).getDocument({ _id: id, isDeleted: false}, {});

      const updatedEventSlotsDoc = _.extend(oldEventSlotsDoc, EventSlotsDoc);

      await new CrudOperations(EventSlots)
        .save(updatedEventSlotsDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update EventSlotss->", err);
      next("Something went wrong");
    }
  }

 
  //   /**
  //    * @method:  Delete EventSlots.
  //    */
  async deleteEventSlots(id,next) {
    try {
        const eventSlots = await new CrudOperations(EventSlots).getDocument({ _id: id, isDeleted: false }, { });
          if(eventSlots){
            eventSlots.isDeleted =true;
            const deletedEventSlots = await new CrudOperations(EventSlots).updateDocument({ _id: id }, eventSlots );
            next(null, deletedEventSlots);
         } else {
        next("No EventSlots Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteEventSlots->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get EventSlots.
  //    */
  async getEventSlots(clauses, projections, options, sort, next) {
    try {
      logger.info(clauses);

      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        EventSlots
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(EventSlots).getAllDocuments(
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
      
      logger.error("GetEventSlots-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new EventSlotsService();
