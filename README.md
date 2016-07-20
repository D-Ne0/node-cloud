node-cloud
================

A node module for interacting with different services of multiple clouds(AWS, Azure etc.)

###Installation:
```
npm install node-cloud
```

###Usage:
#####Accessing S3 service of AWS
```js
var serviceName = 'FILE_STORAGE';
var providerName = 'AWSS3';
var config = {
  accessKeyId: '',
  secretAccessKey: ''
}
var aws = require('node-module')(serviceName, providerName, config);
```

All these functions return a Bluebird promise.
```js
/**
 * bucket: bucket is S3 bucket
 * key: file name in S3
 */

// Upload content to S3
var content = 'Hello World'; // It can be a buffer or a stream or a simple string
aws.uploadContent(bucket, key, content);

// Download a file from S3 and save it locally
var filepath = '/home/myuser/download.txt'; // path where file will be downloaded
aws.downloadFile(bucket, key, filepath);

// Get a URL for a file on S3 that will expire in 1 hour by default
var opts = {expires: 7200}; // expires in seconds
var url = aws.getFileUrl(bucket, key, opts);

// Delete a file from S3
aws.deleteFile(bucket, key);
```

####Testing:
These tests will store data on S3, they aren't just stubs. AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY and S3_BUCKET environment variables must be defined.
```
AWS_ACCESS_KEY_ID='value' AWS_SECRET_ACCESS_KEY='value' S3_BUCKET='value' npm test
```

####Note: More services and cloud support will be added soon.
