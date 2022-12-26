import logger from "../logger/logger.js";
import { VenueVisitHistory } from "../Models/VenueVisitHistory.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class VenueVisitHistoryService {
  /**
   * @method:  Create VenueVisitHistory.
   */

  async createVenueVisitHistory(VenueVisitHistoryDoc, next) {
    try {
     
      
      VenueVisitHistoryDoc.isDeleted = false;
      const venueVisitHistory = new VenueVisitHistory(VenueVisitHistoryDoc);
      
      await new CrudOperations(VenueVisitHistory)
        .save(venueVisitHistory)
        .then(async (result) => {
        next(null, result);

        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateVenueVisitHistorys->", err);
      next("Something went wrong");
    }
  }

  async updateVenueVisitHistory(id ,VenueVisitHistoryDoc, next) {
    try {
      const oldVenueVisitHistoryDoc = await new CrudOperations(
        VenueVisitHistory
      ).getDocument({ _id: id, isDeleted: false}, {});

      const updatedVenueVisitHistoryDoc = _.extend(oldVenueVisitHistoryDoc, VenueVisitHistoryDoc);

      await new CrudOperations(VenueVisitHistory)
        .save(updatedVenueVisitHistoryDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update VenueVisitHistorys->", err);
      next("Something went wrong");
    }
  }

 
  //   /**
  //    * @method:  Delete VenueVisitHistory.
  //    */
  async deleteVenueVisitHistory(id,next) {
    try {
        const venueVisitHistory = await new CrudOperations(VenueVisitHistory).getDocument({ _id: id, isDeleted: false }, { });
          if(venueVisitHistory){
            venueVisitHistory.isDeleted =true;
            const deletedVenueVisitHistory = await new CrudOperations(VenueVisitHistory).updateDocument({ _id: id }, venueVisitHistory );
            next(null, deletedVenueVisitHistory);
         } else {
        next("No VenueVisitHistory Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteVenueVisitHistory->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get VenueVisitHistory.
  //    */
  async getVenueVisitHistory(clauses, projections, options, sort, next) {
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
        VenueVisitHistory
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(VenueVisitHistory).getAllDocuments(
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
      
      logger.error("GetVenueVisitHistory-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new VenueVisitHistoryService();
