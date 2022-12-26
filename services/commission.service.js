import logger from "../logger/logger.js";
import { Commission } from "../Models/Commission.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class CommissionService {
  /**
   * @method:  Create Commission.
   */

  async createCommission(CommissionDoc, next) {
    try {
      const similarCommission = await new CrudOperations(
        Commission
      ).getDocument({ name: CommissionDoc.name, isDeleted: false }, {});
      if (similarCommission) {
        return next("Commission already exists");
      }
      
      CommissionDoc.isDeleted = false;
      const commission = new Commission(CommissionDoc);
      
      await new CrudOperations(Commission)
        .save(commission)
        .then(async (result) => {
        next(null, result);

        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateCommissions->", err);
      next("Something went wrong");
    }
  }

  async updateCommission(id ,CommissionDoc, next) {
    try {
      const oldCommissionDoc = await new CrudOperations(
        Commission
      ).getDocument({ _id: id, isDeleted: false}, {});

      const updatedCommissionDoc = _.extend(oldCommissionDoc, CommissionDoc);

      await new CrudOperations(Commission)
        .save(updatedCommissionDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update Commissions->", err);
      next("Something went wrong");
    }
  }

 
  //   /**
  //    * @method:  Delete Commission.
  //    */
  async deleteCommission(id,next) {
    try {
        const commission = await new CrudOperations(Commission).getDocument({ _id: id, isDeleted: false }, { });
          if(commission){
            commission.isDeleted =true;
            const deletedCommission = await new CrudOperations(Commission).updateDocument({ _id: id }, commission );
            next(null, deletedCommission);
         } else {
        next("No Commission Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteCommission->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get Commission.
  //    */
  async getCommission(clauses, projections, options, sort, next) {
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
        Commission
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(Commission).getAllDocuments(
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
      
      logger.error("GetCommission-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new CommissionService();
