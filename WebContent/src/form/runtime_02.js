net.smartworks.FormRuntime.prototype.initDataFields = function() {
	if(!this.useMapping)
		return;
	
	var xmlstring = this.initRecordString();
	this.refreshData(xmlstring);
}

net.smartworks.FormRuntime.prototype.initRecordString = function() {
	return '<?xml version="1.0"?>' +
			'<DataRecord formId="' + this.form_id + '" formVersion="1" workItemId="" />';
}

net.smartworks.FormRuntime.prototype.refreshData = function(mappingRecordXmlStr) {
	var $mapping_services = this.$xForm.find('form mappingServices mappingService');

	var mapping_array = [];
	
	$mapping_services.each(function($mapping_service) {
		var $actual_parameter_def = $mapping_service.children('ActualParameters');
		var $actual_parameters = $actual_parameter_def.children('ActualParameter');
		
		/*
		문제 1. XML 형식에서 갑자기 ActualParameter 부터 대문자로 시작.
		문제 2. Form document와 서버 통신에서 사용하는 XML 형식의 미묘한 차이를 처리하기 위한 불필요한 작업 들.(불필요한 XML 형식 변형이 문제.)
		문제 3. 왜 서버에서 하지 않았을까? 클라이언트에서 처리하기에는 불필요한 로드가 많은데..흠..
		*/
		
	});
}

// FormEnv 라는 놈이 필요하다..ㅉㅉ


//....흠....
/*
this.refreshData = function(mappingRecordXmlStr) {
	FormEnv.comBoBeforeIndex = '';
	var mappingServicesXmls = SmartXMLUtil.getChildNode(SmartXMLUtil.getChildNode(this.formXml, 'form'), 'mappingServices');
	var mappingServiceXml = SmartXMLUtil.getChildNodes(mappingServicesXmls,	'mappingService');
	//alert(mappingServicesXmls.xml+'////'+mappingServiceXml.xml);
	//jk yoon
	var mappingArray = new Array();
	if (mappingServiceXml.length > 0) {
		for ( var i = 0; i < mappingServiceXml.length; i++) {
			var actualParametersXml = SmartXMLUtil.getChildNode(mappingServiceXml[i], 'ActualParameters');
			var actualParameterXml = SmartXMLUtil.getChildNodes(actualParametersXml, 'ActualParmeter');

			var execution = actualParametersXml.getAttribute('Execution');
			var id = mappingServiceXml[i].getAttribute('id');
			var name = mappingServiceXml[i].getAttribute('name');
			var targetServiceId = mappingServiceXml[i].getAttribute('targetServiceId');
			var str = '<mappingService id="' + id + '" name="' + name+ '" targetServiceId="' + targetServiceId+ '" Execution="' + execution + '">';

			if (actualParameterXml.length > 0) {
				for ( var j = 0; j < actualParameterXml.length; j++) {
					str += actualParameterXml[j].xml;
				}
			}
			str += '</mappingService>';
			mappingArray.push(str);
		}
	}
	mappingArray = mappingArray.join("@@");
	realIdx = 0;

	var realStr = "";
	for(var i = 0; i < realCheckList.length; i++){
		if(i != 0) realStr = realStr +"@";
			realStr += realCheckList[i]+"%"+checkFormList[i];
	}

	var req = new Ajax.Request(
			FormEnv.serviceUrl + '/services/runtime/executionService.jsp',
			{
				method : 'post',
				parameters : {
					method : 'refreshDataFields',
					userId : FormEnv.userId,
					formId : SmartXMLUtil.getChildNode(this.formXml, 'form').getAttribute('id'),
					editMode : editMode,
					data : mappingRecordXmlStr,
					mappingServicesXml : mappingArray,
					realStrData : realStr
				},
				onSuccess : function(transport) {
					var response = transport.responseXML;
					if (!Mis.isNull(response)) {
						realCheckList = new Array();
						realCheckIdx = 0;
						comBoIdx2 = 0;
						var record = SmartXMLUtil.getChildNode(response,'DataRecord');
						// if (record == null)
						// return;
						var formRuntime = $(transport.request.options['req']);
						formRuntime.loadData(formRuntime.formXml, record);
						FormEnv.loadDataComplete = false;
					}
				},
				req : this
			});
};
*/
