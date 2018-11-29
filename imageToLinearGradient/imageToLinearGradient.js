export default function imageToLinearGradient(url, dom, accuracy = false) {
  var canvas = document.createElement("canvas")
  var ctx = canvas.getContext('2d')
  var img = new Image()
  img.onload = function () {
      var w = img.width,
          h = img.height
      canvas.setAttribute('width', w);
      canvas.setAttribute('height', h);
      ctx.drawImage(img, 0, 0)
      var { data } = ctx.getImageData(0, 0, w, h),
          r = 0,
          g = 0,
          b = 0,
          i = 0,
          j,
          dis = accuracy ? 1 : 10,
          len = w * h
      for (; i < len; i += dis) {
          r += data[0 + (j = 4 * i)]
          g += data[j + 1]
          b += data[j + 2]
      }
      r = r / (len / 10)
      g = g / (len / 10)
      b = b / (len / 10)

      var [h, s, l] = rgbToHsl(r, g, b)
  
      dom.style.background = `linear-gradient(hsl(${360 * h}, ${100 * s}%, ${Math.min(100 * l, 30)}%), hsl(${360 * h}, ${100 * s}%, 3%) 85%)`
  }
  img.src = url
}

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
      h = s = 0;
  } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }
  return [h, s, l];
}
