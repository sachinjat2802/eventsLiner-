import logger from "../logger/logger.js";
import { AddOnSellerPhoto } from "../models/addOnSellerPhoto.entity.js";
import mongoose from "mongoose";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class AddOnSellerPhotoService {
  /**
   * @method:  Create AddOnSellerPhoto.
   */

  async createAddOnSellerPhoto(AddOnSellerPhotoDoc, next) {
    try {
      
      AddOnSellerPhotoDoc.isDeleted = false;
      const addOnSellerPhoto = new AddOnSellerPhoto(AddOnSellerPhotoDoc);
      await new CrudOperations(AddOnSellerPhoto)
        .save(addOnSellerPhoto)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateAddOnSellerPhotos->", err);
      next("Something went wrong");
    }
  }

  async updateAddOnSellerPhoto(id ,AddOnSellerPhotoDoc, next) {
    try {
      const oldAddOnSellerPhotoDoc = await new CrudOperations(
        AddOnSellerPhoto
      ).getDocument({ _id: mongoose.Types.ObjectId(id), isDeleted: false }, {});

      const updatedGameDoc = _.extend(oldAddOnSellerPhotoDoc, AddOnSellerPhotoDoc);

      await new CrudOperations(AddOnSellerPhoto)
        .save(updatedGameDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update AddOnSellerPhotos->", err);
      next("Something went wrong");
    }
  }

  


  //   /**
  //    * @method:  Delete AddOnSellerPhoto.
  //    */
  async deleteAddOnSellerPhoto(id,next) {
    try {
        const addOnSellerPhoto = await new CrudOperations( AddOnSellerPhoto).getDocument({ _id: id, isDeleted: false }, { });
          if(addOnSellerPhoto){
            addOnSellerPhoto.isDeleted =true;
            const deletedAddOnSellerPhoto = await new CrudOperations( AddOnSellerPhoto).updateDocument({ _id: id }, addOnSellerPhoto );
            next(null, deletedAddOnSellerPhoto);
         } else {
        next("No AddOnSellerPhoto Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteAddOnSellerPhoto->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get AddOnSellerPhoto.
  //    */
  async getAddOnSellerPhoto(clauses, projections, options, sort, next) {
    try {
      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        AddOnSellerPhoto
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(AddOnSellerPhoto).getAllDocuments(
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

      logger.error("GetAddOnSellerPhoto-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new AddOnSellerPhotoService();
