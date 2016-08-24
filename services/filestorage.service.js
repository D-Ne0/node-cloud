'use strict';

const FileStorageFactory = provider => {

  const service = {};

  /**
   * Upload content in cloud
   *
   * Parameters:
   *    folder: String
   *        Upload the content under this folder
   *    key: String
   *        Upload the content in this file
   *    content: new Buffer('...') || streamObject || 'STRING_VALUE'
   *        The data to be saved to cloud
   *    opts: Object, Optional
   *
   * Return:
   *    bluebird promise
   */
  service.uploadContent = (folder, file, content, opts) => provider.uploadContent(folder, file, content, opts);


  /**
   * Upload a file in cloud
   *
   * Parameters:
   *    folder: String
   *        Upload the file in this bucket
   *    file: String
   *        Save the file under this name
   *    path: String
   *        Path from where file content will be read
   *    opts: Object, Optional
   *
   * Return:
   *    bluebird promise
   */
  // service.uploadFile = (folder, file, path, opts) => provider.uploadFile(folder, file, path, opts);


  /**
   * Upload a file in S3 (returns the file details on S3)
   *
   * Parameters:
   *    folder: String
   *        Upload the file in this bucket
   *    file: String
   *        Save the file under this name
   *    path: String
   *        Path from where file content will be read
   *    opts: Object, Optional
   *
   * Return:
   *    bluebird promise
   */
  service.uploadFile = (folder, file, path, opts) => provider.uploadFile(folder, file, path, opts);


  /**
   * Get cloud file url
   *
   * Parameters:
   *    folder: String
   *        Folder where file is located
   *    file: String
   *       File whose URL is to be created
   *    opts: Object, Optional
   *
   * Return:
   *    bluebird promise
   */
  service.getFileUrl = (folder, file, opts) => provider.getFileUrl(folder, file, opts);


  /**
   * Download file from cloud
   *
   * Parameters:
   *    folder: String
   *        Download the file from this folder
   *    file: String
   *        Dowload this file
   *    path: String
   *        Path where file will be saved locally
   *    opts: Object, Optional
   *
   * Return:
   *    bluebird promise
   */
  service.downloadFile = (folder, file, path, opts) => provider.downloadFile(folder, file, path, opts);

  service.copyFile = (folder, file, copySource, opts) => provider.copyFile(folder, file, copySource, opts);

  return service;
};

module.exports = FileStorageFactory;
