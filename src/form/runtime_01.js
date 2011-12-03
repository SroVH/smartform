var net = net || {}
net.smartworks = net.smartworks || {}

net.smartworks.FormRuntime = function(workspace_id) {
    var Version = '1.0.0';
	
	this.workspace_id = workspace_id;
	this.$workspace = $(workspace_id);
	$(workspace_id).data('FormRuntime', this);
	
    return this;
}

FormRuntime = net.smartworks.FormRuntime;

/**
	function createForm()
	
	docspace/mainspace 까지 만들어서 리턴함.
	mappingCondFieldIds 배열을 생성함.
	mappingForm 이 하나라도 있는 경우에  .formFieldCondValue 인풋의 변화를 감지해서, FormRuntime의 데이타를 리프레쉬함.
	
	==> 개선사항
	eventHandler는 조건을 따질 필요없이 등록해도 됨. live로 ..
	
	대체로 
	createForm() ==> initDataFields() ==> loadData() 로 진행됨.
*/

net.smartworks.FormRuntime.prototype.createForm = function(formXml, mode) {
	this.$xForm = $(formXml);
	this.form_id = this.$xForm.children('form').attr('id');
	this.mode = mode;
	
	var docspace_id = this.workspace_id + '_docSpace';
	var html = [
	'<div id="' + this.workspace_id + '_docSpace">',
		'<div id="' + this.workspace_id + '_mainSpace" valign="top"></div>',
	'</div>'
	].join('');
		
	this.$workspace.find('#' + docspace_id).remove();
	$docspace = $(html);
	this.$workspace.append($docspace);
	
	this.isSelfMapping = this.$xForm.find('mapping[mappingFormType=self_form]:first').length == 1;
	this.mappingCondFieldIds = [];
	
	this.$xForm.find('mappingForms mappingForm').each(function($xMappingForm) {
		var targetFormId = $xMappingForm.attr('targetFormId');
		var $xConds = $xMappingForm.children('conds');
		var condIds = [];
		
		$xConds.children('cond').each(function($xCond) {
			try {
				var $xSecond = $xCond.children('second');
				var secondType = $xSecond.attr('type');
			
				if(secondType === 'self') {
					var selfFieldId = $xSecond.attr('fieldId');
					if(selfFieldId)
						condIds.push(selfFieldId);
				}
			} catch(e) {
				;
			}
		});
		
		this.mappingCondFieldIds.push(condIds);
	});
	
	this.isMappingEachTime = this.isSelfMapping || (this.mappingCondFieldIds.length > 0);
	if(this.isMappingEachTime) {
		$('.formFieldCondValue').live('change', function(event) {
			var $target = $(event.target);
			var target_workspace_id = $target.attr('workspaceId');
			var target_field_id = $target.attr('fieldId');
			var formRuntime = $('#' + target_workspace_id).data('FormRuntime');
			formRuntime.refreshDataFields(target_field_id);
		});
	}
	
	return $docspace;
}
