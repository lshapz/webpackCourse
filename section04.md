# Optimizing for production 

## Heroku hosting

skip

## Production ready CSS

try slow 3G in performance and you can see flash of unstyled content 

`mini-css-extract-plugin`

```
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
...
		{
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader
          },
          {
            loader: "css-loader",
          }
        ]
      },
...
plugins: [
	new MiniCSSExtractPlugin()
	...
]

```

plugin takes optional args /options such `filename: [name]-[contenthash].css`

if you just want to remove whitespace from css files, add `options: {minimize: true }` after css-loader

loaders are effective on one file at a time, plugins are effective on entire plugin 

`optimize-css-assets-webpack-plugin`

```
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
...
  plugins: [
    new OptimizeCssAssetsPlugin({
    }),
    ...
  ]
	
```

## stripping dev-only JS definePlugin

env variables  libraries like react use these variables

move some requires from main.js to entry main array so we can have separate webpack.dev vs webpack.prod

`NODE_ENV=production` doesn't work in webpack unless you explicitly define

```
plugins: [
 new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
    ...
 ]
```

using define plugin gives you 37 kb more for react it will strip things out for dev process - helpful errors and dev niceties 

in webpack config we can export a function that returns the config object instead of just the object

 * then we can give it the variables 

in webpack cli you can pass anything and give a value then use in webpack file i.e. `--env.ANYTHING=foobar` 

## minification / mangling Babel Uglify

obsfucate and ready and smaller 

webpack concatenates for us 

`babel-minify babel-minify-webpack-plugin`

minify is more than removing whitespace, and also changes variable names within function scope 

```
#max

const globalVar = true

const something = function(someArg) {
    const longVariableName = someArg;
    const result = function(longVariableName) {
        return longVariableName * longVariableName + globalVar;
    }
    console.log(result)
}

#min

const globalVar=!0,something=function(a){console.log(function(a){return a*a+globalVar})};
```

Uglify is standard way for optimized for production, babel is newer 

`uglify-js-webpack-plugin`

try both to see who is optimizing your bundle the best 

`git checkout prod-js2-final`

## optimizng assets gzip brotili 

squeeze kilobytes 

gzip is standard `compression-webpack-plugin`

```
plugins: [
  new CompressionPlugin({
      algorithm: "gzip"
    })
    ...
]
```

sidebar stuff about express and heroku middleware

gzip doesn't compress jpg images because jpgs are already pretty compressed 

brotili is the new compression algorithm on the block `brotili-webpack-plugin` - takes no options 

if the express server can't find the compressed versions it falls back to uncompressed 

## blog with react 

skip 

## parsing MD 

skip

## SplitChunks / bundle analyzer 

`webpack-bundle-analyzer`

```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
...

plugins: [
    new BundleAnalyzerPlugin({
      generateStatsFile: true
    }),

...
]

```

the generateStatsFile 

separate app code from vendor code - most basic config 

```
optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
```
 
 another option: `cacheGroups: {vendor: {name: "vendor", chunks: "initial", minChunks: 2}}` 
 
 that gives the vendor its own name and puts it before the main bundle for setup and stuff 
 
 meant to replace CommonChunksPlugin from webpack3 
 
 `git checkout split-chunks-final`
