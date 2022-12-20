import logger from "../logger/logger.js";
import { VenueBooking } from "../models/venueBooking.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class VenueBookingService {
  /**
   * @method:  Create VenueBooking.
   */

  async createVenueBooking(VenueBookingDoc, next) {
    try {
     const similarVenueBooking = await new CrudOperations(
        VenueBooking
      ).getDocument({"slotStartTime":VenueBookingDoc.slotStartTime }, {});
      if (similarVenueBooking) {
        return next("VenueBooking already exists");
      }
      VenueBookingDoc.isDeleted = false;
      const VenueBooking = new VenueBooking(VenueBookingDoc);
      
      await new CrudOperations(VenueBooking)
        .save(VenueBooking)
        .then(async (result) => {
        next(null, result);

        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateVenueBookings->", err);
      next("Something went wrong");
    }
  }

  async updateVenueBooking(id ,VenueBookingDoc, next) {
    try {
      const oldVenueBookingDoc = await new CrudOperations(
        VenueBooking
      ).getDocument({ _id: id, isDeleted: false}, {});

      const updatedVenueBookingDoc = _.extend(oldVenueBookingDoc, VenueBookingDoc);

      await new CrudOperations(VenueBooking)
        .save(updatedVenueBookingDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update VenueBookings->", err);
      next("Something went wrong");
    }
  }

 
  //   /**
  //    * @method:  Delete VenueBooking.
  //    */
  async deleteVenueBooking(id,next) {
    try {
        const VenueBooking = await new CrudOperations(VenueBooking).getDocument({ _id: id, isDeleted: false }, { });
          if(VenueBooking){
            VenueBooking.isDeleted =true;
            const deletedVenueBooking = await new CrudOperations(VenueBooking).updateDocument({ _id: id }, VenueBooking );
            next(null, deletedVenueBooking);
         } else {
        next("No VenueBooking Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteVenueBooking->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get VenueBooking.
  //    */
  async getVenueBooking(clauses, projections, options, sort, next) {
    try {
      logger.info(clauses);

      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        VenueBooking
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(VenueBooking).getAllDocuments(
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
      
      logger.error("GetVenueBooking-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new VenueBookingService();
