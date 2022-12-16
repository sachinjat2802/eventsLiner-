import logger from "../logger/logger.js";
import { VenueReviews } from "../models/venueReview.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class VenueReviewsService {
  /**
   * @method:  Create VenueReviews.
   */

  async createVenueReviews(VenueReviewsDoc, next) {
    try {
      const similarVenueReviews = await new CrudOperations(
        VenueReviews
      ).getDocument({ name: VenueReviewsDoc.name, isDeleted: false }, {});
      if (similarVenueReviews) {
        return next("VenueReviews already exists");
      }
      VenueReviewsDoc.isDeleted = false;
      const VenueReviews = new VenueReviews(VenueReviewsDoc);
      await new CrudOperations(VenueReviews)
        .save(VenueReviews)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateVenueReviewss->", err);
      next("Something went wrong");
    }
  }

  async updateVenueReviews(id,userId ,VenueReviewsDoc, next) {
    try {
      const oldVenueReviewsDoc = await new CrudOperations(
        VenueReviews
      ).getDocument({ _id: id, isDeleted: false,members:userId }, {});

      const updatedGameDoc = _.extend(oldVenueReviewsDoc, VenueReviewsDoc);

      await new CrudOperations(VenueReviews)
        .save(updatedGameDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update VenueReviewss->", err);
      next("Something went wrong");
    }
  }

 
  //   /**
  //    * @method:  Delete VenueReviews.
  //    */
  async deleteVenueReviews(id, userId,next) {
    try {
        const VenueReviews = await new CrudOperations( VenueReviews).getDocument({ _id: id, isDeleted: false,members:userId }, { });
          if(VenueReviews){
            VenueReviews.isDeleted =true;
            const deletedVenueReviews = await new CrudOperations( VenueReviews).updateDocument({ _id: id }, VenueReviews );
            next(null, deletedVenueReviews);
         } else {
        next("No VenueReviews Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteVenueReviews->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get VenueReviews.
  //    */
  async getVenueReviews(clauses, projections, options, sort, next) {
    try {
      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        VenueReviews
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(VenueReviews).getAllDocuments(
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

      logger.error("GetVenueReviews-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new VenueReviewsService();
