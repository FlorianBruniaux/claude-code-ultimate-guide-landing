import { defineRouteMiddleware } from '@astrojs/starlight/route-data'

import { adjustGuideRoute } from './data/guide-route-head.mjs'

export const onRequest = defineRouteMiddleware((context) => {
  adjustGuideRoute(context.locals.starlightRoute, context.url.pathname)
})
