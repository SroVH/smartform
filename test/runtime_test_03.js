module('FormRuntime');

test('generateFieldId', function() {
	var origin = 'xxx';
	var generated = FormRuntime.generateFieldId(origin);
	equal(generated, origin, 'generateFieldId');
});

