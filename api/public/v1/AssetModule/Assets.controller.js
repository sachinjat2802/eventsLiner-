import formidable from "formidable";
import AssetUploadService from "../../../../services/Asset.service.js";
import dotenv from "dotenv";
import process from "node:process"

dotenv.config({ silent: process.env });

import { S3Util,HttpException,HttpResponse } from "../../../../utils/index.js";



const s3Utils = new S3Util(
    process.env.AWSREGION,
    process.env.AWSACCESSKEYID,
    process.env.AWSSECRETKEY,
    process.env.AWSAPIVERSION,
    process.env.ASSETSBUCKET
);
import aws from "aws-sdk";
const s3 = new aws.S3();
const options = { keepExtensions: true };
const assetsBucket = process.env.ASSETSBUCKET;
const uncompressedAssetsBucket = process.env.UNCOMPRESSEDASSETSBUCKET;
const imageFolder = "images";
const videoFolder = "videos";
const documentsFolder = "documents";
import logger from "../../../../logger/logger.js";


aws.config.update({ accessKeyId: process.env.AWSACCESSKEYID, secretAccessKey: process.env.AWSSECRETKEY });

class AssetUploadController {
    uploadMultipleImage(
        request,
        response,
        next
    ) {
        try {
            const form = new formidable.IncomingForm(options);
            form.parse(request, async (err, fields, files) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    AssetUploadService.uploadMultipleImages(
                        files,
                        (err, result) => {
                            if (err) {
                                next(new HttpException(400, err));
                            } else {
                                response.status(200).send(new HttpResponse("Uploaded Multiple Images", result, "Images Uploaded", null, null, null));
                            }
                        },
                        imageFolder
                    );
                }
            });
        } catch (err) {
            next(new HttpException(400, "Something Went Wrong!!"));
        }
    }

     uploadDocument(request, response, next) {
        try {
            let data = {};
            const form = new formidable.IncomingForm(options);
            form.parse(request, async (err, fields, files) => {
                if (err) {
                    next(err);
                    return;
                }
                const file = Object.values(files)[0];
                await s3Utils.singleFileUpload(file, documentsFolder, (err, result) => {
                    result.Location = result.Location.replace(
                        uncompressedAssetsBucket,
                        assetsBucket
                    );
                    data = {
                        url: result.Location,
                        name: Object.keys(files)[0],
                        size: file.size,
                        type: file.type,
                    };
                });

                response.status(200).send(new HttpResponse("Upload Document", data, "Document Uploaded", null, null, null));
            });
        }
        catch (err) {
            logger.error("UPLOAD DOCUMENT ERROR -> ", err);
            next("Something Went Wrong!!");
        }
    }

     uploadSingleImage(  request, response, next ) {
        try {
            const form = new formidable.IncomingForm(options);
            form.parse(request, async (err, fields, files) => {
                if (err) {
                    next(err);
                } else {
                    logger.info(files.file.size);
                    if (files.file.size > 5242880) {
                        return next(new HttpException(400, "You cannot upload image larger than 5Mb"));
                    }
                    s3Utils.singleFileUpload(files.file, imageFolder, async (err, result) => {
                        if (err) {
                            next(err);
                        } else {

                            result.Location = result.Location.replace(uncompressedAssetsBucket, assetsBucket);
                            const imageData = {
                                url: result.Location,
                                name: Object.keys(files)[0],
                                size: files.file.size,
                                type: files.file.type,
                            };


                            console.log("###########3 videoData :: ",imageData);

                            // Print Error from S3
                            const getParams = {
                                Bucket: assetsBucket,
                                Key: result.Key
                            };
                            
                            let compressedObject = null;
                            
                            do {
                                try {
                                    compressedObject = await s3.getObject(getParams).promise();
                                    logger.info(compressedObject);
                                } catch (err) {
                                    compressedObject = null;
                                    logger.error("Here");
                                }
                            } while (compressedObject == null || compressedObject == undefined);
                            // Returning the response
                            response.status(200).send(new HttpResponse("Upload Image", imageData, "Image Uploaded", null, null, null));
                        }
                    },
                        uncompressedAssetsBucket
                    );
                }
            });

        } catch (err) {
            next(new HttpException(400, "Something went wrong"));
        }
    }

     uploadVideo( request, response, next) {
        try {
            const form = new formidable.IncomingForm(options);
            form.parse(request, async (err, fields, files) => {
                if (err) {
                    next(err);
                } else {
                   
                    await s3Utils.singleFileUpload(files.file, videoFolder, async(err, result) => {
                        if (err) {
                            next(err);
                        } else {
                           
                            const originalURL = result.Location;
                            
                            
                            const videoData = {
                                url: originalURL,
                                name: Object.keys(files)[0],
                                size: files.file.size,
                                type: files.file.type,
                            };

                            // Print Error from S3

                            // const getParams = {
                            //     Bucket: assetsBucket,
                            //     Key: result.Key
                            // };
                            
                            // let compressedObject: any = null;
                            // do {
                            //     try {
                            //         compressedObject = await s3.getObject(getParams).promise();
                            //         logger.info(compressedObject);
                            //     } catch (err) {
                            //         compressedObject = null;
                            //         logger.error("Here");
                            //     }
                            // } while (compressedObject == null || compressedObject == undefined);
                            // Returning the response
                            response.status(200).send(new HttpResponse("Upload Video", videoData, "Video Uploaded", null, null, null));
                        }
                    },
                        assetsBucket
                    );
                }
            });
        } catch (err) {
            next(new HttpException(400, "Something went wrong"));
        }
    }

}

export default new AssetUploadController();