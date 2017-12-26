import "@/../node_modules/tracking/build/tracking-min";
import store from "@/store";
import uniqBy from "lodash/uniqby";

window._tracker = null;

function isColorBetween(colorRgb, coffeeRgb) {
  const [r, g, b] = colorRgb;
  const [cr, cg, cb] = coffeeRgb;
  const dx = r - cr;
  const dy = g - cg;
  const dz = b - cb;

  // if (b - g >= 100 && r - g >= 60) {
  //   return true;
  // }
  return dx * dx + dy * dy + dz * dz < 1800;
}

function registerColors(coffees) {
  coffees.forEach(coffee => {
    tracking.ColorTracker.registerColor(
      coffee.name,
      (r, g, b) => isColorBetween([r, g, b], coffee.color.rgb));
  });
}

export function createTrackingTask(target, callback, options = {}) {
  const coffees = store.state.coffees;

  if (!_tracker) {
    registerColors(coffees);
    _tracker = new tracking.ColorTracker(coffees.map(c => c.name));
    _tracker.setMinDimension(30);

    _tracker.on("track", event => {
      if (event.data.length) {
        const eventResult = uniqBy(event.data, "color")
          .map(({ color }) => coffees.find(coffee => coffee.name === color));
        callback(eventResult);
      } else {
        callback([]);
      }
    });
  }

  return tracking.track(target, _tracker);
}
