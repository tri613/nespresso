import '@/../node_modules/tracking/build/tracking-min';

function initializeMedia() {
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
}

export function startCapture() {
	initializeMedia();
	return navigator.mediaDevices.getUserMedia({ video: true })
		// .then( stream {
		// 	videoPlayer.srcObject = stream;
		// 	videoPlayer.style.display = 'block';
		// })
		// .catch(function (err) {
		// 	imagePickerArea.style.display = 'block';
		// });
}