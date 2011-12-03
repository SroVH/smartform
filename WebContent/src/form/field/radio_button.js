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

	var readOnly = $graphic.attr('readOnly') == 'true' || options.mode == 'view';
	var id = $entity.attr('id');

	$html = $('<div class="formRadioField" id="' + id + 'Radio"></div>');

	if ($graphic.attr('hidden') == 'true')
		$html.hide();

	$staticItems = $format.find('list staticItems staticItem');

	for ( var i = 0; i < $staticItems.length; i++) {
		$staticItem = $staticItems.eq(i);
		var text = $staticItem.text();
		var $input = $('<input type="radio" name="' + id + '_input" value="' + text + '">' + text + '</input>');
		$input.attr('fieldId', SmartWorks.generateFormFieldId(options.workspaceId, id));
		$input.attr('workspaceId', options.workspaceId);
		if (readOnly) {
			$input.attr('disabled', 'disabled');
		}
		$input.appendTo($html);
		console.log($input);
	}

	$html.appendTo(options.container);

	return options.container;
};