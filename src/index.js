// import querystring from 'querystring';


function getBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req
      .on('data', (chunk) => {
        data += chunk;
      })
      .on('end', () => {
        resolve(data);
      })
      .on('error', reject);
  });
}

const Handles = {
  'application/json': function (data) {
    return JSON.parse(data);
  },
};

async function getRequestHandle(ctx) {
  return ctx.query;
}

async function postRequestHandle(ctx) {
  if (ctx.method !== 'POST') return null;

  let params = null;
  const body = await getBody(ctx.req);
  const type = ctx.get('Content-type').toLowerCase();

  if (type in Handles) {
    const handle = Handles[type];

    params = handle(body);
  }

  return params;
}


function defaultFilter(params, method) {
  return params;
}

/**
 * @desc auto parse ajax params into ctx.params
 *
 * @param filter {Function} Handle params after parse
 */
export default function ({ filter = defaultFilter } = {}) {
  return async (ctx, next) => {
    const app = ctx.app;

    let get = await getRequestHandle(ctx);
    let post = await postRequestHandle(ctx);

    // Apply filter
    get = filter(get);
    post = filter(post);

    // NOTE params is used by koa
    app.context.param = { get, post };
    await next();
  };
}
