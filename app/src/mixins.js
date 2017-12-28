export const RgbColorMixin = {
  methods: {
    rgbToColor(rgb, transparency = 1) {
      return `rgba(${rgb.join(",")},${transparency})`;
    },
    blackOrWhite(rgb) {
      const [red, green, blue] = rgb;
      // const sum = rgb.reduce((sum, current) => {
      //   sum += current;
      //   return sum;
      // });
      return (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? "#000000" : "#ffffff";
    }
  }
};
