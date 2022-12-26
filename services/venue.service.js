import logger from "../logger/logger.js";
import { Venue } from "../Models/Venue.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class VenueService {
  /**
   * @method:  Create Venue.
   */

  async createVenue(VenueDoc, next) {
    try {
      const similarVenue = await new CrudOperations(Venue).getDocument(
        { name: VenueDoc.name, isDeleted: false },
        {}
      );
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
      for (const i in VenueDoc) {
        VenueDoc[i].name = VenueDoc[i].NAME;
        VenueDoc[i].cusineCategory = VenueDoc[i].CUSINE_CATEGORY;
        VenueDoc[i].city = VenueDoc[i].CITY;
        VenueDoc[i].region = VenueDoc[i].REGION;
        VenueDoc[i].cusineType = VenueDoc[i].CUSINE_TYPE;
         VenueDoc[i].type="Non Claimed";
         VenueDoc[i].isDeleted = false
         VenueDoc[i].isVenueActive = false


        const venue = new Venue(VenueDoc[i]);
        await new CrudOperations(Venue).save(venue);
      }
      next(null, "Venues added  successfully")
    } catch (err) {
      logger.error("CreateVenues->", err);
      next("Something went wrong");
    }
  }
  async updateVenue(id, userId, VenueDoc, next) {
    try {
      const oldVenueDoc = await new CrudOperations(Venue).getDocument(
        { _id: id, isDeleted: false, members: userId },
        {}
      );

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
  async deleteVenue(id, next) {
    try {
      const venue = await new CrudOperations(Venue).getDocument(
        { _id: id, isDeleted: false },
        {}
      );
      if (venue) {
        venue.isDeleted = true;
        const deletedVenue = await new CrudOperations(Venue).updateDocument(
          { _id: id },
          venue
        );
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
      const totalResult = await new CrudOperations(Venue).countAllDocuments(
        clauses
      );
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
