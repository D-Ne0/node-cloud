const _ = require('lodash');

const providers = {
  AWSS3: 'awss3'
};

const getProvider = function(providerName) {
  const provider = _.get(providers, providerName);
  if(!provider)
    throw "Invalid provider name supplied: " + provider;

  return provider;
};

const getProviderModule = function(providerName) {
  const provider = getProvider(providerName);
  const providerModuleName = `${provider}.provider.js`;
  try {
    const providerModule = require(`./providers/${providerModuleName}`);
    return providerModule;
  } catch(err) {
    throw "Provider module not found: " + providerModuleName;
  }
};

exports.getProvider = getProvider;
exports.getProviderModule = getProviderModule;
