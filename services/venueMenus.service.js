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
      const VenueMenus = new VenueMenus(VenueMenusDoc);
      await new CrudOperations(VenueMenus)
        .save(VenueMenus)
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

  async updateVenueMenus(id,userId ,VenueMenusDoc, next) {
    try {
      const oldVenueMenusDoc = await new CrudOperations(
        VenueMenus
      ).getDocument({ _id: id, isDeleted: false,members:userId }, {});

      const updatedGameDoc = _.extend(oldVenueMenusDoc, VenueMenusDoc);

      await new CrudOperations(VenueMenus)
        .save(updatedGameDoc)
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
  //    * @method:  Get microwebsite.
  //    */

  //   /**
  //    * @method: Add user to VenueMenus.
  //    */
  //   async addToVenueMenus(VenueMenusId, role, userId, next) {
  //     try {
  //       const user = await new CrudOperations(User).getDocumentById(userId, {});
  //       if (user.isEmailVerified == false) {
  //         return next("Verify Your Email Before Continuing!");
  //       }
  //       const VenueMenus = await new CrudOperations(VenueMenus).getDocument(
  //         { _id: VenueMenusId },
  //         {}
  //       );
  //       if (VenueMenus) {
  //         if (VenueMenus.isVenueMenusActive == false) {
  //           return next("This VenueMenus is deactivated");
  //         }
  //         if (role == "owner" && VenueMenus.members.owner.length >= 5) {
  //           return next("You cannot add more owners for this VenueMenus");
  //         } else if (
  //           role == "admin" &&
  //           VenueMenus.members.admin?.length >= 20
  //         ) {
  //           return next("You cannot add more admin for this VenueMenus");
  //         }
  //         for (const i in VenueMenus.members["owner"]) {
  //           if (VenueMenus.members["owner"][i] == userId && role == "owner") {
  //             return next("You are already a part of the VenueMenus");
  //           }
  //         }
  //         for (const i in VenueMenus.members["admin"]) {
  //           if (VenueMenus.members["admin"][i] == userId) {
  //             return next("You are already a part of the VenueMenus");
  //           }
  //         }
  //         if (VenueMenus.members[role]) {
  //           VenueMenus.members[role].push(Types.ObjectId(userId));
  //         } else {
  //           VenueMenus.members[role] = [];
  //           VenueMenus.members[role].push(Types.ObjectId(userId));
  //         }
  //       } else {
  //         return next("VenueMenus Not Found");
  //       }
  //       const updatedVenueMenus = await new CrudOperations(
  //         VenueMenus
  //       ).updateDocument({ _id: VenueMenusId }, VenueMenus);
  //       next(null, updatedVenueMenus);
  //     } catch (err) {
  //       logger.error("UpdateVenueMenus->", err);
  //       next("Something went wrong");
  //     }
  //   }

  //   /**
  //    * @method: Update VenueMenus.
  //    */
  //   async updateVenueMenus(id, userId, VenueMenusDoc, next) {
  //     try {
  //       const oldVenueMenusDoc = await new CrudOperations(
  //         VenueMenus
  //       ).getDocument({ _id: id }, {});

  //       let updatedDenProfile = {};

  //       if (oldVenueMenusDoc.den === null && VenueMenusDoc.denData) {
  //         const denProfileDoc = new DenProfile(VenueMenusDoc.denData);
  //         updatedDenProfile = await new CrudOperations(DenProfile).save(
  //           denProfileDoc
  //         );
  //         VenueMenusDoc.den = updatedDenProfile._id;
  //       }
  //       if (oldVenueMenusDoc.den && VenueMenusDoc.denData) {
  //         const denProfile = await new CrudOperations(DenProfile).getDocument(
  //           { _id: oldVenueMenusDoc.den },
  //           {}
  //         );
  //         const denProfileObject = _.extend(denProfile, VenueMenusDoc.denData);
  //         updatedDenProfile = await new CrudOperations(DenProfile).updateDocument(
  //           { _id: oldVenueMenusDoc.den },
  //           denProfileObject
  //         );
  //       }

  //       const updatedVenueMenusDoc = _.extend(
  //         oldVenueMenusDoc,
  //         VenueMenusDoc
  //       );
  //       for (
  //         let index = 0;
  //         index < updatedVenueMenusDoc.members.owner?.length;
  //         index++
  //       ) {
  //         {
  //           updatedVenueMenusDoc.members.owner[index] = Types.ObjectId(
  //             updatedVenueMenusDoc.members.owner[index]
  //           );
  //         }
  //       }
  //       for (
  //         let index = 0;
  //         index < updatedVenueMenusDoc.members.admin?.length;
  //         index++
  //       ) {
  //         {
  //           updatedVenueMenusDoc.members.admin[index] = Types.ObjectId(
  //             updatedVenueMenusDoc.members.admin[index]
  //           );
  //         }
  //       }
  //       if (updatedVenueMenusDoc.members.creator) {
  //         updatedVenueMenusDoc.members.creator = Types.ObjectId(
  //           updatedVenueMenusDoc.members.creator
  //         );
  //       }
  //       if (userId !== "ADMIN") {
  //         const user = await new CrudOperations(User).getDocumentById(
  //           { _id: userId },
  //           {}
  //         );
  //         const countryCodeDoc = await new CrudOperations(
  //           CountryCode
  //         ).getDocument(
  //           { code: updatedVenueMenusDoc.contactPersonNumber?.code },
  //           {}
  //         );
  //         const updateCountryCodeDoc = {
  //           name: countryCodeDoc?.name,
  //           code: countryCodeDoc?.code,
  //           abbreviation: countryCodeDoc?.abbreviation,
  //           number: updatedVenueMenusDoc?.contactPersonNumber?.number,
  //         };
  //         user.countryCode = updateCountryCodeDoc;
  //         await new CrudOperations(User).updateDocument({ _id: userId }, user);
  //       }

  //       await new CrudOperations(VenueMenus)
  //         .save(updatedVenueMenusDoc)
  //         .then(async (result) => {
  //           const tournaments = await new CrudOperations(
  //             Tournament
  //           ).getAllDocuments(
  //             {
  //               VenueMenusId: result._id,
  //               isDeleted: false,
  //               registrationStatus: "LIVE",
  //             },
  //             {},
  //             { pageNo: 0, limit: 0 }
  //           );
  //           result.activeTournaments = tournaments;
  //           for (let index = 0; index < result.members.owner?.length; index++) {
  //             {
  //               const user = await new CrudOperations(User).getDocumentById(
  //                 result.members?.owner[index],
  //                 { username: 1, _id: 1, name: 1, email: 1, profilePicture: 1 }
  //               );
  //               result.members.owner[index] = user;
  //             }
  //           }
  //           for (let index = 0; index < result.members.admin?.length; index++) {
  //             {
  //               const user = await new CrudOperations(User).getDocumentById(
  //                 result.members?.admin[index],
  //                 { username: 1, _id: 1, name: 1, email: 1, profilePicture: 1 }
  //               );
  //               result.members.admin[index] = user;
  //             }
  //           }
  //           if (result.members.creator) {
  //             const user = await new CrudOperations(User).getDocumentById(
  //               result.members?.creator,
  //               { username: 1, _id: 1, name: 1, email: 1, profilePicture: 1 }
  //             );
  //             result.members.creator = user;
  //           }
  //           const denProfile = updatedDenProfile;
  //           denProfile.bio = result.bio;
  //           denProfile.members = result.members;
  //           denProfile.verificationStatus = result.verificationStatus;
  //           denProfile.coverImage = result.coverImage;
  //           denProfile.name = result.name;
  //           //const microWebsite =await new CrudOperations(MicroWebsite).getDocument({VenueMenusId: result._id},{});

  //           denProfile.name = result.name;

  //           result.denProfile = denProfile;

  //           result = { ...result.toObject(), denProfile };
  //           next(null, result);
  //         })
  //         .catch((error) => {
  //           logger.error("CrudOperations(VenueMenus).save(Error)->", error);
  //           next(error);
  //         });
  //     } catch (err) {
  //       logger.error("UpdateVenueMenus->", err);
  //       next("Something went wrong");
  //     }
  //   }

  //   /**
  //    * @method:  Delete VenueMenus.
  //    */
  async deleteVenueMenus(id, userId,next) {
    try {
        const VenueMenus = await new CrudOperations( VenueMenus).getDocument({ _id: id, isDeleted: false,members:userId }, { });
          if(VenueMenus){
            VenueMenus.isDeleted =true;
            const deletedVenueMenus = await new CrudOperations( VenueMenus).updateDocument({ _id: id }, VenueMenus );
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
