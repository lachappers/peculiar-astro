import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import './chunks/1707728410672/astro.mjs';
import 'clsx';
import 'cssesc';
import { compile } from 'path-to-regexp';
import 'html-escaper';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"","routes":[{"file":"file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/estimate/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/estimate","isIndex":false,"type":"page","pattern":"^\\/estimate\\/?$","segments":[[{"content":"estimate","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/estimate.astro","pathname":"/estimate","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/policies/cookies/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/policies/cookies","isIndex":false,"type":"page","pattern":"^\\/policies\\/cookies\\/?$","segments":[[{"content":"policies","dynamic":false,"spread":false}],[{"content":"cookies","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/policies/cookies.md","pathname":"/policies/cookies","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/policies/privacy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/policies/privacy","isIndex":false,"type":"page","pattern":"^\\/policies\\/privacy\\/?$","segments":[[{"content":"policies","dynamic":false,"spread":false}],[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/policies/privacy.md","pathname":"/policies/privacy","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/policies/terms/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/policies/terms","isIndex":false,"type":"page","pattern":"^\\/policies\\/terms\\/?$","segments":[[{"content":"policies","dynamic":false,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/policies/terms.md","pathname":"/policies/terms","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/pricing/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pricing","isIndex":false,"type":"page","pattern":"^\\/pricing\\/?$","segments":[[{"content":"pricing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pricing.astro","pathname":"/pricing","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/quoter/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/quoter","isIndex":false,"type":"page","pattern":"^\\/quoter\\/?$","segments":[[{"content":"quoter","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/quoter.astro","pathname":"/quoter","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/services/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services","isIndex":false,"type":"page","pattern":"^\\/services\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services.astro","pathname":"/services","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://peculiardynamics.co.uk","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/accessible-astro-components/DarkMode.astro",{"propagation":"in-tree","containsHead":false}],["/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/accessible-astro-components/index.js",{"propagation":"in-tree","containsHead":false}],["/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/Header.astro",{"propagation":"in-tree","containsHead":false}],["/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/layouts/DefaultLayout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/layouts/MarkdownLayout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/policies/cookies.md",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/policies/cookies@_@md",{"propagation":"in-tree","containsHead":false}],["/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/policies/privacy.md",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/policies/privacy@_@md",{"propagation":"in-tree","containsHead":false}],["/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/policies/terms.md",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/policies/terms@_@md",{"propagation":"in-tree","containsHead":false}],["/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/contact.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/contact@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/estimate.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/estimate@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/pricing.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/pricing@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/quoter.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/quoter@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/services.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/services@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/estimate@_@astro":"pages/estimate.astro.mjs","\u0000@astro-page:src/pages/policies/cookies@_@md":"pages/policies/cookies.astro.mjs","\u0000@astro-page:src/pages/policies/privacy@_@md":"pages/policies/privacy.astro.mjs","\u0000@astro-page:src/pages/policies/terms@_@md":"pages/policies/terms.astro.mjs","\u0000@astro-page:src/pages/pricing@_@astro":"pages/pricing.astro.mjs","\u0000@astro-page:src/pages/quoter@_@astro":"pages/quoter.astro.mjs","\u0000@astro-page:src/pages/services@_@astro":"pages/services.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000virtual:empty-content":"_virtual_empty-content.mjs","/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/@astrojs/react/vnode-children.js":"chunks/1707728410672/vnode-children.mjs","\u0000@astrojs-manifest":"manifest_C85rEXd-.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.DxNniNsU.js","/astro/hoisted.js?q=3":"_astro/hoisted.C9hroqvP.js","/astro/hoisted.js?q=0":"_astro/hoisted.Dx11H7e8.js","/astro/hoisted.js?q=5":"_astro/hoisted.C8mbTa8G.js","/astro/hoisted.js?q=2":"_astro/hoisted.BvoidKyv.js","/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/ContactForm.jsx":"_astro/ContactForm.B2Hz0y4R.js","/astro/hoisted.js?q=6":"_astro/hoisted.jLUZlZ99.js","/astro/hoisted.js?q=4":"_astro/hoisted.DKHiHzSN.js","/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/CookieBanner.jsx":"_astro/CookieBanner.CkkI4BXx.js","@astrojs/react/client.js":"_astro/client.D9Vng9vH.js","astro:scripts/before-hydration.js":""},"assets":["/file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/index.html","/file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/404.html","/file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/contact/index.html","/file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/estimate/index.html","/file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/policies/cookies/index.html","/file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/policies/privacy/index.html","/file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/policies/terms/index.html","/file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/pricing/index.html","/file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/quoter/index.html","/file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/services/index.html","/~partytown/partytown-atomics.js","/~partytown/partytown-media.js","/~partytown/partytown-sw.js","/~partytown/partytown.js"],"buildFormat":"directory"});

export { manifest };
