import logger from "../logger/logger.js";
import { VenuePhotos } from "../models/venuePhoto.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class VenuePhotosService {
  /**
   * @method:  Create VenuePhotos.
   */

  async createVenuePhotos(VenuePhotosDoc, next) {
    try {
      const similarVenuePhotos = await new CrudOperations(
        VenuePhotos
      ).getDocument({ name: VenuePhotosDoc.name, isDeleted: false }, {});
      if (similarVenuePhotos) {
        return next("VenuePhotos already exists");
      }
      VenuePhotosDoc.isDeleted = false;
      const VenuePhotos = new VenuePhotos(VenuePhotosDoc);
      await new CrudOperations(VenuePhotos)
        .save(VenuePhotos)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateVenuePhotoss->", err);
      next("Something went wrong");
    }
  }

  async updateVenuePhotos(id,userId ,VenuePhotosDoc, next) {
    try {
      const oldVenuePhotosDoc = await new CrudOperations(
        VenuePhotos
      ).getDocument({ _id: id, isDeleted: false,members:userId }, {});

      const updatedGameDoc = _.extend(oldVenuePhotosDoc, VenuePhotosDoc);

      await new CrudOperations(VenuePhotos)
        .save(updatedGameDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update VenuePhotoss->", err);
      next("Something went wrong");
    }
  }

  


  //   /**
  //    * @method:  Delete VenuePhotos.
  //    */
  async deleteVenuePhotos(id, userId,next) {
    try {
        const VenuePhotos = await new CrudOperations( VenuePhotos).getDocument({ _id: id, isDeleted: false,members:userId }, { });
          if(VenuePhotos){
            VenuePhotos.isDeleted =true;
            const deletedVenuePhotos = await new CrudOperations( VenuePhotos).updateDocument({ _id: id }, VenuePhotos );
            next(null, deletedVenuePhotos);
         } else {
        next("No VenuePhotos Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteVenuePhotos->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get VenuePhotos.
  //    */
  async getVenuePhotos(clauses, projections, options, sort, next) {
    try {
      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        VenuePhotos
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(VenuePhotos).getAllDocuments(
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

      logger.error("GetVenuePhotos-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new VenuePhotosService();
