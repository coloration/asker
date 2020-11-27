import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

export default {
  input: 'esm/index.js',
  output: {
    name: 'asker',
    file: 'dist/index.js',
    format: 'umd'
  },
  plugins: [
    babel(),
    uglify(), 
  ]
}