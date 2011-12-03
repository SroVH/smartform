module('FormRuntime');

test('find', function() {
	expect(2);

	stop();
	$.ajax({
		url: '../data/basic_form_01.xml',
		success: function(data) {

			equal($(data).find('formEntity').length, 4, 'Count Descendents');
			equal($(data).find('graphic space').attr('bottom'), 10, 'Attributes');

			start();
		}
	});
});

test('isSelfForm', function() {
	expect(2);
	
	stop();
	$.ajax({
		url: '../data/basic_form_01.xml',
		success: function(data) {
			equal($(data).find('mapping[mappingFormType:self_form]:first').length, 0, 'isSelfForm?');
			$.ajax({
				url: '../data/basic_form_02.xml',
				success: function(data) {
					equal($(data).find('mapping[mappingFormType:self_form]:first').length, 1, 'isSelfForm?');
				}
			});
			
			start();
		}
	});
});

test('form_id', function() {
	expect(1);

	stop();
	
	$.ajax({
		url: '../data/basic_form_01.xml',
		success: function(data) {
			try {
			
			var fr = new net.smartworks.FormRuntime('workspace_01');
			
			fr.createForm(data, 0);
			
			equal(fr.form_id, 'frm_ca1eb51a31034ca7bffe866f94841696', 'Form ID');

			start();
			} catch(e) {
				console.log(e);
				start();
			}
		}
	});
	
});
