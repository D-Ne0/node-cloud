'use strict';

const getServiceModule = require('./services').getServiceModule;
const getProviderModule = require('./providers').getProviderModule;

const NodeCloud = function(serviceName, providerName, config) {
  const serviceModule = getServiceModule(serviceName);
  const providerModule = getProviderModule(providerName);

  config = config || {};
  const provider = providerModule(config);
  const service = serviceModule(provider);

  return service;
};

module.exports = NodeCloud;
