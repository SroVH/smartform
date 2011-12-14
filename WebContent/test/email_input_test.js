module('emailInput');

test('builder', function() {
	
	var entityXml = 
'<formEntity id="14" name="이메일" systemType="string"\
		   required="false" system="false">\
	   <children />\
	   <format type="emailIDInput" viewingType="emailIDInput"></format>\
	   <graphic hidden="false" readOnly="false" labelWidth="79"\
	    contentWidth="187" height="23" cellSize="1" fitWidth="false"\
	    verticalScrollPolicy="true" textAlign="left" fitToScreen="false"\
	    listEditable="false" multipleUsers="false" />\
	  </formEntity>';
	
	SmartWorks.FormRuntime.EmailInputBuilder.build({
		mode : 'edit', // view or edit
		container : $('#email_input'),
		entity : $(entityXml),
	});
	
	//console.log($('#text_input'));

//	equal(container.getColumnSize(), 2, 'Column Size Calculation');
//	equal(container.getTable().find('tr').length, 4, 'Row Size Calculation');
});
