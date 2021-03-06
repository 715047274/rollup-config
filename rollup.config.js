import externalDeps from '@yolodev/rollup-config-external-deps';
import lerna from '@yolodev/rollup-config-lerna';
import path from 'path';
import typescript from '@yolodev/rollup-config-typescript';

const binSafeName = ({ name, scope }) =>
  scope ? name.substring(scope.length + 1) : name;

const compose = (...args) => arg => args.reduceRight((val, fn) => fn(val), arg);

const enhance = compose(
  lerna(),
  externalDeps(),
  typescript(),
);

export default enhance((_, __, ctx) => {
  const pkg = ctx.package;
  const safeName = binSafeName(pkg.resolved);

  return {
    input: './src/index.ts',
    output: [
      {
        format: 'cjs',
        file: `./dist/${safeName}.js`,
        exports: 'named',
        sourcemap: true,
      },
      {
        format: 'es',
        file: `./dist/${safeName}.esm.js`,
        sourcemap: true,
      },
    ],
  };
});
