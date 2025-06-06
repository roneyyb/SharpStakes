const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

const {
    wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const metroConfig = mergeConfig(getDefaultConfig(__dirname), config);
metroConfig.resolver = metroConfig.resolver || {};
metroConfig.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
};

module.exports = wrapWithReanimatedMetroConfig(metroConfig);