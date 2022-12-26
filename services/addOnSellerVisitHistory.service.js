import logger from "../logger/logger.js";
import { AddOnSellerVisitHistory } from "../Models/AddOnSellerVisitHistory.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class AddOnSellerVisitHistoryService {
  /**
   * @method:  Create AddOnSellerVisitHistory.
   */

  async createAddOnSellerVisitHistory(AddOnSellerVisitHistoryDoc, next) {
    try {
     
      
      AddOnSellerVisitHistoryDoc.isDeleted = false;
      const addOnSellerVisitHistory = new AddOnSellerVisitHistory(AddOnSellerVisitHistoryDoc);
      
      await new CrudOperations(AddOnSellerVisitHistory)
        .save(addOnSellerVisitHistory)
        .then(async (result) => {
        next(null, result);

        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateAddOnSellerVisitHistorys->", err);
      next("Something went wrong");
    }
  }

  async updateAddOnSellerVisitHistory(id ,AddOnSellerVisitHistoryDoc, next) {
    try {
      const oldAddOnSellerVisitHistoryDoc = await new CrudOperations(
        AddOnSellerVisitHistory
      ).getDocument({ _id: id, isDeleted: false}, {});

      const updatedAddOnSellerVisitHistoryDoc = _.extend(oldAddOnSellerVisitHistoryDoc, AddOnSellerVisitHistoryDoc);

      await new CrudOperations(AddOnSellerVisitHistory)
        .save(updatedAddOnSellerVisitHistoryDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update AddOnSellerVisitHistorys->", err);
      next("Something went wrong");
    }
  }

 
  //   /**
  //    * @method:  Delete AddOnSellerVisitHistory.
  //    */
  async deleteAddOnSellerVisitHistory(id,next) {
    try {
        const AddOnSellerVisitHistory = await new CrudOperations(AddOnSellerVisitHistory).getDocument({ _id: id, isDeleted: false }, { });
          if(AddOnSellerVisitHistory){
            AddOnSellerVisitHistory.isDeleted =true;
            const deletedAddOnSellerVisitHistory = await new CrudOperations(AddOnSellerVisitHistory).updateDocument({ _id: id }, AddOnSellerVisitHistory );
            next(null, deletedAddOnSellerVisitHistory);
         } else {
        next("No AddOnSellerVisitHistory Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteAddOnSellerVisitHistory->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get AddOnSellerVisitHistory.
  //    */
  async getAddOnSellerVisitHistory(clauses, projections, options, sort, next) {
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
        AddOnSellerVisitHistory
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(AddOnSellerVisitHistory).getAllDocuments(
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
      
      logger.error("GetAddOnSellerVisitHistory-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new AddOnSellerVisitHistoryService();
