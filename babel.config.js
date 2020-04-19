'use strict';

const CJS = process.env.BUILD_TARGET === 'cjs';

module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          modules: CJS || process.env.NODE_ENV === 'test' ? 'commonjs' : false,
          targets: {
            node: 10
          },
          // unless we're explicitly building for cjs, assume we want modules.
          useBuiltIns: 'usage'
        }
      ]
    ],
    sourceMaps: true
  };
};
