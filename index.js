//~ const noble = require('noble');

const NIMBUS_VENDOR = 273;
const NIMBUS_PRODUCT_ID = 5152; 
const PS4_VENDOR = 1356;
const PS4_PRODUCT_ID =1476;
const bb = require('./bb');
const sphero = require('sphero');
const ps41 = require("./ps4").connect(PS4_VENDOR, PS4_PRODUCT_ID, 'd0:27:88:75:1b:a3');
const ps42 = require("./ps4").connect(PS4_VENDOR, PS4_PRODUCT_ID, 'd0:27:88:64:df:f0');
const nimbus1 = require("./nimbus").connect(NIMBUS_VENDOR, NIMBUS_PRODUCT_ID);



const bb81 = sphero('fc47739d23da');
const bb82 = sphero('c9072c884224');
const bb83 = sphero('e3095b8b33c4');

bb81.connect();
bb82.connect();
bb83.connect();
	.then(() => {
		bb.hid(nimbus1, bb81); 
		bb.hid(ps41, bb82);
		bb.hid(ps42, bb83);
	}); 
	


//~ peripheral discovered (fc47739d23da with address <fc:47:73:9d:23:da, random>, connectable true, RSSI -66:
	//~ hello my local name is:
		//~ BB-23DA
	//~ can I interest you in any of the following advertised services:
		//~ ["22bb746f2ba075542d6f726568705327"]
	//~ here is my manufacturer data:
		//~ "3330"
	//~ my TX power level is:
		//~ -10


//~ ipheral discovered (e3095b8b33c4 with address <e3:09:5b:8b:33:c4, random>, connectable true, RSSI -71:
	//~ hello my local name is:
		//~ BB-33C4
	//~ can I interest you in any of the following advertised services:
		//~ ["22bb746f2ba075542d6f726568705327"]
	//~ here is my manufacturer data:
		//~ "3330"
	//~ my TX power level is:
		//~ -10

//~ peripheral discovered (c9072c884224 with address <c9:07:2c:88:42:24, random>, connectable true, RSSI -65:
	//~ hello my local name is:
		//~ BB-4224
	//~ can I interest you in any of the following advertised services:
		//~ ["22bb746f2ba075542d6f726568705327"]
	//~ here is my manufacturer data:
		//~ "3330"
	//~ my TX power level is:
		//~ -10

 //~ { vendorId: 1356,
    //~ productId: 1476,
    //~ path: '/dev/hidraw2',
    //~ serialNumber: 'd0:27:88:64:df:f0',
    //~ manufacturer: '',
    //~ product: 'Wireless Controller',
    //~ release: 0,
    //~ interface: -1,
    //~ usagePage: 26984,
    //~ usage: 29284 },
  //~ { vendorId: 273,
    //~ productId: 5152,
    //~ path: '/dev/hidraw3',
    //~ serialNumber: '28:9a:4b:10:a6:a4',
    //~ manufacturer: '',
    //~ product: 'Nimbus',
    //~ release: 0,
    //~ interface: -1,
    //~ usagePage: 61720,
    //~ usage: 875 },
  //~ { vendorId: 1356,
    //~ productId: 1476,
    //~ path: '/dev/hidraw4',
    //~ serialNumber: 'd0:27:88:75:1b:a3',
    //~ manufacturer: '',
    //~ product: 'Wireless Controller',
    //~ release: 0,
    //~ interface: -1,
    //~ usagePage: 12591,
    //~ usage: 12589 },
