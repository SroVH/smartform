module('GridLayout');

test('columnsize', function() {
	expect(2);

	stop();
	$.ajax({
		url: '../data/basic_form_01.xml',
		success: function(data) {
			layout = new SmartWorks.GridLayout({
				target : $('#form_layout')[0],
				formXml : data
			});
			
			equal(layout.getColumnSize(), 2, 'Column Size Calculation');
			equal(layout.getTable().find('tr').length, 4, 'Row Size Calculation');
			
			console.log(layout.getTable());


			start();
		}
	});
});
