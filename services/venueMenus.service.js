import logger from "../logger/logger.js";
import { VenueMenus } from "../models/venueMenu.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class VenueMenusService {
  /**
   * @method:  Create VenueMenus.
   */

  async createVenueMenus(VenueMenusDoc, next) {
    try {
      const similarVenueMenus = await new CrudOperations(
        VenueMenus
      ).getDocument({ name: VenueMenusDoc.name, isDeleted: false }, {});
      if (similarVenueMenus) {
        return next("VenueMenus already exists");
      }
      VenueMenusDoc.isDeleted = false;
      const venueMenus = new VenueMenus(VenueMenusDoc);
      await new CrudOperations(VenueMenus)
        .save(venueMenus)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateVenueMenuss->", err);
      next("Something went wrong");
    }
  }

  async updateVenueMenus(id ,VenueMenusDoc, next) {
    try {
      const oldVenueMenusDoc = await new CrudOperations(
        VenueMenus
      ).getDocument({ _id: id, isDeleted: false}, {});
console.log(oldVenueMenusDoc)
      const updatedVenueMenusDoc = _.extend(oldVenueMenusDoc, VenueMenusDoc);

      await new CrudOperations(VenueMenus)
        .save(updatedVenueMenusDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update VenueMenuss->", err);
      next("Something went wrong");
    }
  }

  

  //   /**
  //    * @method:  Delete VenueMenus.
  //    */
  async deleteVenueMenus(id,next) {
    try {
        const venueMenus = await new CrudOperations( VenueMenus).getDocument({ _id: id, isDeleted: false }, { });
          if(venueMenus){
            venueMenus.isDeleted =true;
            const deletedVenueMenus = await new CrudOperations( VenueMenus).updateDocument({ _id: id }, venueMenus );
            next(null, deletedVenueMenus);
         } else {
        next("No VenueMenus Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteVenueMenus->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get VenueMenus.
  //    */
  async getVenueMenus(clauses, projections, options, sort, next) {
    try {
      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        VenueMenus
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(VenueMenus).getAllDocuments(
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

      logger.error("GetVenueMenus-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new VenueMenusService();
