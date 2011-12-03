/** 
import runtimes_01.js <<= dependency
*/

/**
<formEntity id="23" name="제품사양서" systemType="string"
	required="true" system="false">
	<children />
	<mappings>
		<pre>
			<mapping name="제품사양서(한번만)" type="mapping_form" eachTime="false"
				mappingFormType="self_form" formName="현재업무 항목" fieldId="23"
				fieldName="제품사양서" valueFunc="value"></mapping>
		</pre>
		<post>
			<mapping name="제품사양서.제품사양" type="mapping_form" eachTime="false"
				mappingFormType="info_form" mappingFormId="25" formName="제품사양서"
				fieldId="5" fieldName="제품사양" valueFunc="value"></mapping>
		</post>
	</mappings>
	<format type="fileField" viewingType="fileField"></format>
	<graphic hidden="false" readOnly="false" labelWidth="96"
		contentWidth="344" height="23" cellSize="1" fitWidth="false"
		verticalScrollPolicy="true" textAlign="left" fitToScreen="false" />
</formEntity>
*/

$(function() {
	$(".formFileFieldInput:change").live('change', function(e) {
		console.log(e);
		
		var fileObj = e.srcElement || e.target;
		var filePath = fileObj.value;
		var fileType = filePath.substring(filePath.lastIndexOf('.')+1, filePath.length).toUpperCase();
		if (fileObj.size === 1) {   //formatType : imageBox (gif, jpg only) : size 속성을 기준으로 이미지냐, 보통 파일이냐를 구분하고 있다.
			if (!(fileType === 'GIF' || fileType === 'JPG' || fileType === 'JPEG')) { 
				console.log('ERROR : INVALID IMAGE');
				// warnMessage('errorCodeinvalidImage', 'INPUT_VALIDIMAGE');
				return;
			}
		}

		var fieldId = e.target.id.substr(0, e.target.id.length - 7);
		$("#" + fieldId + "_fileuploadDiv")['file'].upload(fieldId);
	});
});

net.smartworks.FormRuntime.FileField = function(config) {
	this.options = {
		id : '',
		mode : 'required', // hidden, readOnly
		format : 'fileField', //'imageBox'
		user_id : '',
		workspace_id: ''
	};
	
	SmartWorks.extend(this.options, config);

	return this;
};

FileField = FormRuntime.FileField;

/*
var FormFileFieldUtil = {
	currentFieldId : null,
	getFormFileByUid : function(uid){		
		return FormFileFieldUtil.getFormFileByFieldId(uid + "_fileuploadDiv");
	},
	getFormFileByFieldId : function(id){
		var formFileField = $(id);
		if(formFileField != null & formFileField != "undefined"){
			return formFileField['file'];
		}
		return null;
	}
};
*/
net.smartworks.FormRuntime.FileField.emptyFileRecordForHidden = function() {
	return [
	'<tr class="fileListTableHeader fileListTableRow">',
	'<td class="fileListTableNormal fileListTableCol" colspan="3">',
	'첨부된 파일이 없습니다.',
	'</td>',
	'</tr>'
	].join('');
}

net.smartworks.FormRuntime.FileField.prototype.buildHTML = function() {
	
	var container = $('<div />');
	container.attr('id', this.options.id + '_fileuploadDiv');
	
	var content = $('<table id="' + this.options.id + '_fileList" class="fileListTable"/>');
	if(this.options.mode == 'hidden')
		content.html(FileField.emptyFileRecordForHidden());
	
	container.append(content);
	
	if(this.options.mode != 'hidden') {
		var fileuploadForm = $('<form />');
		fileuploadForm.attr('id', this.options.id + '_fileuploadForm');
		fileuploadForm.attr('action', '/smartserver/services/portal/documentService.jsp?method=createFileXml&userId=' + this.options.user_id);
		fileuploadForm.attr('method' ,'post');
		fileuploadForm.attr('encoding', 'multipart/form-data');

		var input_file = $('<input type="file" />');
		input_file.attr('id', this.options.id + '_upload');
		
		if (this.options.format === 'imageBox') {
			input_file.attr('size', '1'); // size 속성을 기준으로 이미지냐, 보통 파일이냐를 구분하고 있다.
			input_file.addClass('fileInputImage');
		} else {
			input_file.addClass("fileInput");
			input_file.attr('size', '30'); // size 속성을 기준으로 이미지냐, 보통 파일이냐를 구분하고 있다.
		}
		input_file.addClass('formFileFieldInput');
		
		input_file.attr('fieldId', this.options.id);
		input_file.attr('workspaceId', this.options.workspaceId); // TODO setvalue = formRuntime.workspaceId .. I think this might be useless..
		input_file.attr('name', 'upload');

		fileuploadForm.append(input_file);
		
		container.append(fileuploadForm);
	}
	
	return container;
}

net.smartworks.FormRuntime.FileField.prototype.upload = function() {
	var $this = this;
	function doBeforeUpload() {
		
	};
	
	function doAfterUpload(success, data) {
		if(!success) {
			return;
		}

		// FormEnv.loadDataComplete = true; TODO What this means ...
		
		var $result = $(data).children('Result');
		if($result.attr('status') == 'OK'){
			var $item = $result.children('item');
			var groupId = $item.attr('groupId');
			
			var $form = $('#' + $this.options.id + '_fileuploadForm');
			var action = '/smartserver/services/portal/documentService.jsp?method=createFileXml&userId=' + $this.options.user_id + "&groupId=" + groupId;
			$form.attr('action', action);
			$form.reset();
		}
	};
	
	davidjc.AjaxFileUpload.initialise(doBeforeUpload, doAfterUpload, this.options.id);
}

net.smartworks.FormRuntime.FileField.getFileImage = function(file_name) {
	var ext = file_name.substr(file_name.lastIndexOf('.') + 1);
	return ext.substring(0, 3) + '.gif';
};

net.smartworks.FormRuntime.FileField.toReadableSize = function(size) {
	if(size > 1000000000 ){
		return parseInt(size / 1000000000) + "GB";
	} else if(size > 1000000) {
		return parseInt(size / 1000000) + "MB";
	} else if(size > 1000) {
		return parseInt(size / 1000) + "KB";
	} else {
		return size + "byte";
	}
}

net.smartworks.FormRuntime.FileField.prototype.loadDocumnetInfo = function() {
	if(!!this.groupId)
		return;
	
	$.ajax({
		url: "/smartserver/services/portal/documentService.jsp?method=findFileGroup&userId=" + FormEnv.userId + "&groupId=" + this.groupId,
		type: 'GET',
		context: this,
		success: function(data) {
			var fieldId = this.options.id;
			var $fileTable = $('#' + fieldId + '_fileList');
			
			$fileTable.html('');
				  
		  	var $result = $(data).children('Result');
		
			if($result.attr('status') == 'OK') {
				if($result.attr('totalCount') == '0') {
					this.groupId = '';
					if(this.options.mode == 'hidden')
						$('#' + fieldId + '_fileList').html(FileField.emptyFileRecordForHidden());
				} else {
					var $files = $result.children('File');
					$this = this;
					$files.each(function() {
						try{
							$fileTable.append($($this.makeFileRow(this))); //$this : FileField, this : File
						}catch(e) {
							;//
						}
					});
					var docspace = $('#workspace_docSpace');
					docspace.height('height', docspace.height() + 14 + 'px');
				}
			} else {
				$('#' + fieldId + '_fileList').html(FileField.emptyFileRecordForHidden());
			}
		}
	});
}


net.smartworks.FormRuntime.FileField.prototype.makeFileRow = function($file) {
	var fieldId = this.options.id;
	
	var fileId = $file.children('id').text();
	var fileName = $file.children('fileName').text();
	var fileType = $file.children('fileType').text();
	var size = FileField.toReadableSize(parseInt($file.children('fileSize').text()));
	var filePath = $file.children('filePath').text();
	
	var $row = $('<tr />');
	
	var $td_name = $('<td />');
	$td_name.attr('class', 'fileListTableNomal fileListTableCol fileListName');
	$row.append($td_name);
	
	var $div_name = $('<div />');
	
	if(this.options.format == 'imageBox') {
		$td_name.html("<img id='" + fieldId + "_img' src='/smartserver/servlet/download?fileId=" + fileId + "&userId=" + this.options.user_id + "'>");
	} else { //this.options.format == 'fileField'
		var imgSrc = FileField.getFileImage(fileName);
		$div_name.html('<img src=/smartserver/images/icon/fileImage/icon_'+ imgSrc + '> ' + '<a href=/smartserver/servlet/download?fileId=' + fileId + '&userId=' + this.options.user_id + '>' + fileName + '</a>' + '&nbsp;[' + size + ']');
	}
	$td_name.append($div_name);
	
	if(this.options.mode != 'hidden') {
		$removeBtn = $('<img />');
		$removeBtn.attr('name', fieldId);
		$removeBtn.attr('src', '/smartserver/image/form/close.gif');

		if(this.options.format == 'imageBox') {
			$('#' + fieldId + '_upload').hide();
		}
		
		$removeBtn.addClass('formFileFieldRemoveBtn');
		
		$div_name.append($removeBtn);
		
		$removeBtn.attr('fileId') = fileId; // might be useless
		$removeBtn.attr('fieldId') = fieldId; // might be useless
	}
	
	return $row;
}

net.smartworks.FormRuntime.FileField.prototype.removeFile = function(fileId) {
	$.ajax({
		url: '/smartserver/services/portal/documentService.jsp',
		data : {
			method: 'deleteFile',
			userId: this.options.user_id,
			fileId: fileId
		},
		type: 'GET',
		context: this,
		success : function(data) {
			$result = $(data).children('Result');
			this.loadDocumnetInfo();
		}
	});
}
