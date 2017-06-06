# KOA-AJAX-PARAMS

The Koa Middleware used to auto parse get & post request params.

## Install

```bash
npm i koa-ajax-params
```

```bash
yarn add kao-ajax-params
```

## Usage

For POST Request, when Content-Type is `application/json`,
middleware will auto parse body data to json that can be get from `this.param.post`.

For GET Request, you can get url query from `this.param.get.xxx`.

```javascript
import Koa from 'koa';
import router from 'koa-router';
import ajaxParamsParse from 'koa-ajax-params';

const app = new Koa();
const route = new router({
  prefix: '/api',
});

route
  .use(ajaxParamsParse())
  .get('/path', async function() {
    const id = this.param.get.id;
  })
  .post('/path', async function() {
    const id = this.param.post.id;
  });
```


## Content-Type Support

- application/json


## Feature

- Support `application/x-www-form-urlencoded`
- Support `multipart/form-data`
- Support `text/xml`

