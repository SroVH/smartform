// Format Type : textArea, richEditor

net.smartworks.FormRuntime.EditField = function(config) {
	this.options = {
		id : '',
		mode : 'required', // hidden, readOnly
		format : 'fileField', //'imageBox'
		user_id : '',
		workspace_id: ''
	};
	
	SmartWorks.extend(this.options, config);
	
	html = '<div class="smartOutput formFieldContentsRich" id="'
			+ id + '_input" style="height:' + height + 'px;"></div>'; 
	
	contentsContainer.innerHTML = html;
	contentsContainer.addClassName("formFieldContentsRich");

	return this;
};