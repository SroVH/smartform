module('CurrencyInput');

test('builder', function() {
	
	var entityXml = 
'		<formEntity id="35" name="견적 총 금액" systemType="number"\
		required="true" system="false">\
	<children />\
	<mappings>\
		<pre>\
			<mapping name="견적 총 금액(한번만)" type="mapping_form" eachTime="false"\
				mappingFormType="self_form" formName="현재업무 항목" fieldId="35"\
				fieldName="견적 총 금액" valueFunc="value"></mapping>\
		</pre>\
		<post>\
			<mapping name="견적서.견적 총 금액" type="mapping_form" eachTime="false"\
				mappingFormType="info_form" mappingFormId="43" formName="견적서"\
				fieldId="8" fieldName="견적 총 금액" valueFunc="value"></mapping>\
		</post>\
	</mappings>\
	<format type="currencyInput" viewingType="currencyInput|$">\
		<currency>$</currency>\
	</format>\
	<graphic hidden="false" readOnly="false" labelWidth="55"\
		contentWidth="135" height="23" cellSize="1" fitWidth="false"\
		verticalScrollPolicy="true" textAlign="left" fitToScreen="false" />\
</formEntity>';
	
	SmartWorks.FormRuntime.CurrencyInputBuilder.build({
		mode : 'edit', // view or edit
		container : $('#currency_input'),
		entity : $(entityXml),
		value : '12345'
	});
	
//	equal(container.getColumnSize(), 2, 'Column Size Calculation');
//	equal(container.getTable().find('tr').length, 4, 'Row Size Calculation');
});
