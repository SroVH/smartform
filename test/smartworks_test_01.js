module('SmartWorks');

test('extend', function() {
	var defaults = {
		a : 'a',
		b : 'b',
		c : 'c'
	}, overide = {
		a : 'A',
		d : 'D'
	}
	
	SmartWorks.extend(defaults, overide);
	
	equal(defaults.a, 'A', 'Overiden');
	equal(defaults.b, 'b', 'Unaffected');
	equal(defaults.d, 'D', 'Added');
});

