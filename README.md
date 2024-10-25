# v3-select

A selector component for Vue 3.x.

- Github: [https://github.com/zengliwei/v3-select/](https://github.com/zengliwei/v3-select/)
- Demo: [http://zengliwei.github.io/works/v3-select/](http://zengliwei.github.io/works/v3-select/)

![alt v3-select](https://zengliwei.github.io/web/images/works/v3-select/screenshot.png)

## Features

## Usage

Three ways are supported to use the component, here are the examples.

### Use library as global variable

Request the theme CSS and script files from CDN.

```html
<link rel="stylesheet" type="text/css" href="https://unpkg.com/v3-select@latest/dist/lib/v3-select-theme.min.css"/>
<script src="https://unpkg.com/vue@3.5.12/dist/vue.global.prod.js"></script>
<script src="https://unpkg.com/v3-select@latest/dist/lib/v3-select.umd.js"></script>
```

Use a div element with an id to mount the app.

```html

<div id="app">
    <v3-select/>
</div>
```

Write the script to create the Vue app.

```javascript
const {createApp} = Vue;

const app = createApp({
    data: () => {
        return {
        };
    }
});
app.component('v3-select', V3DTable);
app.mount('#app');
```

### ES Module

Request the theme CSS file and import the libraries from CDN.

```html
<link rel="stylesheet" type="text/css" href="https://unpkg.com/v3-select@latest/dist/lib/v3-select-theme.min.css"/>
<script type="importmap">
    {"imports": {
        "vue": "https://unpkg.com/vue@3.5.12/dist/vue.esm-browser.prod.js",
        "v3-select": "https://unpkg.com/v3-select@latest/dist/lib/v3-select.es.js"
    }}
</script>
```

Use a div element with an id to mount the app.

```html
<div id="app">
    <v3-select/>
</div>
```

Write the script to create the Vue app with `type="module"` attribute.

```javascript
import {createApp} from 'vue';
import V3DTable from 'v3-select';

const app = createApp({
    data: () => {
        return {
        };
    }
});
app.component('v3-select', V3DTable);
app.mount('#app');
```

### npm & Vue

Install the library from npm.

```bash
npm install v3-select
```

Use the component in your Vue app.

```html
<script setup>
import V3DTable from 'v3-select';
import 'v3-select/v3-select.css';
</script>

<template>
    <v3-select/>
</template>
```

## Configuration
