const blacklist = require('metro-config/src/defaults/blacklist');
const path = require('path');

const glob = require('glob-to-regexp');

function getBlacklist() {
  const nodeModuleDirs = [
    glob(`${path.resolve(__dirname, '..')}/node_modules/*`),
    glob(`${path.resolve(__dirname)}/node_modules/metro/node_modules/fbjs/*`),
    glob(
      `${path.resolve(
        __dirname
      )}/node_modules/create-react-context/node_modules/fbjs/*`
    ),
    glob(
      `${path.resolve(
        __dirname
      )}/node_modules/create-react-class/node_modules/fbjs/*`
    ),
  ];
  return blacklist(nodeModuleDirs);
}

module.exports = {
  resolver: {
    blacklistRE: getBlacklist(),
    providesModuleNodeModules: [
      'react-native',
      'react',
      'invariant',
      'fbjs',
      'prop-types',
      'hoist-non-react-statics',
    ],
  },
  watchFolders: [path.resolve(__dirname, '..')],
};
