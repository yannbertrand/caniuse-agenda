import { canIUseLite } from './caniuse-lite/index.js';
import { featureReleaseCalendar } from './release-calendar.js';

const canIUseLiteData = canIUseLite.getAll();
const agenda = featureReleaseCalendar.getYearReleases(canIUseLiteData);

export { agenda };
