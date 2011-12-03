var MisFormUtil = {
	getField : function(container, fieldId) {
		var children = Mis.getChildNode(container, "children");
		if (children == null)
			return null;
		
		var fields = SmartXMLUtil.getChildNodes(children, "formEntity");
		if (Mis.isEmpty(fields))
			return null;

		for ( var i = 0; i < fields.length; i++) {
			var field = fields[i];
			if (field.getAttribute("id") == fieldId)
				return field;

			var subField = MisFormUtil.getField(field, fieldId);
			if (subField != null)
				return subField;
		}

		return null;
	},
	getMaxColumnLength : function(layoutXml) {
		var rowsXml = SmartXMLUtil.getChildNodes(layoutXml, "gridRow");
		var colsXml = SmartXMLUtil.getChildNodes(rowsXml[0], "gridCell");
		var colLen = 0;
		for ( var i = 0; i < colsXml.length; i++)
			colLen += parseInt(colsXml[i].getAttribute('span'));
		return colLen;
	},
	existChild : function(workSpace, id) {
		for ( var i = 0; i < workSpace.childNodes.length; i++) {
			if ((workSpace.childNodes[i]).id == id) {
				return true;
			}
		}
		return false;
	},
	getFieldFormatType : function(field) {
		var format = Mis.getChildNode(field, "format");
		if (format == null)
			return "textInput";
		return Mis.toDefault(format.getAttribute("type"), "textInput");
	},
	getFieldLabelWidth : function(field) {
		var graphic = Mis.getChildNode(field, 'graphic');
		if (graphic == null)
			return MisFormUtil.getFieldDefaultLabelWidth(field);

		var labelWidth = graphic.getAttribute("labelWidth");
		if (!Mis.isNull(labelWidth) && labelWidth > 0)
			return labelWidth;

		var label = Mis.getChildNode(graphic, "label");
		if (label == null)
			return MisFormUtil.getFieldDefaultLabelWidth(field);

		// deprecated value
		labelWidth = label.getAttribute('size');
		if (!Mis.isNull(labelWidth) && labelWidth > 0)
			return labelWidth;

		return MisFormUtil.getFieldDefaultLabelWidth(field);
	},
	// private
	getFieldDefaultLabelWidth : function(field) {
		return (FormEnv.getControlConfig(MisFormUtil.getFieldFormatType(field)))["labelWidth"];
	},
	getFieldContentWidth : function(field) {
		var graphic = Mis.getChildNode(field, 'graphic');
		if (graphic == null)
			return getFieldDefaultContentWidth();

		var contentWidth = graphic.getAttribute("contentWidth");
		if (!Mis.isNull(contentWidth) && contentWidth > 0)
			return contentWidth;

		// deprecated value
		contentWidth = graphic.getAttribute('contentsSize');
		if (!Mis.isNull(contentWidth) && contentWidth > 0)
			return contentWidth;

		return MisFormUtil.getFieldDefaultContentWidth(field);
	},
	getFieldDefaultContentWidth : function(field) {
		return (FormEnv.getControlConfig(MisFormUtil.getFieldFormatType(field)))["contentWidth"];
	},
	getFieldHeight : function(field) {
		var format = SmartXMLUtil.getChildNode(field, 'format');
		var type = format.getAttribute('type');
		var graphic = SmartXMLUtil.getChildNode(field, 'graphic');
		var height = graphic.getAttribute('height');
		if (height == -1)
			height = (FormEnv.getControlConfig(type))['height'];
		return height;
	},
	getFieldOverflowY : function(field) {
		var graphic = SmartXMLUtil.getChildNode(field, 'graphic');
		var verticalScrollPolicy = graphic.getAttribute("verticalScrollPolicy");
		return Mis.toBoolean(verticalScrollPolicy, true) ? "auto" : "visible";
	},
	checkValidate : function(id) {
		if ((id).endsWith("_input")) {
			var prefix = (id).substr(0, id.length - 6);
			if ($(id).value == null || $(id).value == '') {
				//Element.setStyle($(id), {backgroundColor : '#FE96AA'});
				Element.setStyle($(id), {
					backgroundColor : ''
				});
			} else {
				Element.setStyle($(id), {
					backgroundColor : ''
				});
			}
		}
	},
	removeTableRows : function(datagrid) {
		datagrid = document.getElementById(datagrid);
		var clintAgent = navigator['userAgent'];
		var indexCt = 1;
		// if(clintAgent['search'](/Safari|Firefox/g) > -1) {
		// datagrid = datagrid.childNodes[3];
		// indexCt = 2;
		// } else {
		datagrid = datagrid.childNodes[1];
		// }
		var objCNs = datagrid.childNodes;
		for ( var i = 0; i < objCNs.length; i += indexCt) {
			if (objCNs[i].childNodes[0].childNodes[0].checked) {
				datagrid.removeChild(objCNs[i]);
				if (indexCt == 2)
					datagrid.removeChild(objCNs[i]);
				i -= indexCt;
			}
		}
	},
	getTimeOptions : function() {
		var timeOptions = "";
		for ( var i = 0; i < 24; i++) {
			var viewHour;
			var realHour;
			if (i > 12) {
				viewHour = i - 12;
			} else {
				viewHour = i;
			}
			if (viewHour < 10) {
				viewHour = '0' + viewHour;
			}
			if (i < 10) {
				realHour = '0' + i;
			} else {
				realHour = '' + i;
			}
			for ( var j = 0; j < 2; j++) {
				timeOptions += "<option value='"
						+ realHour
						+ ":"
						+ ((j == 0) ? "00" : "30")
						+ "'>"
						+ ((i > 11) ? FormLang.timeFieldPM
								: FormLang.timeFieldAM) + " " + viewHour + ":"
						+ ((j == 0) ? "00" : "30") + "</option>";
			}
		}
		return timeOptions;
	},
	toViewTime : function(realTime) {
		var realHour = parseFloat(realTime.substr(0, 2));
		var realMin = realTime.substr(3, 2);

		var viewHour;

		if (realHour > 12) {
			viewHour = realHour - 12;
		} else {
			viewHour = realHour;
		}
		if (viewHour < 10) {
			viewHour = '0' + viewHour;
		}

		return ((realHour > 11) ? FormLang.timeFieldPM : FormLang.timeFieldAM)
				+ " " + viewHour + ":" + realMin;
	},
	toRealTime : function(viewTime) {
		var time;
		var pmIdx = viewTime.lastIndexOf(FormLang.timeFieldPM);
		if (pmIdx == -1) {
			var amIdx = viewTime.lastIndexOf(FormLang.timeFieldAM);
			time = viewTime.substr(amIdx + FormLang.timeFieldAM.length + 1,
					viewTime.length - (amIdx + FormLang.timeFieldAM.length));
		} else {
			time = viewTime.substr(pmIdx + FormLang.timeFieldPM.length + 1,
					viewTime.length - (pmIdx + FormLang.timeFieldPM.length));
		}
		var sepIdx = time.indexOf(':');
		var hTime = parseFloat(time.substr(0, sepIdx));
		if (pmIdx == -1) {
			if (hTime == 0) {
				hTime = 24;
			}
		} else {
			hTime = hTime + 12;
		}
		return ((hTime < 10) ? '0' + hTime : hTime)
				+ time.substr(sepIdx, time.length - sepIdx);
	}
};

var FormUserUtil = {
	getFormUserByUid : function(uid) {
		return FormUserUtil.getFormUserByUserFieldId(uid + "_userField");
	},
	getFormUserByName : function(name, index) {
		return FormUserUtil.getFormUserByUserFieldName(name + "_userField",
				index);
	},
	getFormUserByUserFieldId : function(id) {
		var formFieldBtn = $(id);
		if (formFieldBtn != null & formFieldBtn != "undefined") {
			return formFieldBtn['user'];
		}
		return null;
	},
	getFormUserByUserFieldName : function(name, index) {
		var formFieldBtn = document.getElementsByName(name)[Mis.toDefault(
				index, 0)];
		if (formFieldBtn != null & formFieldBtn != "undefined") {
			return formFieldBtn['user'];
		}
		return null;
	},
	openUserWindow : function(userId) {
		var params = "viewUserId=" + userId;
		popupModalDialog(getPath() + '/form/personInfo.jsp', params);
	},
	refFormId : null,
	refFieldId : null,
	getSystemInfo : function(serviceUrl) {
		var req = new Ajax.Request(
				serviceUrl + '/services/portal/configService.jsp',
				{
					method : 'get',
					contentType : 'text/xml',
					parameters : {
						userId : FormEnv.userId,
						method : 'getOrgUserSystemInfo',
						compId : compId
					},
					onSuccess : function(transport) {
						var response = transport.responseXML;
						var result = SmartXMLUtil.getChildNode(response, 'Result');
						if (result.getAttribute('status') == 'OK') {
							var sysInfo = SmartXMLUtil.getChildNode(result, 'systemInfo');
							var refFormId = sysInfo.getAttribute("refFormId");
							var refFieldId = sysInfo.getAttribute("refFieldId");
							FormUserUtil.refFormId = refFormId;
							FormUserUtil.refFieldId = refFieldId;
						}
					},
					onFailure : function() {
						alert('fail');
					}
				});
	}
};

var FormRefUtil = {
	getFormRefByUid : function(uid) {
		return FormRefUtil.getFormRefByRefFieldId(uid + "_refField");
	},
	getFormRefByName : function(name, index) {
		return FormRefUtil.getFormRefByRefFieldName(name + "_refField", index);
	},
	getFormRefByRefFieldId : function(id) {
		var formFieldBtn = $(id);
		if (formFieldBtn != null & formFieldBtn != "undefined") {
			return formFieldBtn['ref'];
		}
		return null;
	},
	getFormRefByRefFieldName : function(name, index) {
		var formFieldBtn = document.getElementsByName(name)[Mis.toDefault(
				index, 0)];
		if (formFieldBtn != null && formFieldBtn != "undefined") {
			return formFieldBtn['ref'];
		}
		return null;
	},
	openRefWindow : function(formId, recordId) {
		var url = getPath() + "/common/referenceTaskView.jsp";
		var params = '?formId=' + formId + '&recordId=' + recordId;
		popupModalDialog(url, params);

		FormEnv.loadDataComplete = true;
		
		var formWork = new FormWork(formId+"taskView");
		formWork.initFormRuntime(FormEnv.userId, '../', formId, '', '', recordId, '2', 'view');

		// window.showModalDialog("../common/referenceTaskView.jsp?formId="+formId+"&recordId="+recordId,
		// window,
		// "dialogWidth: 760px; dialogHeight: 400px; dialogTop:50px;
		// dialogLeft:50px; center: yes; help: no; status: no; scroll: yes;
		// resizable: no");
	}
};
