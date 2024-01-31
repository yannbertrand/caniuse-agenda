export const featureReleaseCalendar = {
  getYearReleases({ browsers, features }) {
    const releaseCalendar = this.getReleaseCalendar({ browsers, features });
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const lastYearTimestamp = lastYear.getTime();

    const monthReleases = {};
    for (const release of Object.values(releaseCalendar)) {
      if (release.releasedAt >= lastYearTimestamp) {
        monthReleases[release.releasedAt] = release;
      }
    }

    return monthReleases;
  },

  getMonthReleases({ browsers, features }) {
    const releaseCalendar = this.getReleaseCalendar({ browsers, features });
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthTimestamp = lastMonth.getTime();

    const monthReleases = {};
    for (const release of Object.values(releaseCalendar)) {
      if (release.releasedAt >= lastMonthTimestamp) {
        monthReleases[release.releasedAt] = release;
      }
    }

    return monthReleases;
  },

  getReleaseCalendar({ browsers, features }) {
    const releaseCalendar = {};

    for (const feature of Object.values(features)) {
      for (const browserId in feature.debut) {
        const browser = browsers[browserId];
        const browserVersion = feature.debut[browserId];
        const browserRelease = browser.releases.find(({ version }) => version === browserVersion);

        if (browserRelease.releasedAt === null) {
          continue;
        }

        if (releaseCalendar[browserRelease.releasedAt] === undefined) {
          releaseCalendar[browserRelease.releasedAt] = { releasedAt: browserRelease.releasedAt };
        }

        if (releaseCalendar[browserRelease.releasedAt][browserId] === undefined) {
          releaseCalendar[browserRelease.releasedAt][browserId] = {
            browser: browserId,
            version: browserVersion, // There shouldn't be 2 releases of the same browser at the same time
            features: [],
          };
        }

        releaseCalendar[browserRelease.releasedAt][browserId].features.push(feature.id);
      }
    }

    return sortObjectNumberedKeys(releaseCalendar);
  },
};

function sortObjectNumberedKeys(unorderedObject) {
  return Object.keys(unorderedObject)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .reduce((obj, key) => {
      obj[key] = unorderedObject[key];
      return obj;
    }, {});
}
