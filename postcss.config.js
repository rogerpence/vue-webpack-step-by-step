// postcss.config.js
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
   plugins: [
      tailwindcss,
      autoprefixer,
      require('@fullhuman/postcss-purgecss')({
         content: [
            './src/**/*.html',
            './src/**/*.vue',
         ],
         defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
      }),
      require('cssnano')({
         preset: 'default',
     }),
   ],
};