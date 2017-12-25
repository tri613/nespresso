export const camera = {
  video: null,
  stream: null,
  canvas: null,
  width: 320,
  height: 480,
  _context: null,
  init(videoElement, canvasElement) {
    if (!("mediaDevices" in navigator)) {
      navigator.mediaDevices = {};
    }

    if (!("getUserMedia" in navigator.mediaDevices)) {
      navigator.mediaDevices.getUserMedia = function(constraints) {
        const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(new Error("getUserMedia is not implemented!"));
        }

        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    this.video = videoElement;
    this.canvas = canvasElement;

    this.video.addEventListener("canplay", () => this.initSize());
  },
  getCanvasContext() {
    if (!this._context) {
      this._context = this.canvas.getContext("2d");
    }
    return this._context;
  },
  initSize() {
    this.width = window.innerWidth;
    this.height = this.video.videoHeight / (this.video.videoWidth / this.width);

    this.video.setAttribute("width", this.width);
    this.video.setAttribute("height", this.height);
    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);
  },
  startCapture() {
    return navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.video.srcObject = stream;
      });
  },
  stopCapture() {
    if (this.video) {
      this.canvas.getContext("2d").drawImage(this.video, 0, 0, this.width, this.height);
      this.video.srcObject.getVideoTracks().forEach(track => track.stop());
    }
  }
};
