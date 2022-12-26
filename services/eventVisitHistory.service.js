import logger from "../logger/logger.js";
import { EventVisitHistory } from "../Models/EventVisitHistory.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class EventVisitHistoryService {
  /**
   * @method:  Create EventVisitHistory.
   */

  async createEventVisitHistory(EventVisitHistoryDoc, next) {
    try {
     
      
      EventVisitHistoryDoc.isDeleted = false;
      const eventVisitHistory = new EventVisitHistory(EventVisitHistoryDoc);
      
      await new CrudOperations(EventVisitHistory)
        .save(eventVisitHistory)
        .then(async (result) => {
        next(null, result);

        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateEventVisitHistorys->", err);
      next("Something went wrong");
    }
  }

  async updateEventVisitHistory(id ,EventVisitHistoryDoc, next) {
    try {
      const oldEventVisitHistoryDoc = await new CrudOperations(
        EventVisitHistory
      ).getDocument({ _id: id, isDeleted: false}, {});

      const updatedEventVisitHistoryDoc = _.extend(oldEventVisitHistoryDoc, EventVisitHistoryDoc);

      await new CrudOperations(EventVisitHistory)
        .save(updatedEventVisitHistoryDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update EventVisitHistorys->", err);
      next("Something went wrong");
    }
  }

 
  //   /**
  //    * @method:  Delete EventVisitHistory.
  //    */
  async deleteEventVisitHistory(id,next) {
    try {
        const EventVisitHistory = await new CrudOperations(EventVisitHistory).getDocument({ _id: id, isDeleted: false }, { });
          if(EventVisitHistory){
            EventVisitHistory.isDeleted =true;
            const deletedEventVisitHistory = await new CrudOperations(EventVisitHistory).updateDocument({ _id: id }, EventVisitHistory );
            next(null, deletedEventVisitHistory);
         } else {
        next("No EventVisitHistory Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteEventVisitHistory->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get EventVisitHistory.
  //    */
  async getEventVisitHistory(clauses, projections, options, sort, next) {
    try {
      logger.info(clauses);
      if(clauses.from && clauses.to){
        // eslint-disable-next-line no-undef
        clauses.createdAt={ $gte:`${clauses.from}`, $lte:`${clauses.to}`};
        delete clauses.from;
        delete clauses.to;
      }

      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        EventVisitHistory
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(EventVisitHistory).getAllDocuments(
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
      
      logger.error("GetEventVisitHistory-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new EventVisitHistoryService();
