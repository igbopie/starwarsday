//~ const noble = require('noble');
const bb = require('./bb');
const sphero = require('sphero');

//~ noble.on('discover', (peripheral) => {
	//~ const { advertisement } = peripheral;
	//~ const { localName = '' } = advertisement || {};
	//~ if (localName.indexOf('BB') === 0) {
		//~ console.log('discovered', localName, peripheral);
		//~ noble.stopScanning();
		//~ const bb8 = sphero(peripheral.address);
		//~ bb8.roll(150, 360);
		
	//~ }
//~ });


//~ peripheral discovered (fc47739d23da with address <fc:47:73:9d:23:da, random>, connectable true, RSSI -66:
	//~ hello my local name is:
		//~ BB-23DA
	//~ can I interest you in any of the following advertised services:
		//~ ["22bb746f2ba075542d6f726568705327"]
	//~ here is my manufacturer data:
		//~ "3330"
	//~ my TX power level is:
		//~ -10

const bb8 = sphero('fc47739d23da');
bb8.connect().then(() => {
	bb.hid(bb8);
})



//~ noble.startScanning();
