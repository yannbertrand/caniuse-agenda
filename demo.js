import * as lite from 'caniuse-lite';

const firefox = getBrowser('firefox');
const chrome = getBrowser('chrome');
const safari = getBrowser('safari');

const cssHasFeature = getFeature('css-has');
const cssHasFeatureOnFirefox120 = isSupported(cssHasFeature, firefox, '120');
const cssHasFeatureOnFirefox121 = isSupported(cssHasFeature, firefox, '121');

console.log(cssHasFeatureOnFirefox120.log);
console.log(cssHasFeatureOnFirefox121.log);

console.log(getFeatureDebut(cssHasFeature, firefox).log);
console.log(getFeatureDebut(cssHasFeature, chrome).log);
console.log(getFeatureDebut(cssHasFeature, safari).log);

function getBrowser(browserName) {
  return {
    ...lite.agents[browserName],
    shortName: browserName,
  };
}

function getFeature(featureName) {
  return {
    ...lite.feature(lite.features[featureName]),
    shortName: featureName,
  };
}

function getFeatureBrowserSupport(feature, browser) {
  return feature.stats[browser.shortName];
}

function getFeatureBrowserVersionSupport(feature, browser, version) {
  return feature.stats[browser.shortName][version];
}

function isSupported(feature, browser, version) {
  const result = getFeatureBrowserVersionSupport(feature, browser, version) === 'y';

  return {
    result,
    log: `${feature.title} is${result ? '' : ' not'} supported on ${browser.browser} ${version}`,
  };
}

console.log('=========');

const customElementsFeature = getFeature('custom-elementsv1');
const dialogFeature = getFeature('dialog');

console.log(dialogFeature);

const customElementsDebutOnFirefox = getFeatureDebut(customElementsFeature, firefox);
const customElementsDebutOnSafari = getFeatureDebut(customElementsFeature, safari);
const customElementsDebutOnChrome = getFeatureDebut(customElementsFeature, chrome);

console.log(customElementsDebutOnFirefox.log);
console.log(customElementsDebutOnSafari.log);
console.log(customElementsDebutOnChrome.log);

const dialogDebutOnFirefox = getFeatureDebut(dialogFeature, firefox);
const dialogDebutOnSafari = getFeatureDebut(dialogFeature, safari);
const dialogDebutOnChrome = getFeatureDebut(dialogFeature, chrome);

console.log(dialogDebutOnFirefox.log);
console.log(dialogDebutOnSafari.log);
console.log(dialogDebutOnChrome.log);

function getBrowserVersionReleaseTimestamp(browser, version) {
  const releaseDateTimestamp = browser.release_date[version];
  if (releaseDateTimestamp !== null) {
    return releaseDateTimestamp;
  }
  return null;
}

function getBrowserVersionReleaseDate(browser, version) {
  const releaseDateTimestamp = browser.release_date[version];
  if (releaseDateTimestamp !== null) {
    const result = new Date(releaseDateTimestamp * 1000);
    if (result.toString() === 'Invalid Date') {
      console.log(releaseDateTimestamp);
    }
    return result;
  }
  return null;
}

function getFeatureDebut(feature, browser) {
  const featureBrowserVersionsSupport = Object.entries(feature.stats[browser.shortName]);

  const result = featureBrowserVersionsSupport.find(([version, support]) => support === 'y');

  if (result !== undefined) {
    const browserVersion = result[0];
    const dateDebut = getBrowserVersionReleaseDate(browser, browserVersion);

    return {
      result: browserVersion,
      log: `${feature.title} has appeared on ${browser.browser} ${browserVersion} (${
        dateDebut * 1000 ?? 'unknown date'
      })`,
    };
  }

  return {
    result: null,
    log: `${feature.title} is not yet ready on ${browser.browser}`,
  };
}

console.log('========');

function getAllFeatures() {
  return Object.keys(lite.features).map((featureName) => getFeature(featureName));
}

function getShownFeatures() {
  return getAllFeatures().filter((feature) => feature.shown);
}

function getHiddenFeatures() {
  return getAllFeatures().filter((feature) => !feature.shown);
}

const features = getShownFeatures();
const browsers = [getBrowser('chrome'), getBrowser('firefox')];

const browserDebutMappedPerFeature = getBrowserDebutMappedPerFeature(browsers, features);

// console.log(browserDebutMappedPerFeature.at(-1).features.values());

const expectedResult = [
  { date: '01/02/2024', features: { featureA: ['firefox'], featureB: ['firefox'] } },
  { date: '02/03/2024', features: { featureC: ['chrome'] } },
];

function getBrowserDebutMappedPerFeature(browsers, features) {
  const result = [];

  for (const feature of features) {
    for (const browser of browsers) {
      const featureDebut = getFeatureDebut(feature, browser);

      if (featureDebut.result !== null) {
        const featureDebutDate = getBrowserVersionReleaseTimestamp(browser, featureDebut.result);

        if (featureDebutDate !== null) {
          if (result.find(({ date }) => date === featureDebutDate) === undefined) {
            result.push({ date: featureDebutDate, features: new Map() });
          }

          const currentResult = result.find(({ date }) => date === featureDebutDate);
          if (!currentResult.features.has(feature)) {
            currentResult.features.set(feature, []);
          }

          currentResult.features.get(feature).push(browser);
        }
      }
    }
  }

  const sortedResult = result.sort((a, b) => a.date - b.date);

  const filteredResult = sortedResult;

  return filteredResult;
}

import { canIUseLite } from './caniuse-lite/index.js';
import { featureReleaseCalendar } from './release-calendar.js';

const canIUseLiteData = canIUseLite.getAll();
const agenda = featureReleaseCalendar.getYearReleases(canIUseLiteData);

console.log(agenda[Object.keys(agenda).at(-3)]);
console.log(agenda[Object.keys(agenda).at(-2)]);
console.log(agenda[Object.keys(agenda).at(-1)]);
