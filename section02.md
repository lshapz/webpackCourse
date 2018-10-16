# webpack 4 Boilerplate

webpack dev server

hot reloading

better errors

express middleware

server side reloading

debugging in devtools


# making an initial thing

lots of flags in webpack 4 for running without a config file 

```
var path = require('path')

module.exports = {
    entry: {
        main: "./src/main.js"
    },
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/"

    },
    devServer: {
        contentBase: "dist"
    }
}
```

main can be an array if there are multiple files 

publicPath tells you where things will end up after being packed

* so if you want the bundle to be in "/script/main-bundle.js" then give publicPath "/js"

```
webpack-dev-server --config=config/webpack.dev.js
ℹ ｢wds｣: Project is running at http://localhost:8080/ #default
ℹ ｢wds｣: webpack output is served from / #publicPath
ℹ ｢wds｣: Content not from webpack is served from dist #contentBase
```

webpack dev server makes the bundle look a lot larger (100 lines for 1 line of code) but it will not end up in the production build  

# loaders

webpack only knows JS 


## css 
```
module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    }


```

test is a regex for filetypes

runs in reverse order so CSS loader lints and then passes to style-loader

style-loader injects CSS into HTML

styles autoreload in browser 

loaders1-final branch

## better errors

* errors show up both in dev server tab and console 

* to get it so it shows the error instead of the file! 
 * in devServer - overlay: true 

 
## html 

	rules:
	...
	{
                test: /\.html$/,
                use: [
                    { 
                        loader: "file-loader", 
                        options:  {
                        	name: "[name].html"
                        }
                    },
                    {
                        loader: "extract-loader"
                    },
                    {
                        loader: "html-loader"
                    }
                ]
            }


3 loaders for html: 

* file-loader, takes options for outputting file (to a name) 
* extract-loader tells us to make this a separate file
* html loader lints 

## images

add to html loader to handle img src

```
{
    loader: "html-loader",
    options: {
        attrs: ["img:src"]
    }
}
```

add another rule to modules to handle loading the image files 

```
{
                test: /\.(jpg|gif|png)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]"
                        }
                    }
                ]
            }
```

you can add something like `-[hash:8]` to a filename to add a hash to the image name (so they aren't all "profile" or whatever


## babel 

old browsers don't know es6 (still?) 

transpilers 

babel-core is now @babel/core (2.6)

plugins for various flavors and new languages 

.babelrc - JSOn file

babel-cli - you can type `babel src/main.js` and it'll output a translation 

pushes JS forward

one way to do things is with plugins 

```
{
    "plugins": ["transform-es2015-arrow-functions", "async-to-promises"]
}
```

### polyfills 

async/await es17 promiselike structure better syntax

babel can translate into a promise and a then

ie11 doesn't even understand promises

babel-polyfill gets added to entry 

```
entry: {
        main: ["babel-polyfill", "./src/main.js"]
    },
```

the full babel-polyfill package is huge so if you can figure out exactly which you will need that is more efficient `main: ["core-js/fn/promise", "./src/main.js"]`

polyfills will only be run when thing isn't supported natively, they still have to be shipped in the bundle 

preset for particular year or way of working (es17, react) 

babel-preset-env is best 

debug gives us a list of things we've added

targets tells us which to use (only use ones needed for x versions of browsers)

```
{
    "presets": [
        [
            "env",
            {
                targets: {
                    "browsers": ["last 2 versions"]
                },
                "debug": true
            }
        ]
    ]
}
```

[compat-table](kangax.github.io/compat-table) compatablility of browsers 

plugin for transform-runtime `babel-plugin-transform-runtime`

HTK: needs @babel/core@6 && babel-loader@7 OR an update to babel 7 

also it's destructure not denature 


## DYI dev server

not gonna code along just gonna take notes 

rebuilding webpack-dev-server with express and middleware 

add express, server directory server/main and server/express  package.json server script 

main - requires babel-register to transpile everything below it 

express, path, make a simple server file 

we need to add static middleware to make it serve index.html server.use(middleWare) 

middleware for reloading is webpack-dev-middleware (compiler, config.devServer)

you need the middleware and the webpack config to make a compiler 

to get the color we need to add stats: { colors: true } to devServer in webpack config 

one more piece of middleware to HOT reload webpack-hot-middleware (compiler) -- before static but after dev middlewares - you also need it on client side 

need to add things to webpack config for hot middlewares {hot: true} also plugins new webpack.HotModuleReplacementPlugin() 

`git checkout express1-final`

hot reloading for html is an extra video of steps 

`nodemon` - nodemon watches directories and restarts node every time they change 

`nodemon --watch config --watch src/server src/server/main.js`

we need a new plugin and replacement loaders to get reloads on changes in .html file 

html-webpack-plugin - replaces file and extract loader also add to plugins array 

?reload=true has to be in client side require 

`git checkout reload-final`

## node with chrome dev tools 

`git checkout debugging` 

add --inspect flag to nodemon adds a debugger listening on another port 

if you see `__webpack_require__(etc)` then you're seeing transpiled code

so add `devtool: "source-map"` to config exports 

this is all for development not production

hot reloading reactive programming with server devtools 

`git checkout debugging-final` 