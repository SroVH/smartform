module('textInput');

test('builder', function() {
	
	var entityXml = 
'<formEntity id="1" name="???" systemType="string" required="true" system="false">\
		<children/>\
	<format type="textInput" viewingType="textInput"></format>\
	<graphic hidden="false" readOnly="false" labelWidth="80" contentWidth="190" height="23" cellSize="1" fitWidth="false" verticalScrollPolicy="true"/>\
</formEntity>';
	
	SmartWorks.FormRuntime.TextInputBuilder.build({
		mode : 'edit', // view or edit
		container : $('#text_input'),
		entity : $(entityXml),
	});
	

	//console.log($('#text_input'));

//	equal(container.getColumnSize(), 2, 'Column Size Calculation');
//	equal(container.getTable().find('tr').length, 4, 'Row Size Calculation');
});
