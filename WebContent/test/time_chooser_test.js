module('timeChooser');

test('builder', function() {
	
	var entityXml = 
'<formEntity id="17" name="시간" systemType="time" required="false"\
		   system="false">\
	   <children />\
	   <format type="timeField" viewingType="timeField"></format>\
	   <graphic hidden="false" readOnly="false" labelWidth="79"\
	    contentWidth="129" height="23" cellSize="1" fitWidth="false"\
	    verticalScrollPolicy="true" textAlign="left" fitToScreen="false"\
	    listEditable="false" multipleUsers="false" />\
	  </formEntity>';
	
	SmartWorks.FormRuntime.TimeChooserBuilder.build({
		mode : 'edit', // view or edit
		container : $('#time_chooser'),
		entity : $(entityXml),
		value : '12:23'
	});
	
	$('input.js_todaypicker').timepicker({
		timeFormat: 'hh:mm',
		hourGrid: 1,
		minuteGrid: 10,
	});

	
	//console.log($('#text_input'));

//	equal(container.getColumnSize(), 2, 'Column Size Calculation');
//	equal(container.getTable().find('tr').length, 4, 'Row Size Calculation');
});
