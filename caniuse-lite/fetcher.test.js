import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest';
import { canIUseLiteFetcher } from './fetcher.js';

describe('canIUseLiteFetcher', () => {
  beforeEach(() => {
    vi.mock('caniuse-lite', () => {
      const lite = {
        agents: 'agents',
        features: { featureA: 'Feature A' },
        feature: vi.fn().mockImplementationOnce(() => 'hydratedFeatureA'),
      };
      return lite;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('#fetchAgents', () => {
    it('should call caniuse-lite agents', () => {
      expect(canIUseLiteFetcher.fetchAgents()).toBe('agents');
    });
  });

  describe('#fetchFeatures', () => {
    it('should call caniuse-lite features', () => {
      expect(canIUseLiteFetcher.fetchFeatures()).toEqual({ featureA: 'hydratedFeatureA' });
    });
  });
});
