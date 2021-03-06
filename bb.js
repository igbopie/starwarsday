const wait = (time) => new Promise((resolve) => {
	setTimeout(() => resolve(), time);
});


// SORRY FOR THIS CODE, It is my playground for now
exports.hid = (controller, toy) => {
	let state;
	controller.onChanged((_state) => {
		state = _state;
	});
	const drive = async () => {
		let calibrating = false;
		let offset = 0;
		let stopped = false;
		let heading;
		const loop = async () => {
			while (true) {
				if (state) {
					const { angle, module } = state.leftStick;
					const currentSpeed = module * 255;
					heading = isNaN(angle) ? heading : angle;
					if (state.rightStick.angle >= 0 && state.rightStick.module > 0.8) {
						toy.setBackLed(255);
						offset = state.rightStick.angle;
						calibrating = true;
					}
					else if (calibrating) {
						toy.setBackLed(0);
						calibrating = false;
					}
					if (currentSpeed > 0) {
						stopped = false;
					}
					if (!stopped || calibrating) {
						toy.roll(calibrating ? 0 : currentSpeed, calibrating ? offset : (heading + offset) % 360);
						if (currentSpeed === 0) {
							stopped = true;
						}
					}
				}
				await wait(100);
			}
		};
		await loop();
	}
	return drive();	
};
