import logger from "../logger/logger.js";
import { VenueSlots } from "../models/venueSlots.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class VenueSlotsService {
  /**
   * @method:  Create VenueSlots.
   */

  async createVenueSlots(VenueSlotsDoc, next) {
    try {
     
      const similarVenueSlots = await new CrudOperations(
        VenueSlots
      ).getDocument({"slotStartTime":VenueSlotsDoc.slotStartTime }, {});
      if (similarVenueSlots) {
        return next("VenueSlots already exists");
      }
      VenueSlotsDoc.isDeleted = false;
      const venueSlots = new VenueSlots(VenueSlotsDoc);
      
      await new CrudOperations(VenueSlots)
        .save(venueSlots)
        .then(async (result) => {
        next(null, result);

        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateVenueSlotss->", err);
      next("Something went wrong");
    }
  }

  async updateVenueSlots(id ,VenueSlotsDoc, next) {
    try {
      const oldVenueSlotsDoc = await new CrudOperations(
        VenueSlots
      ).getDocument({ _id: id, isDeleted: false}, {});

      const updatedVenueSlotsDoc = _.extend(oldVenueSlotsDoc, VenueSlotsDoc);

      await new CrudOperations(VenueSlots)
        .save(updatedVenueSlotsDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update VenueSlotss->", err);
      next("Something went wrong");
    }
  }

 
  //   /**
  //    * @method:  Delete VenueSlots.
  //    */
  async deleteVenueSlots(id,next) {
    try {
        const venueSlots = await new CrudOperations(VenueSlots).getDocument({ _id: id, isDeleted: false }, { });
          if(venueSlots){
            venueSlots.isDeleted =true;
            const deletedVenueSlots = await new CrudOperations(VenueSlots).updateDocument({ _id: id }, venueSlots );
            next(null, deletedVenueSlots);
         } else {
        next("No VenueSlots Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteVenueSlots->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get VenueSlots.
  //    */
  async getVenueSlots(clauses, projections, options, sort, next) {
    try {
      logger.info(clauses);

      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        VenueSlots
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(VenueSlots).getAllDocuments(
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
      
      logger.error("GetVenueSlots-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new VenueSlotsService();
