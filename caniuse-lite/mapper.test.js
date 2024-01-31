import { describe, expect, it } from 'vitest';
import { canIUseLiteMapper } from './mapper.js';

describe('canIUseLiteMapper', () => {
  describe('#getBrowsers', () => {
    it('should map browsers', () => {
      expect(
        canIUseLiteMapper.getBrowsers({
          firefox: {
            usage_global: {
              62: 0,
              63: 0,
              97: 0,
              98: 0,
              118: 0.10881,
              119: 0.27807,
              120: 1.24124,
              121: 0.41912,
              122: 0,
            },
            prefix: 'moz',
            versions: ['62', '63', '97', '98', '118', '119', '120', '121', '122'],
            browser: 'Firefox',
            release_date: {
              62: 1536105600,
              63: 1540252800,
              97: 1644364800,
              98: 1646697600,
              118: 1695686400,
              119: 1698105600,
              120: 1700524800,
              121: 1702944000,
              122: null,
            },
          },
          chrome: {
            usage_global: {
              36: 0,
              37: 0,
              66: 0.03224,
              67: 0.00403,
              104: 0.06851,
              105: 0.08463,
              119: 8.53554,
              120: 10.1596,
              121: 0.01612,
              122: 0.01209,
            },
            prefix: 'webkit',
            versions: ['36', '37', '66', '67', '104', '105', '119', '120', '121', '122'],
            browser: 'Chrome',
            release_date: {
              36: 1405468800,
              37: 1409011200,
              66: 1523923200,
              67: 1527552000,
              104: 1659398400,
              105: 1661817600,
              119: 1698710400,
              120: 1701993600,
              121: null,
              122: null,
            },
          },
        }),
      ).toEqual({
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
      });
    });

    it('should sort releases by timestamp and end with null if not available', () => {
      expect(
        canIUseLiteMapper.getBrowsers({
          fake_browser: {
            usage_global: { 3: 0, 1: 0, 4: 0, 2: 0 },
            prefix: 'moz',
            versions: ['3', '1', '4', '2'],
            browser: 'Fake Browser',
            release_date: {
              3: 3000,
              1: 1000,
              4: null,
              2: 2000,
            },
          },
        }),
      ).toEqual({
        fake_browser: {
          id: 'fake_browser',
          name: 'Fake Browser',
          releases: [
            { version: '1', releasedAt: 1000000 },
            { version: '2', releasedAt: 2000000 },
            { version: '3', releasedAt: 3000000 },
            { version: '4', releasedAt: null },
          ],
        },
      });
    });
  });

  describe('#getFeatures', () => {
    it('should map features', () => {
      expect(
        canIUseLiteMapper.getFeatures({
          'css-has': {
            status: 'wd',
            title: ':has() CSS relational pseudo-class',
            shown: true,
            stats: {
              firefox: {
                62: 'n',
                63: 'n',
                97: 'n',
                98: 'n',
                118: 'n d #2',
                119: 'n d #2',
                120: 'n d #2',
                121: 'y',
                122: 'y',
              },
              chrome: {
                36: 'n',
                37: 'n',
                66: 'n',
                67: 'n',
                104: 'n d #1',
                105: 'y',
                119: 'y',
                120: 'y',
                121: 'y',
                122: 'y',
              },
            },
          },
          'custom-elementsv1': {
            status: 'ls',
            title: 'Custom Elements (V1)',
            shown: true,
            stats: {
              firefox: {
                62: 'p d #1 #3',
                63: 'y',
                97: 'y',
                98: 'y',
                118: 'y',
                119: 'y',
                120: 'y',
                121: 'y',
                122: 'y',
              },
              chrome: {
                36: 'n',
                37: 'n',
                66: 'a #1',
                67: 'y',
                104: 'y',
                105: 'y',
                119: 'y',
                120: 'y',
                121: 'y',
                122: 'y',
              },
            },
          },
          dialog: {
            status: 'ls',
            title: 'Dialog element',
            shown: true,
            stats: {
              firefox: {
                62: 'n d #1',
                63: 'n d #1',
                97: 'n d #1 #4',
                98: 'y',
                118: 'y',
                119: 'y',
                120: 'y',
                121: 'y',
                122: 'y',
              },
              chrome: {
                36: 'n d #2',
                37: 'y',
                66: 'y',
                67: 'y',
                104: 'y',
                105: 'y',
                119: 'y',
                120: 'y',
                121: 'y',
                122: 'y',
              },
            },
          },
        }),
      ).toEqual({
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
      });
    });

    it('should exclude non-ready browsers', () => {
      expect(
        canIUseLiteMapper.getFeatures({
          'da-future': {
            status: 'wd',
            title: 'Da Future',
            shown: false,
            stats: {
              firefox: {
                62: 'n',
                63: 'n',
                97: 'n',
                98: 'n',
                118: 'n',
                119: 'n',
                120: 'n',
                121: 'n',
                122: 'n',
              },
              chrome: {
                36: 'n',
                37: 'n',
                66: 'n',
                67: 'n',
                104: 'n',
                105: 'n',
                119: 'n',
                120: 'n',
                121: 'n',
                122: 'n',
              },
            },
          },
        }),
      ).toEqual({
        'da-future': {
          id: 'da-future',
          name: 'Da Future',
          debut: {},
        },
      });
    });
  });
});
