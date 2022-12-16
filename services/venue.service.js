import logger from "../logger/logger.js";
import { Venue } from "../models/venue.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class VenueService {
  /**
   * @method:  Create Venue.
   */

  async createVenue(VenueDoc, next) {
    try {
      const similarVenue = await new CrudOperations(
        Venue
      ).getDocument({ name: VenueDoc.name, isDeleted: false }, {});
      if (similarVenue) {
        return next("Venue already exists");
      }
      VenueDoc.isDeleted = false;
      const venue = new Venue(VenueDoc);
      await new CrudOperations(Venue)
        .save(venue)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateVenues->", err);
      next("Something went wrong");
    }
  }
  async postMultipeVenue(VenueDoc, next) {
    try {
      
      const Venue = new Venue(VenueDoc);
      await new CrudOperations(Venue)
        .insertManyDocuments(Venue,{})
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateVenues->", err);
      next("Something went wrong");
    }
  }
  async updateVenue(id,userId ,VenueDoc, next) {
    try {
      const oldVenueDoc = await new CrudOperations(
        Venue
      ).getDocument({ _id: id, isDeleted: false,members:userId }, {});

      const updatedGameDoc = _.extend(oldVenueDoc, VenueDoc);

      await new CrudOperations(Venue)
        .save(updatedGameDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update Venues->", err);
      next("Something went wrong");
    }
  }

  
  //   /**
  //    * @method:  Delete Venue.
  //    */
  async deleteVenue(id, userId,next) {
    try {
        const Venue = await new CrudOperations( Venue).getDocument({ _id: id, isDeleted: false,members:userId }, { });
          if(Venue){
            Venue.isDeleted =true;
            const deletedVenue = await new CrudOperations( Venue).updateDocument({ _id: id }, Venue );
            next(null, deletedVenue);
         } else {
        next("No Venue Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteVenue->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get Venue.
  //    */
  async getVenue(clauses, projections, options, sort, next) {
    try {
      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        Venue
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(Venue).getAllDocuments(
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

      logger.error("GetVenue-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new VenueService();
