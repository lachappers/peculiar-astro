/* empty css                  */
import '@astrojs/internal-helpers/path';
import { createAstro, createComponent, renderTemplate, addAttribute, AstroError, ExpectedImageOptions, ExpectedImage, InvalidImageService, ImageMissingAlt, maybeRenderHead, spreadAttributes, renderComponent, renderSlot, createTransitionScope, renderHead, unescapeHTML, Fragment } from './astro.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';
/* empty css                */
import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useState } from 'react';
/* empty css                  */
/* empty css                   */
/* empty css                  */
/* empty css                  */
/* empty css                 */
/* empty css                  */
import { isESMImportedImage, isLocalService, isRemoteImage, DEFAULT_HASH_PROPS } from './astro/assets-service.mjs';
import { getIconData, iconToSVG } from '@iconify/utils';
/* empty css                */
/* empty css                  */
/* empty css                   */

const $$Astro$y = createAstro("https://peculiardynamics.co.uk");
const $$SiteMeta = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$y, $$props, $$slots);
  Astro2.self = $$SiteMeta;
  const { title, description, url, image, author } = Astro2.props;
  let subtitle = "Peculiar Dynamics";
  return renderTemplate`<!-- general meta --><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><meta name="author"${addAttribute(author, "content")}><!-- open graph --><meta property="og:title"${addAttribute(`${title} - ${subtitle}`, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta property="og:url"${addAttribute(url, "content")}><meta property="og:image"${addAttribute(Astro2.site ? `${Astro2.site}${image}` : image, "content")}><!-- twitter card --><!-- page title --><title>${title} - ${subtitle}</title>`;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/SiteMeta.astro", void 0);

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      './astro/assets-service.mjs'
    ).then(n => n.sharp).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  const originalPath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : resolvedOptions.src;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash, originalPath);
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalPath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$x = createAstro("https://peculiardynamics.co.uk");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$x, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/astro/components/Image.astro", void 0);

const $$Astro$w = createAstro("https://peculiardynamics.co.uk");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$w, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					new URL("file:///Users/chappers/Developer/projects/peculiar/peculiar-astro/dist/");
					const getImage = async (options) => await getImage$1(options, imageConfig);

const $$Astro$v = createAstro("https://peculiardynamics.co.uk");
const $$ResponsiveToggle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$v, $$props, $$slots);
  Astro2.self = $$ResponsiveToggle;
  return renderTemplate`${maybeRenderHead()}<button class="responsive-toggle" aria-expanded="false" aria-label="Open menu navigation" data-astro-cid-3qc6hvr2> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" data-astro-cid-3qc6hvr2><path fill="var(--action-color)" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z" data-astro-cid-3qc6hvr2></path></svg> </button>  `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/ResponsiveToggle.astro", void 0);

var __freeze$5 = Object.freeze;
var __defProp$5 = Object.defineProperty;
var __template$5 = (cooked, raw) => __freeze$5(__defProp$5(cooked, "raw", { value: __freeze$5(raw || cooked.slice()) }));
var _a$5;
const $$Astro$u = createAstro("https://peculiardynamics.co.uk");
const $$DarkMode$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$u, $$props, $$slots);
  Astro2.self = $$DarkMode$1;
  return renderTemplate(_a$5 || (_a$5 = __template$5(["", `<button class="darkmode-toggle" aria-pressed="false" aria-label="Enable dark mode"> <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.353 3C5.849 4.408 3 7.463 3 11.47A9.53 9.53 0 0 0 12.53 21c4.007 0 7.062-2.849 8.47-6.353C8.17 17.065 8.14 8.14 9.353 3z"></path></svg> </button> <script>
  // variables
  let darkMode = localStorage.getItem("darkMode");
  const darkModeToggle = document.querySelector(".darkmode-toggle");
  //   const darkLogo = document.querySelector('.dark-logo')
  //   const lightLogo = document.querySelector('.light-logo')

  // functions
  const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    darkModeToggle.innerHTML = \`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0V3zM5.707 4.293a1 1 0 0 0-1.414 1.414l1 1a1 1 0 0 0 1.414-1.414l-1-1zm14 0a1 1 0 0 0-1.414 0l-1 1a1 1 0 0 0 1.414 1.414l1-1a1 1 0 0 0 0-1.414zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-9 4a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2H3zm17 0a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2h-1zM6.707 18.707a1 1 0 1 0-1.414-1.414l-1 1a1 1 0 1 0 1.414 1.414l1-1zm12-1.414a1 1 0 0 0-1.414 1.414l1 1a1 1 0 0 0 1.414-1.414l-1-1zM13 20a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0v-1z" fill="currentColor"/></svg>\`;
    darkModeToggle.setAttribute("aria-pressed", "true");
    darkModeToggle.setAttribute("aria-label", "Disable dark mode");
    // darkLogo.classList.remove('hidden')
    // lightLogo.classlist.add('hidden')
    localStorage.setItem("darkMode", "enabled");
  };

  const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    darkModeToggle.innerHTML = \`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.353 3C5.849 4.408 3 7.463 3 11.47A9.53 9.53 0 0 0 12.53 21c4.007 0 7.062-2.849 8.47-6.353C8.17 17.065 8.14 8.14 9.353 3z"/></svg>\`;
    darkModeToggle.setAttribute("aria-pressed", "false");
    darkModeToggle.setAttribute("aria-label", "Enable dark mode");
    // lightLogo.classList.remove('hidden')
    // darkLogo.classlist.add('hidden')
    localStorage.setItem("darkMode", null);
  };

  // execution
  if (darkMode === "enabled") enableDarkMode();

  darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");

    darkMode !== "enabled" ? enableDarkMode() : disableDarkMode();
  });
<\/script>`], ["", `<button class="darkmode-toggle" aria-pressed="false" aria-label="Enable dark mode"> <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.353 3C5.849 4.408 3 7.463 3 11.47A9.53 9.53 0 0 0 12.53 21c4.007 0 7.062-2.849 8.47-6.353C8.17 17.065 8.14 8.14 9.353 3z"></path></svg> </button> <script>
  // variables
  let darkMode = localStorage.getItem("darkMode");
  const darkModeToggle = document.querySelector(".darkmode-toggle");
  //   const darkLogo = document.querySelector('.dark-logo')
  //   const lightLogo = document.querySelector('.light-logo')

  // functions
  const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    darkModeToggle.innerHTML = \\\`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0V3zM5.707 4.293a1 1 0 0 0-1.414 1.414l1 1a1 1 0 0 0 1.414-1.414l-1-1zm14 0a1 1 0 0 0-1.414 0l-1 1a1 1 0 0 0 1.414 1.414l1-1a1 1 0 0 0 0-1.414zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-9 4a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2H3zm17 0a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2h-1zM6.707 18.707a1 1 0 1 0-1.414-1.414l-1 1a1 1 0 1 0 1.414 1.414l1-1zm12-1.414a1 1 0 0 0-1.414 1.414l1 1a1 1 0 0 0 1.414-1.414l-1-1zM13 20a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0v-1z" fill="currentColor"/></svg>\\\`;
    darkModeToggle.setAttribute("aria-pressed", "true");
    darkModeToggle.setAttribute("aria-label", "Disable dark mode");
    // darkLogo.classList.remove('hidden')
    // lightLogo.classlist.add('hidden')
    localStorage.setItem("darkMode", "enabled");
  };

  const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    darkModeToggle.innerHTML = \\\`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.353 3C5.849 4.408 3 7.463 3 11.47A9.53 9.53 0 0 0 12.53 21c4.007 0 7.062-2.849 8.47-6.353C8.17 17.065 8.14 8.14 9.353 3z"/></svg>\\\`;
    darkModeToggle.setAttribute("aria-pressed", "false");
    darkModeToggle.setAttribute("aria-label", "Enable dark mode");
    // lightLogo.classList.remove('hidden')
    // darkLogo.classlist.add('hidden')
    localStorage.setItem("darkMode", null);
  };

  // execution
  if (darkMode === "enabled") enableDarkMode();

  darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");

    darkMode !== "enabled" ? enableDarkMode() : disableDarkMode();
  });
<\/script>`])), maybeRenderHead());
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/DarkMode.astro", void 0);

const darkLogo = new Proxy({"src":"/_astro/350x100-alt-dark.7YUixD0o.webp","width":350,"height":100,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/assets/img/350x100-alt-dark.webp";
							}
							globalThis.astroAsset.referencedImages.add("/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/assets/img/350x100-alt-dark.webp");
							return target[name];
						}
					});

const lightLogo = new Proxy({"src":"/_astro/350x100.B7hgf8GB.webp","width":350,"height":100,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/assets/img/350x100.webp";
							}
							globalThis.astroAsset.referencedImages.add("/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/assets/img/350x100.webp");
							return target[name];
						}
					});

const $$Astro$t = createAstro("https://peculiardynamics.co.uk");
const $$Navigation = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$t, $$props, $$slots);
  Astro2.self = $$Navigation;
  return renderTemplate`${maybeRenderHead()}<div id="main-navigation" class="is-desktop flex max-h-24 w-full max-w-full py-2"> <div class="container flex max-h-full w-full max-w-full justify-between"> <a href="/" class="min-w-32 flex w-fit flex-auto items-center"> <!-- <img
        class="hidden object-contain dark:block"
        src={darkLogo.src}
        alt="Our Logo"
        width="350"
        height="100"
      />
      <img
        class="block object-contain dark:hidden"
        src={lightLogo.src}
        alt="Our Logo"
        width="350"
        height="100"
      /> --> ${renderComponent($$result, "Image", $$Image, { "class": "block object-contain dark:hidden", "src": lightLogo, "alt": "Our Logo", "width": "350", "height": "100" })} ${renderComponent($$result, "Image", $$Image, { "class": "hidden object-contain dark:block", "src": darkLogo, "alt": "Our Logo", "width": "350", "height": "100" })} </a> <div class="flex w-full flex-auto items-center justify-end gap-4"> <nav id="desktop-menu" class="desktop-menu" aria-label="Main navigation desktop"> <ul class="menu"> ${renderSlot($$result, $$slots["default"])} </ul> </nav> ${renderComponent($$result, "DarkMode", $$DarkMode$1, {})} ${renderComponent($$result, "ResponsiveToggle", $$ResponsiveToggle, {})} </div> </div> <nav id="mobile-menu" class="mobile-menu self-end" aria-label="Main navigation mobile"> <ul class="menu"> ${renderSlot($$result, $$slots["default"])} </ul> </nav> </div>  `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/Navigation.astro", void 0);

var __freeze$4 = Object.freeze;
var __defProp$4 = Object.defineProperty;
var __template$4 = (cooked, raw) => __freeze$4(__defProp$4(cooked, "raw", { value: __freeze$4(raw || cooked.slice()) }));
var _a$4;
const $$Astro$s = createAstro("https://peculiardynamics.co.uk");
const $$Accordion = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$Accordion;
  return renderTemplate(_a$4 || (_a$4 = __template$4(["", '<div class="accordion"> <ul class="accordion__wrapper"> ', ` </ul> </div> <script type="module">
  // variables
  const accordionItems = [...document.querySelectorAll('.accordion__item')]

  // functions
  const getPanelHeight = (accordionItem) => {
    const accordionInner = accordionItem.querySelector('.panel__inner')
    return accordionInner.getBoundingClientRect().height
  }

  const openAccordionItem = (accordionItem) => {
    const accordionItemHeader = accordionItem.querySelector('.accordion__header')
    const accordionToggleIndicator = accordionItem.querySelector('.header__toggle-indicator')
    const accordionPanel = accordionItem.querySelector('.accordion__panel')

    accordionPanel.style.height = \`\${getPanelHeight(accordionItem)}px\`
    accordionItem.classList.add('is-active')
    accordionItemHeader.setAttribute('aria-expanded', true)
    accordionToggleIndicator.innerHTML = \`<svg class="header__toggle-indicator" aria-hidden="true" data-prefix="fas" data-icon="minus" class="svg-inline--fa fa-minus fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>\`
  }

  const closeAccordionItem = (accordionItem) => {
    const accordionItemHeader = accordionItem.querySelector('.accordion__header')
    const accordionToggleIndicator = accordionItem.querySelector('.header__toggle-indicator')
    const accordionPanel = accordionItem.querySelector('.accordion__panel')

    accordionItem.classList.remove('is-active')
    accordionPanel.style.height = 0
    accordionItemHeader.focus()
    accordionItemHeader.setAttribute('aria-expanded', false)
    accordionToggleIndicator.innerHTML = \`<svg class="header__toggle-indicator" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>\`
  }

  const isAccordionOpen = (accordionItem) => {
    return accordionItem.classList.contains('is-active')
  }

  function toggleAccordionItem() {
    const accordionItem = event.target.closest('.accordion__item')
    if (!accordionItem || event.target.closest('.accordion__panel')) return

    isAccordionOpen(accordionItem) ? closeAccordionItem(accordionItem) : openAccordionItem(accordionItem)
  }

  function recalculateHeight() {
    const toggledAccordionItems = accordionItems.filter((element) => element.classList.contains('is-active'))

    toggledAccordionItems.forEach((toggledAccordionItem) => {
      const accordionPanel = toggledAccordionItem.querySelector('.accordion__panel')
      accordionPanel.style.height = \`\${getPanelHeight(toggledAccordionItem)}px\`
    })
  }

  // execution
  accordionItems.forEach((item, index) => {
    const accordionItemHeader = item.querySelector('.accordion__header')
    const accordionItemPanel = item.querySelector('.accordion__panel')

    accordionItemHeader.setAttribute('id', \`accordion-item\${index + 1}\`)
    accordionItemPanel.setAttribute('id', \`item\${index + 1}\`)

    accordionItemHeader.setAttribute('aria-controls', \`item\${index + 1}\`)
    accordionItemPanel.setAttribute('aria-labelledby', \`accordion-item\${index + 1}\`)
  })

  document.addEventListener('keydown', (event) => {
    const accordionItem = event.target.closest('.accordion__item')

    if (event.key !== 'Escape') return
    if (!accordionItem) return

    if (isAccordionOpen(accordionItem)) {
      closeAccordionItem(accordionItem)
    }
  })

  document.addEventListener('keydown', (event) => {
    if (!event.target.closest('.accordion__header')) return

    const accordionWrapper = event.target.closest('.accordion__wrapper')
    const accordionItem = event.target.closest('.accordion__item')
    const accordionItems = [...accordionWrapper.querySelectorAll('.accordion__item')]
    const index = accordionItems.findIndex((element) => element === accordionItem)

    const { key } = event

    let targetItem

    if (key === 'ArrowDown') {
      targetItem = accordionItems[index + 1]
    }

    if (key === 'ArrowUp') {
      targetItem = accordionItems[index - 1]
    }

    if (targetItem) {
      event.preventDefault()
      targetItem.querySelector('.accordion__header').focus()
    }
  })

  window.toggleAccordionItem = toggleAccordionItem
  window.onresize = recalculateHeight
<\/script> `], ["", '<div class="accordion"> <ul class="accordion__wrapper"> ', ` </ul> </div> <script type="module">
  // variables
  const accordionItems = [...document.querySelectorAll('.accordion__item')]

  // functions
  const getPanelHeight = (accordionItem) => {
    const accordionInner = accordionItem.querySelector('.panel__inner')
    return accordionInner.getBoundingClientRect().height
  }

  const openAccordionItem = (accordionItem) => {
    const accordionItemHeader = accordionItem.querySelector('.accordion__header')
    const accordionToggleIndicator = accordionItem.querySelector('.header__toggle-indicator')
    const accordionPanel = accordionItem.querySelector('.accordion__panel')

    accordionPanel.style.height = \\\`\\\${getPanelHeight(accordionItem)}px\\\`
    accordionItem.classList.add('is-active')
    accordionItemHeader.setAttribute('aria-expanded', true)
    accordionToggleIndicator.innerHTML = \\\`<svg class="header__toggle-indicator" aria-hidden="true" data-prefix="fas" data-icon="minus" class="svg-inline--fa fa-minus fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>\\\`
  }

  const closeAccordionItem = (accordionItem) => {
    const accordionItemHeader = accordionItem.querySelector('.accordion__header')
    const accordionToggleIndicator = accordionItem.querySelector('.header__toggle-indicator')
    const accordionPanel = accordionItem.querySelector('.accordion__panel')

    accordionItem.classList.remove('is-active')
    accordionPanel.style.height = 0
    accordionItemHeader.focus()
    accordionItemHeader.setAttribute('aria-expanded', false)
    accordionToggleIndicator.innerHTML = \\\`<svg class="header__toggle-indicator" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>\\\`
  }

  const isAccordionOpen = (accordionItem) => {
    return accordionItem.classList.contains('is-active')
  }

  function toggleAccordionItem() {
    const accordionItem = event.target.closest('.accordion__item')
    if (!accordionItem || event.target.closest('.accordion__panel')) return

    isAccordionOpen(accordionItem) ? closeAccordionItem(accordionItem) : openAccordionItem(accordionItem)
  }

  function recalculateHeight() {
    const toggledAccordionItems = accordionItems.filter((element) => element.classList.contains('is-active'))

    toggledAccordionItems.forEach((toggledAccordionItem) => {
      const accordionPanel = toggledAccordionItem.querySelector('.accordion__panel')
      accordionPanel.style.height = \\\`\\\${getPanelHeight(toggledAccordionItem)}px\\\`
    })
  }

  // execution
  accordionItems.forEach((item, index) => {
    const accordionItemHeader = item.querySelector('.accordion__header')
    const accordionItemPanel = item.querySelector('.accordion__panel')

    accordionItemHeader.setAttribute('id', \\\`accordion-item\\\${index + 1}\\\`)
    accordionItemPanel.setAttribute('id', \\\`item\\\${index + 1}\\\`)

    accordionItemHeader.setAttribute('aria-controls', \\\`item\\\${index + 1}\\\`)
    accordionItemPanel.setAttribute('aria-labelledby', \\\`accordion-item\\\${index + 1}\\\`)
  })

  document.addEventListener('keydown', (event) => {
    const accordionItem = event.target.closest('.accordion__item')

    if (event.key !== 'Escape') return
    if (!accordionItem) return

    if (isAccordionOpen(accordionItem)) {
      closeAccordionItem(accordionItem)
    }
  })

  document.addEventListener('keydown', (event) => {
    if (!event.target.closest('.accordion__header')) return

    const accordionWrapper = event.target.closest('.accordion__wrapper')
    const accordionItem = event.target.closest('.accordion__item')
    const accordionItems = [...accordionWrapper.querySelectorAll('.accordion__item')]
    const index = accordionItems.findIndex((element) => element === accordionItem)

    const { key } = event

    let targetItem

    if (key === 'ArrowDown') {
      targetItem = accordionItems[index + 1]
    }

    if (key === 'ArrowUp') {
      targetItem = accordionItems[index - 1]
    }

    if (targetItem) {
      event.preventDefault()
      targetItem.querySelector('.accordion__header').focus()
    }
  })

  window.toggleAccordionItem = toggleAccordionItem
  window.onresize = recalculateHeight
<\/script> `])), maybeRenderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/accessible-astro-components/Accordion.astro", void 0);

const $$Astro$r = createAstro("https://peculiardynamics.co.uk");
const $$AccordionItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$AccordionItem;
  const { header } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li class="accordion__item"> <h3> <button id="accordion-header-1" class="accordion__header" aria-expanded="false" aria-controls="accordion-panel-1" onclick="toggleAccordionItem()"> ${header} <svg class="header__toggle-indicator" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"> <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path> </svg> </button> </h3> <div id="accordion-panel-1" role="region" class="accordion__panel" aria-labelledby="accordion-header-1"> <div class="panel__inner"> ${renderSlot($$result, $$slots["default"])} </div> </div> </li> `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/accessible-astro-components/AccordionItem.astro", void 0);

const $$Astro$q = createAstro("https://peculiardynamics.co.uk");
const $$Breadcrumbs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$Breadcrumbs;
  return renderTemplate`${maybeRenderHead()}<nav class="breadcrumbs" aria-label="Breadcrumbs"> <ol> ${renderSlot($$result, $$slots["default"])} </ol> </nav> `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/accessible-astro-components/Breadcrumbs.astro", void 0);

const $$Astro$p = createAstro("https://peculiardynamics.co.uk");
const $$BreadcrumbsItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$BreadcrumbsItem;
  const { href = "#", label = "Breadcrumb", currentPage = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li class="breadcrumbs__item"> ${currentPage ? renderTemplate`<span aria-current="page">${label}</span>` : renderTemplate`<a${addAttribute(href, "href")}>${label}</a>`} </li> `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/accessible-astro-components/BreadcrumbsItem.astro", void 0);

const $$Astro$o = createAstro("https://peculiardynamics.co.uk");
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Card;
  const { url = "#", img = "https://fakeimg.pl/640x360", title = "Default title", footer = "Your name" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="card"> <div class="card__image"> <img${addAttribute(img, "src")} alt=""> </div> <div class="card__content"> <h3> <a${addAttribute(url, "href")}>${title}</a> </h3> <p> ${renderSlot($$result, $$slots["default"], renderTemplate`Default description.`)} </p> <small> ${footer} </small> </div> </div> `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/accessible-astro-components/Card.astro", void 0);

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(raw || cooked.slice()) }));
var _a$3;
const $$Astro$n = createAstro("https://peculiardynamics.co.uk");
const $$DarkMode = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$DarkMode;
  return renderTemplate(_a$3 || (_a$3 = __template$3(["", '<button class="darkmode-toggle" aria-pressed="false" aria-label="Toggle Dark Mode"', `> <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.353 3C5.849 4.408 3 7.463 3 11.47A9.53 9.53 0 0 0 12.53 21c4.007 0 7.062-2.849 8.47-6.353C8.17 17.065 8.14 8.14 9.353 3z"></path></svg> </button> <script>
// variables
let darkMode = localStorage.getItem('darkMode')
const darkModeToggle = document.querySelector('.darkmode-toggle')

// functions
const enableDarkMode = (store = true) => {
  document.body.classList.add('darkmode')
  darkModeToggle.innerHTML = \`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0V3zM5.707 4.293a1 1 0 0 0-1.414 1.414l1 1a1 1 0 0 0 1.414-1.414l-1-1zm14 0a1 1 0 0 0-1.414 0l-1 1a1 1 0 0 0 1.414 1.414l1-1a1 1 0 0 0 0-1.414zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-9 4a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2H3zm17 0a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2h-1zM6.707 18.707a1 1 0 1 0-1.414-1.414l-1 1a1 1 0 1 0 1.414 1.414l1-1zm12-1.414a1 1 0 0 0-1.414 1.414l1 1a1 1 0 0 0 1.414-1.414l-1-1zM13 20a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0v-1z" fill="currentColor"/></svg>\`
  darkModeToggle.setAttribute('aria-pressed', 'true')
  if (store) localStorage.setItem('darkMode', 'enabled')
}

const disableDarkMode = (store = true) => {
  document.body.classList.remove('darkmode')
  darkModeToggle.innerHTML = \`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.353 3C5.849 4.408 3 7.463 3 11.47A9.53 9.53 0 0 0 12.53 21c4.007 0 7.062-2.849 8.47-6.353C8.17 17.065 8.14 8.14 9.353 3z"/></svg>\`
  darkModeToggle.setAttribute('aria-pressed', 'false')
  if (store) localStorage.setItem('darkMode', 'disabled')
}

const checkPreference = () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    enableDarkMode(false) // don't set localStorage from preferences to respect future changes in client prefs
  } else {
    disableDarkMode(false)
  }
}

// execution
if (darkMode === 'enabled') enableDarkMode()
if (darkMode === 'disabled') disableDarkMode()
if (!darkMode) checkPreference()

darkModeToggle.addEventListener('click', () => {
  darkMode = document.body.classList.contains('darkmode')

  !darkMode ? enableDarkMode() : disableDarkMode()
})

// Listen for view transitions
document.addEventListener('astro:after-swap', () => {
  // Setup
  darkMode = localStorage.getItem('darkMode')

  // Execution
  if (darkMode === 'enabled') enableDarkMode()
  if (darkMode === 'disabled') disableDarkMode()
  if (!darkMode) checkPreference()
})
<\/script>`], ["", '<button class="darkmode-toggle" aria-pressed="false" aria-label="Toggle Dark Mode"', `> <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.353 3C5.849 4.408 3 7.463 3 11.47A9.53 9.53 0 0 0 12.53 21c4.007 0 7.062-2.849 8.47-6.353C8.17 17.065 8.14 8.14 9.353 3z"></path></svg> </button> <script>
// variables
let darkMode = localStorage.getItem('darkMode')
const darkModeToggle = document.querySelector('.darkmode-toggle')

// functions
const enableDarkMode = (store = true) => {
  document.body.classList.add('darkmode')
  darkModeToggle.innerHTML = \\\`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0V3zM5.707 4.293a1 1 0 0 0-1.414 1.414l1 1a1 1 0 0 0 1.414-1.414l-1-1zm14 0a1 1 0 0 0-1.414 0l-1 1a1 1 0 0 0 1.414 1.414l1-1a1 1 0 0 0 0-1.414zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-9 4a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2H3zm17 0a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2h-1zM6.707 18.707a1 1 0 1 0-1.414-1.414l-1 1a1 1 0 1 0 1.414 1.414l1-1zm12-1.414a1 1 0 0 0-1.414 1.414l1 1a1 1 0 0 0 1.414-1.414l-1-1zM13 20a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0v-1z" fill="currentColor"/></svg>\\\`
  darkModeToggle.setAttribute('aria-pressed', 'true')
  if (store) localStorage.setItem('darkMode', 'enabled')
}

const disableDarkMode = (store = true) => {
  document.body.classList.remove('darkmode')
  darkModeToggle.innerHTML = \\\`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.353 3C5.849 4.408 3 7.463 3 11.47A9.53 9.53 0 0 0 12.53 21c4.007 0 7.062-2.849 8.47-6.353C8.17 17.065 8.14 8.14 9.353 3z"/></svg>\\\`
  darkModeToggle.setAttribute('aria-pressed', 'false')
  if (store) localStorage.setItem('darkMode', 'disabled')
}

const checkPreference = () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    enableDarkMode(false) // don't set localStorage from preferences to respect future changes in client prefs
  } else {
    disableDarkMode(false)
  }
}

// execution
if (darkMode === 'enabled') enableDarkMode()
if (darkMode === 'disabled') disableDarkMode()
if (!darkMode) checkPreference()

darkModeToggle.addEventListener('click', () => {
  darkMode = document.body.classList.contains('darkmode')

  !darkMode ? enableDarkMode() : disableDarkMode()
})

// Listen for view transitions
document.addEventListener('astro:after-swap', () => {
  // Setup
  darkMode = localStorage.getItem('darkMode')

  // Execution
  if (darkMode === 'enabled') enableDarkMode()
  if (darkMode === 'disabled') disableDarkMode()
  if (!darkMode) checkPreference()
})
<\/script>`])), maybeRenderHead(), addAttribute(createTransitionScope($$result, "ngeadvuk"), "data-astro-transition-persist"));
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/accessible-astro-components/DarkMode.astro", "self");

const $$Astro$m = createAstro("https://peculiardynamics.co.uk");
const $$Media = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$Media;
  const { class: classNames, src = "https://fakeimg.pl/640x360", alt = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(classNames, "class")}${addAttribute(src, "src")}${addAttribute(alt, "alt")} loading="lazy" decoding="async">`;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/accessible-astro-components/Media.astro", void 0);

const $$Astro$l = createAstro("https://peculiardynamics.co.uk");
const $$Modal = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$Modal;
  const { triggerId, title, closeText = "Close" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<dialog class="modal"${addAttribute(triggerId, "aria-labelledby")}> <div class="modal__inner"> <div class="modal__content"> <h3 tabindex="-1"> ${title} </h3> ${renderSlot($$result, $$slots["default"], renderTemplate`Modal description.`)} </div> <div class="modal__close"> <button>${closeText}</button> </div> </div> </dialog>  `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/accessible-astro-components/Modal.astro", void 0);

const $$Astro$k = createAstro("https://peculiardynamics.co.uk");
const $$Notification = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$Notification;
  const { type = "default", role = "none", ariaLive = "off" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`notification type-${type}`, "class")}${addAttribute(role, "role")}${addAttribute(ariaLive, "aria-live")}> ${renderSlot($$result, $$slots["default"], renderTemplate` <p><strong>Message:</strong> This is a notification!</p> `)} </div> `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/accessible-astro-components/Notification.astro", void 0);

const $$Astro$j = createAstro("https://peculiardynamics.co.uk");
const $$Pagination = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$Pagination;
  const {
    firstPage = "#",
    previousPage = "#",
    nextPage = "#",
    lastPage = "#",
    currentPage = "1",
    totalPages = "12"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav class="pagination" aria-label="Pagination"> <ul class="pagination__list"> <li> ${firstPage ? renderTemplate`<a${addAttribute(firstPage, "href")} aria-label="Go to the first page"> <svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M24.6667 9L18 15.6667L24.6667 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.6667 9L8 15.6667L14.6667 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </a>` : renderTemplate`<span class="disabled"> <svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M24.6667 9L18 15.6667L24.6667 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.6667 9L8 15.6667L14.6667 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </span>`} </li> <li> ${previousPage ? renderTemplate`<a${addAttribute(previousPage, "href")}${addAttribute(`Go back to ${previousPage}`, "aria-label")}> <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"> <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14 7-5 5 5 5"></path> </svg> </a>` : renderTemplate`<span class="disabled"> <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"> <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14 7-5 5 5 5"></path> </svg> </span>`} </li> <li> <span>Page ${currentPage} of ${totalPages}</span> </li> <li> ${nextPage ? renderTemplate`<a${addAttribute(nextPage, "href")}${addAttribute(`Go to ${nextPage}`, "aria-label")}> <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"> <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10 7 5 5-5 5"></path> </svg> </a>` : renderTemplate`<span class="disabled"> <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"> <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10 7 5 5-5 5"></path> </svg> </span>`} </li> <li> ${lastPage ? renderTemplate`<a${addAttribute(lastPage, "href")} aria-label="Go to the last page"> <svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.33333 9L14 15.6667L7.33333 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.3333 9L24 15.6667L17.3333 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </a>` : renderTemplate`<span class="disabled"> <svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.33333 9L14 15.6667L7.33333 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.3333 9L24 15.6667L17.3333 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </span>`} </li> </ul> </nav> `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/accessible-astro-components/Pagination.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$Astro$i = createAstro("https://peculiardynamics.co.uk");
const $$SkipLinks = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$SkipLinks;
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", `<div class="skip-links"> <a href="#main-content">Skip to main content</a> </div> <script type="module">
  // variables
  const skipLink = document.querySelector('.skip-links a')

  // execution
  skipLink.addEventListener('keydown', (event) => {
    if (!event.target.closest('a')) return
    const key = event.key

    if (key !== 'Enter') return
    event.preventDefault()
    const target = event.target.getAttribute('href')

    if (document.querySelector(target)) {
      const targetElement = document.querySelector(target)
      targetElement.setAttribute('tabindex', '-1')
      targetElement.focus()
    } else if (!document.querySelector(target) && document.querySelector('h1')) {
      const h1 = document.querySelector('h1')
      h1.setAttribute('tabindex', '-1')
      h1.focus()
    } else {
      console.warn('SkipLinks are not set, either missing an h1 or main content id on the page.')
    }
  })
<\/script> `])), maybeRenderHead());
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/accessible-astro-components/SkipLinks.astro", void 0);

const $$Astro$h = createAstro("https://peculiardynamics.co.uk");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header class=""> ${renderComponent($$result, "SkipLinks", $$SkipLinks, {})} ${renderComponent($$result, "Navigation", $$Navigation, {}, { "default": ($$result2) => renderTemplate` <li class="menu-item"> <a href="/">Home</a> </li> <li class="menu-item"> <a href="/services/">Services</a> </li> <li class="menu-item"> <a href="/pricing/">Pricing</a> </li> <li class="menu-item"> <a href="/contact/">Contact</a> </li>  <li class="menu-item type-icon"> <a href="/quoter" aria-label="get a quote"> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"> <path fill="#000" d="M18.333 17.425a1 1 0 1 0 0-2v2Zm-10.11-1v-1a1 1 0 0 0-.114 1.993l.113-.993Zm3.37-5.362h1-1Zm0-4.596.787.617-.787-.617Zm5.134 1.411a1 1 0 0 0 1.528-1.29l-1.528 1.29Zm-.079 4.95a1 1 0 1 0 0-2v2Zm-8.426-2a1 1 0 1 0 0 2v-2Zm1.445 9.81h1v-1h-1v1Zm6.5 0v-1h-.437l-.297.32.734.68Zm2.166-5.213H8.5v2h9.833v-2Zm-9.833 0h-.278v2H8.5v-2Zm-.278 1c-.113.993-.113.994-.112.994h.002a.317.317 0 0 0 .008 0l.013.002a2.063 2.063 0 0 0 .132.008c.078.002.181.002.304-.006l-.138-1.996c-.05.004-.086.003-.104.003h-.012.016l.002.001h.001l-.112.994Zm.347.997a3.745 3.745 0 0 0 2.521-1.253c.894-.988 1.503-2.59 1.503-5.106h-2c0 2.214-.535 3.266-.985 3.763-.446.492-.94.585-1.177.601l.138 1.995Zm4.024-6.36c0-.775-.132-1.888-.187-2.682a8.394 8.394 0 0 1-.023-1.07c.022-.335.078-.33-.003-.226L10.805 5.85c-.327.417-.394.97-.418 1.327-.027.415-.008.888.024 1.341.068.98.182 1.852.182 2.545h2Zm-.213-3.978c.492-.628.948-.821 1.318-.865.404-.048.858.066 1.335.311.473.243.9.58 1.218.869a6.86 6.86 0 0 1 .454.454l.02.023.003.004v-.001c-.001 0-.001-.001.763-.646s.764-.646.763-.646l-.002-.002a.972.972 0 0 1-.015-.018 3.651 3.651 0 0 0-.169-.186 8.804 8.804 0 0 0-.47-.46 7.82 7.82 0 0 0-1.652-1.17c-.681-.35-1.544-.63-2.483-.518-.972.115-1.886.632-2.657 1.617l1.574 1.234Zm4.268 3.745H8.222v2h8.426v-2ZM3.888 2h20.223V0H3.89v2ZM26 3.805v14.028h2V3.805h-2ZM2 17.833V3.805H0v14.028h2Zm7.667 1.805H3.889v2h5.778v-2Zm14.444 0h-7.944v2h7.944v-2ZM8.667 26.951A1.045 1.045 0 0 0 10 27.96c.234-.063.43-.199.52-.261.236-.165.53-.42.838-.703a63.01 63.01 0 0 0 2.274-2.241 194.676 194.676 0 0 0 3.194-3.358l.055-.06.014-.015a.194.194 0 0 0 .004-.003v-.002h.001l-.733-.68-.734-.68v.002c-.002 0-.003.002-.004.003l-.014.015-.054.058a137.356 137.356 0 0 1-.938 1.001c-.607.645-1.415 1.495-2.222 2.322a61.29 61.29 0 0 1-2.195 2.164 7.463 7.463 0 0 1-.634.54c-.088.061-.032.004.107-.033.05-.013.37-.101.717.104.422.251.47.671.47.817h-2Zm2 0v-6.313h-2v6.313h2ZM0 17.833c0 2.129 1.769 3.805 3.889 3.805v-2C2.818 19.638 2 18.803 2 17.833H0Zm26 0c0 .97-.818 1.805-1.889 1.805v2c2.12 0 3.889-1.676 3.889-3.805h-2ZM24.111 2C25.182 2 26 2.836 26 3.805h2C28 1.676 26.231 0 24.111 0v2ZM3.89 0C1.769 0 0 1.676 0 3.805h2C2 2.835 2.818 2 3.889 2V0Z"></path> </svg> </a> </li>  ` })} </header>`;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/Header.astro", void 0);

const $$Astro$g = createAstro("https://peculiardynamics.co.uk");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Footer;
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer> <section class="container py-4 text-xs"> <div class="flex justify-between"> <a href="/" class="flex items-center gap-2 !no-underline" aria-label="navigate to home"> ${renderComponent($$result, "Image", $$Image, { "src": lightLogo, "alt": "", "width": "300", "height": "100", "class": "block dark:hidden" })} ${renderComponent($$result, "Image", $$Image, { "src": darkLogo, "alt": "", "width": "300", "height": "100", "class": "hidden dark:block" })} </a> <div class="flex flex-col justify-end text-end"> <p>
&copy; ${currentYear} Peculiar Dynamics Ltd.
</p> <p>Registered Office: 71-75 Shelton Street, London, WC2H 9JQ</p> <p>Registered in England and Wales (14575056)</p> </div> </div> <div class="mt-4 flex items-center justify-between gap-2"> <a class="email-link" href="" aria-label="send me an email"><p> <span class="hidden">ANTISPAM</span>info@<!-- antispam-->peculiardynamics.co.uk
</p></a> <ul class="flex flex-wrap justify-end gap-2"> <li><a href="../policies/terms">Terms and Conditions</a> |</li> <li><a href="/sitemap-index.xml">Sitemap</a> |</li> <li><a href="../policies/privacy">Privacy Policy</a> |</li> <!-- <li><a href="">Accessibility</a> |</li>
        <li><a href="">Supplier Code of Conduct</a> |</li> --> <li><a href="../policies/cookies">Cookie Notice</a>&nbsp;&nbsp</li> </ul> </div> <div class="mt-4"> <p class="whitespace-nowrap">
Another <a href="https://peculiardynamics.co.uk/" target="_blank">Peculiar</a> Site | Copyright &copy; ${currentYear} </p> </div> </section> </footer> `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/Footer.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$f = createAstro("https://peculiardynamics.co.uk");
const $$DefaultLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$DefaultLayout;
  const {
    title = "Peculiar Astro",
    description = "Making Technology That Works. Designing, building and improving websites, software and strategy for ambitious businesses.",
    url = "https://www.peculiardynamics.co.uk",
    // image = "images/1075x584.png",
    author = "Lucy Chaplin"
  } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<html lang="en" dir="ltr"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><!-- favicon --><link rel="icon" type="image/png" href="/favicon.png"><!-- sitemap --><link rel="sitemap" href="/sitemap-index.xml">', `<script type="text/plain" data-cookiecategory="analytics" src="https://www.googletagmanager.com/gtag/js?id=G-J2E7MTN9P5"><\/script><script type="text/plain" data-cookiecategory="analytics">
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-J2E7MTN9P5");
    <\/script><!-- Whatsapp link redirect --><!-- <script
      src="https://dashboard.chatfuel.com/integration/landing-wa-widget.js"
      async
      defer
      data-prefilled="Hi, I've got a question"
      data-welcome="Hello there! How can we help you today?"
      data-phone="447405952020"
    ><\/script> --><!-- Google tag (gtag.js) --><!-- Google Tag Manager --><!-- <script type="text/plain" data-cookiecategory="analytics">
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-TQXQ4HMD");
<\/script> --><!-- End Google Tag Manager -->`, '</head> <body> <!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TQXQ4HMD" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <!-- End Google Tag Manager (noscript) --> <!--Screen reader skip main nav--> <a class="hidden" aria-label="skip to main content" href="#main-content">Click To Skip To Main Content</a> <!-- <CookieConsentComponent client:load /> --> ', ' <main id="main-content" class=""> ', " </main> ", " <!-- <Whatsapp /> -->   </body> </html>"])), renderComponent($$result, "SiteMeta", $$SiteMeta, { "title": title, "description": description.substring(0, 100), "url": Astro2.site ? `${Astro2.site}${title.toLowerCase().replaceAll(" ", "-")}` : url, "image": "1074x584.png", "author": author }), renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/layouts/DefaultLayout.astro", void 0);

const icons = {};

const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$e = createAstro("https://peculiardynamics.co.uk");
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Icon;
  class AstroIconError extends Error {
    constructor(message) {
      super(message);
    }
  }
  const req = Astro2.request;
  const { name = "", title, "is:inline": inline = false, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = !inline && i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new AstroIconError(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new AstroIconError('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new AstroIconError(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new AstroIconError(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new AstroIconError(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${inline ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "id": id }, { "default": ($$result2) => renderTemplate`${unescapeHTML(normalizedBody)}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}>${unescapeHTML(normalizedBody)}</symbol>`}<use${addAttribute(`#${id}`, "xlink:href")}></use> ` })}`} </svg>`;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/node_modules/astro-icon/components/Icon.astro", void 0);

const $$Astro$d = createAstro("https://peculiardynamics.co.uk");
const $$Button = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    icon = null,
    text = "Text",
    href,
    buttonColor = "",
    addClasses = ""
  } = Astro2.props;
  return renderTemplate`${!icon ? renderTemplate`${maybeRenderHead()}<a${addAttribute(`button text-lg ${buttonColor} ${addClasses}`, "class")}${addAttribute(href, "href")}>${text}</a>` : renderTemplate`<a${addAttribute(`button has-icon text-lg ${buttonColor} ${addClasses}`, "class")}${addAttribute(href, "href")}>${text}${renderComponent($$result, "Icon", $$Icon, { "name": icon })}</a>`}`;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/Button.astro", void 0);

const $$Astro$c = createAstro("https://peculiardynamics.co.uk");
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Hero;
  const {
    title,
    subtitle,
    gradientText,
    imgSrc,
    learnTarget = null,
    quoteButton = false,
    learnButton = false
  } = Astro2.props;
  const learnLink = `${learnTarget}`;
  return renderTemplate`${maybeRenderHead()}<section class="hero my-24 flex min-h-[80vh] items-center" data-astro-cid-bbe6dxrz> <div class="container" data-astro-cid-bbe6dxrz> <div class="grid max-w-max auto-rows-min grid-cols-1 grid-rows-1 content-center items-center justify-items-center gap-x-16 lg:grid-cols-2" data-astro-cid-bbe6dxrz> <div class="col-start-1 flex flex-col items-center justify-center gap-8 py-4 text-center md:items-start md:text-left" data-astro-cid-bbe6dxrz> <h1 class="z-10 text-center text-6xl font-bold md:text-left lg:text-7xl" data-astro-cid-bbe6dxrz> ${title} <span class="text-gradient" data-astro-cid-bbe6dxrz>${gradientText}</span> </h1> ${subtitle && renderTemplate`<p class="max-w-[40ch] text-xl" data-astro-cid-bbe6dxrz>
Web development and technology for small and growing businesses.
</p>`} ${quoteButton || learnButton ? renderTemplate`<div class="flex flex-col gap-3 min-[500px]:flex-row" data-astro-cid-bbe6dxrz> ${quoteButton ? renderTemplate`${renderComponent($$result, "Button", $$Button, { "text": "Get a Quote", "href": "/quoter", "icon": "ph:chat", "data-astro-cid-bbe6dxrz": true })}` : ""} ${learnButton ? renderTemplate`${renderComponent($$result, "Button", $$Button, { "buttonColor": "color-secondary", "href": learnLink, "text": "Learn More", "icon": "mdi:arrow-down", "data-astro-cid-bbe6dxrz": true })}` : ""} </div>` : ""} </div> ${renderSlot($$result, $$slots["default"])} <!-- <Image
        src={imgSrc.src}
        height={imgSrc.attributes.height}
        width={imgSrc.attributes.width}
        alt=""
        class="col-start-2 row-start-1 hidden lg:row-end-3 lg:block xl:row-end-4"
      /> --> ${renderComponent($$result, "Image", $$Image, { "src": imgSrc, "widths": [10, 380, 640], "sizes": `(max-width:1000) 10w, (max-width:1280) 380w, 640w`, "alt": "", "class": "col-start-2 row-start-1 hidden lg:row-end-3 lg:block xl:row-end-4", "data-astro-cid-bbe6dxrz": true })} </div> </div> </section> `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/Hero.astro", void 0);

const $$Astro$b = createAstro("https://peculiardynamics.co.uk");
const $$CallOut = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$CallOut;
  const { purple, point, subtext } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="animate text-center" data-astro-cid-2h7eeb4e> <p class="text-4xl font-bold" data-astro-cid-2h7eeb4e>${purple}</p> <p class="text-2xl font-semibold" data-astro-cid-2h7eeb4e>${point}</p> <p class="text-xl" data-astro-cid-2h7eeb4e>${subtext}</p> </div> `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/CallOut.astro", void 0);

const $$Astro$a = createAstro("https://peculiardynamics.co.uk");
const $$Feature = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Feature;
  const {
    icon = "mdi:rocket",
    title = "Title",
    featureColor = "neutral",
    href = null,
    contentClasses = ""
  } = Astro2.props;
  return renderTemplate`${!href ? renderTemplate`${maybeRenderHead()}<div${addAttribute(`feature  ${featureColor}`, "class")} data-astro-cid-ezsi7upz><div${addAttribute(`content ${contentClasses}`, "class")} data-astro-cid-ezsi7upz>${renderComponent($$result, "Icon", $$Icon, { "name": icon, "data-astro-cid-ezsi7upz": true })}<h3 data-astro-cid-ezsi7upz>${title}</h3></div><div${addAttribute(`content max-w-[60ch] ${contentClasses}`, "class")} data-astro-cid-ezsi7upz>${renderSlot($$result, $$slots["default"], renderTemplate`<p data-astro-cid-ezsi7upz>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
            corporis.
</p>`)}</div></div>` : renderTemplate`<a${addAttribute(href, "href")} class="featureLink flex" data-astro-cid-ezsi7upz><div${addAttribute(`feature ${featureColor}`, "class")} data-astro-cid-ezsi7upz>${renderComponent($$result, "Icon", $$Icon, { "name": icon, "data-astro-cid-ezsi7upz": true })}<div${addAttribute(`content ${contentClasses}`, "class")} data-astro-cid-ezsi7upz><h3 data-astro-cid-ezsi7upz>${title}</h3><div${addAttribute(`content ${contentClasses}`, "class")} data-astro-cid-ezsi7upz>${renderSlot($$result, $$slots["default"], renderTemplate`
Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
              corporis.
`)}</div></div></div></a>`}`;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/Feature.astro", void 0);

const $$Astro$9 = createAstro("https://peculiardynamics.co.uk");
const $$Heading = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Heading;
  const { "aria-label": ariaLabel, id, text } = Astro2.props;
  const href = `#${id}`;
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(id, "id")} class="heading uppercase" data-astro-cid-u4qoyrkz> ${text} <a${addAttribute(id + " anchor link", "aria-label")}${addAttribute(href, "href")} data-astro-cid-u4qoyrkz><span class="anchor-link" data-astro-cid-u4qoyrkz>${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons-solid:link", "data-astro-cid-u4qoyrkz": true })}</span></a> </span> `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/Heading.astro", void 0);

const $$Astro$8 = createAstro("https://peculiardynamics.co.uk");
const $$CallToAction = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$CallToAction;
  return renderTemplate`${maybeRenderHead()}<div class="container max-w-screen-xl" data-astro-cid-balv45lp> <div class="call-to-action mb-32 mt-24 flex flex-col items-center gap-12 rounded-xl p-12 md:p-24" data-astro-cid-balv45lp> <h2 class="text-center text-3xl md:text-5xl" data-astro-cid-balv45lp>Ready to get started?</h2> ${renderComponent($$result, "Button", $$Button, { "href": "/quoter", "icon": "mdi:message-outline", "text": "Get a Quote", "data-astro-cid-balv45lp": true })} </div> </div> `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/CallToAction.astro", void 0);

const heroVector = new Proxy({"src":"/_astro/hero-vector.naR2ewDQ.webp","width":1280,"height":991,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/assets/img/hero-vector.webp";
							}
							globalThis.astroAsset.referencedImages.add("/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/assets/img/hero-vector.webp");
							return target[name];
						}
					});

const $$Astro$7 = createAstro("https://peculiardynamics.co.uk");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Index;
  console.log(heroVector);
  return renderTemplate`<!-- <Fragment slot="head">
  <link rel="preload" href={optimisedHero.src} as="image" />
</Fragment> -->${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": "Home", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "title": "Making Technology", "gradientText": "That Works", "subtitle": "Web development and technology for small and growing businesses.", "learnTarget": `#believe`, "quoteButton": true, "learnButton": true, "imgSrc": heroVector, "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<section class="" data-astro-cid-j7pv25f6> <div class="container flex flex-col gap-2" data-astro-cid-j7pv25f6> <h2 class="mb-2 text-lg font-bold" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Heading", $$Heading, { "id": "whatwedo", "text": "What we do", "data-astro-cid-j7pv25f6": true })} </h2> <p class="mb-8 text-4xl font-bold md:text-6xl" data-astro-cid-j7pv25f6>
Getting your business online,
<span class="text-highlight" data-astro-cid-j7pv25f6>without the faff.</span> </p> <p class="text-xl md:text-2xl" data-astro-cid-j7pv25f6>
We specialise in designing and developing websites and technology for
        small and growing businesses across the UK.
</p> <p class="mb-8 text-xl md:text-2xl" data-astro-cid-j7pv25f6>
All of our code is written by hand to ensure exceptional performance to
        help you bring in more businesses and waste less time wanting to throw
        your computer out the window.
</p> </div> <div class="container mt-16 flex flex-col justify-center gap-3 min-[500px]:flex-row" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Button", $$Button, { "href": "/quoter", "icon": "mdi:message-outline", "text": "Get a Quote", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Button", $$Button, { "href": "/services", "text": "Explore Services", "buttonColor": "color-secondary", "data-astro-cid-j7pv25f6": true })} </div> </section> <section class="" data-astro-cid-j7pv25f6> <div class="container flex flex-col" data-astro-cid-j7pv25f6> <h2 class="mb-2 text-lg font-bold" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Heading", $$Heading, { "id": "believe", "text": "WE BELIEVE", "data-astro-cid-j7pv25f6": true })} </h2> <p class="mb-16 text-4xl font-bold md:text-6xl" data-astro-cid-j7pv25f6>
Technology should make life
<span class="text-highlight" data-astro-cid-j7pv25f6>easier</span>, not harder.
</p> <p class="mb-8 text-xl md:text-2xl" data-astro-cid-j7pv25f6>
Make the technology and systems that your business relies on:
</p> <div class="container" data-astro-cid-j7pv25f6> <div class="mb-8 grid grid-cols-1 gap-12 md:grid-cols-3" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "CallOut", $$CallOut, { "purple": "FUNCTION", "point": "seamlessly", "subtext": "reducing disruption", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "CallOut", $$CallOut, { "purple": "USABLE", "point": "without a PhD", "subtext": "keeping things simple", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "CallOut", $$CallOut, { "purple": "EFFICIENT", "point": "clear ROI", "subtext": "saving you money", "data-astro-cid-j7pv25f6": true })} </div> </div> </div> <div class="container mt-16 flex flex-col justify-center gap-3 min-[500px]:flex-row" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Button", $$Button, { "href": "/quoter", "icon": "mdi:message-outline", "text": "Get a Quote", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Button", $$Button, { "href": "/services/#approach", "text": "About Us", "buttonColor": "color-secondary", "data-astro-cid-j7pv25f6": true })} </div> </section> <section class="" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <h2 class="mb-2 text-lg font-bold" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Heading", $$Heading, { "id": "services", "text": "OUR SERVICES", "data-astro-cid-j7pv25f6": true })} </h2> <p class="md:text-6x mb-8 text-4xl font-bold" data-astro-cid-j7pv25f6>
Technology should <span class="text-highlight" data-astro-cid-j7pv25f6>save</span> you time and money.
</p> <p class="mb-16 text-xl md:text-2xl" data-astro-cid-j7pv25f6>
Understand, optimise and connect your business processes and technology
        to reduce cost, increase security and attract more business.
</p> <div class="my-4 grid grid-cols-1 content-stretch gap-6 md:grid-cols-2" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Feature", $$Feature, { "icon": "ic:baseline-web", "title": "Website & App Development", "featureColor": "blue", "href": "/services/#webDev", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`
Build or update your website to attract more customers, save you time
          and stand out from the crowd.
` })} ${renderComponent($$result2, "Feature", $$Feature, { "icon": "mdi:lifebuoy", "title": "Routine & On Call Support", "featureColor": "gold", "href": "/services/#ongoing", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`
Dedicated access to expertise in technology, business operations and
          strategy, when you need it.
` })} ${renderComponent($$result2, "Feature", $$Feature, { "icon": "mdi:cogs", "title": "Integration & Automation", "featureColor": "mint", "href": "/services/#systemIntegration", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`
Design, integrate and build the right technology, processes and
          systems for your business.
` })} ${renderComponent($$result2, "Feature", $$Feature, { "icon": "mdi:chart-timeline-variant-shimmer", "title": "Business Analytics", "featureColor": "pink", "href": "/services/#businessAnalysis", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`
Assess performance, manage risk and identify opportunities to improve
          processes and systems.
` })} </div> <div class="container mt-16 flex flex-col justify-center gap-3 min-[500px]:flex-row" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Button", $$Button, { "href": "/quoter", "icon": "mdi:message-outline", "text": "Get a Quote", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Button", $$Button, { "href": "/services", "text": "Explore Services", "buttonColor": "color-secondary", "data-astro-cid-j7pv25f6": true })} </div> </div> </section>  ${renderComponent($$result2, "CallToAction", $$CallToAction, { "data-astro-cid-j7pv25f6": true })} ` })}  `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/index.astro", void 0);

const $$file$6 = "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/index.astro";
const $$url$6 = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$6,
  url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$6 = createAstro("https://peculiardynamics.co.uk");
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": "404" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="flex h-screen flex-col justify-center"> <div class="container"> <h1>404</h1> </div> <div class="space-content container"> <p class="text-2xl">
This page does not exist. Don't worry though, we got you.
</p> <a class="button" href="/">Let's get you home Astronout 🚀</a> </div> </section> ` })}`;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/404.astro", void 0);

const $$file$5 = "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/404.astro";
const $$url$5 = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

function ContactForm() {
  const formRef = useRef(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseBackground, setResponseBackground] = useState("bg-secondary-100");
  const [loading, setLoading] = useState(false);
  function submitData(e) {
    e.preventDefault();
    console.log("submitting");
    const formData = new FormData(formRef.current);
    setLoading(true);
    fetch(
      "https://script.google.com/macros/s/AKfycbxsNrMMVOqB6N6B7ocFwkKdbPIk3lQ_u4X8jZj_PF62bnguR-ZD4a6I_U6mhQ4Uy_-OdQ/exec",
      {
        method: "POST",
        body: formData,
        mode: "cors"
      }
    ).then((res) => {
      console.log(res);
      console.log("submitted");
      setResponseBackground("bg-green-200");
      setResponseMessage("Message received - We'll be in touch ASAP.");
    }).catch((err) => {
      console.log(err);
      console.log("there was an error");
      setResponseBackground("bg-red-200");
      setResponseMessage(
        "There was an error submitting your message. Please resubmit or try again later."
      );
    });
  }
  return /* @__PURE__ */ jsxs(
    "form",
    {
      id: "contactForm",
      name: "contactForm",
      method: "post",
      ref: formRef,
      onSubmit: submitData,
      className: "contactForm",
      children: [
        loading && /* @__PURE__ */ jsx(
          "div",
          {
            className: `mt-4 flex w-full items-center justify-center rounded p-4 font-medium ${responseBackground}`,
            children: responseMessage ? /* @__PURE__ */ jsx("p", { children: responseMessage }) : /* @__PURE__ */ jsx("p", { children: "Sending message... " })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2", children: "Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              name: "name",
              type: "text",
              placeholder: "Ada Lovelace",
              className: "form-input rounded border-2 border-[--font-color] bg-inherit",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2", children: "Email address" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              name: "email",
              type: "email",
              placeholder: "adalovelace@example.com",
              className: "form-input rounded border-2 border-[--font-color] bg-inherit",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 w-full", children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2", children: "Message" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              name: "message",
              className: "form-textarea rounded border-2 border-[--font-color] bg-inherit md:h-56",
              placeholder: "Message",
              required: true,
              minLength: "20",
              maxLength: "1500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "submit", className: "button mt-4 w-full", children: [
          " ",
          "Send message"
        ] })
      ]
    }
  );
}

const $$Astro$5 = createAstro("https://peculiardynamics.co.uk");
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Contact;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": "Contact", "data-astro-cid-uw5kdbxl": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container flex flex-col justify-center" data-astro-cid-uw5kdbxl> <!-- <div class="container mx-auto"> --> <div data-astro-cid-uw5kdbxl> <h1 class="mb-2 text-lg font-bold" data-astro-cid-uw5kdbxl> ${renderComponent($$result2, "Heading", $$Heading, { "id": "contact", "text": "Contact Us", "data-astro-cid-uw5kdbxl": true })} </h1> <p class="mb-8 text-4xl font-bold" data-astro-cid-uw5kdbxl>Want to find out more?</p> <p class="mb-16 text-2xl" data-astro-cid-uw5kdbxl>
We’d love to hear from you. Please fill out this form or shoot us an
        email.
</p> </div> <div class="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2" data-astro-cid-uw5kdbxl> <div class="contact grid grid-cols-1 content-center gap-12" data-astro-cid-uw5kdbxl> <div class="contact-card neutral" data-astro-cid-uw5kdbxl> ${renderComponent($$result2, "Icon", $$Icon, { "name": "ic:outline-email", "data-astro-cid-uw5kdbxl": true })} <h2 class="" data-astro-cid-uw5kdbxl>Email</h2> <p data-astro-cid-uw5kdbxl>
If your message isn't quite right for the contact box here, feel
            free to email us directly on:
</p> <a class="email-link pt-4" href="" aria-label="send me an email" data-astro-cid-uw5kdbxl> <span class="hidden" data-astro-cid-uw5kdbxl>ANTISPAM</span>info@<!-- antispam-->peculiardynamics.co.uk
</a> </div> <div class="contact-card neutral" data-astro-cid-uw5kdbxl> ${renderComponent($$result2, "Icon", $$Icon, { "name": "ic:outline-whatsapp", "data-astro-cid-uw5kdbxl": true })} <h2 class="mb-2" data-astro-cid-uw5kdbxl>WhatsApp</h2> <a class="" rel="noreferrer" target="_blank" href="https://wa.me/447405952020" aria-label="whatsapp us" data-astro-cid-uw5kdbxl>
Click here to chat now on WhatsApp
</a> </div> </div> ${renderComponent($$result2, "ContactForm", ContactForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/components/ContactForm.jsx", "client:component-export": "default", "data-astro-cid-uw5kdbxl": true })} </div> <!-- </div> --> </section> ` })}  `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/contact.astro", void 0);

const $$file$4 = "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/contact.astro";
const $$url$4 = "/contact";

const contact = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const logo = new Proxy({"src":"/_astro/1074x584.YyWi0m-a.png","width":1079,"height":589,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/assets/img/1074x584.png";
							}
							globalThis.astroAsset.referencedImages.add("/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/assets/img/1074x584.png");
							return target[name];
						}
					});

const headshot = new Proxy({"src":"/_astro/headshot.U2lhWrEt.jpg","width":892,"height":633,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/assets/img/headshot.jpg";
							}
							globalThis.astroAsset.referencedImages.add("/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/assets/img/headshot.jpg");
							return target[name];
						}
					});

const $$Astro$4 = createAstro("https://peculiardynamics.co.uk");
const $$Estimate = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Estimate;
  const { addPagesQ = 0, addFunctionalityQ = 1 } = Astro2.props;
  const vat = "20%";
  const contents = [
    {
      quantity: "Service",
      description: "Website Design, Build and Launch",
      price: "4500.00",
      time: "3-5 weeks"
    },
    {
      quantity: addPagesQ,
      description: "Additional Site Page - Design, Build and Launch",
      price: "125.00",
      time: "2-5 days"
    },
    {
      quantity: addFunctionalityQ,
      description: "Additional Functionality (Standard) - Design, Build and Launch",
      price: "125.00",
      time: "3-5 days"
    },
    {
      quantity: "12 Months",
      description: "Core Support Package",
      price: "900.00"
    },
    {
      quantity: addFunctionalityQ,
      description: "Additional annual charge per unit of additional functionality",
      price: "288.00"
    }
  ];
  const duration = "4-6 weeks";
  const ref = "TFGQ001";
  const date = /* @__PURE__ */ new Date();
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": "Your Estimate", "data-astro-cid-z74meu4i": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="my-24 box-border flex flex-col items-center" data-astro-cid-z74meu4i> <div class="estimater flex w-full max-w-screen-lg flex-col items-center space-y-16 p-8" data-astro-cid-z74meu4i> <div class="flex w-full flex-col items-center justify-between gap-4 md:flex-row" data-astro-cid-z74meu4i> <div class="flex flex-col items-center gap-4 md:w-fit md:items-start" data-astro-cid-z74meu4i> <img class="max-w-md lg:max-w-lg"${addAttribute(logo.src, "src")} alt="" decoding="async" data-astro-cid-z74meu4i> <h1 class="z-10 text-center text-4xl md:text-left md:text-6xl" data-astro-cid-z74meu4i>
Initial Estimate
</h1> <p class="text-xl lg:text-2xl" data-astro-cid-z74meu4i> ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} </p> </div> <div class="md:text-md flex flex-none flex-col items-center text-sm md:w-fit md:items-end" data-astro-cid-z74meu4i> <p data-astro-cid-z74meu4i>71-75 Shelton Street</p> <p data-astro-cid-z74meu4i>Covent Garden</p> <p data-astro-cid-z74meu4i>London</p> <p data-astro-cid-z74meu4i>WC2H 9JQ</p> <a class="email-link mt-4" href="" aria-label="send me an email" data-astro-cid-z74meu4i> <p class="" data-astro-cid-z74meu4i> <span class="hidden" data-astro-cid-z74meu4i>ANTISPAM</span>accounts@<!-- antispam-->peculiardynamics.co.uk
</p> </a> <a href="https://peculiardynamics.co.uk" data-astro-cid-z74meu4i>https://peculiardynamics.co.uk</a> <p class="mt-2" data-astro-cid-z74meu4i>VAT: 440548112</p> </div> </div> <hr class="mb-16 w-full max-w-sm flex-none border-2 border-solid border-indigo-200" data-astro-cid-z74meu4i> <div class="flex flex-col items-center justify-between gap-8 md:flex-row" data-astro-cid-z74meu4i> <div class="max-w-[50ch]" data-astro-cid-z74meu4i>
And we’re off! <br data-astro-cid-z74meu4i><br data-astro-cid-z74meu4i>We’re delighted that you’re considering
          working with us, and are pleased to present this Initial Quote along
          with all the information you’ll need to get started today. <br data-astro-cid-z74meu4i><br data-astro-cid-z74meu4i>Once you’ve reviewed this document, you can click the button at the
          bottom to pay your deposit and get cracking on your brief instantly. <br data-astro-cid-z74meu4i><br data-astro-cid-z74meu4i>No hidden fees, no endless back and forth, no more time
          wasted. How great is that?!
</div> <div class="rounded-md border-2 border-solid border-red-400 p-4" data-astro-cid-z74meu4i>
This document is still a WIP so some things might be missing or not
          quite right. Please refer to the email we've shared along side this
          with details that you'll need to know.
</div> <!-- <ol class="">
          <li></li>
        </ol> --> </div> <hr class="mb-16 w-full max-w-sm flex-none border-2 border-solid border-indigo-200" data-astro-cid-z74meu4i> <div class="prose mt-8 flex w-full flex-col justify-between gap-16 text-base md:flex-row" data-astro-cid-z74meu4i> <ol class="list max-w-[50ch] list-decimal" data-astro-cid-z74meu4i> <h2 class="mb-4 whitespace-nowrap" data-astro-cid-z74meu4i>Your Challenges</h2> <li class="" data-astro-cid-z74meu4i> <strong data-astro-cid-z74meu4i>Attracting customers</strong> and standing out from your competition
</li> <li class="" data-astro-cid-z74meu4i> <strong data-astro-cid-z74meu4i>Raising Awareness</strong> of your Business and building your
            digital reputation
</li> <li class="" data-astro-cid-z74meu4i> <strong data-astro-cid-z74meu4i>Improving profit margin</strong> - through saving yourself time
            or reducing costs of technology or manual processes
</li> <li class="" data-astro-cid-z74meu4i>
Streamlining your tech to help you build <strong data-astro-cid-z74meu4i>
effective, efficient, streamlined processes
</strong> </li> </ol> <ol class="inline max-w-[60ch] list-decimal text-base" data-astro-cid-z74meu4i> <h2 class="mb-4 whitespace-nowrap" data-astro-cid-z74meu4i>How we can help</h2> <li class="" data-astro-cid-z74meu4i>
Use of our intelligent design and discovery tools to build your
            brief on your own schedule and <strong data-astro-cid-z74meu4i>
keep the time you need to invest to a minimum
</strong>.
</li> <li class="" data-astro-cid-z74meu4i>
Fresh new design or migration of your existing site and brand to a
<strong data-astro-cid-z74meu4i>hand coded site, built to improve search rankings and stay secure</strong>.
</li> <li class="" data-astro-cid-z74meu4i> <strong data-astro-cid-z74meu4i>Pay only for what you want and need:</strong> custom-built additional
            functionality, targeted to work for your industry, meet your customer's
            needs 24/7, with less hassle for you.
</li> <li class="" data-astro-cid-z74meu4i> <strong data-astro-cid-z74meu4i>Transparent, fixed pricing and timeline</strong> with minimal
            tech jargon so you know exactly what you're paying for.
</li> <li class="" data-astro-cid-z74meu4i> <strong data-astro-cid-z74meu4i>Domain, professional email and hosting setup and management</strong> to keep your web presence and messaging secure, available and speedy
</li> <li class="" data-astro-cid-z74meu4i>
Detailed analytics available to you forever with reporting from us
            to track the changes you're seeing from this investment for the
            first 6 months.
</li> <li class="" data-astro-cid-z74meu4i> <strong data-astro-cid-z74meu4i>A year of our Core Support Package included:
</strong>providing access to 24/7 support, our training and
            reference Library, optimisation and troubleshooting of your site and
            features and proactive scanning and updates to optimise SEO,
            performance and security - giving you more time to get back to
            business.
</li> </ol> </div> <hr class="mb-16 w-full max-w-sm flex-none border-2 border-solid border-indigo-200" data-astro-cid-z74meu4i> <div class="flex max-w-screen-md flex-col items-start justify-between gap-4" data-astro-cid-z74meu4i> <h2 data-astro-cid-z74meu4i>Why work with us?</h2> <ol class="max-w-[65ch]" data-astro-cid-z74meu4i> <li data-astro-cid-z74meu4i> <strong data-astro-cid-z74meu4i>Tech-led</strong> - our automated processes, self-service support
            and smart tools;
<ol data-astro-cid-z74meu4i> <li data-astro-cid-z74meu4i>
Reduce the human hours needed from you and us, to help us
                deliver exceptional quality, fast, without the premium price tag
</li> <li data-astro-cid-z74meu4i>
Allow you to work with us 24/7, on your own schedule, at your
                own pace, without taking time away from your business
</li> </ol> </li> <li data-astro-cid-z74meu4i> <strong data-astro-cid-z74meu4i>UK-based…</strong> <ol data-astro-cid-z74meu4i> <li data-astro-cid-z74meu4i>
… rigorously-vetted experts who understand business and
                technology, no call centres, crossed wires or mass produced
                rubbish
</li> <li data-astro-cid-z74meu4i>
… suppliers, solutions and tools wherever possible to support
                other British Businesses like ours.
</li> </ol> </li> <li data-astro-cid-z74meu4i> <strong data-astro-cid-z74meu4i>Transparent, upfront, flexible</strong> pricing and payment options
<ol data-astro-cid-z74meu4i> <li data-astro-cid-z74meu4i>
Enabling us to pass on discounts for upfront payment, or spread
                out the cost of your investment
</li> </ol> </li> </ol> </div> <hr class="mb-16 w-full max-w-sm flex-none border-2 border-solid border-indigo-200" data-astro-cid-z74meu4i> <div class="flex w-full max-w-screen-md flex-col items-start justify-between gap-4 pt-32" data-astro-cid-z74meu4i> <div class="secondary-bg relative flex w-full max-w-screen-md flex-col items-end self-end rounded-lg border-4 border-black p-4" data-astro-cid-z74meu4i> <h2 class="w-full max-w-[75ch] pl-56" data-astro-cid-z74meu4i>
A note from Lucy<br data-astro-cid-z74meu4i> </h2> <p class="mb-4 w-full pl-56 text-xl italic" aria-role="doc-subtitle" data-astro-cid-z74meu4i>
Peculiar Founder
</p> <img class="absolute -left-24 -top-32 aspect-square max-w-xs self-start rounded-full border-4 border-green-300 object-cover"${addAttribute(headshot.src, "src")} alt="" decoding="async" data-astro-cid-z74meu4i> <div class="flex w-full max-w-[80ch] flex-col gap-2 rounded-lg border-4 border-black bg-white p-8" data-astro-cid-z74meu4i> <p class="pl-32" data-astro-cid-z74meu4i>
Have you ever noticed that deer-caught-in-the-headlights face that
              business owners pull when asked about their tech?
</p> <p data-astro-cid-z74meu4i>
For those of us who remember floppy disks, a whole lot has changed
              since they began their demisn - not just in technology, but in
              business. A kick-ass product and excellent customer service might
              keep you alive, but alone, that's no longer enough.
</p> <p data-astro-cid-z74meu4i>
Accessing affordable technology <em data-astro-cid-z74meu4i>and</em> understanding how to use
              it is essential, and it doesn't need to make you feel as if a 1999
              Ford Fiesta van is about to turn you into roadside venison.
</p> <p data-astro-cid-z74meu4i>
I accidentally fell into technology; consulting globally for huge
              companies, later working for Google and Amazon, gaining an MBA
              from a world-leading Business School, before landing in Operations
              leadership accross the London HealthTech scene.
</p> <p data-astro-cid-z74meu4i>
I now help small and frowing businesses and Entrepreneurs find and
              build the technology they need without the smoke and mirrors, to
              realise the dynamics at play and the harness value technology can
              bring.
</p> <p data-astro-cid-z74meu4i>
I enjoy working as a client-facing technology developer, whilst
              curating a team of technically excellent and business-savvy humans
              to help us grow to support even more peculiar businesses.
</p> <p data-astro-cid-z74meu4i>Thank you for considering working with us!</p> </div> </div> </div> <hr class="mb-16 w-full max-w-sm flex-none border-2 border-solid border-indigo-200" data-astro-cid-z74meu4i> <div class="flex w-full flex-col gap-4" data-astro-cid-z74meu4i> <h2 data-astro-cid-z74meu4i>The Quote</h2> <p class="text-right text-lg font-bold" data-astro-cid-z74meu4i>Ref: ${ref}</p> <table class="table-fixed" data-astro-cid-z74meu4i> <thead data-astro-cid-z74meu4i> <tr data-astro-cid-z74meu4i> <th scope="col" data-astro-cid-z74meu4i>Quantity</th> <th scope="col" class="w-64" data-astro-cid-z74meu4i>Description</th> <th scope="col" data-astro-cid-z74meu4i>Unit Price (£)</th> <th scope="col" data-astro-cid-z74meu4i>VAT</th> <th scope="col" data-astro-cid-z74meu4i>Net Subtotal</th> <th scope="col" data-astro-cid-z74meu4i>Unit Time</th> </tr> </thead> <tbody data-astro-cid-z74meu4i> ${contents.map(
    (item) => item.quantity !== 0 && renderTemplate`<tr data-astro-cid-z74meu4i> <td class="text-center" data-astro-cid-z74meu4i>${item.quantity}</td> <td class="text-left" data-astro-cid-z74meu4i>${item.description}</td> <td class="text-center" data-astro-cid-z74meu4i>${item.price}</td> <td class="text-center" data-astro-cid-z74meu4i>${vat}</td> <td class="tprice text-center font-bold" data-astro-cid-z74meu4i> ${((isNaN(item.quantity) ? 1 : item.quantity) * item.price).toFixed(2)} </td> <td class="text-center" data-astro-cid-z74meu4i>${item.time}</td> </tr>`
  )} <tr data-astro-cid-z74meu4i> <td data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i>Net Total</td> <td id="netTotal" data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i></td> </tr> <tr data-astro-cid-z74meu4i> <td data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i>VAT</td> <td id="totalVAT" data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i></td> </tr> <tr class="text-md font-bold" data-astro-cid-z74meu4i> <td data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i>GBP Total</td> <td id="totalPrice" data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i></td> </tr> <tr class="" data-astro-cid-z74meu4i> <td data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i>Estimated Duration</td> <td data-astro-cid-z74meu4i></td> <td data-astro-cid-z74meu4i>${duration}</td> </tr> </tbody> </table> </div> <hr class="mb-16 w-full max-w-sm flex-none border-2 border-solid border-indigo-200" data-astro-cid-z74meu4i> <div class="flex max-w-[75ch] flex-col items-start justify-between gap-4" data-astro-cid-z74meu4i> <h2 data-astro-cid-z74meu4i>The Fine Print</h2> <div data-astro-cid-z74meu4i>
We share all of our Terms and Conditions, along with other important
          Policies upfront and publicly so that you know right from the offset
          how we work. <br data-astro-cid-z74meu4i><br data-astro-cid-z74meu4i>An important point to note - paying the
          deposit does not commit you to accepting The Proposal we will build
          together. It secures a design session where we will present you with
          some options and full details of the products and services we
          recommend. This deposit will then be deducted from the services you
          choose to purchase. <br data-astro-cid-z74meu4i><br data-astro-cid-z74meu4i>Please take some time to familiarise
          yourself with these at the following links:
</div> <ul data-astro-cid-z74meu4i> <li data-astro-cid-z74meu4i> <a href="https://docs.google.com/document/d/1il7DS2pKGMHRHaVLDUJY2EBUj5HYKedvepcAbJ7SCe0/view" data-astro-cid-z74meu4i>Our Terms and Conditions</a> </li> <li data-astro-cid-z74meu4i> <a href="https://peculiardynamics.co.uk/policies/privacy/" data-astro-cid-z74meu4i>Our Privacy Policy</a> </li> </ul> </div> <hr class="mb-16 w-full max-w-sm flex-none border-2 border-solid border-indigo-200" data-astro-cid-z74meu4i> <div class="flex max-w-[75ch] flex-col items-center gap-4" data-astro-cid-z74meu4i> <h2 class="w-full" data-astro-cid-z74meu4i>The 'Let's Go' Button</h2> <div data-astro-cid-z74meu4i>
Clicking the button below will redirect you to a secure payment link
          to pay your deposit of £1,000 +VAT. We’ll then send you a message for
          you to book a design session and get started on building your brief. <br data-astro-cid-z74meu4i><br data-astro-cid-z74meu4i>
Please ensure you have read and understood the Terms and Conditions as
          referenced in the section above before proceeding.
</div> ${renderComponent($$result2, "Button", $$Button, { "href": "https://buy.stripe.com/3cs6q586R8s19TaaEF", "text": "Let's Go!", "data-astro-cid-z74meu4i": true })} <p data-astro-cid-z74meu4i>OR</p> <div class="max-w-[45ch] rounded-md border-2 border-solid border-blue-400 p-4 text-center" data-astro-cid-z74meu4i>
Pay via BACS using the following information: <br data-astro-cid-z74meu4i><br data-astro-cid-z74meu4i>Peculiar
          Dynamics Ltd.
<br data-astro-cid-z74meu4i>Bank: Mettle <br data-astro-cid-z74meu4i>Bank/Sort Code: 040333 <br data-astro-cid-z74meu4i>Account Number:
          57536348 <br data-astro-cid-z74meu4i>Payment Reference: ${ref} </div> </div> </div> </section>   ` })}`;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/estimate.astro", void 0);

const $$file$3 = "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/estimate.astro";
const $$url$3 = "/estimate";

const estimate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Estimate,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro("https://peculiardynamics.co.uk");
const $$MarkdownLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$MarkdownLayout;
  const { frontmatter } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": frontmatter.title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="mt-16 w-full text-center text-4xl font-bold"> ${renderComponent($$result2, "Heading", $$Heading, { "id": frontmatter.link, "text": frontmatter.title })} </h1> <div class="policy space-content container max-w-[80ch]"> ${renderSlot($$result2, $$slots["default"])} </div> ` })}  `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/layouts/MarkdownLayout.astro", void 0);

const html$2 = "<p>This Cookie Notice has been developed to explain how Cookies are used on this website and demonstrate commitment to the privacy of the personal information you may share with us.</p>\n<p>Please note that the use of any personal information that is collected is subject to our <a href=\"./privacy\">Privacy Policy</a>.</p>\n<h2 id=\"what-are-cookies\">What Are Cookies</h2>\n<p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or ‘break’ certain elements of the sites functionality.</p>\n<h2 id=\"how-we-use-cookies\">How We Use Cookies</h2>\n<p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>\n<h2 id=\"disabling-cookies\">Disabling Cookies</h2>\n<p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.</p>\n<h2 id=\"the-cookies-we-set\">The Cookies We Set</h2>\n<p>Email newsletters related cookies: This site offers newsletter or email subscription services and cookies may be used to remember if you are already registered and whether to show certain notifications which might only be valid to subscribed/unsubscribed users.</p>\n<p>Forms related cookies: When you submit data to through a form such as those found on contact pages or comment forms cookies may be set to remember your user details for future correspondence.</p>\n<h2 id=\"third-party-cookies\">Third Party Cookies</h2>\n<p>In some special cases we also use cookies provided by trusted third parties.</p>\n<p>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content. For more information on Google Analytics cookies, see the official Google Analytics page.</p>\n<h2 id=\"more-information\">More Information</h2>\n<p>Hopefully this notice has clarified things for you and as was previously mentioned if there is something that you aren’t sure whether you need or not it’s usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</p>\n<p>If you are still looking for more information then you can contact us via email: <a href=\"mailto:info@peculiardynamics.co.uk\">info@peculiardynamics.co.uk</a></p>";

				const frontmatter$2 = {"layout":"../../layouts/MarkdownLayout.astro","title":"Cookie Notice","link":"cookies"};
				const file$2 = "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/policies/cookies.md";
				const url$2 = "/policies/cookies";
				function rawContent$2() {
					return "\nThis Cookie Notice has been developed to explain how Cookies are used on this website and demonstrate commitment to the privacy of the personal information you may share with us.\n\nPlease note that the use of any personal information that is collected is subject to our [Privacy Policy](./privacy).\n\n## What Are Cookies\n\nAs is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.\n\n## How We Use Cookies\n\nWe use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.\n\n## Disabling Cookies\n\nYou can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.\n\n## The Cookies We Set\n\nEmail newsletters related cookies: This site offers newsletter or email subscription services and cookies may be used to remember if you are already registered and whether to show certain notifications which might only be valid to subscribed/unsubscribed users.\n\nForms related cookies: When you submit data to through a form such as those found on contact pages or comment forms cookies may be set to remember your user details for future correspondence.\n\n## Third Party Cookies\n\nIn some special cases we also use cookies provided by trusted third parties.\n\nThis site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content. For more information on Google Analytics cookies, see the official Google Analytics page.\n\n## More Information\n\nHopefully this notice has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.\n\nIf you are still looking for more information then you can contact us via email: info@peculiardynamics.co.uk\n";
				}
				function compiledContent$2() {
					return html$2;
				}
				function getHeadings$2() {
					return [{"depth":2,"slug":"what-are-cookies","text":"What Are Cookies"},{"depth":2,"slug":"how-we-use-cookies","text":"How We Use Cookies"},{"depth":2,"slug":"disabling-cookies","text":"Disabling Cookies"},{"depth":2,"slug":"the-cookies-we-set","text":"The Cookies We Set"},{"depth":2,"slug":"third-party-cookies","text":"Third Party Cookies"},{"depth":2,"slug":"more-information","text":"More Information"}];
				}

				const Content$2 = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter$2;
					content.file = file$2;
					content.url = url$2;

					return renderTemplate`${renderComponent(result, 'Layout', $$MarkdownLayout, {
								file: file$2,
								url: url$2,
								content,
								frontmatter: content,
								headings: getHeadings$2(),
								rawContent: rawContent$2,
								compiledContent: compiledContent$2,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html$2)}`
							})}`;
				});

const cookies = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$2,
  compiledContent: compiledContent$2,
  default: Content$2,
  file: file$2,
  frontmatter: frontmatter$2,
  getHeadings: getHeadings$2,
  rawContent: rawContent$2,
  url: url$2
}, Symbol.toStringTag, { value: 'Module' }));

const html$1 = "<h2 id=\"what-information-do-we-collect-and-how\">What information do we collect and how?</h2>\n<p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>\n<h3 id=\"personal-information-provided-by-you\">Personal information provided by you</h3>\n<p>The personal information we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features that you use. The personal information we collect may include the following:</p>\n<ul>\n<li>Personal identifiers, contacts and characteristics (for example, name, company and contact details)</li>\n</ul>\n<h3 id=\"sensitive-information\">Sensitive information</h3>\n<p>We do not process any sensitive information.</p>\n<h3 id=\"information-automatically-collected\">Information automatically collected</h3>\n<p>We automatically collect certain information when you visit, use or navigate our Services. This information does not reveal your specific identity (like your name or contact information) but may include the following:</p>\n<ul>\n<li><strong>Technical data:</strong> IP address used to connect your device to the internet, browser type and version, operating system, language preferences, browsing actions and patterns using <a href=\"./cookies\">cookies</a>.</li>\n</ul>\n<p>We do not collect sensitive data about you without your express consent.</p>\n<h2 id=\"how-do-we-use-the-data-we-collect\">How do we use the data we collect?</h2>\n<p>We only use personal data where required for specific purposes, with your consent and depending on how you interact with us.\nThis includes:</p>\n<ul>\n<li>To contact you with business related information that we believe may be of interest to you</li>\n<li>Where we deem it necessary for our legitimate interests (e.g. conducting our business efficiently, safely and in compliance with the law, and promotion of our business)</li>\n</ul>\n<p>Unless we believe we have a legitimate business reason for contact, we will not contact you without your consent, and you can withdraw this consent at any time.</p>\n<p>We do not sell, rent or exchange your data with third parties for commercial purposes.</p>\n<h2 id=\"retention\">Retention</h2>\n<p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notices, unless a longer retention period is required or permitted by law. Should we no longer have a legitimate business need to process your information, we will either delete or anonymise your data, or if this is not possible (e.g. because personal information has been stored in backup archives), then we will securely store your information and isolate it from further processing until deletion is possible.</p>\n<h2 id=\"security\">Security</h2>\n<p>We have implemented appropriate and reasonable technical and organisational secuirty measures designed to protect the security of any personal information we process. We have put in place procedures to deal with any suspected personal data breach, and will notify you, and any other required body, of any breach where we are legally required to do so.</p>\n<h2 id=\"your-legal-rights\">Your legal rights</h2>\n<p>Under certain circumstances, you have the following rights regarding your personal data:</p>\n<ul>\n<li>\n<p><strong>Access</strong> - You have the right to ask us for copies of your personal information.</p>\n</li>\n<li>\n<p><strong>Rectification</strong> - You have the right to ask us to rectify personal information you think is inaccurate. You also have the right to ask us to complete information you think is incomplete.</p>\n</li>\n<li>\n<p><strong>Erasure</strong> - You have the right to ask us to erase your personal information in certain circumstances.</p>\n</li>\n<li>\n<p><strong>Restriction of processing</strong> - You have the right to ask us to restrict the processing of your personal information in certain circumstances.</p>\n</li>\n<li>\n<p><strong>Object to processing</strong> - You have the the right to object to the processing of your personal information in certain circumstances.</p>\n</li>\n<li>\n<p><strong>Data portability</strong> - You have the right to ask that we transfer the personal information you gave us to another organisation, or to you, in certain circumstances.</p>\n</li>\n<li>\n<p><strong>Withdrawing your consent</strong> where we are relying on consent to process your data by emailing <a href=\"mailto:info@peculiardynamics.co.uk\">info@peculiardynamics.co.uk</a></p>\n</li>\n</ul>\n<p>You are not required to pay any charge for exercising your rights. If you make a request, we have one month to respond to you.</p>\n<h2 id=\"contact-us\">Contact us</h2>\n<p>If you have any questions about privacy, this policy, wish to exercise your rights in relation to your personal data or to make a complaint about our use of your data, contact us via email at <a href=\"mailto:info@peculiardynamics.co.uk\">info@peculiardynamics.co.uk</a>.</p>\n<p>Should you feel that your queries and concerns have not been appropriately addressed by us, you can also contact the Information Commissioners’ Office (ICO), the UK supervisory authority for data protection issues (<a href=\"http://www.ico.org.uk\">www.ico.org.uk</a>).</p>";

				const frontmatter$1 = {"layout":"../../layouts/MarkdownLayout.astro","title":"Privacy Policy","link":"privacy"};
				const file$1 = "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/policies/privacy.md";
				const url$1 = "/policies/privacy";
				function rawContent$1() {
					return "\n## What information do we collect and how?\n\nWe collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.\n\n### Personal information provided by you\n\nThe personal information we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features that you use. The personal information we collect may include the following:\n\n- Personal identifiers, contacts and characteristics (for example, name, company and contact details)\n\n### Sensitive information\n\nWe do not process any sensitive information.\n\n### Information automatically collected\n\nWe automatically collect certain information when you visit, use or navigate our Services. This information does not reveal your specific identity (like your name or contact information) but may include the following:\n\n- **Technical data:** IP address used to connect your device to the internet, browser type and version, operating system, language preferences, browsing actions and patterns using [cookies](./cookies).\n\nWe do not collect sensitive data about you without your express consent.\n\n## How do we use the data we collect?\n\nWe only use personal data where required for specific purposes, with your consent and depending on how you interact with us.\nThis includes:\n\n- To contact you with business related information that we believe may be of interest to you\n- Where we deem it necessary for our legitimate interests (e.g. conducting our business efficiently, safely and in compliance with the law, and promotion of our business)\n\nUnless we believe we have a legitimate business reason for contact, we will not contact you without your consent, and you can withdraw this consent at any time.\n\nWe do not sell, rent or exchange your data with third parties for commercial purposes.\n\n## Retention\n\nWe will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notices, unless a longer retention period is required or permitted by law. Should we no longer have a legitimate business need to process your information, we will either delete or anonymise your data, or if this is not possible (e.g. because personal information has been stored in backup archives), then we will securely store your information and isolate it from further processing until deletion is possible.\n\n## Security\n\nWe have implemented appropriate and reasonable technical and organisational secuirty measures designed to protect the security of any personal information we process. We have put in place procedures to deal with any suspected personal data breach, and will notify you, and any other required body, of any breach where we are legally required to do so.\n\n## Your legal rights\n\nUnder certain circumstances, you have the following rights regarding your personal data:\n\n- **Access** - You have the right to ask us for copies of your personal information.\n\n- **Rectification** - You have the right to ask us to rectify personal information you think is inaccurate. You also have the right to ask us to complete information you think is incomplete.\n\n- **Erasure** - You have the right to ask us to erase your personal information in certain circumstances.\n\n- **Restriction of processing** - You have the right to ask us to restrict the processing of your personal information in certain circumstances.\n\n- **Object to processing** - You have the the right to object to the processing of your personal information in certain circumstances.\n\n- **Data portability** - You have the right to ask that we transfer the personal information you gave us to another organisation, or to you, in certain circumstances.\n\n- **Withdrawing your consent** where we are relying on consent to process your data by emailing info@peculiardynamics.co.uk\n\nYou are not required to pay any charge for exercising your rights. If you make a request, we have one month to respond to you.\n\n## Contact us\n\nIf you have any questions about privacy, this policy, wish to exercise your rights in relation to your personal data or to make a complaint about our use of your data, contact us via email at info@peculiardynamics.co.uk.\n\nShould you feel that your queries and concerns have not been appropriately addressed by us, you can also contact the Information Commissioners' Office (ICO), the UK supervisory authority for data protection issues (www.ico.org.uk).\n";
				}
				function compiledContent$1() {
					return html$1;
				}
				function getHeadings$1() {
					return [{"depth":2,"slug":"what-information-do-we-collect-and-how","text":"What information do we collect and how?"},{"depth":3,"slug":"personal-information-provided-by-you","text":"Personal information provided by you"},{"depth":3,"slug":"sensitive-information","text":"Sensitive information"},{"depth":3,"slug":"information-automatically-collected","text":"Information automatically collected"},{"depth":2,"slug":"how-do-we-use-the-data-we-collect","text":"How do we use the data we collect?"},{"depth":2,"slug":"retention","text":"Retention"},{"depth":2,"slug":"security","text":"Security"},{"depth":2,"slug":"your-legal-rights","text":"Your legal rights"},{"depth":2,"slug":"contact-us","text":"Contact us"}];
				}

				const Content$1 = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter$1;
					content.file = file$1;
					content.url = url$1;

					return renderTemplate`${renderComponent(result, 'Layout', $$MarkdownLayout, {
								file: file$1,
								url: url$1,
								content,
								frontmatter: content,
								headings: getHeadings$1(),
								rawContent: rawContent$1,
								compiledContent: compiledContent$1,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html$1)}`
							})}`;
				});

const privacy = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$1,
  compiledContent: compiledContent$1,
  default: Content$1,
  file: file$1,
  frontmatter: frontmatter$1,
  getHeadings: getHeadings$1,
  rawContent: rawContent$1,
  url: url$1
}, Symbol.toStringTag, { value: 'Module' }));

const html = "<p>Peculiar Dynamics Ltd uses this site to give a better service to its customers. Please read the following rules that govern your use of peculiardynamics.co.uk, which you accept by accessing it. If you don’t agree, please don’t use it.</p>\n<p>We reserve the right to update or change the Terms and Conditions at any time without prior notice, that is why we recommend that you read this section every time you use this site.</p>\n<h2 id=\"introduction\">Introduction</h2>\n<p>These terms and conditions apply between you, the User of this Website (including any sub-domains, unless expressly excluded by their own terms and conditions), and Peculiar Dynamics Ltd, the owner and operator of this Website. Please read these terms and conditions carefully, as they affect your legal rights.</p>\n<p>Your agreement to comply with and be bound by these terms and conditions is deemed to occur upon your first use of the Website. If you do not agree to be bound by these terms and conditions, you should stop using the Website immediately.</p>\n<p>In these terms and conditions, User or Users means any third party that accesses the Website and is not either (i) employed by Peculiar Dynamics Ltd and acting in the course of their employment or (ii) engaged as a consultant or otherwise providing services to Peculiar Dynamics Ltd and accessing the Website in connection with the provision of such services.</p>\n<p>You must be at least 18 years of age to use this Website. By using the Website and agreeing to these terms and conditions, you represent and warrant that you are at least 18 years of age.</p>\n<h2 id=\"intellectual-property-and-acceptable-use\">Intellectual property and acceptable use</h2>\n<p>All Content included on the Website, unless uploaded by Users, is the property of Peculiar Dynamics Ltd, our affiliates or other relevant third parties. In these terms and conditions, Content means any text, graphics, images, audio, video, software, data compilations, page layout, underlying code and software and any other form of information capable of being stored in a computer that appears on or forms part of this Website, including any such content uploaded by Users.</p>\n<p>By continuing to use the Website you acknowledge that such Content is protected by copyright, trademarks, database rights and other intellectual property rights. Nothing on this site shall be construed as granting, by implication, estoppel, or otherwise, any license or right to use any trademark, logo or service mark displayed on the site without the owner’s prior written permission.</p>\n<p>You may, for your own personal, non-commercial use only, do the following:</p>\n<ul>\n<li>retrieve, display and view the Content on a computer screen</li>\n<li>print one copy of the Content</li>\n</ul>\n<p>You must not otherwise reproduce, modify, copy, distribute or use for commercial purposes any Content without the written permission of Peculiar Dynamics Ltd.</p>\n<h2 id=\"prohibited-use\">Prohibited use</h2>\n<p>You may not use the Website for any of the following purposes:</p>\n<ol>\n<li>in any way which causes, or may cause, damage to the Website or interferes with any other person’s use or enjoyment of the Website;</li>\n<li>in any way which is harmful, unlawful, illegal, abusive, harassing, threatening or otherwise objectionable or in breach of any applicable law, regulation, governmental order;</li>\n<li>making, transmitting or storing electronic copies of Content protected by copyright without the permission of the owner.</li>\n</ol>\n<h2 id=\"registration\">Registration</h2>\n<p>Should you create an account with us, you must ensure that the details provided by you on registration or at any time are correct and complete.</p>\n<p>You must inform us immediately of any changes to the information that you provide when registering by updating your personal details to ensure we can communicate with you effectively.</p>\n<p>We may suspend or cancel your registration with immediate effect for any reasonable purposes or if you breach these terms and conditions.</p>\n<p>You may cancel your registration at any time by informing us in writing to the address at the end of these terms and conditions. If you do so, you must immediately stop using the Website. Cancellation or suspension of your registration does not affect any statutory rights.</p>\n<h2 id=\"links-to-other-websites\">Links to other websites</h2>\n<p>This Website may contain links to other sites. Unless expressly stated, these sites are not under the control of Peculiar Dynamics Ltd or that of our affiliates.</p>\n<p>We assume no responsibility for the content of such Websites and disclaim liability for any and all forms of loss or damage arising out of the use of them.</p>\n<p>The inclusion of a link to another site on this Website does not imply any endorsement of the sites themselves or of those in control of them.</p>\n<h2 id=\"privacy-policy-and-cookies-policy\">Privacy Policy and Cookies Policy</h2>\n<p>Use of the Website is also governed by our Privacy Policy and Cookies Policy, which are incorporated into these terms and conditions by this reference. To view the Privacy Policy and Cookies Policy, please click on the following: <a href=\"https://peculiardynamics.co.uk/policies/privacy\">https://peculiardynamics.co.uk/policies/privacy</a> and <a href=\"https://peculiardynamics.co.uk/policies/cookies\">https://peculiardynamics.co.uk/policies/cookies</a>.</p>\n<h2 id=\"availability-of-the-website-and-disclaimers\">Availability of the Website and disclaimers</h2>\n<p>Any online facilities, tools, services or information that Peculiar Dynamics Ltd makes available through the Website (the Service) is provided “as is” and on an “as available” basis. We give no warranty that the Service will be free of defects and/or faults. To the maximum extent permitted by the law, we provide no warranties (express or implied) of fitness for a particular purpose, accuracy of information, compatibility and satisfactory quality. Peculiar Dynamics Ltd is under no obligation to update information on the Website.</p>\n<p>Whilst Peculiar Dynamics Ltd uses reasonable endeavours to ensure that the Website is secure and free of errors, viruses and other malware, we give no warranty or guaranty in that regard and all Users take responsibility for their own security, that of their personal details and their computers.</p>\n<p>Peculiar Dynamics Ltd accepts no liability for any disruption or non-availability of the Website.</p>\n<p>Peculiar Dynamics Ltd reserves the right to alter, suspend or discontinue any part (or the whole of) the Website including, but not limited to, any products and/or services available.</p>\n<p>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</p>\n<p>These terms and conditions shall continue to apply to any modified version of the Website unless it is expressly stated otherwise.</p>\n<h2 id=\"limitation-of-liability\">Limitation of liability</h2>\n<p>Nothing in these terms and conditions will: (a) limit or exclude our or your liability for death or personal injury resulting from our or your negligence, as applicable; (b) limit or exclude our or your liability for fraud or fraudulent misrepresentation; or (c) limit or exclude any of our or your liabilities in any way that is not permitted under applicable law.</p>\n<p>We will not be liable to you in respect of any losses arising out of events beyond our reasonable control.</p>\n<p>To the maximum extent permitted by law, Peculiar Dynamics Ltd accepts no liability for any of the following:</p>\n<ol>\n<li>any business losses, such as loss of profits, income, revenue, anticipated savings, business, contracts, goodwill or commercial opportunities;</li>\n<li>loss or corruption of any data, database or software;</li>\n<li>any special, indirect or consequential loss or damage.</li>\n</ol>\n<h2 id=\"general\">General</h2>\n<p>You may not transfer any of your rights under these terms and conditions to any other person. We may transfer our rights under these terms and conditions where we reasonably believe your rights will not be affected.</p>\n<p>These terms and conditions may be varied by us from time to time. Such revised terms will apply to the Website from the date of publication. Users should check the terms and conditions regularly to ensure familiarity with the then current version.</p>\n<p>These terms and conditions together with the <a href=\"./privacy\">Privacy Policy</a> and <a href=\"./cookies\">Cookies Policy</a> contain the whole agreement between the parties relating to its subject matter and supersede all prior discussions, arrangements or agreements that might have taken place in relation to the terms and conditions.</p>\n<p>The Contracts (Rights of Third Parties) Act 1999 shall not apply to these terms and conditions and no third party will have any right to enforce or rely on any provision of these terms and conditions.</p>\n<p>If any court or competent authority finds that any provision of these terms and conditions (or part of any provision) is invalid, illegal or unenforceable, that provision or part-provision will, to the extent required, be deemed to be deleted, and the validity and enforceability of the other provisions of these terms and conditions will not be affected.</p>\n<p>Unless otherwise agreed, no delay, act or omission by a party in exercising any right or remedy will be deemed a waiver of that, or any other, right or remedy.</p>\n<p>This Agreement shall be governed by and interpreted according to the law of England and Wales and all disputes arising under the Agreement (including non-contractual disputes or claims) shall be subject to the exclusive jurisdiction of the English and Welsh courts.</p>\n<p>Peculiar Dynamics Ltd is a company incorporated in England and Wales with registered number 14575056 whose registered address is 71-75 Shelton Street, Coven, London, and it operates the Website <a href=\"http://www.peculiardynamics.co.uk\">www.peculiardynamics.co.uk</a>. You can contact Peculiar Dynamics Ltd by email on <a href=\"mailto:info@peculiardynamics.co.uk\">info@peculiardynamics.co.uk</a>.</p>";

				const frontmatter = {"layout":"../../layouts/MarkdownLayout.astro","title":"Terms & Conditions","link":"terms"};
				const file = "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/policies/terms.md";
				const url = "/policies/terms";
				function rawContent() {
					return "\nPeculiar Dynamics Ltd uses this site to give a better service to its customers. Please read the following rules that govern your use of peculiardynamics.co.uk, which you accept by accessing it. If you don't agree, please don't use it.\n\nWe reserve the right to update or change the Terms and Conditions at any time without prior notice, that is why we recommend that you read this section every time you use this site.\n\n## Introduction\n\nThese terms and conditions apply between you, the User of this Website (including any sub-domains, unless expressly excluded by their own terms and conditions), and Peculiar Dynamics Ltd, the owner and operator of this Website. Please read these terms and conditions carefully, as they affect your legal rights.\n\nYour agreement to comply with and be bound by these terms and conditions is deemed to occur upon your first use of the Website. If you do not agree to be bound by these terms and conditions, you should stop using the Website immediately.\n\nIn these terms and conditions, User or Users means any third party that accesses the Website and is not either (i) employed by Peculiar Dynamics Ltd and acting in the course of their employment or (ii) engaged as a consultant or otherwise providing services to Peculiar Dynamics Ltd and accessing the Website in connection with the provision of such services.\n\nYou must be at least 18 years of age to use this Website. By using the Website and agreeing to these terms and conditions, you represent and warrant that you are at least 18 years of age.\n\n## Intellectual property and acceptable use\n\nAll Content included on the Website, unless uploaded by Users, is the property of Peculiar Dynamics Ltd, our affiliates or other relevant third parties. In these terms and conditions, Content means any text, graphics, images, audio, video, software, data compilations, page layout, underlying code and software and any other form of information capable of being stored in a computer that appears on or forms part of this Website, including any such content uploaded by Users.\n\nBy continuing to use the Website you acknowledge that such Content is protected by copyright, trademarks, database rights and other intellectual property rights. Nothing on this site shall be construed as granting, by implication, estoppel, or otherwise, any license or right to use any trademark, logo or service mark displayed on the site without the owner's prior written permission.\n\nYou may, for your own personal, non-commercial use only, do the following:\n\n- retrieve, display and view the Content on a computer screen\n- print one copy of the Content\n\nYou must not otherwise reproduce, modify, copy, distribute or use for commercial purposes any Content without the written permission of Peculiar Dynamics Ltd.\n\n## Prohibited use\n\nYou may not use the Website for any of the following purposes:\n\n1. in any way which causes, or may cause, damage to the Website or interferes with any other person's use or enjoyment of the Website;\n2. in any way which is harmful, unlawful, illegal, abusive, harassing, threatening or otherwise objectionable or in breach of any applicable law, regulation, governmental order;\n3. making, transmitting or storing electronic copies of Content protected by copyright without the permission of the owner.\n\n## Registration\n\nShould you create an account with us, you must ensure that the details provided by you on registration or at any time are correct and complete.\n\nYou must inform us immediately of any changes to the information that you provide when registering by updating your personal details to ensure we can communicate with you effectively.\n\nWe may suspend or cancel your registration with immediate effect for any reasonable purposes or if you breach these terms and conditions.\n\nYou may cancel your registration at any time by informing us in writing to the address at the end of these terms and conditions. If you do so, you must immediately stop using the Website. Cancellation or suspension of your registration does not affect any statutory rights.\n\n## Links to other websites\n\nThis Website may contain links to other sites. Unless expressly stated, these sites are not under the control of Peculiar Dynamics Ltd or that of our affiliates.\n\nWe assume no responsibility for the content of such Websites and disclaim liability for any and all forms of loss or damage arising out of the use of them.\n\nThe inclusion of a link to another site on this Website does not imply any endorsement of the sites themselves or of those in control of them.\n\n## Privacy Policy and Cookies Policy\n\nUse of the Website is also governed by our Privacy Policy and Cookies Policy, which are incorporated into these terms and conditions by this reference. To view the Privacy Policy and Cookies Policy, please click on the following: https://peculiardynamics.co.uk/policies/privacy and https://peculiardynamics.co.uk/policies/cookies.\n\n## Availability of the Website and disclaimers\n\nAny online facilities, tools, services or information that Peculiar Dynamics Ltd makes available through the Website (the Service) is provided \"as is\" and on an \"as available\" basis. We give no warranty that the Service will be free of defects and/or faults. To the maximum extent permitted by the law, we provide no warranties (express or implied) of fitness for a particular purpose, accuracy of information, compatibility and satisfactory quality. Peculiar Dynamics Ltd is under no obligation to update information on the Website.\n\nWhilst Peculiar Dynamics Ltd uses reasonable endeavours to ensure that the Website is secure and free of errors, viruses and other malware, we give no warranty or guaranty in that regard and all Users take responsibility for their own security, that of their personal details and their computers.\n\nPeculiar Dynamics Ltd accepts no liability for any disruption or non-availability of the Website.\n\nPeculiar Dynamics Ltd reserves the right to alter, suspend or discontinue any part (or the whole of) the Website including, but not limited to, any products and/or services available.\n\nThe content of the pages of this website is for your general information and use only. It is subject to change without notice.\n\nThese terms and conditions shall continue to apply to any modified version of the Website unless it is expressly stated otherwise.\n\n## Limitation of liability\n\nNothing in these terms and conditions will: (a) limit or exclude our or your liability for death or personal injury resulting from our or your negligence, as applicable; (b) limit or exclude our or your liability for fraud or fraudulent misrepresentation; or (c) limit or exclude any of our or your liabilities in any way that is not permitted under applicable law.\n\nWe will not be liable to you in respect of any losses arising out of events beyond our reasonable control.\n\nTo the maximum extent permitted by law, Peculiar Dynamics Ltd accepts no liability for any of the following:\n\n1. any business losses, such as loss of profits, income, revenue, anticipated savings, business, contracts, goodwill or commercial opportunities;\n2. loss or corruption of any data, database or software;\n3. any special, indirect or consequential loss or damage.\n\n## General\n\nYou may not transfer any of your rights under these terms and conditions to any other person. We may transfer our rights under these terms and conditions where we reasonably believe your rights will not be affected.\n\nThese terms and conditions may be varied by us from time to time. Such revised terms will apply to the Website from the date of publication. Users should check the terms and conditions regularly to ensure familiarity with the then current version.\n\nThese terms and conditions together with the [Privacy Policy](./privacy) and [Cookies Policy](./cookies) contain the whole agreement between the parties relating to its subject matter and supersede all prior discussions, arrangements or agreements that might have taken place in relation to the terms and conditions.\n\nThe Contracts (Rights of Third Parties) Act 1999 shall not apply to these terms and conditions and no third party will have any right to enforce or rely on any provision of these terms and conditions.\n\nIf any court or competent authority finds that any provision of these terms and conditions (or part of any provision) is invalid, illegal or unenforceable, that provision or part-provision will, to the extent required, be deemed to be deleted, and the validity and enforceability of the other provisions of these terms and conditions will not be affected.\n\nUnless otherwise agreed, no delay, act or omission by a party in exercising any right or remedy will be deemed a waiver of that, or any other, right or remedy.\n\nThis Agreement shall be governed by and interpreted according to the law of England and Wales and all disputes arising under the Agreement (including non-contractual disputes or claims) shall be subject to the exclusive jurisdiction of the English and Welsh courts.\n\nPeculiar Dynamics Ltd is a company incorporated in England and Wales with registered number 14575056 whose registered address is 71-75 Shelton Street, Coven, London, and it operates the Website www.peculiardynamics.co.uk. You can contact Peculiar Dynamics Ltd by email on info@peculiardynamics.co.uk.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"introduction","text":"Introduction"},{"depth":2,"slug":"intellectual-property-and-acceptable-use","text":"Intellectual property and acceptable use"},{"depth":2,"slug":"prohibited-use","text":"Prohibited use"},{"depth":2,"slug":"registration","text":"Registration"},{"depth":2,"slug":"links-to-other-websites","text":"Links to other websites"},{"depth":2,"slug":"privacy-policy-and-cookies-policy","text":"Privacy Policy and Cookies Policy"},{"depth":2,"slug":"availability-of-the-website-and-disclaimers","text":"Availability of the Website and disclaimers"},{"depth":2,"slug":"limitation-of-liability","text":"Limitation of liability"},{"depth":2,"slug":"general","text":"General"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$MarkdownLayout, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html)}`
							})}`;
				});

const terms = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content,
  compiledContent,
  default: Content,
  file,
  frontmatter,
  getHeadings,
  rawContent,
  url
}, Symbol.toStringTag, { value: 'Module' }));

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro("https://peculiardynamics.co.uk");
const $$Pricing = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Pricing;
  return renderTemplate(_a || (_a = __template(["", '  <script type="text/javascript">\n  const monthlys = document.querySelectorAll(".monthly");\n  const upfronts = document.querySelectorAll(".upfront");\n\n  document.getElementById("exampleToggle").addEventListener("change", () => {\n    if (document.querySelector("#exampleToggle:checked")) {\n      monthlys.forEach((m) => {\n        m.classList.add("hidden");\n      });\n      upfronts.forEach((u) => {\n        u.classList.remove("hidden");\n      });\n    } else {\n      monthlys.forEach((m) => {\n        m.classList.remove("hidden");\n      });\n      upfronts.forEach((u) => {\n        u.classList.add("hidden");\n      });\n    }\n  });\n<\/script>'])), renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": "Pricing", "data-astro-cid-lmkygsfs": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "title": "Tech Essentials from", "gradientText": "\xA31,000 upfront", "learnTarget": `#howItWorks`, "quoteButton": true, "learnButton": true, "imgSrc": heroVector, "data-astro-cid-lmkygsfs": true })} ${maybeRenderHead()}<section class="px-4 py-8" data-astro-cid-lmkygsfs> <div class="container flex flex-col sm:max-w-screen-xl" data-astro-cid-lmkygsfs> <h2 class="mb-2 text-lg font-bold" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Heading", $$Heading, { "id": "howItWorks", "text": "HOW IT WORKS", "data-astro-cid-lmkygsfs": true })} </h2> <p class="mb-16 text-4xl font-bold" data-astro-cid-lmkygsfs>
Keeping it
<span class="text-highlight" data-astro-cid-lmkygsfs>simple</span>.
</p> <!-- <p class="mb-8 text-2xl">
          Make the technology and systems that your business relies on:
        </p> --> <p class="mb-8 max-w-[75ch] text-2xl" data-astro-cid-lmkygsfs>
We use our intelligent digital tools to quickly shape, reconfigure and
        build the right technology for you, at the right price, on your
        schedule.
</p> <div class="container max-w-screen-xl" data-astro-cid-lmkygsfs> <p class="mb-8 text-2xl" data-astro-cid-lmkygsfs>It's as easy as...</p> <div class="mb-8 grid grid-cols-1 gap-12 md:grid-cols-3" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "CallOut", $$CallOut, { "purple": "1", "point": "Quote", "subtext": "Build a detailed custom quote with our interactive tool.", "data-astro-cid-lmkygsfs": true })} ${renderComponent($$result2, "CallOut", $$CallOut, { "purple": "2", "point": "Design", "subtext": "Using our intelligent design tool and a 2hr design session.", "data-astro-cid-lmkygsfs": true })} ${renderComponent($$result2, "CallOut", $$CallOut, { "purple": "3", "point": "Relax", "subtext": "...whilst we build, test and look after your tech!", "data-astro-cid-lmkygsfs": true })} </div> </div> </div> <div class="mt-16 flex flex-col justify-center gap-3 min-[500px]:flex-row" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Button", $$Button, { "href": "/quoter", "icon": "ph:chat", "text": "Get a Quote", "data-astro-cid-lmkygsfs": true })} ${renderComponent($$result2, "Button", $$Button, { "href": "/services/#approach", "text": "Our Approach", "buttonColor": "color-secondary", "data-astro-cid-lmkygsfs": true })} </div> </section> <section class="peach px-4 py-8" data-astro-cid-lmkygsfs> <div class="container flex flex-col items-center py-8 sm:max-w-screen-xl" data-astro-cid-lmkygsfs> <div class="w-full max-w-screen-lg" data-astro-cid-lmkygsfs> <h2 class="mb-2 w-full text-lg font-bold" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Heading", $$Heading, { "id": "included", "text": "Get your tech up and running, or up to scratch", "data-astro-cid-lmkygsfs": true })} </h2> <p class="mb-16 w-full text-4xl font-bold" data-astro-cid-lmkygsfs> <span class="text-highlight" data-astro-cid-lmkygsfs>Always included</span>, as standard:
</p> </div> <div class="grid max-w-screen-lg grid-cols-2 gap-4 sm:grid-cols-3 md:gap-8 lg:grid-cols-4" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Feature", $$Feature, { "icon": "carbon:screen", "title": "Website & Content", "featureColor": "", "contentClasses": "text-center items-center", "data-astro-cid-lmkygsfs": true }, { "default": ($$result3) => renderTemplate`
Design or migration, build & optimisation.
` })} ${renderComponent($$result2, "Feature", $$Feature, { "icon": "ion:mail-outline", "title": "Custom Email", "featureColor": "", "contentClasses": "text-center items-center", "data-astro-cid-lmkygsfs": true }, { "default": ($$result3) => renderTemplate`
Professional email matching your domain.
` })} ${renderComponent($$result2, "Feature", $$Feature, { "icon": "carbon:tool-kit", "title": "Productivity Tools", "featureColor": "", "contentClasses": "text-center items-center", "data-astro-cid-lmkygsfs": true }, { "default": ($$result3) => renderTemplate`
Google Workspace and products.
` })} ${renderComponent($$result2, "Feature", $$Feature, { "icon": "ph:broadcast", "title": "Reputation & Reviews", "featureColor": "", "contentClasses": "text-center items-center", "data-astro-cid-lmkygsfs": true }, { "default": ($$result3) => renderTemplate`
Search engine & review site registration.
` })} ${renderComponent($$result2, "Feature", $$Feature, { "icon": "carbon:chat", "title": "Customer Contact", "featureColor": "", "contentClasses": "text-center items-center", "data-astro-cid-lmkygsfs": true }, { "default": ($$result3) => renderTemplate`
Setup or config of CRM & website.
` })} ${renderComponent($$result2, "Feature", $$Feature, { "icon": "ep:data-line", "title": "Data & Insights", "featureColor": "", "contentClasses": "text-center items-center", "data-astro-cid-lmkygsfs": true }, { "default": ($$result3) => renderTemplate`
Google Analytics to track performance.
` })} ${renderComponent($$result2, "Feature", $$Feature, { "icon": "ph:cookie", "title": "Legal & GDPR", "featureColor": "", "contentClasses": "text-center items-center", "data-astro-cid-lmkygsfs": true }, { "default": ($$result3) => renderTemplate`
Compliant website policies & content.
` })} ${renderComponent($$result2, "Feature", $$Feature, { "icon": "ph:lock-light", "title": "Security Basics", "featureColor": "", "contentClasses": "text-center items-center", "data-astro-cid-lmkygsfs": true }, { "default": ($$result3) => renderTemplate`
Secure hosting, domain & data setup.
` })} </div> <div class="my-8 flex w-full items-center gap-4" data-astro-cid-lmkygsfs> <div class="flex-auto border-b-2 border-solid border-indigo-600" data-astro-cid-lmkygsfs></div> <p data-astro-cid-lmkygsfs>PLUS</p> <div class="flex-auto border-b-2 border-solid border-indigo-600" data-astro-cid-lmkygsfs></div> </div> <ul class="grid grid-cols-2 content-center gap-8 text-sm md:grid-cols-3" data-astro-cid-lmkygsfs> <li class="flex h-6 items-center gap-2" data-astro-cid-lmkygsfs> <div class="h-6 w-6 flex-none" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Icon", $$Icon, { "name": "charm:tick", "data-astro-cid-lmkygsfs": true })} </div>
Custom coded, accessible 5-page site
</li> <li class="flex h-6 items-center gap-2" data-astro-cid-lmkygsfs> <div class="h-6 w-6 flex-none" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Icon", $$Icon, { "name": "charm:tick", "data-astro-cid-lmkygsfs": true })} </div>
SEO optimisation
</li> <li class="flex h-6 items-center gap-2" data-astro-cid-lmkygsfs> <div class="h-6 w-6 flex-none" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Icon", $$Icon, { "name": "charm:tick", "data-astro-cid-lmkygsfs": true })} </div>
Domain registration & management
</li> <li class="flex h-6 items-center gap-2" data-astro-cid-lmkygsfs> <div class="h-6 w-6 flex-none" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Icon", $$Icon, { "name": "charm:tick", "data-astro-cid-lmkygsfs": true })} </div>
Migration of existing content
</li> <li class="flex h-6 items-center gap-2" data-astro-cid-lmkygsfs> <div class="h-6 w-6 flex-none" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Icon", $$Icon, { "name": "charm:tick", "data-astro-cid-lmkygsfs": true })} </div>
Secure site & email hosting
</li> <li class="flex h-6 items-center gap-2" data-astro-cid-lmkygsfs> <div class="h-6 w-6 flex-none" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Icon", $$Icon, { "name": "charm:tick", "data-astro-cid-lmkygsfs": true })} </div>
Anti-spam contact form
</li> <li class="flex h-6 items-center gap-2" data-astro-cid-lmkygsfs> <div class="h-6 w-6 flex-none" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Icon", $$Icon, { "name": "charm:tick", "data-astro-cid-lmkygsfs": true })} </div>
https and SSL certificates
</li> <li class="flex h-6 items-center gap-2" data-astro-cid-lmkygsfs> <div class="h-6 w-6 flex-none" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Icon", $$Icon, { "name": "charm:tick", "data-astro-cid-lmkygsfs": true })} </div>
Performance scanning & updates
</li> <li class="flex h-6 items-center gap-2" data-astro-cid-lmkygsfs> <div class="h-6 w-6 flex-none" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Icon", $$Icon, { "name": "charm:tick", "data-astro-cid-lmkygsfs": true })} </div>
Content licensing & management
</li> <li class="flex h-6 items-center gap-2" data-astro-cid-lmkygsfs> <div class="h-6 w-6 flex-none" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Icon", $$Icon, { "name": "charm:tick", "data-astro-cid-lmkygsfs": true })} </div>
Mobile & desktop compatibility
</li> <li class="flex h-6 items-center gap-2" data-astro-cid-lmkygsfs> <div class="h-6 w-6 flex-none" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Icon", $$Icon, { "name": "charm:tick", "data-astro-cid-lmkygsfs": true })} </div>
Backups & security updates
</li> <li class="flex h-6 items-center gap-2" data-astro-cid-lmkygsfs> <div class="h-6 w-6 flex-none" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Icon", $$Icon, { "name": "charm:tick", "data-astro-cid-lmkygsfs": true })} </div>
Configured with your branding
</li> <li class="flex h-6 items-center gap-2" data-astro-cid-lmkygsfs> <div class="h-6 w-6 flex-none" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Icon", $$Icon, { "name": "charm:tick", "data-astro-cid-lmkygsfs": true })} </div>
Google search console registration
</li> <li class="flex h-6 items-center gap-2" data-astro-cid-lmkygsfs> <div class="h-6 w-6 flex-none" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Icon", $$Icon, { "name": "charm:tick", "data-astro-cid-lmkygsfs": true })} </div>
Mobile & desktop compatibility
</li> <li class="flex h-6 items-center gap-2" data-astro-cid-lmkygsfs> <div class="h-6 w-6 flex-none" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Icon", $$Icon, { "name": "charm:tick", "data-astro-cid-lmkygsfs": true })} </div>
Comprehensive, custom add-ons as required
</li> </ul> </div> <div class="mt-16 flex flex-col justify-center gap-3 min-[500px]:flex-row" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Button", $$Button, { "href": "/quoter", "icon": "ph:chat", "text": "Get a Quote", "data-astro-cid-lmkygsfs": true })} ${renderComponent($$result2, "Button", $$Button, { "href": "#example", "icon": "mdi:arrow-down", "text": "Pricing Example", "buttonColor": "color-secondary", "data-astro-cid-lmkygsfs": true })} </div> </section> <section class="px-4 py-8" data-astro-cid-lmkygsfs> <div class="container flex max-w-sm flex-col items-center px-4 py-8 sm:max-w-screen-xl" data-astro-cid-lmkygsfs> <div class="max-w-screen-lg" data-astro-cid-lmkygsfs> <h2 class="mb-2 w-full text-lg font-bold" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "Heading", $$Heading, { "id": "example", "text": "Example pricing", "data-astro-cid-lmkygsfs": true })} </h2> <p class="mb-16 w-full text-4xl font-bold" data-astro-cid-lmkygsfs> <span class="text-highlight" data-astro-cid-lmkygsfs>Transparent</span>, customisable
          products, services & pricing
</p> </div> <div class="flex w-full max-w-screen-lg flex-col items-center justify-between gap-8 p-4 lg:flex-row" data-astro-cid-lmkygsfs> <div class="mb-8 max-w-[40ch] text-2xl" data-astro-cid-lmkygsfs> <p class="" data-astro-cid-lmkygsfs>
We use technology to build custom, detailed quotes that allow you to
            pick more of what you want, and less of what you don't.
</p> <br data-astro-cid-lmkygsfs> <p class="" data-astro-cid-lmkygsfs>
Our quotes are fixed - preventing any nasty surprises - with any
            extras priced clearly and comprehensively, so you know what you're
            signing up for.
</p> <br data-astro-cid-lmkygsfs> <p class="" data-astro-cid-lmkygsfs>
We offer flexible payment options, to suit your business, with
            discounts for any work paid up front, any follow on work and any
            successful referrals you make to us.
</p> </div> <div class="example peach max-w-md flex-none items-center gap-2 p-4" data-astro-cid-lmkygsfs> <p class="text-xl font-bold" data-astro-cid-lmkygsfs>EXAMPLE QUOTE</p> <div class="toggle relative flex w-full justify-between px-4 py-8" data-astro-cid-lmkygsfs> <p class="w-1/5 font-semibold" data-astro-cid-lmkygsfs>PAY MONTHLY</p> <input type="checkbox" id="exampleToggle" class="relative h-10 w-[4.5rem] cursor-pointer appearance-none rounded-full border border-2 border-black bg-gray-100 ring-1 ring-black ring-offset-white transition-colors duration-200 ease-in-out before:inline-block before:h-9 before:w-9 before:translate-x-0 before:transform before:rounded-full before:bg-white before:shadow before:ring-2 before:ring-black before:transition before:duration-200 before:ease-in-out checked:bg-blue-600 checked:bg-none checked:before:translate-x-full checked:before:bg-blue-200 focus:border-blue-600 focus:outline-none focus:ring-blue-600 dark:bg-gray-700 dark:before:bg-gray-400 dark:checked:bg-blue-600 dark:checked:before:bg-blue-200 dark:focus:ring-offset-gray-800" data-astro-cid-lmkygsfs> <label for="exampleToggle" class="sr-only" data-astro-cid-lmkygsfs>toggle cost by payment term</label> <p class="w-1/5 text-right font-semibold" data-astro-cid-lmkygsfs>PAY UPFRONT</p> <span class="absolute bottom-2 right-2 rounded-full border-2 border-black bg-blue-800 px-1 text-xs font-light text-blue-50" data-astro-cid-lmkygsfs>Save 10%</span> </div> <div class="grid w-full grid-cols-4 gap-2 rounded-md border-2 border-black p-2" data-astro-cid-lmkygsfs> <div class="col-span-3 text-lg font-bold" data-astro-cid-lmkygsfs>DESIGN & BUILD</div> <p class="monthly row-span-2 justify-self-end text-lg font-bold" data-astro-cid-lmkygsfs>
£4,500
</p> <div class="upfront relative row-span-2 flex hidden flex-col justify-self-end" data-astro-cid-lmkygsfs> <p class="text-lg font-light line-through" data-astro-cid-lmkygsfs>£4,500</p> <p class="text-lg font-bold" data-astro-cid-lmkygsfs>£4,150</p> <span class="absolute bottom-0 w-full rounded-full border-2 border-black bg-blue-800 px-1 text-center text-xs font-light text-blue-50" data-astro-cid-lmkygsfs>-10%</span> </div> <p class="col-span-3" data-astro-cid-lmkygsfs>
5 page, hand-coded, brochure site. Hosting, email, productivity &
              web presence tools setup.
</p> </div> <div class="grid grid-cols-4 gap-2 rounded-md border-2 border-black p-2" data-astro-cid-lmkygsfs> <div class="col-span-3 text-lg font-bold" data-astro-cid-lmkygsfs>
MANAGE & SUPPORT <span class="text-sm font-light" data-astro-cid-lmkygsfs>
(12 months)</span> </div> <p class="monthly row-span-2 justify-self-end text-lg font-bold" data-astro-cid-lmkygsfs>
£75 <span class="text-sm font-light" data-astro-cid-lmkygsfs> /month</span> </p> <div class="upfront relative row-span-2 flex hidden flex-col items-end justify-self-end" data-astro-cid-lmkygsfs> <p class="text-lg font-light line-through" data-astro-cid-lmkygsfs>£75</p> <p class="text-lg font-bold" data-astro-cid-lmkygsfs>£67.50</p> <p class="text-sm font-light" data-astro-cid-lmkygsfs>/month</p> <span class="absolute bottom-0 w-full rounded-full border-2 border-black bg-blue-800 px-1 text-center text-xs font-light text-blue-50" data-astro-cid-lmkygsfs>-10%</span> </div> <p class="col-span-3" data-astro-cid-lmkygsfs>
Core package incl; domain & email hosting, security & performance
              updates, Google Workspace (x1).
</p> </div> <div class="flex w-full items-end gap-2 border-b-2 border-solid border-black pb-2" data-astro-cid-lmkygsfs> <p class="flex-none font-semibold" data-astro-cid-lmkygsfs>TOTAL</p> <span class="relative bottom-1 flex-auto border-b-2 border-dotted border-slate-400" data-astro-cid-lmkygsfs></span> <!-- <p class="monthly flex-none">
              £5,400 <span class="text-xs font-light">ex.VAT</span>
            </p>            
            <p class="upfront flex-none">
              
              £4,960 <span class="text-xs font-light">ex.VAT</span>
            </p> --> <p class="monthly text-lg font-bold" data-astro-cid-lmkygsfs>
£5,400 <span class="text-sm font-light" data-astro-cid-lmkygsfs> ex.VAT</span> </p> <div class="upfront relative flex hidden items-end justify-end gap-2 justify-self-end" data-astro-cid-lmkygsfs> <p class="text-sm font-light line-through" data-astro-cid-lmkygsfs>£5,400</p> <p class="text-lg font-bold" data-astro-cid-lmkygsfs>
£4,960 <span class="text-sm font-light" data-astro-cid-lmkygsfs> ex.VAT</span> </p> </div> </div> <div class="neutral flex w-full flex-col items-center rounded-md border-2 border-black p-2" data-astro-cid-lmkygsfs> <div class="flex w-full gap-2" data-astro-cid-lmkygsfs> <p class="flex-none text-lg font-semibold" data-astro-cid-lmkygsfs>Initial Deposit</p> <span class="relative bottom-1 flex-auto border-b-2 border-dotted border-slate-400" data-astro-cid-lmkygsfs></span> <p class="flex-none text-lg font-semibold" data-astro-cid-lmkygsfs>£1,000</p> </div> <span data-astro-cid-lmkygsfs>+</span> <div class="monthly flex flex-col items-center" data-astro-cid-lmkygsfs> <p class="text-4xl font-bold" data-astro-cid-lmkygsfs>
£366 <span class="text-lg font-semibold" data-astro-cid-lmkygsfs>/month</span> <span class="text-xs font-light" data-astro-cid-lmkygsfs>(ex.VAT)</span> </p> <p class="text-lg font-semibold" data-astro-cid-lmkygsfs>for 12 months</p> </div> <div class="upfront flex hidden flex-col items-center" data-astro-cid-lmkygsfs> <p class="text-4xl font-bold" data-astro-cid-lmkygsfs>
£3960
<span class="text-xs font-light" data-astro-cid-lmkygsfs>(ex.VAT)</span> </p> <p class="text-lg font-semibold" data-astro-cid-lmkygsfs>paid after design is agreed</p> </div> </div> ${renderComponent($$result2, "Button", $$Button, { "href": "/quoter", "icon": "ph:chat", "text": "Get Your Quote", "data-astro-cid-lmkygsfs": true })} </div> </div> </div> </section> ${renderComponent($$result2, "CallToAction", $$CallToAction, { "data-astro-cid-lmkygsfs": true })} ` }));
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/pricing.astro", void 0);

const $$file$2 = "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/pricing.astro";
const $$url$2 = "/pricing";

const pricing = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pricing,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("https://peculiardynamics.co.uk");
const $$Quoter = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Quoter;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": "Quoter", "data-astro-cid-wchmekyj": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="flex items-center justify-center" data-astro-cid-wchmekyj> <div class="container flex flex-col items-center gap-8" data-astro-cid-wchmekyj> <div data-astro-cid-wchmekyj> <h1 class="mb-2 text-lg font-bold" data-astro-cid-wchmekyj> ${renderComponent($$result2, "Heading", $$Heading, { "id": "quoter", "text": "Get A Quote", "data-astro-cid-wchmekyj": true })} </h1> <p class="mb-8 text-4xl font-bold" data-astro-cid-wchmekyj>Looking for a custom quote?</p> <p class="text-2xl" data-astro-cid-wchmekyj>
Oops... Our smart quoting tool is under construction but you can
          contact us through our contact form for now .
</p> </div> ${renderComponent($$result2, "Image", $$Image, { "src": "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWp2ZzExNzF1bzNrNDhzcGd6anRzZnhoNHd0OG12bnp3MHl2ajJ6NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wHE6Dd6RCVHQfjK5dy/giphy.gif", ",": true, "alt": "", ",": true, "width": "100%", ",": true, "height": "400px", ",": true, "class": "giphy h-96 w-96 rounded-full object-cover", "data-astro-cid-wchmekyj": true })} ${renderComponent($$result2, "Button", $$Button, { "href": "/contact", "icon": "mdi:arrow-right", "text": "Contact Form", "data-astro-cid-wchmekyj": true })} </div> </section> ` })}  `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/quoter.astro", void 0);

const $$file$1 = "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/quoter.astro";
const $$url$1 = "/quoter";

const quoter = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Quoter,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const investVector = new Proxy({"src":"/_astro/invest-vector.BnmE6xqM.png","width":1450,"height":1280,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/assets/img/invest-vector.png";
							}
							globalThis.astroAsset.referencedImages.add("/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/assets/img/invest-vector.png");
							return target[name];
						}
					});

const $$Astro = createAstro("https://peculiardynamics.co.uk");
const $$Services = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Services;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": "Services", "data-astro-cid-ucd2ps2b": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "title": "Invest in Technology", "gradientText": "That Matters", "imgSrc": investVector, "data-astro-cid-ucd2ps2b": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<p class="col-start-1 mb-4 self-start text-center text-xl md:text-left md:text-2xl" data-astro-cid-ucd2ps2b>
Unlock the potential of your business with accessible, affordable and
      understandable technology paired with one-time or ongoing tech support.
</p> <div class="row-start-3 mt-4 flex w-full flex-wrap justify-center gap-3 min-[200px]:flex-row md:col-span-full xl:col-span-1" data-astro-cid-ucd2ps2b> ${renderComponent($$result3, "Button", $$Button, { "href": "#webDev", "icon": "mdi:arrow-right", "text": "Website & App Development", "buttonColor": "blue", "data-astro-cid-ucd2ps2b": true })} ${renderComponent($$result3, "Button", $$Button, { "href": "#ongoing", "icon": "mdi:arrow-right", "text": "Ongoing Support", "buttonColor": "gold", "data-astro-cid-ucd2ps2b": true })} ${renderComponent($$result3, "Button", $$Button, { "href": "#systemIntegration", "icon": "mdi:arrow-right", "text": "System Integration", "buttonColor": "mint", "data-astro-cid-ucd2ps2b": true })} ${renderComponent($$result3, "Button", $$Button, { "href": "#businessAnalysis", "icon": "mdi:arrow-right", "text": "Business Analytics", "buttonColor": "pink", "data-astro-cid-ucd2ps2b": true })} </div> <div class="col-span-full mt-16 flex w-full justify-center" data-astro-cid-ucd2ps2b> ${renderComponent($$result3, "Button", $$Button, { "buttonColor": "color-secondary", "href": "#approach", "text": "Our Approach", "icon": "mdi:arrow-down", "data-astro-cid-ucd2ps2b": true })} </div> ` })} <section class="approach px-4 py-8" data-astro-cid-ucd2ps2b> <div class="container flex flex-col items-center rounded-lg py-8 sm:max-w-screen-xl" data-astro-cid-ucd2ps2b> <div class="flex max-w-2xl flex-none flex-col items-center" data-astro-cid-ucd2ps2b> <h2 class="mb-2 w-full text-lg font-bold" data-astro-cid-ucd2ps2b> ${renderComponent($$result2, "Heading", $$Heading, { "id": "approach", "text": "OUR APPROACH", "data-astro-cid-ucd2ps2b": true })} </h2> <p class="mb-8 w-full text-4xl font-bold" data-astro-cid-ucd2ps2b>
Technology that
<span class="text-highlight" data-astro-cid-ucd2ps2b>connects</span> your business and customers.
</p> <p class="mb-8 w-full max-w-[75ch] text-xl" data-astro-cid-ucd2ps2b>
Grow, professionalise and promote your business with custom solutions
          that deliver value; to give you the time to focus on delivering your
          products and services.
</p> <p class="mb-8 w-full text-xl" data-astro-cid-ucd2ps2b>Our approach is:</p> </div> <div class="mb-16 grid grid-cols-1 justify-items-center gap-8 md:grid-cols-3" data-astro-cid-ucd2ps2b> ${renderComponent($$result2, "CallOut", $$CallOut, { "purple": "Tech-Led", "point": "Processes and Service", "subtext": "Keep costs down and delivery fast.", "data-astro-cid-ucd2ps2b": true })} ${renderComponent($$result2, "CallOut", $$CallOut, { "purple": "UK-Based", "point": "British Suppliers", "subtext": "Supporting local businesses and tech talent.", "data-astro-cid-ucd2ps2b": true })} ${renderComponent($$result2, "CallOut", $$CallOut, { "purple": "Transparent", "point": "Upfront Costs", "subtext": "Fixed fees, clear briefs and simple pricing.", "data-astro-cid-ucd2ps2b": true })} </div> <ul class="flex w-full max-w-2xl flex-none flex-col items-center gap-4 text-xl" data-astro-cid-ucd2ps2b> <p class="w-full max-w-[75ch]" data-astro-cid-ucd2ps2b>Our tech is:</p> <li class="w-full max-w-[70ch] pl-4" data-astro-cid-ucd2ps2b> <span class="font-bold" data-astro-cid-ucd2ps2b>hand-coded</span> i.e. no wordpress or bloated
          frameworks
<span class="font-bold" data-astro-cid-ucd2ps2b>for speed and performance</span> to optimise your
          page ranking and SEO - getting you in front of <span class="font-bold" data-astro-cid-ucd2ps2b>
more eyeballs
</span> </li> <li class="max-w-[75ch] pl-4" data-astro-cid-ucd2ps2b> <span class="font-bold" data-astro-cid-ucd2ps2b>integrated</span> tying together all your online
          profiles
<span class="font-bold" data-astro-cid-ucd2ps2b>and</span> your core business processes (like customer
          quotes or your accounting tools) - to <span class="font-bold" data-astro-cid-ucd2ps2b>
save you time and reduce complexity
</span> </li> <li class="max-w-[75ch] pl-4" data-astro-cid-ucd2ps2b> <span class="font-bold" data-astro-cid-ucd2ps2b>comprehensively managed</span>; we handle
          everything behind the scenes so you can <span class="font-bold" data-astro-cid-ucd2ps2b>set it and forget it</span> and focus on serving your customers <span class="font-bold" data-astro-cid-ucd2ps2b>tech-stress free</span> </li> </ul> <div class="mt-16 flex flex-col justify-center gap-3 min-[500px]:flex-row" data-astro-cid-ucd2ps2b> ${renderComponent($$result2, "Button", $$Button, { "href": "/quoter", "icon": "ph:chat", "text": "Get a Quote", "data-astro-cid-ucd2ps2b": true })} ${renderComponent($$result2, "Button", $$Button, { "href": "#webDev", "icon": "mdi:arrow-down", "text": "How We Can Help", "buttonColor": "color-secondary", "data-astro-cid-ucd2ps2b": true })} </div> </div> </section> <section class="webdev blue px-4 py-8" data-astro-cid-ucd2ps2b> <div class="container flex flex-col items-center py-32 sm:max-w-screen-xl" data-astro-cid-ucd2ps2b> <div class="max-w-[75ch]" data-astro-cid-ucd2ps2b> <h2 class="mb-2 w-full text-lg font-bold" data-astro-cid-ucd2ps2b> ${renderComponent($$result2, "Heading", $$Heading, { "id": "webDev", "text": "WEBSITE & APP DEVELOPMENT", "data-astro-cid-ucd2ps2b": true })} </h2> <p class="mb-8 w-full text-4xl font-bold" data-astro-cid-ucd2ps2b>
Translate ideas into technology.
</p> <p class="mb-8 w-full text-xl" data-astro-cid-ucd2ps2b>
Got a great idea but can't code? Frustrated by the cost and complexity
          of building and maintaining a website?
</p> </div> <div class="mb-8 grid max-w-sm grid-cols-1 content-center gap-6 sm:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3" data-astro-cid-ucd2ps2b> ${renderComponent($$result2, "Feature", $$Feature, { "icon": "ic:baseline-web", "title": "eCommerce & Digital Stores", "data-astro-cid-ucd2ps2b": true }, { "default": ($$result3) => renderTemplate`
Your digital shopfront, products and payment with Shopify
<span class="text-xl font-bold" data-astro-cid-ucd2ps2b>From £9,000 (ex.VAT)</span> ${renderComponent($$result3, "Button", $$Button, { "icon": "mdi:arrow-right", "href": "/pricing", "text": "Get Booked In", "data-astro-cid-ucd2ps2b": true })} ` })} ${renderComponent($$result2, "Feature", $$Feature, { "icon": "ic:baseline-web", "title": "Website Build or Refresh", "data-astro-cid-ucd2ps2b": true }, { "default": ($$result3) => renderTemplate`
Valuable, secure and modern custom-coded business websites
<span class="text-xl font-bold" data-astro-cid-ucd2ps2b>From £4,500 (ex.VAT)</span> ${renderComponent($$result3, "Button", $$Button, { "icon": "mdi:arrow-right", "href": "/pricing", "text": "Get Booked In", "data-astro-cid-ucd2ps2b": true })} ` })} ${renderComponent($$result2, "Feature", $$Feature, { "icon": "ic:baseline-web", "title": "Business Apps & Prototypes", "data-astro-cid-ucd2ps2b": true }, { "default": ($$result3) => renderTemplate`
Bespoke interal apps, customer dashboards or a mock up of your next
          venture for a pitch or research
<span class="text-xl font-bold" data-astro-cid-ucd2ps2b>From £6,000 (ex.VAT)</span> ${renderComponent($$result3, "Button", $$Button, { "icon": "mdi:arrow-right", "href": "/pricing", "text": "Get Booked In", "data-astro-cid-ucd2ps2b": true })} ` })} </div> ${renderComponent($$result2, "Button", $$Button, { "icon": "mdi:arrow-down", "href": "#ongoing", "text": "Support Services", "buttonColor": "color-secondary", "data-astro-cid-ucd2ps2b": true })} </div> </section> <section class="ongoing gold px-4 py-8" data-astro-cid-ucd2ps2b> <div class="container flex flex-col items-center py-32 sm:max-w-screen-xl" data-astro-cid-ucd2ps2b> <div class="max-w-[75ch]" data-astro-cid-ucd2ps2b> <h2 class="mb-2 w-full text-lg font-bold" data-astro-cid-ucd2ps2b> ${renderComponent($$result2, "Heading", $$Heading, { "id": "ongoing", "text": "ONGOING SUPPORT", "data-astro-cid-ucd2ps2b": true })} </h2> <p class="mb-8 w-full text-4xl font-bold" data-astro-cid-ucd2ps2b>
Let us take care of the admin.
</p> <p class="mb-8 w-full text-xl" data-astro-cid-ucd2ps2b>
Guaranteed, flexible access to expertise, ongoing managed support
          functions or routine maintenance, that already knows your business.
          Let us manage the admin of running your business, so you don't need to
          do it yourself or hire externally.
</p> </div> <div class="mb-8 grid max-w-sm grid-cols-1 content-center gap-6 sm:max-w-screen-lg sm:grid-cols-2" data-astro-cid-ucd2ps2b> ${renderComponent($$result2, "Feature", $$Feature, { "icon": "ic:baseline-web", "title": "Web Hosting & Domain Maintenance", "data-astro-cid-ucd2ps2b": true }, { "default": ($$result3) => renderTemplate`
Let us cover the basics of keeping your website up and running,
<span class="text-xl font-bold" data-astro-cid-ucd2ps2b>From £75 per month (ex.VAT)</span> ${renderComponent($$result3, "Button", $$Button, { "icon": "mdi:arrow-right", "href": "/pricing", "text": "Get Booked In", "data-astro-cid-ucd2ps2b": true })} ` })} ${renderComponent($$result2, "Feature", $$Feature, { "icon": "ic:baseline-web", "title": "Business Technology Essentials", "data-astro-cid-ucd2ps2b": true }, { "default": ($$result3) => renderTemplate`
Everything you need for a professional, secure web presence and
          customer experience;
<span class="text-xl font-bold" data-astro-cid-ucd2ps2b>From £150 per month (ex.VAT)</span> ${renderComponent($$result3, "Button", $$Button, { "icon": "mdi:arrow-right", "href": "/pricing", "text": "Get Booked In", "data-astro-cid-ucd2ps2b": true })} ` })} <!-- <Feature icon="ic:baseline-web" title="Business Apps & Prototypes">
          from £5,000 (ex.VAT).
          <Button
            icon="mdi:arrow-right"
            href="/"
            text="Get Booked In"
            buttonColor="color-secondary"
          />
        </Feature> --> </div> ${renderComponent($$result2, "Button", $$Button, { "icon": "mdi:arrow-down", "href": "#systemIntegration", "text": "Connecting Tech", "buttonColor": "color-secondary", "data-astro-cid-ucd2ps2b": true })} </div> </section> <section class="systemInt mint px-4 py-8" data-astro-cid-ucd2ps2b> <div class="container flex flex-col items-center py-32 sm:max-w-screen-xl" data-astro-cid-ucd2ps2b> <div class="max-w-[75ch]" data-astro-cid-ucd2ps2b> <h2 class="mb-2 w-full text-lg font-bold" data-astro-cid-ucd2ps2b> ${renderComponent($$result2, "Heading", $$Heading, { "id": "systemIntegration", "text": "SYSTEM INTEGRATION", "data-astro-cid-ucd2ps2b": true })} </h2> <p class="mb-8 w-full text-4xl font-bold" data-astro-cid-ucd2ps2b>
Reduce the burdon of running your business.
</p> <p class="mb-8 w-full text-xl" data-astro-cid-ucd2ps2b>
You should be able to trust technology to reduce the cost and
          complexity of running your business, not increase it.
</p> </div> <div class="mb-8 flex max-w-md place-self-center" data-astro-cid-ucd2ps2b> ${renderComponent($$result2, "Feature", $$Feature, { "icon": "ic:baseline-web", "title": "Let's get connected", "data-astro-cid-ucd2ps2b": true }, { "default": ($$result3) => renderTemplate`
Automate, streamline or reconfigure your processes and systems to
          simplify, secure or fix ineffective tech.
<span class="font-bold" data-astro-cid-ucd2ps2b>Priced case-by-case</span> ${renderComponent($$result3, "Button", $$Button, { "icon": "mdi:comment-question-outline", "href": "/contact", "text": "Enquire", "buttonColor": "color-primary", "data-astro-cid-ucd2ps2b": true })} ` })} </div> ${renderComponent($$result2, "Button", $$Button, { "icon": "mdi:arrow-down", "href": "#businessAnalysis", "text": "Data Insights", "buttonColor": "color-secondary", "data-astro-cid-ucd2ps2b": true })} </div> </section> <section class="business purple px-4 py-8" data-astro-cid-ucd2ps2b> <div class="container items-center py-32 sm:max-w-screen-xl" data-astro-cid-ucd2ps2b> <div class="max-w-[75ch]" data-astro-cid-ucd2ps2b> <h2 class="mb-2 w-full text-lg font-bold" data-astro-cid-ucd2ps2b> ${renderComponent($$result2, "Heading", $$Heading, { "id": "businessAnalysis", "text": "BUSINESS ANALYSIS", "data-astro-cid-ucd2ps2b": true })} </h2> <p class="mb-8 text-4xl font-bold" data-astro-cid-ucd2ps2b>
Understand the dynamics of your business.
</p> <p class="mb-8 text-xl" data-astro-cid-ucd2ps2b>
Assess performance, manage risk and identify opportunities to improve
          processes and systems.
</p> </div> <div class="mb-8 flex max-w-md place-self-center" data-astro-cid-ucd2ps2b> ${renderComponent($$result2, "Feature", $$Feature, { "icon": "ic:baseline-web", "title": "Health Check", "data-astro-cid-ucd2ps2b": true }, { "default": ($$result3) => renderTemplate`
Understand what's working, what's not and what could be next for your
          business.
<span class="font-bold" data-astro-cid-ucd2ps2b>Priced case-by-case</span> ${renderComponent($$result3, "Button", $$Button, { "icon": "mdi:comment-question-outline", "href": "/contact", "text": "Enquire", "buttonColor": "color-primary", "data-astro-cid-ucd2ps2b": true })} ` })} </div> ${renderComponent($$result2, "Button", $$Button, { "icon": "mdi:arrow-right", "href": "/pricing", "text": "Our Pricing", "buttonColor": "color-secondary", "data-astro-cid-ucd2ps2b": true })} </div> </section> ${renderComponent($$result2, "CallToAction", $$CallToAction, { "data-astro-cid-ucd2ps2b": true })} ` })}  `;
}, "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/services.astro", void 0);

const $$file = "/Users/chappers/Developer/projects/peculiar/peculiar-astro/src/pages/services.astro";
const $$url = "/services";

const services = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Services,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _404, contact, cookies, estimate, index, pricing, privacy, quoter, services, terms };
