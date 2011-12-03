module('FormRuntime');

test('initRecordString', function() {
	var answer = '<?xml version="1.0"?><DataRecord formId="frm_ca1eb51a31034ca7bffe866f94841696" formVersion="1" workItemId="" />';
	
	expect(1);
	
	stop();
	
	$.ajax({
		url: '../data/basic_form_01.xml',
		success: function(data) {
			try {
			
			var fr = new net.smartworks.FormRuntime('workspace_01');
			
			fr.createForm(data, 0);
			
			equal(fr.initRecordString(), answer, 'initRecordString');

			start();
			} catch(e) {
				console.log(e);
				start();
			}
		}
	});

});

