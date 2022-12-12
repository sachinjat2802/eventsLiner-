import { S3Util } from "../utils/aws/s3.utils.js";
import dotenv from "dotenv";
import process from "node:process"

dotenv.config({ silent: process.env });
import aws from "aws-sdk";
const apiVersion = process.env.AWSAPIVERSION;
const accessKeyId = process.env.AWSACCESSKEYID;
const secretAccessKey = process.env.AWSSECRETKEY;
const region = process.env.AWSREGION;
const assetBucket = process.env.ASSETSBUCKET;
aws.config.update({
    apiVersion,
    accessKeyId,
    secretAccessKey,
    region
});
const s3 = new aws.S3();
const s3Util = new S3Util(region, accessKeyId, secretAccessKey, apiVersion, assetBucket);

class AssetService {
     uploadMultipleImages(files, next, key) {
        try {
            const pictureList = [];
            if (Object.entries(files).length > 0) {
                const promises = [];
                for (const file of Object.keys(files)) {
                    promises.push(
                        s3.upload(s3Util.generateAWSParams(files[file], key ?? "", assetBucket))
                            .promise()
                            .catch(
                                (err) => {
                                    throw err;
                                }
                            )
                    );
                }
                Promise.all(promises).then(async (result) => {
                    for (const element of result) {
                        if (element.Location) {
                            const params = {
                                Key: element.Key,
                                Bucket: assetBucket,
                            };
                            const data = await s3.headObject(params).promise();
                            const imageObject = {
                                url: element.Location,
                                key: element.Key,
                                size: data.ContentLength,
                                type: "image/jpeg",
                            };
                            await pictureList.push(imageObject);
                        }
                    }
                    next(null, pictureList);
                }).catch((err) => {
                    next(err);
                });
            }
        } catch (err) { next("Something went wrong"); }
    }
}
export default new AssetService();