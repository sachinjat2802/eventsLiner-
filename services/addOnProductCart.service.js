import logger from "../logger/logger.js";
import { AddOnProductCart } from "../Models/AddOnproductsCart.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class AddOnProductCartService {
  /**
   * @method:  Create AddOnProductCart.
   */

  async createAddOnProductCart(AddOnProductCartDoc, next) {
    try {
      const similarAddOnProductCart = await new CrudOperations(AddOnProductCart).getDocument(
        { userId: AddOnProductCartDoc.userId },
        {}
      );
      if (similarAddOnProductCart) {
        return next("AddOnProductCart already exists");
      }
      AddOnProductCartDoc.isDeleted = false;
      const addOnProductCart = new AddOnProductCart(AddOnProductCartDoc);
      await new CrudOperations(AddOnProductCart)
        .save(addOnProductCart)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateAddOnProductCarts->", err);
      next("Something went wrong");
    }
  }
  
  async updateAddOnProductCart(id, userId, AddOnProductCartDoc, next) {
    try {
      const oldAddOnProductCartDoc = await new CrudOperations(AddOnProductCart).getDocument(
        { _id: id, userId: userId },
        {}
      );
      logger.log(oldAddOnProductCartDoc)

      const updatedGameDoc = _.extend(oldAddOnProductCartDoc, AddOnProductCartDoc);

      await new CrudOperations(AddOnProductCart)
        .save(updatedGameDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update AddOnProductCarts->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Delete AddOnProductCart.
  //    */
  async deleteAddOnProductCart(id, next) {
    try {
      const addOnProductCart = await new CrudOperations(AddOnProductCart).getDocument(
        { _id: id},
        {}
      );
      if (addOnProductCart) {
        addOnProductCart.items =[];
        addOnProductCart.totalPrice = 0
        addOnProductCart.totalItems = 0
        const deletedAddOnProductCart = await new CrudOperations(AddOnProductCart).updateDocument(
          { _id: id },
          addOnProductCart
        );
        next(null, deletedAddOnProductCart);
      } else {
        next("No AddOnProductCart Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteAddOnProductCart->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get AddOnProductCart.
  //    */
  async getAddOnProductCart(clauses, projections, options, sort, next) {
    try {
      const totalResult = await new CrudOperations(AddOnProductCart).countAllDocuments(
        clauses
      );
      const results = await new CrudOperations(AddOnProductCart).getAllDocuments(
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

      logger.error("GetAddOnProductCart-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new AddOnProductCartService();
