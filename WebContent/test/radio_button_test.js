module('RadioButton');

test('builder', function() {
	
	var entityXml = 
'<formEntity id="7" name="LOT투입목적" systemType="string" \
		required="true" system="false"> \
	<children /> \
	<mappings> \
		<pre> \
			<mapping name="LOT투입목적(한번만)" type="mapping_form" eachTime="false" \
				mappingFormType="self_form" formName="현재업무 항목" fieldId="7" \
				fieldName="LOT투입목적" valueFunc="value"></mapping> \
		</pre> \
		<post> \
			<mapping name="제품사양서.LOT투입목적" type="mapping_form" eachTime="false" \
				mappingFormType="info_form" mappingFormId="25" formName="제품사양서" \
				fieldId="10" fieldName="LOT투입목적" valueFunc="value"></mapping> \
		</post> \
	</mappings> \
	<format type="radioButton" viewingType="radioButton"> \
		<list type="" refCodeCategoryId="null" refCodeCategoryName="null" \
			listType="static"> \
			<staticItems> \
				<staticItem>ER</staticItem> \
				<staticItem>Service ER</staticItem> \
				<staticItem>Vol. Run</staticItem> \
				<staticItem>DOE Run</staticItem> \
				<staticItem>Qua. Run</staticItem> \
			</staticItems> \
		</list> \
	</format> \
	<graphic hidden="false" readOnly="false" labelWidth="96" \
		contentWidth="236" height="23" cellSize="1" fitWidth="false" \
		verticalScrollPolicy="true" textAlign="left" fitToScreen="false" /> \
</formEntity>';
	
	SmartWorks.FormRuntime.RadioButtonBuilder.build({
		mode : 'view', // view or edit
		container : $('#radio_button'),
		entity : $(entityXml),
		value : 'Service ER'
	});

//	equal(container.getColumnSize(), 2, 'Column Size Calculation');
//	equal(container.getTable().find('tr').length, 4, 'Row Size Calculation');
});
