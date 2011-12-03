SmartWorks.FormRuntime = SmartWorks.FormRuntime || {};

SmartWorks.FormRuntime.CurrencyInputBuilder = {};

SmartWorks.FormRuntime.CurrencyInputBuilder.build = function(config) {
	var options = {
		mode : 'view', // view or edit
		container : $('<div></div>'),
		entityXml : '',
		workspaceId : '',
		id : '',
		value : ''
	};

	SmartWorks.extend(options, config);

	$entity = $(options.entityXml);
	$graphic = $entity.children('graphic');
	$format = $entity.children('format');

	var readOnly = $graphic.attr('readOnly') === 'true' || options.mode === 'view';
	var id = $entity.attr('id');

	$html =  $('<div id="' + id + 'NumberInput"></div>'); 
	if(readOnly){
		$currency = $('<p id="' + id + '_input"></p>').text(options.value);
	}else{	
		$currency = $('<input id="' + id + '_input" type="text" ieldId="' + SmartWorks.generateFormFieldId(options.workspaceId, id) + '">').attr('value', options.value);
	}
	$currency.appendTo($html);

	$html.appendTo(options.container);

	return options.container;

};