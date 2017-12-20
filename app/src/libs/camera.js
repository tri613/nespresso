export const camera = {
	video: null,
	stream: null,
	init(videoElement) {
		if (!('mediaDevices' in navigator)) {
			navigator.mediaDevices = {};
		}
	
		if (!('getUserMedia' in navigator.mediaDevices)) {
			navigator.mediaDevices.getUserMedia = function (constraints) {
				var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	
				if (!getUserMedia) {
					return Promise.reject(new Error('getUserMedia is not implemented!'));
				}
	
				return new Promise((resolve, reject) => {
					getUserMedia.call(navigator, constraints, resolve, reject);
				});
			}
		}

		this.setVideo(videoElement);
	},
	setVideo(videoElement) {
		this.video = videoElement;
	},
	startCapture() {
		return navigator.mediaDevices.getUserMedia({ video: true })
			.then(stream => this.video.srcObject = stream);
	},
	stopCapture() {
		if (this.video) {
			this.video.srcObject.getVideoTracks().forEach(track => track.stop());
		}
	}
};
