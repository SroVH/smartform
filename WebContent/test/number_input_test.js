module('numberInput');

test('builder', function() {
	
	var entityXml = 
'<formEntity id="444" name="예상소요시간" systemType="number"\
		required="true" system="false">\
	<children />\
	<mappings>\
		<pre />\
		<post>\
			<mapping name="요구관리.예상소요시간" type="mapping_form" eachTime="false"\
				mappingFormType="info_form" mappingFormId="897" formName="요구관리"\
				fieldId="1131" fieldName="예상소요시간"></mapping>\
		</post>\
	</mappings>\
	<format type="numberInput" viewingType="numberInput"></format>\
	<graphic hidden="false" readOnly="false" labelWidth="80"\
		contentWidth="190" height="23" cellSize="1" fitWidth="false"\
		verticalScrollPolicy="true" />\
</formEntity>';
	
	SmartWorks.FormRuntime.NumberInputBuilder.build({
		mode : 'edit', // view or edit
		container : $('#number_input'),
		entityXml : entityXml,
		workspaceId : 'wwwwwww',
		id : 'didididi'
	});
	
	console.log($('#number_input'));

//	equal(container.getColumnSize(), 2, 'Column Size Calculation');
//	equal(container.getTable().find('tr').length, 4, 'Row Size Calculation');
});
