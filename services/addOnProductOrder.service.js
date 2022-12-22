import logger from "../logger/logger.js";
import { AddOnProductOrder } from "../models/AddOnProductOrder.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class AddOnProductOrderService {
  /**
   * @method:  Create AddOnProductOrder.
   */

  async createAddOnProductOrder(AddOnProductOrderDoc, next) {
    try {
      const similarAddOnProductOrder = await new CrudOperations(AddOnProductOrder).getDocument(
        { name: AddOnProductOrderDoc.name, isDeleted: false },
        {}
      );
      if (similarAddOnProductOrder) {
        return next("AddOnProductOrder already exists");
      }
      AddOnProductOrderDoc.isDeleted = false;
      const addOnProductOrder = new AddOnProductOrder(AddOnProductOrderDoc);
      await new CrudOperations(AddOnProductOrder)
        .save(addOnProductOrder)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateAddOnProductOrders->", err);
      next("Something went wrong");
    }
  }
  
  async updateAddOnProductOrder(id, userId, AddOnProductOrderDoc, next) {
    try {
      const oldAddOnProductOrderDoc = await new CrudOperations(AddOnProductOrder).getDocument(
        { _id: id, isDeleted: false, members: userId },
        {}
      );

      const updatedGameDoc = _.extend(oldAddOnProductOrderDoc, AddOnProductOrderDoc);

      await new CrudOperations(AddOnProductOrder)
        .save(updatedGameDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update AddOnProductOrders->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Delete AddOnProductOrder.
  //    */
  async deleteAddOnProductOrder(id, next) {
    try {
      const addOnProductOrder = await new CrudOperations(AddOnProductOrder).getDocument(
        { _id: id, isDeleted: false },
        {}
      );
      if (addOnProductOrder) {
        addOnProductOrder.isDeleted = true;
        const deletedAddOnProductOrder = await new CrudOperations(AddOnProductOrder).updateDocument(
          { _id: id },
          addOnProductOrder
        );
        next(null, deletedAddOnProductOrder);
      } else {
        next("No AddOnProductOrder Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteAddOnProductOrder->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get AddOnProductOrder.
  //    */
  async getAddOnProductOrder(clauses, projections, options, sort, next) {
    try {
      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(AddOnProductOrder).countAllDocuments(
        clauses
      );
      const results = await new CrudOperations(AddOnProductOrder).getAllDocuments(
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

      logger.error("GetAddOnProductOrder-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new AddOnProductOrderService();
