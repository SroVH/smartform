SmartWorks.FormRuntime = SmartWorks.FormRuntime || {};

SmartWorks.FormRuntime.RadioButtonBuilder = {};

SmartWorks.FormRuntime.RadioButtonBuilder.build = function(config) {
	var options = {
			mode : 'view', // view or edit
			container : $('<div></div>'),
			entityXml : '',
			workspaceId : '',
			id : ''
		};

	SmartWorks.extend(options, config);
	
	$entity = $(options.entityXml);
	$graphic = $entity.children('graphic');
	$format = $entity.children('format');
	var id = $entity.attr('id');
	
	$html = $('<div class="formRadioField" id="' + id + 'Radio"></div>');
	
	if($graphic.attr('hidden') == 'true')
		$html.hide();
	if($graphic.attr('readOnly') == 'true')
		$html.attr('disabled', 'disabled');
	
	$staticItems = $format.find('list staticItems staticItem');
	
	for(var i = 0;i < $staticItems.length;i++) {
		$staticItem = $staticItems.eq(i);
		var text = $staticItem.text();
		var html = '';
		if (text) {
			html += '<input class="formFieldContentsInput formFieldCondValue formFieldRadioItem" type="radio" name="'
					+ id
					+ '_input" value="'
					+ text
					+ '"'
					+ 'fieldId="'
					+ SmartWorks.generateFormFieldId(options.workspaceId, id)
					+ '" workspaceId="'
					+ options.workspaceId
					+ '">'
					+ text
					+ "</input>";
		} else { //라디오버튼에 빈값이 셋팅되었을때
			html += '<input class="formFieldContentsInput formFieldCondValue formFieldRadioItem" type="radio" name="'
				+ id
				+ '_input" value=""'
				+ 'fieldId="'
				+ SmartWorks.generateFormFieldId(options.workspaceId, id)
				+ '" workspaceId="'
				+ options.workspaceId
				+ '">'
				+ "</input>";
		}
		$(html).appendTo($html);
	}

	$html.appendTo(options.container);
	
	return options.container;
}