import { describe, expect, it } from 'vitest';
import { featureReleaseCalendar } from './release-calendar';

// Peut servir si on cherche une feature précise
const sampleFeatures = [
  {
    shortCode: 'css-has',
    title: ':has() CSS relational pseudo-class',
    browserReleases: [
      {
        browser: 'safari',
        browserVersion: '15.4',
        releaseTimestamp: 1647216000000000,
      },
      {
        browser: 'chrome',
        browserVersion: '105',
        releaseTimestamp: 1661817600000000,
      },
      {
        browser: 'firefox',
        browserVersion: '121',
        releaseTimestamp: 1702944000000000,
      },
    ],
  },
  {
    shortCode: 'custom-elementsv1',
    title: 'Custom Elements (V1)',
    browserReleases: [
      {
        browser: 'chrome',
        browserVersion: '67',
        releaseTimestamp: 1527552000000000,
      },
      {
        browser: 'firefox',
        browserVersion: '63',
        releaseTimestamp: 1540252800000000,
      },
    ],
  },
  {
    shortCode: 'dialog',
    title: 'Dialog element',
    browserReleases: [
      {
        browser: 'chrome',
        browserVersion: '37',
        releaseTimestamp: 1409011200000000,
      },
      {
        browser: 'firefox',
        browserVersion: '98',
        releaseTimestamp: 1646697600000000,
      },
      {
        browser: 'safari',
        browserVersion: '15.4',
        releaseTimestamp: 1647216000000000,
      },
    ],
  },
];

// Ordre chronologique de sorties
const browserReleases = [
  {
    releaseTimestamp: 1647216000000000,
    browser: 'safari',
    browserVersion: '15.4',
    features: [
      {
        id: 'dialog',
        title: 'Dialog element',
      },
      {
        id: 'css-has',
        title: ':has() CSS relational pseudo-class',
      },
    ],
  },
  {
    releaseTimestamp: 1702944000000000,
    browser: 'firefox',
    browserVersion: '121',
    features: [
      {
        id: 'css-has',
        title: ':has() CSS relational pseudo-class',
      },
    ],
  },
];

describe('#getReleaseCalendar', () => {
  it('should order features releases per timestamp', () => {
    expect(
      featureReleaseCalendar.getReleaseCalendar({
        browsers: {
          firefox: {
            id: 'firefox',
            name: 'Firefox',
            releases: [
              { version: '62', releasedAt: 1536105600000 },
              { version: '63', releasedAt: 1540252800000 },
              { version: '97', releasedAt: 1644364800000 },
              { version: '98', releasedAt: 1646697600000 },
              { version: '118', releasedAt: 1695686400000 },
              { version: '119', releasedAt: 1698105600000 },
              { version: '120', releasedAt: 1700524800000 },
              { version: '121', releasedAt: 1702944000000 },
              { version: '122', releasedAt: null },
            ],
          },
          chrome: {
            id: 'chrome',
            name: 'Chrome',
            releases: [
              { version: '36', releasedAt: 1405468800000 },
              { version: '37', releasedAt: 1409011200000 },
              { version: '66', releasedAt: 1523923200000 },
              { version: '67', releasedAt: 1527552000000 },
              { version: '104', releasedAt: 1659398400000 },
              { version: '105', releasedAt: 1661817600000 },
              { version: '119', releasedAt: 1698710400000 },
              { version: '120', releasedAt: 1701993600000 },
              { version: '121', releasedAt: null },
              { version: '122', releasedAt: null },
            ],
          },
        },
        features: {
          'css-has': {
            id: 'css-has',
            name: ':has() CSS relational pseudo-class',
            debut: {
              firefox: '121',
              chrome: '105',
            },
          },
          'custom-elementsv1': {
            id: 'custom-elementsv1',
            name: 'Custom Elements (V1)',
            debut: {
              firefox: '63',
              chrome: '67',
            },
          },
          dialog: {
            id: 'dialog',
            name: 'Dialog element',
            debut: {
              firefox: '98',
              chrome: '37',
            },
          },
        },
      }),
    ).toEqual({
      1409011200000: {
        chrome: {
          browser: 'chrome',
          version: '37',
          features: ['dialog'],
        },
        releasedAt: 1409011200000,
      },
      1527552000000: {
        chrome: {
          browser: 'chrome',
          version: '67',
          features: ['custom-elementsv1'],
        },
        releasedAt: 1527552000000,
      },
      1540252800000: {
        firefox: {
          browser: 'firefox',
          version: '63',
          features: ['custom-elementsv1'],
        },
        releasedAt: 1540252800000,
      },
      1646697600000: {
        firefox: {
          browser: 'firefox',
          version: '98',
          features: ['dialog'],
        },
        releasedAt: 1646697600000,
      },
      1661817600000: {
        chrome: {
          browser: 'chrome',
          version: '105',
          features: ['css-has'],
        },
        releasedAt: 1661817600000,
      },
      1702944000000: {
        firefox: {
          browser: 'firefox',
          version: '121',
          features: ['css-has'],
        },
        releasedAt: 1702944000000,
      },
    });
  });
});
