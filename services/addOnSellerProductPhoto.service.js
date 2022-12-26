import logger from "../logger/logger.js";
import { AddOnSellerProductPhoto } from "../Models/AddOnSellerProductPhoto.entity.js";
import mongoose from "mongoose";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class AddOnSellerProductPhotoService {
  /**
   * @method:  Create AddOnSellerProductPhoto.
   */

  async createAddOnSellerProductPhoto(AddOnSellerProductPhotoDoc, next) {
    try {
      
      AddOnSellerProductPhotoDoc.isDeleted = false;
      const addOnSellerProductPhoto = new AddOnSellerProductPhoto(AddOnSellerProductPhotoDoc);
      await new CrudOperations(AddOnSellerProductPhoto)
        .save(addOnSellerProductPhoto)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateAddOnSellerProductPhotos->", err);
      next("Something went wrong");
    }
  }

  async updateAddOnSellerProductPhoto(id ,AddOnSellerProductPhotoDoc, next) {
    try {
      const oldAddOnSellerProductPhotoDoc = await new CrudOperations(
        AddOnSellerProductPhoto
      ).getDocument({ _id: mongoose.Types.ObjectId(id), isDeleted: false }, {});

      const updatedGameDoc = _.extend(oldAddOnSellerProductPhotoDoc, AddOnSellerProductPhotoDoc);

      await new CrudOperations(AddOnSellerProductPhoto)
        .save(updatedGameDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update AddOnSellerProductPhotos->", err);
      next("Something went wrong");
    }
  }

  


  //   /**
  //    * @method:  Delete AddOnSellerProductPhoto.
  //    */
  async deleteAddOnSellerProductPhoto(id,next) {
    try {
        const addOnSellerProductPhoto = await new CrudOperations( AddOnSellerProductPhoto).getDocument({ _id: id, isDeleted: false }, { });
          if(addOnSellerProductPhoto){
            addOnSellerProductPhoto.isDeleted =true;
            const deletedAddOnSellerProductPhoto = await new CrudOperations( AddOnSellerProductPhoto).updateDocument({ _id: id }, addOnSellerProductPhoto );
            next(null, deletedAddOnSellerProductPhoto);
         } else {
        next("No AddOnSellerProductPhoto Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteAddOnSellerProductPhoto->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get AddOnSellerProductPhoto.
  //    */
  async getAddOnSellerProductPhoto(clauses, projections, options, sort, next) {
    try {
      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        AddOnSellerProductPhoto
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(AddOnSellerProductPhoto).getAllDocuments(
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

      logger.error("GetAddOnSellerProductPhoto-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new AddOnSellerProductPhotoService();
