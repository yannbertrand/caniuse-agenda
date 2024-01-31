import { canIUseLiteFetcher } from './fetcher.js';
import { canIUseLiteMapper } from './mapper.js';

export const canIUseLite = {
  getAll() {
    const canIUseLiteAgents = canIUseLiteFetcher.fetchAgents();
    const browsers = canIUseLiteMapper.getBrowsers(canIUseLiteAgents);

    const canIUseLiteFeatures = canIUseLiteFetcher.fetchFeatures();
    const features = canIUseLiteMapper.getFeatures(canIUseLiteFeatures);

    return { browsers, features };
  },
};
