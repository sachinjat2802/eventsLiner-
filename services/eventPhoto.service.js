import logger from "../logger/logger.js";
import { EventPhotos } from "../Models/EventPhoto.entity.js";
import mongoose from "mongoose";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class EventPhotosService {
  /**
   * @method:  Create EventPhotos.
   */

  async createEventPhotos(EventPhotosDoc, next) {
    try {
      
      EventPhotosDoc.isDeleted = false;
      const eventPhotos = new EventPhotos(EventPhotosDoc);
      await new CrudOperations(EventPhotos)
        .save(eventPhotos)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateEventPhotoss->", err);
      next("Something went wrong");
    }
  }

  async updateEventPhotos(id ,EventPhotosDoc, next) {
    try {
      const oldEventPhotosDoc = await new CrudOperations(
        EventPhotos
      ).getDocument({ _id: mongoose.Types.ObjectId(id), isDeleted: false }, {});

      const updatedGameDoc = _.extend(oldEventPhotosDoc, EventPhotosDoc);

      await new CrudOperations(EventPhotos)
        .save(updatedGameDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update EventPhotoss->", err);
      next("Something went wrong");
    }
  }

  


  //   /**
  //    * @method:  Delete EventPhotos.
  //    */
  async deleteEventPhotos(id,next) {
    try {
        const eventPhotos = await new CrudOperations( EventPhotos).getDocument({ _id: id, isDeleted: false }, { });
          if(eventPhotos){
            eventPhotos.isDeleted =true;
            const deletedEventPhotos = await new CrudOperations( EventPhotos).updateDocument({ _id: id }, eventPhotos );
            next(null, deletedEventPhotos);
         } else {
        next("No EventPhotos Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteEventPhotos->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get EventPhotos.
  //    */
  async getEventPhotos(clauses, projections, options, sort, next) {
    try {
      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        EventPhotos
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(EventPhotos).getAllDocuments(
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

      logger.error("GetEventPhotos-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new EventPhotosService();
