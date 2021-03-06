import map from "lodash/map";
import "@/../node_modules/node-vibrant/dist/vibrant.worker.js";
// import * as Vibrant from "node-vibrant/lib/bundle.worker.js";

import store from "@/store";
import { isColorBetween } from "./shared";

export function scan(coffees, imageSrc) {
  return Vibrant.from(imageSrc)
    .useQuantizer(Vibrant.Quantizer.WebWorker)
    .getPalette()
    .then(plaette => {
      return map(plaette, (value, key) => {
        return value ? value.getRgb() : null;
      }).filter(value => !!value);
    })
    .then(colors => {
      const table = {};

      coffees.forEach(coffee =>
        colors.forEach(color => {
          const diff = Vibrant.Util.rgbDiff(color, coffee.color.rgb);
          table[coffee.name] = Math.min(diff, table[coffee.name]) || 100;
        })
      );

      const result = map(table, (value, key) => {
        const coffee = coffees.find(row => row.name === key);
        return { ...coffee, diff: value };
      })
        .sort((a, b) => a.diff - b.diff);

      return { colors, result };
    });
}
