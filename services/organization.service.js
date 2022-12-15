import logger from "../logger/logger.js";
import { Organization } from "../models/organizations.entity.js";

import CrudOperations from "../utils/db/mongo.crud.js";
import _ from "lodash";
//import { Types } from "mongoose";

class OrganizationService {
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

      const updatedOrganizationDoc = _.extend(oldOrganizationDoc, organizationDoc);

      await new CrudOperations(Organization)
        .save(updatedOrganizationDoc)
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

export default new OrganizationService();
