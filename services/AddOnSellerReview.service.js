import logger from "../logger/logger.js";
import { AddOnSellerReviews } from "../Models/AddOnSellerReview.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class AddOnSellerReviewsService {
  /**
   * @method:  Create AddOnSellerReviews.
   */

  async createAddOnSellerReviews(AddOnSellerReviewsDoc, next) {
    try {
      logger.info(AddOnSellerReviewsDoc)
      const similarAddOnSellerReviews = await new CrudOperations(
        AddOnSellerReviews
      ).getDocument({ userId: AddOnSellerReviewsDoc.userId, isDeleted: false }, {});
      if (similarAddOnSellerReviews) {
        return next("AddOnSellerReviews already exists");
      }
      AddOnSellerReviewsDoc.isDeleted = false;
      const addOnSellerReviews = new AddOnSellerReviews(AddOnSellerReviewsDoc);
      
      await new CrudOperations(AddOnSellerReviews)
        .save(addOnSellerReviews)
        .then(async (result) => {
        next(null, result);

        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateAddOnSellerReviewss->", err);
      next("Something went wrong");
    }
  }

  async updateAddOnSellerReviews(id ,AddOnSellerReviewsDoc, next) {
    try {
      const oldAddOnSellerReviewsDoc = await new CrudOperations(
        AddOnSellerReviews
      ).getDocument({ _id: id, isDeleted: false}, {});

      const updatedAddOnSellerReviewsDoc = _.extend(oldAddOnSellerReviewsDoc, AddOnSellerReviewsDoc);

      await new CrudOperations(AddOnSellerReviews)
        .save(updatedAddOnSellerReviewsDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update AddOnSellerReviewss->", err);
      next("Something went wrong");
    }
  }
 
 
  //   /**
  //    * @method:  Delete AddOnSellerReviews.
  //    */
  async deleteAddOnSellerReviews(id, next) {
    try {
        const addOnSellerReviews = await new CrudOperations( AddOnSellerReviews).getDocument({ _id: id, isDeleted: false}, { });
          if(addOnSellerReviews){
            addOnSellerReviews.isDeleted =true;
            const deletedAddOnSellerReviews = await new CrudOperations( AddOnSellerReviews).updateDocument({ _id: id }, addOnSellerReviews );
            next(null, deletedAddOnSellerReviews);
         } else {
        next("No AddOnSellerReviews Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteAddOnSellerReviews->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get AddOnSellerReviews.
  //    */
  async getAddOnSellerReviews(clauses, projections, options, sort, next) {
    try {
      logger.info(clauses);

      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        AddOnSellerReviews
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(AddOnSellerReviews).getAllDocuments(
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
      
      logger.error("GetAddOnSellerReviews-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new AddOnSellerReviewsService();
