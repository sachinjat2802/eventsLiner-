import logger from "../logger/logger.js";
import { AddOnSellerProduct } from "../models/AddOnSellerProduct.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class AddOnSellerProductService {
  /**
   * @method:  Create AddOnSellerProduct.
   */

  async createAddOnSellerProduct(AddOnSellerProductDoc, next) {
    try {
     const similarAddOnSellerProduct = await new CrudOperations(
        AddOnSellerProduct
      ).getDocument({name:AddOnSellerProductDoc.name}, {});
      if (similarAddOnSellerProduct) {
        return next("AddOnSellerProduct already exists");
      }
      AddOnSellerProductDoc.isDeleted = false;
      const addOnSellerProduct = new AddOnSellerProduct(AddOnSellerProductDoc);
      
      await new CrudOperations(AddOnSellerProduct)
        .save(addOnSellerProduct)
        .then(async (result) => {
        next(null, result);

        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateAddOnSellerProducts->", err);
      next("Something went wrong");
    }
  }

  async updateAddOnSellerProduct(id ,AddOnSellerProductDoc, next) {
    try {
      const oldAddOnSellerProductDoc = await new CrudOperations(
        AddOnSellerProduct
      ).getDocument({ _id: id, isDeleted: false}, {});

      const updatedAddOnSellerProductDoc = _.extend(oldAddOnSellerProductDoc, AddOnSellerProductDoc);

      await new CrudOperations(AddOnSellerProduct)
        .save(updatedAddOnSellerProductDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update AddOnSellerProducts->", err);
      next("Something went wrong");
    }
  }

 
  //   /**
  //    * @method:  Delete AddOnSellerProduct.
  //    */
  async deleteAddOnSellerProduct(id,next) {
    try {
        const addOnSellerProduct = await new CrudOperations(AddOnSellerProduct).getDocument({ _id: id, isDeleted: false }, { });
          if(addOnSellerProduct){
            addOnSellerProduct.isDeleted =true;
            const deletedAddOnSellerProduct = await new CrudOperations(AddOnSellerProduct).updateDocument({ _id: id }, addOnSellerProduct );
            next(null, deletedAddOnSellerProduct);
         } else {
        next("No AddOnSellerProduct Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteAddOnSellerProduct->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get AddOnSellerProduct.
  //    */
  async getAddOnSellerProduct(clauses, projections, options, sort, next) {
    try {
      logger.info(clauses);

      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        AddOnSellerProduct
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(AddOnSellerProduct).getAllDocuments(
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
      
      logger.error("GetAddOnSellerProduct-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new AddOnSellerProductService();
