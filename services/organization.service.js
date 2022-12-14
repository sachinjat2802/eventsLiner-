import logger from "../logger/logger.js";
import { Organization } from "../models/organizations.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class Organizationervice {
  /**
   * @method:  Create Organization.
   */

  async createOrganization(organizationDoc, next) {
    try {
      const similarOrganization = await new CrudOperations(
        Organization
      ).getDocument({ name: organizationDoc.name, isDeleted: false }, {});
      if (similarOrganization) {
        return next("organization already exists");
      }
      organizationDoc.isDeleted = false;
      const organization = new Organization(organizationDoc);
      await new CrudOperations(Organization)
        .save(organization)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("CreateOrganizations->", err);
      next("Something went wrong");
    }
  }

  async updateOrganization(id,userId ,organizationDoc, next) {
    try {
      const oldOrganizationDoc = await new CrudOperations(
        Organization
      ).getDocument({ _id: id, isDeleted: false,members:userId }, {});

      const updatedGameDoc = _.extend(oldOrganizationDoc, organizationDoc);

      await new CrudOperations(Organization)
        .save(updatedGameDoc)
        .then((result) => {
          next(null, result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (err) {
      logger.error("Update Organizations->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get microwebsite.
  //    */

  //   /**
  //    * @method: Add user to organization.
  //    */
  //   async addToOrganization(organizationId, role, userId, next) {
  //     try {
  //       const user = await new CrudOperations(User).getDocumentById(userId, {});
  //       if (user.isEmailVerified == false) {
  //         return next("Verify Your Email Before Continuing!");
  //       }
  //       const organization = await new CrudOperations(Organization).getDocument(
  //         { _id: organizationId },
  //         {}
  //       );
  //       if (organization) {
  //         if (organization.isOrganizationActive == false) {
  //           return next("This organization is deactivated");
  //         }
  //         if (role == "owner" && organization.members.owner.length >= 5) {
  //           return next("You cannot add more owners for this organization");
  //         } else if (
  //           role == "admin" &&
  //           organization.members.admin?.length >= 20
  //         ) {
  //           return next("You cannot add more admin for this organization");
  //         }
  //         for (const i in organization.members["owner"]) {
  //           if (organization.members["owner"][i] == userId && role == "owner") {
  //             return next("You are already a part of the organization");
  //           }
  //         }
  //         for (const i in organization.members["admin"]) {
  //           if (organization.members["admin"][i] == userId) {
  //             return next("You are already a part of the organization");
  //           }
  //         }
  //         if (organization.members[role]) {
  //           organization.members[role].push(Types.ObjectId(userId));
  //         } else {
  //           organization.members[role] = [];
  //           organization.members[role].push(Types.ObjectId(userId));
  //         }
  //       } else {
  //         return next("organization Not Found");
  //       }
  //       const updatedOrganization = await new CrudOperations(
  //         Organization
  //       ).updateDocument({ _id: organizationId }, organization);
  //       next(null, updatedOrganization);
  //     } catch (err) {
  //       logger.error("UpdateOrganization->", err);
  //       next("Something went wrong");
  //     }
  //   }

  //   /**
  //    * @method: Update organization.
  //    */
  //   async updateOrganization(id, userId, organizationDoc, next) {
  //     try {
  //       const oldOrganizationDoc = await new CrudOperations(
  //         Organization
  //       ).getDocument({ _id: id }, {});

  //       let updatedDenProfile = {};

  //       if (oldOrganizationDoc.den === null && organizationDoc.denData) {
  //         const denProfileDoc = new DenProfile(organizationDoc.denData);
  //         updatedDenProfile = await new CrudOperations(DenProfile).save(
  //           denProfileDoc
  //         );
  //         organizationDoc.den = updatedDenProfile._id;
  //       }
  //       if (oldOrganizationDoc.den && organizationDoc.denData) {
  //         const denProfile = await new CrudOperations(DenProfile).getDocument(
  //           { _id: oldOrganizationDoc.den },
  //           {}
  //         );
  //         const denProfileObject = _.extend(denProfile, organizationDoc.denData);
  //         updatedDenProfile = await new CrudOperations(DenProfile).updateDocument(
  //           { _id: oldOrganizationDoc.den },
  //           denProfileObject
  //         );
  //       }

  //       const updatedOrganizationDoc = _.extend(
  //         oldOrganizationDoc,
  //         organizationDoc
  //       );
  //       for (
  //         let index = 0;
  //         index < updatedOrganizationDoc.members.owner?.length;
  //         index++
  //       ) {
  //         {
  //           updatedOrganizationDoc.members.owner[index] = Types.ObjectId(
  //             updatedOrganizationDoc.members.owner[index]
  //           );
  //         }
  //       }
  //       for (
  //         let index = 0;
  //         index < updatedOrganizationDoc.members.admin?.length;
  //         index++
  //       ) {
  //         {
  //           updatedOrganizationDoc.members.admin[index] = Types.ObjectId(
  //             updatedOrganizationDoc.members.admin[index]
  //           );
  //         }
  //       }
  //       if (updatedOrganizationDoc.members.creator) {
  //         updatedOrganizationDoc.members.creator = Types.ObjectId(
  //           updatedOrganizationDoc.members.creator
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
  //           { code: updatedOrganizationDoc.contactPersonNumber?.code },
  //           {}
  //         );
  //         const updateCountryCodeDoc = {
  //           name: countryCodeDoc?.name,
  //           code: countryCodeDoc?.code,
  //           abbreviation: countryCodeDoc?.abbreviation,
  //           number: updatedOrganizationDoc?.contactPersonNumber?.number,
  //         };
  //         user.countryCode = updateCountryCodeDoc;
  //         await new CrudOperations(User).updateDocument({ _id: userId }, user);
  //       }

  //       await new CrudOperations(Organization)
  //         .save(updatedOrganizationDoc)
  //         .then(async (result) => {
  //           const tournaments = await new CrudOperations(
  //             Tournament
  //           ).getAllDocuments(
  //             {
  //               organizationId: result._id,
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
  //           //const microWebsite =await new CrudOperations(MicroWebsite).getDocument({organizationId: result._id},{});

  //           denProfile.name = result.name;

  //           result.denProfile = denProfile;

  //           result = { ...result.toObject(), denProfile };
  //           next(null, result);
  //         })
  //         .catch((error) => {
  //           logger.error("CrudOperations(Organization).save(Error)->", error);
  //           next(error);
  //         });
  //     } catch (err) {
  //       logger.error("UpdateOrganization->", err);
  //       next("Something went wrong");
  //     }
  //   }

  //   /**
  //    * @method:  Delete Organization.
  //    */
  async deleteOrganization(id, userId,next) {
    try {
        const organization = await new CrudOperations( Organization).getDocument({ _id: id, isDeleted: false,members:userId }, { });
          if(organization){
            organization.isDeleted =true;
            const deletedOrganization = await new CrudOperations( Organization).updateDocument({ _id: id }, organization );
            next(null, deletedOrganization);
         } else {
        next("No Organization Found To Delete!");
      }
    } catch (err) {
      logger.error("DeleteOrganization->", err);
      next("Something went wrong");
    }
  }

  //   /**
  //    * @method:  Get Organization.
  //    */
  async getOrganization(clauses, projections, options, sort, next) {
    try {
      clauses.isDeleted = false;
      const totalResult = await new CrudOperations(
        Organization
      ).countAllDocuments(clauses);
      const results = await new CrudOperations(Organization).getAllDocuments(
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

      logger.error("GetOrganization-> ", err);
      logger.info(err);
      next("Something went wrong");
    }
  }
}

export default new Organizationervice();
