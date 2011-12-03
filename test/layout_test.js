module('GridLayout');

test('columnsize', function() {
	expect(1);

	stop();
	$.ajax({
		url: '../data/basic_form_02.xml',
		success: function(data) {
			layout = new GridLayout({
				target : $('#form_layout')[0],
				form_xml : data
			});
			
			equal(layout.column_size, 2, 'Column Size Calculation');
			
			console.log('Here');

			start();
		}
	});
});
