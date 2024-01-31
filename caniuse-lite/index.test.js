import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest';
import { canIUseLite } from './index';

describe('canIUseLite', () => {
  beforeEach(() => {
    vi.mock('./fetcher.js', () => ({
      canIUseLiteFetcher: {
        fetchAgents: vi.fn().mockImplementationOnce(() => 'caniuse-lite-agents'),
        fetchFeatures: vi.fn().mockImplementationOnce(() => 'caniuse-lite-features'),
      },
    }));

    vi.mock('./mapper.js', () => ({
      canIUseLiteMapper: {
        getBrowsers: vi.fn().mockImplementationOnce(() => 'browsers'),
        getFeatures: vi.fn().mockImplementationOnce(() => 'features'),
      },
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('#getAll', () => {
    it('should get browsers and features', () => {
      expect(canIUseLite.getAll()).toEqual({ browsers: 'browsers', features: 'features' });
    });
  });
});
