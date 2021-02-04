// /**
//  * Created by Shumi on 25/05/18.
//  */

// 'use strict';
// // console.log("process.env.NODE_ENV",process.env.NODE_ENV)
// // console.log("====process.env.NODE_ENV======",process.env.NODE_ENV)

// let AWS = require('aws-sdk'),
//     Config = require('../Config'),
//     sharp = require('sharp'),
//     accessKeyId = Config[process.env.NODE_ENV].s3BucketCredentials.accessKeyId,
//     secretAccessKeyId = Config[process.env.NODE_ENV].s3BucketCredentials.secretAccessKey,
//     bucketName = Config[process.env.NODE_ENV].s3BucketCredentials.bucket,
//     sizeOf = require('image-size');
// AWS.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKeyId});

// async function uploadMultipart(fileBuffer,folder, fileName ,mimeType, fileSize) {
//     console.log("===============mimeType",mimeType)

//     let s3bucket = new AWS.S3(),
//         paramsData = [];

//     try{
//         let createMultipart = await s3bucket.createMultipartUpload({
//             Bucket: bucketName,
//             Key: folder + '/' + fileName,
//             ACL: 'public-read',
//             ContentType: mimeType
//         }).promise();

//         let partSize = 5242880,
//             parts = Math.ceil(fileSize / partSize);

//         for (let partNum = 0; partNum < parts; partNum++) {            // chain four more times

//             let rangeStart = partNum * partSize,
//                 end = Math.min(rangeStart + partSize, fileSize);

//             let updatedBuffer = fileBuffer.slice(rangeStart,end);

//             winston.info("uploading......", fileName, " % ", (partNum / parts).toFixed(2));

//             paramsData.push({
//                 Body: updatedBuffer,
//                 Bucket: bucketName,
//                 Key: folder + '/' + fileName,
//                 PartNumber: partNum + 1,
//                 UploadId: createMultipart.UploadId
//             });
//         }
//         // console.log("================paramsData=============",paramsData)

//         let etagData = paramsData.map(async params=>{
//             // return s3bucket.uploadPart(params).promise()
//             let temp = await s3bucket.uploadPart(params).promise()
//             return {ETag: temp.ETag,PartNumber:params.PartNumber}

//         });
//         console.log("============etagData===============",etagData)

//         let dataPacks = await Promise.all(etagData);
//         console.log("============etagData===============",dataPacks)

//         return s3bucket.completeMultipartUpload({
//             Bucket: bucketName,
//             Key: folder + '/' + fileName,
//             MultipartUpload: {
//                 Parts: dataPacks
//             },
//             UploadId: createMultipart.UploadId
//         }).promise();
//     }
//     catch (err){
//         return err;
//     }
// }

// async function uploadOriginalImage(fileBuffer,originalPicFolder,fileName,mimeType){
//     if(fileBuffer.length > 5242880) {

//         console.log("======mimeType=============",mimeType)
//         return await uploadMultipart(fileBuffer,originalPicFolder,fileName,mimeType,fileBuffer.length);

//         // return {};
//     }
//     else {
//         let s3bucket = new AWS.S3();

//         let params = {
//             Bucket: bucketName,
//             Key: originalPicFolder + '/' + fileName,
//             Body: fileBuffer,
//             ACL: 'public-read',
//             ContentType: mimeType
//         };
//         console.log("=======params========",params)

//         return s3bucket.putObject(params).promise();
//     }
// }

// async function uploadProcessedImage(fileBuffer,thumbnailPicFolder,fileName,mimeType,fileExtension){

//     try{
//         let s3bucket = new AWS.S3();
//         let data;
//         if(fileExtension=="png"){
//             data = await sharp(fileBuffer)
//                 .max()
//                 .toFormat('png',{quality : 50})
//                 .toBuffer();
//         }
//         else{
//             data = await sharp(fileBuffer)
//                 .max()
//                 .toFormat('jpg',{quality : 50})
//                 .toBuffer();
//         }



//         let params = {
//             Bucket: bucketName,
//             Key: thumbnailPicFolder + '/' + fileName,
//             Body: data,
//             ACL: 'public-read',
//             ContentType: mimeType
//         };
//         await s3bucket.putObject(params).promise();
//         return data
//     }
    
//     catch( err) {
//      winston.error("err-->>",err);
//      }
// }


//  async function uploadThumbnailImage(fileBuffer,thumbnailPicFolder,fileName,mimeType,dimensions
//      ,compressLevelRatio,quality,fileExtension,folder) {
//     try{

//      let s3bucket = new AWS.S3();

//         let data;

//         if(fileExtension=="png" || folder == Config[process.env.NODE_ENV].s3BucketCredentials.folder.airlines){
//             let imgSize;
//             if(folder ==  Config[process.env.NODE_ENV].s3BucketCredentials.folder.airlines){
//                 data = await sharp(fileBuffer)
//                     .resize(29,23)
//                     .min()
//                     .toFormat('png', {quality: quality})
//                     .toBuffer();
//             }
//             else{
//                 data = await sharp(fileBuffer)
//                     .resize(dimensions.width)
//                     .min()
//                     .toFormat('png', {quality: quality})
//                     .toBuffer();
//             }
//         }
//         else{
            
//             console.log("===============inside==============",fileBuffer)
//             data = await sharp(fileBuffer)
//                 .resize(dimensions.width)
//                 .min()
//                 .toFormat('jpeg', {quality: quality})
//                 .toBuffer();
//         }
//     let params = {
//         Bucket: bucketName,
//         Key: thumbnailPicFolder + '/' + fileName,
//         Body: data,
//         ACL: 'public-read',
//         ContentType: mimeType
//     };
//    await  s3bucket.putObject(params).promise();

//  }
//     catch( err) {
//         winston.error("err-->>",err);
//     }
//     // return {};
        

// }

// exports.uploadFile = async function uploadFile(fileBuffer,originalPicFolder,thumbnailPicFolder,processedPicFolder,thumbnailMedPicFolder,thumbnail1080Folder,fileName,mimeType,fileExtension){
//     winston.info("In Upload File",mimeType.split("/")[0]);

//     try {
//         let promises = [];
//         if(originalPicFolder ==Config[process.env.NODE_ENV].s3BucketCredentials.folder.airlines){
//             let dimensions ={};
//             let buffer = await uploadProcessedImage(fileBuffer,originalPicFolder,fileName,mimeType,fileExtension);
//             let folder = Config[process.env.NODE_ENV].s3BucketCredentials.folder.airlines;

//             dimensions.width = 27;
//             dimensions.height = 23;
//             promises.push(uploadThumbnailImage(buffer,originalPicFolder,fileName,mimeType,dimensions,1,100,fileExtension,folder));
//         }
//         else if(mimeType.split("/")[0]=="image"){
//              promises = [];

//             console.log("============inside============")
//             let dimensions = await sizeOf(fileBuffer);
//             let buffer = await uploadProcessedImage(fileBuffer,processedPicFolder,fileName,mimeType,fileExtension);

//                 // dimensions.width = 1080;
//                 // promises.push(uploadThumbnailImage(buffer,thumbnail1080Folder,fileName,mimeType,dimensions,1,50));
          
//                 dimensions.width = 300;
//                 promises.push(uploadThumbnailImage(buffer,thumbnailPicFolder,fileName,mimeType,dimensions,1,50,fileExtension));
            
//                 dimensions.width = 800;
//                 promises.push(uploadThumbnailImage(buffer,thumbnailMedPicFolder,fileName,mimeType,dimensions,1,50,fileExtension));
//         }
//         else{
//              promises = [
//                 uploadOriginalImage(fileBuffer,processedPicFolder,fileName,mimeType,fileExtension)
//             ];
//         }
//         let [ thumbnailPic, thumbnailPicMed ,processedPic] = await Promise.all(promises);

//         return {};

//     } catch (err) {
//         console.log("===================err===========",err)
//         return err;
//     }
// };