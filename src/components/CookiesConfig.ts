import type { CookieConsentConfig } from "vanilla-cookieconsent";

export const config: CookieConsentConfig = {
  onConsent: function () {},
  autoShow: false,
  mode: "opt-in",
  cookie: {
    name: "cc_cookie",
    domain: window.location.hostname,
    path: "/",
    expiresAfterDays: 182,
    sameSite: "Lax",
    // useLocalStorage: true,
  },
  guiOptions: {
    consentModal: {
      layout: "box inline",
      position: "bottom right",
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    functionality: {},
    analytics: {
      autoClear: {
        //Clear the '_gid' cookie and all the other cookies starting with '_ga' when the user opts-out of the "analytics" category.
        cookies: [
          {
            name: /^_ga/, // regex: match all cookies starting with '_ga' or _gid
          },
          {
            name: "_gid", // string: exact cookie name
          },
        ],
      },
      services: {
        ga4: {
          label:
            '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4</a>',
          onAccept: () => {
            console.log("ga4 accepted");
            // TODO: load ga4
          },
          onReject: () => {
            console.log("ga4 rejected");
          },
          cookies: [
            {
              name: /^(_ga|_gid)/,
            },
          ],
        },
        // another: {
        //   label: "Another one (dummy)",
        // },
      },
    },
    ads: {},
  },
  language: {
    default: "en",
    autoDetect: "browser",
    translations: {
      en: {
        consentModal: {
          title: "We use cookies",
          description:
            "We use some essential cookies to make this website work. We'd like to set additional cookies to understand how you use our site, remember your preferences and improve our services.",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage Individual preferences",
          footer: `<a href="/policies/cookies" target="_blank">Full Cookie Notice</a>
                     <a href="/policies/privacy" target="_blank">Privacy Policy</a>`,
        },
        preferencesModal: {
          title: "Manage cookie preferences",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Accept current selection",
          closeIconLabel: "Close modal",
          serviceCounterLabel: "Service|Services",
          sections: [
            {
              title: "Your Privacy Choices",
              description: `In this panel you can express some preferences related to the processing of your personal information. You may review and change expressed choices at any time by resurfacing this panel via the provided button displayed in the full <a href="/policies/cookies" class="cc-link">Cookie Notice</a>. To deny your consent to the specific processing activities described below, switch the toggles to off or use the “Reject all” button and confirm you want to save your choices.`,
            },
            {
              title: "Strictly Necessary",
              description:
                "These cookies are essential for the proper functioning of the website and cannot be disabled as the website would not work without them.",
              linkedCategory: "necessary",
            },
            {
              title: "Performance and Analytics",
              description:
                "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All of the data is anonymised and cannot be used to identify you.",
              linkedCategory: "analytics",
              // cookieTable: {
              //   caption: "List of cookies",
              //   headers: {
              //     name: "Name",
              //     description: "Description",
              //     duration: "Duration",
              //   },
              //   body: [
              //     {
              //       name: "_ga",
              //       description:
              //         "The _ga cookie, installed by Google Analytics, calculates visitor, session and campaign data and also keeps track of site usage for the site's analytics report. The cookie stores information anonymously and assigns a randomly generated number to recognize unique visitors.",
              //       duration: "cookie-duration",
              //     },
              //     {
              //       name: "_gid",
              //       description:
              //         "Installed by Google Analytics, _gid cookie stores information on how visitors use a website, while also creating an analytics report of the website's performance. Some of the data that are collected include the number of visitors, their source, and the pages they visit anonymously.",
              //       duration: "cookie-duration-2",
              //     },
              //   ],
              // },
            },
            {
              title: "Targeting and Advertising",
              description:
                "These cookies are used to make advertising messages more relevant to you and your interests.",
              linkedCategory: "ads",
            },
            {
              title: "More information",
              description:
                'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="/contact">contact us</a>.',
            },
          ],
        },
      },
    },
  },
};
