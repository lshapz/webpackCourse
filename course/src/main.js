require('babel-runtime/regenerator')
require('./main.css')
require('./index.html')

var a = async (args) => {
    const {a, b} = args
    await console.log('es6', a, b)
    console.log('es17')
}



a({a: 1, b: 2})