module('dateChooser');

test('builder', function() {
	
	var entityXml = 
'<formEntity id="18" name="날짜" systemType="datetime"\
		   required="false" system="false">\
	   <children />\
	   <format type="dateChooser" viewingType="dateChooser">\
	    <date yearUse="false" sunNotUse="false" monNotUse="false"\
	     tueNotUse="false" wedNotUse="false" thuNotUse="false" friNotUse="false"\
	     satNotUse="false" />\
	   </format>\
	   <graphic hidden="false" readOnly="false" labelWidth="79"\
	    contentWidth="129" height="23" cellSize="1" fitWidth="false"\
	    verticalScrollPolicy="true" textAlign="left" fitToScreen="false"\
	    listEditable="false" multipleUsers="false" />\
	  </formEntity>';
	
	SmartWorks.FormRuntime.DateChooserBuilder.build({
		mode : 'edit', // view or edit
		container : $('#date_chooser'),
		entity : $(entityXml),
		value : '2011.11.11'
	});
	
	$('input.js_todaypicker').datepicker({
		defaultDate : new Date(),
		dateFormat : 'yy.mm.dd'
	});
	
	//console.log($('#text_input'));

//	equal(container.getColumnSize(), 2, 'Column Size Calculation');
//	equal(container.getTable().find('tr').length, 4, 'Row Size Calculation');
});
