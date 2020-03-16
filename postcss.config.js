// postcss.config.js
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

productionExports = {
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

developmentExports = {
   plugins: [
      tailwindcss,
      autoprefixer,
   ],
};

if (process.env.NODE_ENV === 'production') {
   module.exports = productionExports;
}
else {
   module.exports = developmentExports;
}
