module('ComboBox');

test('builder', function() {
	
	var entityXml = 
'<formEntity id="1" name="문서번호" systemType="string"\
		required="false" system="false">\
	<children />\
	<format type="comboBox" viewingType="comboBox">\
		<list type="" refCodeCategoryId="null" refCodeCategoryName="null"\
			listType="static">\
			<staticItems>\
				<staticItem>123</staticItem>\
				<staticItem>234</staticItem>\
				<staticItem>456</staticItem>\
			</staticItems>\
		</list>\
	</format>\
	<graphic hidden="false" readOnly="false" labelWidth="85"\
		contentWidth="204" height="23" cellSize="1" fitWidth="false"\
		verticalScrollPolicy="false" textAlign="left" fitToScreen="false" />\
</formEntity>';
	
	SmartWorks.FormRuntime.ComboBoxBuilder.build({
		mode : 'view', // view or edit
		container : $('#combo_box'),
		entity : $(entityXml),
		value : '234'
	});

//	equal(container.getColumnSize(), 2, 'Column Size Calculation');
//	equal(container.getTable().find('tr').length, 4, 'Row Size Calculation');
});
