/**
FormRuntime Utility(Static) Functions...

requires :
	file_field.js
**/

net.smartworks.FormRuntime.generateFieldId = function(id) {
	return id;
}

net.smartworks.FormRuntime.createFileField = function(config) {
	return new net.smartworks.FormRuntime.FileField(config).buildHTML();
}
