const CJS = process.env.BUILD_TARGET === 'cjs';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: CJS ? 'commonjs' : false,
        targets: {
          node: 8
        },
        // unless we're explicitly building for cjs, assume we want modules.
        useBuiltIns: 'usage'
      }
    ]
  ].filter(Boolean),
  sourceMaps: true
};
