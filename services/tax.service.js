import logger from "../logger/logger.js";
import { Tax } from "../Models/tax.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class TaxService {
  /**
   * @method:  Create Tax.
   */

  async createTax(TaxDoc, next) {
    try {
      const similarTax = await new CrudOperations(
        Tax
      ).getDocument({ name: TaxDoc.name, isDeleted: false }, {});
      if (similarTax) {
        return next("Tax already exists");
      }
      
      TaxDoc.isDeleted = false;
      const tax = new Tax(TaxDoc);
      
      await new CrudOperations(Tax)
        .save(tax)
        .then(async (result) => {
        next(null, result);

        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateTaxs->", err);
      next("Something went wrong");
    }
  }

  async updateTax(id ,TaxDoc, next) {
    try {
      const oldTaxDoc = await new CrudOperations(
        Tax
      ).getDocument({ _id: id, isDeleted: false}, {});

      const updatedTaxDoc = _.extend(oldTaxDoc, TaxDoc);

      await new CrudOperations(Tax)
        .save(updatedTaxDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update Taxs->", err);
      next("Something went wrong");
    }
  }

 
  //   /**
  //    * @method:  Delete Tax.
  //    */
  async deleteTax(id,next) {
    try {
        const tax = await new CrudOperations(Tax).getDocument({ _id: id, isDeleted: false }, { });
          if(tax){
            tax.isDeleted =true;
            const deletedTax = await new CrudOperations(Tax).updateDocument({ _id: id }, tax );
            next(null, deletedTax);
         } else {
        next("No Tax Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteTax->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get Tax.
  //    */
  async getTax(clauses, projections, options, sort, next) {
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
        Tax
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(Tax).getAllDocuments(
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
      
      logger.error("GetTax-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new TaxService();
