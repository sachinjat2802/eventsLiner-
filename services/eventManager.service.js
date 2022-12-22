import logger from "../logger/logger.js";
import { EventManager } from "../models/EventManager.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class EventManagerService {
  /**
   * @method:  Create EventManager.
   */

  async createEventManager(EventManagerDoc, next) {
    try {
      const similarEventManager = await new CrudOperations(EventManager).getDocument(
        { name: EventManagerDoc.name, isDeleted: false },
        {}
      );
      if (similarEventManager) {
        return next("EventManager already exists");
      }
      EventManagerDoc.isDeleted = false;
      const eventManager = new EventManager(EventManagerDoc);
      await new CrudOperations(EventManager)
        .save(eventManager)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateEventManagers->", err);
      next("Something went wrong");
    }
  }


  
  
  async updateEventManager(id, userId, EventManagerDoc, next) {
    try {
      const oldEventManagerDoc = await new CrudOperations(EventManager).getDocument(
        { _id: id, isDeleted: false },
        {}
      );

      const updatedGameDoc = _.extend(oldEventManagerDoc, EventManagerDoc);

      await new CrudOperations(EventManager)
        .save(updatedGameDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update EventManagers->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Delete EventManager.
  //    */
  async deleteEventManager(id, next) {
    try {
      const eventManager = await new CrudOperations(EventManager).getDocument(
        { _id: id, isDeleted: false },
        {}
      );
      if (eventManager) {
        eventManager.isDeleted = true;
        const deletedEventManager = await new CrudOperations(EventManager).updateDocument(
          { _id: id },
          eventManager
        );
        next(null, deletedEventManager);
      } else {
        next("No EventManager Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteEventManager->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get EventManager.
  //    */
  async getEventManager(clauses, projections, options, sort, next) {
    try {
      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(EventManager).countAllDocuments(
        clauses
      );
      const results = await new CrudOperations(EventManager).getAllDocuments(
        clauses,
        projections,
        options,
        sort
      );

      const response = { results: results, totalResult: totalResult };
      logger.info(response);
      next(null, response);
    } catch (err) {
      logger.info(err);

      logger.error("GetEventManager-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new EventManagerService();
