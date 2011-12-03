/*
<layout type="grid_layout">
	<columns>
		<gridColumn size="358.5" labelSize="80" />
		<gridColumn size="358.5" labelSize="80" />
	</columns>
	<gridRow size="30">
		<gridCell size="358.5" span="2" fieldId="0" />
	</gridRow>
	<gridRow size="30">
		<gridCell size="358.5" span="2" fieldId="1" />
	</gridRow>
	<gridRow size="407">
		<gridCell size="358.5" span="2" fieldId="2" />
	</gridRow>
	<gridRow size="30">
		<gridCell size="0" span="2" fieldId="3" />
	</gridRow>
</layout>
*/


GridLayout = function(config) {
	this.options = {
		target : $('<div></div>')
		// layout : ''
	};
	
	SmartWorks.extend(this.options, config);
	
	$table = $('<table></table>');
	$table.appendTo(this.options.target);
	
	$layout = $(this.options.form_xml).find('layout');
	
	this.column_size = 0;
	var grids = $layout.children('gridRow').first().children('gridCell');
	for(var i = 0; i < grids.length;i++) {
		this.column_size += parseInt(grids.eq(i).attr('span'));
	}

	return this;
};
