const AWS = require('aws-sdk');
const BPromise = require('bluebird');
const fs = require('fs');
const _ = require('lodash');

const DEFAULT_EXPIRATION_IN_SECONDS = 3600;

const awsS3 = function (config) {
  if (config && config.accessKeyId && config.secretAccessKey) {
    AWS.config.update(config);
  } else {
    throw "You must provide accessKeyId, secretAccessKey and region.";
  }

  return {
    downloadFile: downloadFile,
    getFileUrl: getFileUrl,
    uploadContent: uploadContent,
    uploadFile: uploadFile,
  };
};

module.exports = awsS3;


/**
 * Put a content in S3
 *
 * Parameters:
 *    bucket: String
 *        Put the object in this bucket
 *    key: String
 *        Save the object under this key
 *    body: new Buffer('...') || streamObject || 'STRING_VALUE'
 *        The data to be saved to S3
 *
 * Return:
 *    bluebird promise
 */
const uploadContent = function (bucket, key, body) {
  const deferred = BPromise.defer();

  const s3 = new AWS.S3();
  const params = {
    Bucket: bucket,
    Key: key,
    Body: body,
  };

  s3.putObject(params, function (error, data) {
    if (error) {
      deferred.reject(error);
    }
    else {
      deferred.resolve(data);
    }
  });

  return deferred.promise;
};


/**
 * Put a file in S3
 *
 * Parameters:
 *    bucket: String
 *        Put the file in this bucket
 *    key: String
 *        Save the file under this key
 *    path: String
 *        Path from where file content will be read
 *
 * Return:
 *    bluebird promise
 */
const uploadFile = function (bucket, key, path) {
  const bodyStream = fs.createReadStream(path);

  return this.putObject(bucket, key, bodyStream);
};


/**
 * Download file from S3
 *
 * Parameters:
 *    bucket: String
 *        Download the object from this bucket
 *    key: String
 *        Download this key
 *    path: String
 *        Path where key will be saved locally
 *
 * Return:
 *    bluebird promise
 */
const downloadFile = function (bucket, key, path) {
  const deferred = BPromise.defer();

  const s3 = new AWS.S3();
  const params = {Bucket: bucket, Key: key};
  const writeStream = fs.createWriteStream(path);

  s3.getObject(params).createReadStream().pipe(writeStream);

  writeStream.on('finish', function () {
    deferred.resolve(path);
  })
  .on('error', function (err) {
    deferred.reject('Write stream to ' + path + ' did not finish successfully: ' + err);
  });

  return deferred.promise;
};


/**
 * Get S3 file url
 *
 * Parameters:
 *    bucket: String
 *        Put the object in this bucket
 *    key: String
 *        Save the object under this key
 *    opts: Object
 *        Optional args like expires, operation etc.
 *
 * Return:
 *    bluebird promise
 */
const getFileUrl = function (bucket, key, opts) {
  const deferred = BPromise.defer();

  const s3 = new AWS.S3();
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: _.get(opts, 'expires') || DEFAULT_EXPIRATION_IN_SECONDS
  };

  opts = opts || {};
  const operation = opts.operation || 'getObject';

  if (opts.contentType) {
    params.ContentType = opts.contentType;
  }

  if (opts.ACL) {
    params.ACL = opts.ACL;
  }

  s3.getSignedUrl(operation, params, function (error, url) {
    if (error) {
      deferred.reject(error);
    }
    else {
      deferred.resolve(url);
    }
  });

  return deferred.promise;
};
