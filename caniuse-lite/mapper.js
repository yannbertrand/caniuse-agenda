/**
 * @typedef {Object} BrowserRelease
 * @property {string} version - Examples: '121', '17.2', '15.2-15.3'
 * @property {number|null} releasedAt - Timestamp ready to use in a new Date object
 */

/**
 * @typedef {Object} Browser
 * @property {string} id - Unique identifier for browser
 * @property {string} name - Display name
 * @property {BrowserRelease[]} releases - Sorted list of browser releases
 */

export const canIUseLiteMapper = {
  /**
   * @param {*} canIUseLiteAgents
   * @returns {{ie: Browser, edge: Browser, firefox: Browser, chrome: Browser, safari: Browser, opera: Browser,ios_saf: Browser, op_mini: Browser, android: Browser,bb: Browser, op_mob: Browser,  and_chr: Browser,and_ff: Browser,  ie_mob: Browser,  and_uc: Browser,samsung: Browser, and_qq: Browser, baidu: Browser,kaios: Browser}} browsers
   */
  getBrowsers(canIUseLiteAgents) {
    const browsersObject = {};

    for (const canIUseLiteAgentName in canIUseLiteAgents) {
      const canIUseLiteAgent = canIUseLiteAgents[canIUseLiteAgentName];
      browsersObject[canIUseLiteAgentName] = {
        id: canIUseLiteAgentName,
        name: canIUseLiteAgent.browser,
        releases: Object.entries(canIUseLiteAgent.release_date).map(
          ([canIUseLiteAgentVersion, canIUseLiteAgentReleaseTimestamp]) => ({
            version: canIUseLiteAgentVersion,
            releasedAt: canIUseLiteAgentReleaseTimestamp !== null ? canIUseLiteAgentReleaseTimestamp * 1_000 : null,
          }),
        ),
      };
    }

    return browsersObject;
  },

  getFeatures(canIUseLiteFeatures) {
    const featuresObject = {};

    for (const canIUseLiteFeatureName in canIUseLiteFeatures) {
      const canIUseLiteFeature = canIUseLiteFeatures[canIUseLiteFeatureName];

      const browserSupportsArray = Object.entries(canIUseLiteFeature.stats).map(
        ([canIUseLiteBrowserName, canIUseLiteBrowserVersionsSupport]) => {
          const firstCanIUseLiteBrowserVersionSupport = Object.entries(canIUseLiteBrowserVersionsSupport).find(
            ([version, support]) => support === 'y',
          );

          if (firstCanIUseLiteBrowserVersionSupport !== undefined) {
            return {
              browserName: canIUseLiteBrowserName,
              browserVersion: firstCanIUseLiteBrowserVersionSupport[0],
            };
          }

          return null;
        },
      );

      const browserSupportsObject = {};
      for (const browserSupport of browserSupportsArray) {
        if (browserSupport !== null) {
          browserSupportsObject[browserSupport.browserName] = browserSupport.browserVersion;
        }
      }

      featuresObject[canIUseLiteFeatureName] = {
        id: canIUseLiteFeatureName,
        name: canIUseLiteFeature.title,
        debut: browserSupportsObject,
      };
    }

    return featuresObject;
  },
};
