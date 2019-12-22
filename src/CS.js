
let cs = [
	0,
	1,
	10,
	11,
	13,
	14,
	17,
	19,
	20,
	21,
	22,
	23,
	25,
	26,
	27,
	28,
	29,
	31,
	32,
	34,
	38,
	39,
	40,
	42,
	43,
	44,
	45,
	46,
	47,
	49,
	50,
	53,
	54,
	55,
	56,
	57,
	58,
	60,
	61,
	64,
	65,
	66,
	67,
	68,
	69,
	70,
	71,
	72,
	73,
	90,
];

cs.forEach((v1, i1) => {
	let t = allRows.find((v, i) => v.l18.match(/^([^0-9]*)$/) && v.cs == v1);
	if (!t) {
		cs = cs.filter((v, i) => v != v1);
	}
});
cs.unshift('none');
export{cs}


