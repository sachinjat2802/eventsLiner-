import logger from "../logger/logger.js";
import { VenuePackage } from "../Models/VenuePackage.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class VenuePackageService {
  /**
   * @method:  Create VenuePackage.
   */

  async createVenuePackage(VenuePackageDoc, next) {
    try {
     const similarVenuePackage = await new CrudOperations(
        VenuePackage
      ).getDocument({"name":VenuePackageDoc.name }, {});
      if (similarVenuePackage) {
        return next("VenuePackage already exists");
      }
      VenuePackageDoc.isDeleted = false;
      const venuePackage = new VenuePackage(VenuePackageDoc);
      
      await new CrudOperations(VenuePackage)
        .save(venuePackage)
        .then(async (result) => {
        next(null, result);

        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateVenuePackages->", err);
      next("Something went wrong");
    }
  }

  async updateVenuePackage(id ,VenuePackageDoc, next) {
    try {
      const oldVenuePackageDoc = await new CrudOperations(
        VenuePackage
      ).getDocument({ _id: id, isDeleted: false}, {});
      logger.info(oldVenuePackageDoc)

      const updatedVenuePackageDoc = _.extend(oldVenuePackageDoc, VenuePackageDoc);

      await new CrudOperations(VenuePackage)
        .save(updatedVenuePackageDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update VenuePackages->", err);
      next("Something went wrong");
    }
  }

 
  //   /**
  //    * @method:  Delete VenuePackage.
  //    */
  async deleteVenuePackage(id,next) {
    try {
        const venuePackage = await new CrudOperations(VenuePackage).getDocument({ _id: id, isDeleted: false }, { });
          if(venuePackage){
            venuePackage.isDeleted =true;
            const deletedVenuePackage = await new CrudOperations(VenuePackage).updateDocument({ _id: id }, venuePackage );
            next(null, deletedVenuePackage);
         } else {
        next("No VenuePackage Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteVenuePackage->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get VenuePackage.
  //    */
  async getVenuePackage(clauses, projections, options, sort, next) {
    try {
      logger.info(clauses);

      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        VenuePackage
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(VenuePackage).getAllDocuments(
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
      
      logger.error("GetVenuePackage-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new VenuePackageService();
