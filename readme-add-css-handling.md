Changes made to add CSS handling

CSS handling is added with this branch. It uses [Vue.js](https://vuejs.org/) the [Tailwind](https://tailwindcss.com/) CSS framework, but its concepts (and most of its code) would work well with other JavaScript/CSS frameworks.

The CSS handling provided includes:
 * Collect CSS from any Vue components
 * Compile Tailwind and add auto-prefixes
 * Merge all CSS into a single CSS file
 * Purge unused CSS (production only)
 * Minimize CSS (production only)

 `webpack.config.js` uses [PostCSS](https://postcss.org/) for most of the CSS processing.

 After adding these changes, you'll notice a main.[hash].css in the `dist` folder. This CSS file includes CSS from:
 * Any VUE components
 * Any HTML files
 * The `src/app.css` file
 * Tailwind CSS and its `src/tailwind.custom.css` file.

It's pretty amazing what Webpack and PostCSS are able to do for your application's CSS.

## plugins/loaders used in this step
* autoprefixer
* clean-webpack-plugin
* cross-env
* css-loader
* cssnano
* mini-css-extract-plugin
* postcss
* postcss-loader
* style-loader
* tailwindcss
* vue-style-loader

Some of these are used in `web.config.js` and some are used in `postcss.config.js`;&nbsp;`cross-env` isn't used in either (see the "cross-env plugin" section for details.)

### cross-env plugin

[`cross-env`](https://github.com/kentcdodds/cross-env) is a plugin that provides a cross-platform way to set environment variables. The `cross-env` plugin isn't used in `webpack.config.js` or `postcss.config.js`; its used in `package.json` to set the NODE_ENV value in its `scripts`.

To set `NODE_ENV`, use `cross-env NODE_ENV=n` (where `n` is `production` or `development`) before calling webpack (or whatever you're calling in the script).

>I'm not sure about the relationship between NODE_ENV and Webpack's `module.exports.mode`. To be sure I always set both on command lines as shown below. The `module.exports.mode` is unconditionally set to `production` in this step (NODE_ENV overrides that value). Separate `production` and `development` `web.config.js` files are covered in an upcoming step.

```
    "scripts": {
        "dev": "cross-env NODE_ENV=development webpack --mode=development
              --config ./config/webpack.config.js --hide-modules",
        "dev-server": "cross-env NODE_ENV=development webpack-dev-server
              --mode=development --config ./config/webpack.config.js
              --hide-modules",
        "build": "cross-env NODE_ENV=production webpack --mode=production
              --config ./config/webpack.config.js --hide-modules"
    },

```
The lines above are continued to make figure above clear. These lines should each be a contiguous line in the `package.json` file.

With `NODE_ENV` set, you can use its value to determine if production or development values should be used (as shown below in this fragment from the `postcss.config.js`) file.

```
if (process.env.NODE_ENV === 'production') {
   module.exports = productionExports;
}
else {
   module.exports = developmentExports;
}
```
## webpack.config.js changes from previous

### declarations
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
```

### module.export.rules changes

Add three loaders:

* MiniCssExtractPlugin.loader,
* css-loader
* postcss-loader

```
{
    test: /\.css$/,
    use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                config: {
                    path: './postcss.config.js',
                }
            }
        }
    ]
}
```
The `postcss-loader` needs a `postcss.config.js` configuration file. See the "postcss.config.js" section below.

### plugins

Add two plugins to the `module.exports.plugins` array:

````
new CleanWebpackPlugin(),
new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' })
````

### Other miscellaneous changes

#### Minor change for the `module.export.devtool` setting:
Added a JS object to provide constants for `devtool` settings. Other values will be added later.
```
devtoolOptions = {
    DO_NOT_USE_EVAL_IN_BUILD: 'false',
}
```
This assigns a value to from that object to WebPack's module.devtool value:

```
devtool: devtoolOptions.DO_NOT_USE_EVAL_IN_BUILD,
```

#### Minor change to `module.exports.devServer`

Changed the devServer port to 5000. This keeps this port consistent with my other dev tools localhost port settting.

```
port: 5000,
```

## postcss.config.js

One of the loaders `webpack.config.js` uses in this step is `postcss-loader` (its fragment from `web.config.js` is shown below).

loader: 'postcss-loader',
    options: {
        config: {
            path: './postcss.config.js',
        }
    }

PostCSS manages most of the CSS processes. You could embed PostCSS's config values directly into the `web.config.js` file, but it makes more sense to separate them into their own file. That file is show below.

```
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
```

### Setting PurgeCSS's default extractor

The [PurgeCSS](https://purgecss.com/) plugin removes unused CSS. This makes a huge difference in the ultimate size of the final CSS file rendered for production. PurgeCSS by matching all of the class names available against those in use your code (as defined by its `content` option). TailWind uses colons (:) in many of its class names. PurgeCSS's default search behavior wouldn't match class names with a colon. Therefore, its `defaultExtractor` option is set to a regular expression that acknowledges colons in class names (as shown below)

```
defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
```
## Other changes made

Change `src/app.js` to:

```
import Vue from 'vue';
import App from './App.vue';
import './app.css';
import '../tailwind.base.css';

new Vue({
    el: '#app',
    render: h => h(App)
})
```

Change `src/App.vue` to:

```
<template>
  <div>
      <div class="full-width center-content">
        <h1 class="text-3xl">This is from App.vue.</h1>
    </div>
    <message-component name="Vue.js"/>
  </div>
</template>

<script>

import MessageComponent from 'components/MessageComponent'

export default {
    name: 'app',
    components: {
        MessageComponent
    }
}
</script>

<style scoped>
    .full-width {
        width: 100%;
        background-color: pink;
    }

    .center-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
```

Note the addition of the `text-3xl` class name in the template. This shows that Tailwind is working.

Change `src/index.html` to

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body  class="bg-gray-400">
    <div id="app"></div>

</body>
</html>
```

Add this `/tailwind.base.css` file. This file is lifted pretty much as is from the Tailwind docs. It's recommended that `tailwindcss/base` and `tailwindcss/components` be ignored by PurgeCSS. Surrounding these two sections with the comments shown does that.

```
/* purgecss start ignore */
@import "tailwindcss/base";
/* purgecss end ignore */

/* purgecss start ignore */
@import "tailwindcss/components";
/* purgecss end ignore */

@import "tailwindcss/utilities";

@import url("./src/tailwind.custom.css");
```



Add `src/tailwind.custom.css`.

This file is currently empty but it is present. This is where you'd put Tailwind customizations.

Add `src/app.css`. This file is also currently empty. This is where you'd put other application-specific custom CSS that isn't directly related to Tailwind.

Add `/tailwind.config.js`

```
module.exports = {
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [],
}
```