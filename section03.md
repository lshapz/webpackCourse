# cyad

`git checkout hookup` 

## react

add react & react dom 

there's a babel-preset-react for things like jsx

recommends react dev tools 

using ReactDOM.render function to show compilation of render f(x) to React.createElements and stuff 

react-hot-loader library maintain state 

counter, class component style constructor and render jsx etc 

turn container into render function, use dynamic requires if module.hot 

add another babel-plugin (react-hot-loader) 

`git checkout hookup-react-final` 


## ejs and other templating languages (pug, handlebars)


### ejs 
 embedded javascript - default for webpack HTML plugin -rubylike 

`new HTMLWebpackPlugin({ template: "../src/blah.ejs", title: "Foobar"})` then can use `<%= htmlWebpackPlugin.options.title %>` in blah.ejs 


### pug 

pug will need a loader 

example pug file 
```
doctype html
html
    head
        title
            = htmlWebpackPlugin.options.title
    body
        .profile
            img(src=require('./images/link.jpg'))
            h1
                | Hello Hyrule
```      

### handlebars 

.hbs file       

handlebars loader in the use takes 
```
query: {
    inlineRequires: "/images"
}
```
instead of a require in the template file 


## css preprocessors

### sass

`npm install node-sass sass-loader` (node-sass is that big guy) 

sass - no brackets or semicolons, only tabs / whitespace 

```
{
        test: /\.sass$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
```

need all three (compiles from sass to css, from css to whatever style-loader does)

sass has neato nesting (.profile img vs regular image)

imports - you want to break css into various images so you can make a file for one specific thing and import it in the main.sass like `@import ./profile.sass`


### less


```
{
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" }
        ]
      },
```

less is very much same syntax as css / scss 

variables - `@grey: #444` at top; later `background-color: @grey`

imports, mixins, functions 


### stylus 

```
{
        test: /\.styl$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "stylus-loader" }
        ]
      },
```

basically same syntax as sass

but it also supports css syntax 


### autoprefixer

abstract browser compatibility into css build process  // `-ms-align-items` vs `align-items`

postCSS adds that automagically

add the postcss-laoder between the specific loader and the css loader, (or before the css loader??) 

```
{
        test: /\.styl$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "postcss-loader" }
          { loader: "stylus-loader" }
        ]
}
```
  
needs a config file `postcss.config.js`
 
```
module.exports = { plugins: [require("autoprefixer")] }
```
 
adds a bunch of moz and ms and webkit prefixes for all relevant properties  
 
it uses api from caniuse behind the scenes adds rules to support current browsers 
 
postcss has a tonne more options / plugins 
 
## JS in CSS 

`git checkout css-in-js` (state of end of react, so there's a counter) 

### css modules 


add modules: true option to import css into a js file and use variables ala `className={styles.counter}`

add localIdentName so it doesn't use a weird hash for styles.counter but calls it something like main--counter (name - of file, local - local variable name) 

 * if you add say '[name]--[local]--[hash:base64:8]' you have some cache-busting built in 

``` 
 {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          { loader: "css-loader" 
            query: {
              modules: true,
              localIdentName: '[name]--[local]'
            }
        
        }
       ]
      },
      
```



### emotion 

```

import {css} from 'emotion'
const red= "#f00"
const className = css`
  color: ${red}
`
...

<h1 className={className}>Foobar</h1>
```

classname looks like class="css-hash8nonsense"

<style data-emotion></style> tags 

can use other JS database etc 

can use react-emotion and babel-plugin-emotion to use props for these  

for babel you need `plugins: ["emotion", {"sourceMap": true, "autoLabel": true} ]`

pretty cool, very semantic source code


## typescript 

https://www.udemy.com/webpack-beyond-the-basics/learn/v4/t/lecture/9005820?start=0

## angular


## vue 

there is a vue-cli with a boilerplate 

`npm install -S vue-loader vue-template-compiler vue-style-loader`

first module and rules, familar, also need a plugin 

```
const {VueLoaderPlugin} = require("vue-loader")
	...
plugins: [
	new VueLoaderPlugin()

]
```

`render: h=>h(App)` -> h is createElement 

if you use a .vue file the vue-loader compiles templates but if you use .js files with templates you need the non-runtime only version of vue, which you can do with an alias 

```
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
```

