import logger from "../logger/logger.js";
import { Event } from "../Models/Event.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class EventService {
  /**
   * @method:  Create Event.
   */

  async createEvent(EventDoc, next) {
    try {
     const similarEvent = await new CrudOperations(
        Event
      ).getDocument({name:EventDoc.name}, {});
      if (similarEvent) {
        return next("Event already exists");
      }
      EventDoc.isDeleted = false;
      const event = new Event(EventDoc);
      
      await new CrudOperations(Event)
        .save(event)
        .then(async (result) => {
        next(null, result);

        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateEvents->", err);
      next("Something went wrong");
    }
  }

  async updateEvent(id ,EventDoc, next) {
    try {
      const oldEventDoc = await new CrudOperations(
        Event
      ).getDocument({ _id: id, isDeleted: false}, {});

      const updatedEventDoc = _.extend(oldEventDoc, EventDoc);

      await new CrudOperations(Event)
        .save(updatedEventDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update Events->", err);
      next("Something went wrong");
    }
  }

 
  //   /**
  //    * @method:  Delete Event.
  //    */
  async deleteEvent(id,next) {
    try {
        const event = await new CrudOperations(Event).getDocument({ _id: id, isDeleted: false }, { });
          if(event){
            event.isDeleted =true;
            const deletedEvent = await new CrudOperations(Event).updateDocument({ _id: id }, event );
            next(null, deletedEvent);
         } else {
        next("No Event Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteEvent->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get Event.
  //    */
  async getEvent(clauses, projections, options, sort, next) {
    try {
      logger.info(clauses);

      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        Event
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(Event).getAllDocuments(
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
      
      logger.error("GetEvent-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new EventService();
