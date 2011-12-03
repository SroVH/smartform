module('FormRuntime -  FileField');

test('createFileField-Required', function() {
	var file_field = FormRuntime.createFileField({
		id : 'xxxxxx',
		mode : 'required',
		format : 'fileField'
	});
	
	$('#required_file_field').append(file_field);
	
	// equal(file_field, origin, 'generateFieldId');
});

test('createFileField-Hidden', function() {
	var file_field = FormRuntime.createFileField({
		id : 'yyyyyyyy',
		mode : 'hidden',
		format : 'fileField'
	});
	
	$('#hidden_file_field').append(file_field);
	
	// equal(file_field, origin, 'generateFieldId');
});

