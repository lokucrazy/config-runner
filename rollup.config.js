import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'config-runner.js',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
  },
  plugins: [typescript()]
}