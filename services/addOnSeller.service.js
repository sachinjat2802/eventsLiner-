import logger from "../logger/logger.js";
import { AddOnSeller } from "../Models/AddOnSeller.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class AddOnSellerService {
  /**
   * @method:  Create AddOnSeller.
   */

  async createAddOnSeller(AddOnSellerDoc, next) {
    try {
      const similarAddOnSeller = await new CrudOperations(AddOnSeller).getDocument(
        { name: AddOnSellerDoc.name, isDeleted: false },
        {}
      );
      if (similarAddOnSeller) {
        return next("AddOnSeller already exists");
      }
      AddOnSellerDoc.isDeleted = false;
      const addOnSeller = new AddOnSeller(AddOnSellerDoc);
      await new CrudOperations(AddOnSeller)
        .save(addOnSeller)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateAddOnSellers->", err);
      next("Something went wrong");
    }
  }


  async postMultipleAddOnSeller(AddOnSellerDoc, next) {
    try {
      for (const i in AddOnSellerDoc) {
        AddOnSellerDoc[i].name = AddOnSellerDoc[i].NAME;
        AddOnSellerDoc[i].cusineCategory = AddOnSellerDoc[i].CUSINE_CATEGORY;
        AddOnSellerDoc[i].city = AddOnSellerDoc[i].CITY;
        AddOnSellerDoc[i].region = AddOnSellerDoc[i].REGION;
        AddOnSellerDoc[i].productCategory = AddOnSellerDoc[i].product_Category;
         AddOnSellerDoc[i].productType="Non Claimed";
         AddOnSellerDoc[i].isDeleted = false
         AddOnSellerDoc[i].isAddOnSellerActive = false
         const AddOnSeller = new AddOnSeller(AddOnSellerDoc[i]);
        await new CrudOperations(AddOnSeller).save(AddOnSeller);
      }
      next(null, "AddOnSellers added  successfully")
    } catch (err) {
      logger.error("CreateAddOnSellers->", err);
      next("Something went wrong");
    }
  }

  
  async updateAddOnSeller(id, userId, AddOnSellerDoc, next) {
    try {
      const oldAddOnSellerDoc = await new CrudOperations(AddOnSeller).getDocument(
        { _id: id, isDeleted: false },
        {}
      );

      const updatedGameDoc = _.extend(oldAddOnSellerDoc, AddOnSellerDoc);

      await new CrudOperations(AddOnSeller)
        .save(updatedGameDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update AddOnSellers->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Delete AddOnSeller.
  //    */
  async deleteAddOnSeller(id, next) {
    try {
      const addOnSeller = await new CrudOperations(AddOnSeller).getDocument(
        { _id: id, isDeleted: false },
        {}
      );
      if (addOnSeller) {
        addOnSeller.isDeleted = true;
        const deletedAddOnSeller = await new CrudOperations(AddOnSeller).updateDocument(
          { _id: id },
          addOnSeller
        );
        next(null, deletedAddOnSeller);
      } else {
        next("No AddOnSeller Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteAddOnSeller->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get AddOnSeller.
  //    */
  async getAddOnSeller(clauses, projections, options, sort, next) {
    try {
      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(AddOnSeller).countAllDocuments(
        clauses
      );
      const results = await new CrudOperations(AddOnSeller).getAllDocuments(
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

      logger.error("GetAddOnSeller-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new AddOnSellerService();
