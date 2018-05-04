const node_hid_1 = require("node-hid");
var Buttons;
(function (Buttons) {
    //~ Buttons[Buttons["A"] = 4] = "A";
    //~ Buttons[Buttons["B"] = 5] = "B";
    //~ Buttons[Buttons["X"] = 6] = "X";
    //~ Buttons[Buttons["Y"] = 7] = "Y";
    Buttons[Buttons["LeftStickY"] = 4] = "LeftStickY";
    Buttons[Buttons["LeftStickX"] = 3] = "LeftStickX";
    Buttons[Buttons["RightStickY"] = 6] = "RightStickY";
    Buttons[Buttons["RightStickX"] = 5] = "RightStickX";
    //~ Buttons[Buttons["R2"] = 11] = "R2";
    //~ Buttons[Buttons["L2"] = 10] = "L2";
})(Buttons || (Buttons = {}));
const MAX_D_PAD = 127;
const devs = node_hid_1.devices();
const NIMBUS_VENDOR = 273;
const NIMBUS_PRODUCT_ID = 5152; 
exports.connect = (vendor, product, serial) => {
	const deviceInfo = devs.find((d) => d.vendorId === vendor && d.productId === product && d.serialNumber === serial);
	if (!deviceInfo) {
		// tslint:disable-next-line:no-console
		console.error('Could not find device in device list');
		process.exit(1);
	}
	const device = new node_hid_1.HID(deviceInfo.path);
	const calculate = ({ xRaw, yRaw }, invertX = -1, invertY= -1) => {
		const x = (Math.abs(xRaw) > 10?xRaw * invertX:0) / MAX_D_PAD;
		const y = (Math.abs(yRaw) > 10?yRaw* invertY:0) / MAX_D_PAD;
		const module = Math.sqrt(x * x + y * y);
		let angle = (Math.atan(y / x) * (180 / Math.PI)) * -1 + 90;
		if (x < 0) {
			angle += 180;
		}
		return {
			xRaw,
			yRaw,
			x,
			y,
			module: module > 1 ? 1 : module,
			angle,
		};
	};
	let state;
	let cb = (_state) => { return; };
	// looks like buttons have intensity yay!
	device.on('data', (data) => {
		state = {
			//~ a: data.readUInt8(Buttons.A),
			//~ b: data.readUInt8(Buttons.B),
			//~ x: data.readUInt8(Buttons.X),
			//~ y: data.readUInt8(Buttons.Y),
			leftStick: {
				xRaw: data.readUInt8(Buttons.LeftStickX) - 127,
				yRaw: data.readUInt8(Buttons.LeftStickY) - 127,
				x: 0,
				y: 0,
				module: 0,
				angle: 0,
			},
			rightStick: {
				xRaw: data.readUInt8(Buttons.RightStickX) - 127,
				yRaw: data.readUInt8(Buttons.RightStickY) - 127,
				x: 0,
				y: 0,
				module: 0,
				angle: 0,
			},
			//~ r2: data.readUInt8(Buttons.R2),
			//~ l2: data.readUInt8(Buttons.L2),
		};
		state.leftStick = calculate(state.leftStick, 1, -1);
		state.rightStick = calculate(state.rightStick, 1, -1);
		cb(state);
	});
	device.on('error', (err) => {
		// tslint:disable-next-line:no-console
		console.error('error:', err);
	});
	return {
		close() {
			device.close();
		},
		onChanged(fn) {
			cb = fn;
		},
		getState() {
			return state;
		},
	};
};
