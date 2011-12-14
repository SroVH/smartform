module('checkBox');

test('builder', function() {
	
	var entityXml = 
'<formEntity id="702" name="기안취소" systemType="boolean"\
		required="false" system="false">\
	<children />\
	<format type="checkBox" viewingType="checkBox"></format>\
	<graphic hidden="false" readOnly="false" labelWidth="106"\
		contentWidth="85" height="23" cellSize="1" fitWidth="false"\
		verticalScrollPolicy="true" textAlign="left" fitToScreen="false"\
		listEditable="false" multipleUsers="false" />\
</formEntity>';
	
	SmartWorks.FormRuntime.CheckBoxBuilder.build({
		mode : 'edit', // view or edit
		container : $('#check_box'),
		entity : $(entityXml),
		value : 0
	});
	
	//console.log($('#text_input'));

//	equal(container.getColumnSize(), 2, 'Column Size Calculation');
//	equal(container.getTable().find('tr').length, 4, 'Row Size Calculation');
});
