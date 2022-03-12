# Asker

<img src="https://img.shields.io/npm/v/@coloration/asker.svg" alt="version">
<img src="https://img.shields.io/npm/l/@coloration/asker.svg" alt="lic">
<img src="https://img.shields.io/npm/dm/@coloration/asker.svg" alt="Download">
<img src="https://img.shields.io/bundlephobia/min/@coloration/asker@1.0.0" alt="min">
<img src="https://img.shields.io/bundlephobia/minzip/@coloration/asker@1.0.0" alt="minzip">

a simple RESTful request tool for client

## Start Up

``` html
<script src="https://raw.githubusercontent.com/coloration/asker/master/dist/index.js"></script>
<script>
var Asker = asker.Asker
Asker.get('https://jsonplaceholder.typicode.com/users/1')
</script>
```

or

``` bash
$ npm i @coloration/asker -S
```


```js
// es6
import { Asker } from '@coloration/asker'
// node.js
const { Asker } = require('@coloration/asker')

Asker.get('https://jsonplaceholder.typicode.com/users/1')
```

## Document

[Document: https://coloration.github.io](https://coloration.github.io/#/asker)
