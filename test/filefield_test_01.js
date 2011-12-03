module('FormRuntime.FileField');

test('build', function() {
	
	var container = $('#file_field');
	
	var filefield = new net.smartworks.FormRuntime.FileField({
		id : 'xxxxx',
		mode : 'required', // hidden, readOnly
		format : 'fileField', //'imageBox'
		user_id : 'shnam',
		workspace_id: 'workspace_idzzz'	
	});
	
	console.log(filefield);
	
	var html = filefield.buildHTML();
	
	console.log(html);
	
	container.append(html);
});

