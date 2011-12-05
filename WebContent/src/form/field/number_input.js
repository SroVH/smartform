SmartWorks.FormRuntime = SmartWorks.FormRuntime || {};

SmartWorks.FormRuntime.NumberInputBuilder = {};

SmartWorks.FormRuntime.NumberInputBuilder.build = function(config) {
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
	
	$html = $('<div clss="formFieldContentsInpu" id="' + id + '_NumberInput"></div>');
	
	if ($graphic.attr('hidden') == 'true')
		$html.hide();
	
	if(options.mode == 'view'){
		var $input = $('<p class="numberFieldP formFieldContentsInputNoborder" id="' + id + '_input"></p>');
	}else{
		var $input = $('<input class="numberFieldInput formFieldContentsInput numberFieldChangeValue" id= "' + id + '_input" type="text" fieldId=" ' + SmartWorks.generateFormFieldId(options.workspaceId, id) +  '"/>');				
	}
	
	$input.appendTo($html);

	$html.appendTo(options.container);
	
	return options.container;
};