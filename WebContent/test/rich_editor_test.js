module('richEditor');

test('builder', function() {
	
	var entityXml = 
'<formEntity id="21" name="편집기" systemType="text" required="false"\
		   system="false">\
	   <children />\
	   <format type="richEditor" viewingType="richEditor"></format>\
	   <graphic hidden="false" readOnly="false" labelWidth="79"\
	    contentWidth="499" height="250" cellSize="1" fitWidth="false"\
	    verticalScrollPolicy="true" textAlign="left" fitToScreen="false"\
	    listEditable="false" multipleUsers="false" />\
	  </formEntity>';
	
	SmartWorks.FormRuntime.RichEditorBuilder.build({
		mode : 'view', // view or edit
		container : $('#rich_editor'),
		entity : $(entityXml),
		value : '<b>hihihi</b>'
	});
	
	
	//console.log($('#text_input'));

//	equal(container.getColumnSize(), 2, 'Column Size Calculation');
//	equal(container.getTable().find('tr').length, 4, 'Row Size Calculation');
});
