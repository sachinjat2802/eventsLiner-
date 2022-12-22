import logger from "../logger/logger.js";
import { ProductReviews } from "../models/addOnSellerProductReview.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class ProductReviewsService {
  /**
   * @method:  Create ProductReviews.
   */

  async createProductReviews(ProductReviewsDoc, next) {
    try {
      logger.info(ProductReviewsDoc)
      const similarProductReviews = await new CrudOperations(
        ProductReviews
      ).getDocument({ userId: ProductReviewsDoc.userId, isDeleted: false }, {});
      if (similarProductReviews) {
        return next("ProductReviews already exists");
      }
      ProductReviewsDoc.isDeleted = false;
      const productReviews = new ProductReviews(ProductReviewsDoc);
      
      await new CrudOperations(ProductReviews)
        .save(productReviews)
        .then(async (result) => {
        next(null, result);

        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateProductReviewss->", err);
      next("Something went wrong");
    }
  }

  async updateProductReviews(id ,ProductReviewsDoc, next) {
    try {
      const oldProductReviewsDoc = await new CrudOperations(
        ProductReviews
      ).getDocument({ _id: id, isDeleted: false}, {});
       logger.info(oldProductReviewsDoc, id)
      const updatedProductReviewsDoc = _.extend(oldProductReviewsDoc, ProductReviewsDoc);
       
      await new CrudOperations(ProductReviews)
        .save(updatedProductReviewsDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update ProductReviewss->", err);
      next("Something went wrong");
    }
  }
 
 
  //   /**
  //    * @method:  Delete ProductReviews.
  //    */
  async deleteProductReviews(id, next) {
    try {
        const productReviews = await new CrudOperations( ProductReviews).getDocument({ _id: id, isDeleted: false}, { });
         
        if(productReviews){
            productReviews.isDeleted =true;
            const deletedProductReviews = await new CrudOperations( ProductReviews).updateDocument({ _id: id }, productReviews );
            next(null, deletedProductReviews);
         } else {
        next("No ProductReviews Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteProductReviews->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get ProductReviews.
  //    */
  async getProductReviews(clauses, projections, options, sort, next) {
    try {
      logger.info(clauses);

      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        ProductReviews
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(ProductReviews).getAllDocuments(
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
      
      logger.error("GetProductReviews-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new ProductReviewsService();
