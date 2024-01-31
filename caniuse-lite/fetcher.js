import * as lite from 'caniuse-lite';

export const canIUseLiteFetcher = {
  fetchAgents() {
    return lite.agents;
  },

  fetchFeatures() {
    const features = {};

    for (const featureName in lite.features) {
      features[featureName] = lite.feature(lite.features[featureName]);
    }

    return features;
  },
};
