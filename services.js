'use strict';

const _ = require('lodash');

const services = {
  FILE_STORAGE: 'filestorage'
};

const getService = function(serviceName) {
  const service = _.get(services, serviceName);
  if(!service)
    throw "Invalid service name supplied: " + serviceName;

  return service;
};

const getServiceModule = function(serviceName) {
  const service = getService(serviceName);
  const serviceModuleName = `${service}.service.js`;
  try {
    const serviceModule = require(`./services/${serviceModuleName}`);
    return serviceModule;
  } catch(err) {
    console.log(err);
    throw "Service module not found: " + serviceModuleName;
  }
};

exports.getService = getService;
exports.getServiceModule = getServiceModule;
