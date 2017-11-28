export const camera = {
	initializeMedia() {
		if (!('mediaDevices' in navigator)) {
			navigator.mediaDevices = {};
		}
	
		if (!('getUserMedia' in navigator.mediaDevices)) {
			navigator.mediaDevices.getUserMedia = function (constraints) {
				var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	
				if (!getUserMedia) {
					return Promise.reject(new Error('getUserMedia is not implemented!'));
				}
	
				return new Promise(function (resolve, reject) {
					getUserMedia.call(navigator, constraints, resolve, reject);
				});
			}
		}
	},
	startCapture(videoElement) {
		this.initializeMedia();
	
		return navigator.mediaDevices.getUserMedia({ video: true })
			.then(stream => {
				videoElement.src = URL.createObjectURL(stream);
				videoElement.play();
			});
	}
};

export const track = {
	tracker: null,
	task: null,
	init() {
		this.tracker = new tracking.ColorTracker();
		this.tracker.setMinDimension(5);
		
		this.task = tracking.track(`#${this.$refs.video.id}`, this.tracker);
		this.task.stop();
	},
	registerColors() {
		tracking.ColorTracker.registerColor('')
	}
}

