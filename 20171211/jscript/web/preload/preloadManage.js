(function($) {
	
	var loadSuccess_pay = function() {
		
		// 填充修改页面编辑前的值
		if (editId && editObj) {
			 $("#sim_id", "#pay_fee").val(editObj.sim_id); 
			 $("#unit_id", "#pay_fee").val(editObj.unit_id); 
			 $("#combo_id", "#pay_fee").val(editObj.combo_id); 
			 
			 $("#s_date", "#pay_fee").val(editObj.s_date); 
			 $("#e_date", "#pay_fee").val(editObj.e_date); 
			 if(editObj.combo_id){
				  $.ajax( {
					  type : 'POST', 
					  async: false,  
					  url : "../../../combo/getComboMsg",   
					  data:{id:editObj.combo_id},
					  success : function(data) {
						  if(data){
							  $("#combo_name","#pay_fee").val(data.combo_name);
							  $("#month_fee","#pay_fee").val(data.month_fee);
							  $("#data","#pay_fee").val(data.data);
							  $("#voice_time","#pay_fee").val(data.voice_time);
						  }
					  } 
				});
			 }
			 
			 var obj= $('#records','#pay_fee');
			 var settings = obj.data('sgDatagrid');
			 settings.url='../../../paymentSim/findRecordsPage';
			 settings.query={sim_id:editObj.sim_id};
			 obj.data('sgDatagrid', settings);
			 obj.sgDatagrid('reload','sgDatagrid'); 
		}
		editId = null;
		editObj = null;
	}
	

	
	var loadSuccess_bind = function() {
		
		// 填充修改页面编辑前的值
		if (editId && editObj) {

			$.ajax({
				  type : 'post', 
				  async: false,   
				  url : '../../../combo/getcomboList',   
				  data:{telco:editObj.telco},
				  success : function(data) {
					  if(data){
						  $('#comborecord').sgDatagrid('appendData',data);
					  }else{
					  	alert(data);
					  }
				  } ,     
				  error : function(res,error) { 
				  	     if(res && res.responseText){ alert(res.responseText);}     
				  }    
				});
			
		
			 var combo_id = editObj.combo_id;
			 if(combo_id){
				 var obj1 = $('#comborecord');
				 var bDiv1 = $('.bDiv', obj1);
				 $('input[type=checkbox]', bDiv1).each(function() {
					 if(this.value == combo_id){
						  $(this).attr("checked",true);
					 }
				});
			 }
			
			 $("#sim_id", "#bind_combo").val(editObj.sim_id); 
		}
		
		editId = null;
		editObj = null;
	}
	

	
	var loadSuccess = function() {
		
		// 填充修改页面编辑前的值
		if (editId && editObj) {
			
			
			$("#sim_id", "#preload_add").val(editObj.sim_id);
			$("#iccid", "#preload_add").val(editObj.iccid);
			$("#imsi", "#preload_add").val(editObj.imsi);
			$("#telco", "#preload_add").val(editObj.telco);
			$("#s_date", "#preload_add").val(editObj.s_date);
			
			$("#akey", "#preload_add").val(editObj.akey);
			$("#esn", "#preload_add").val(editObj.esn);
			$("#w_user", "#preload_add").val(editObj.w_user);
			$("#w_password", "#preload_add").val(editObj.w_password);
			$("#call_letter", "#preload_add").val(editObj.call_letter);
			$("#imei", "#preload_add").val(editObj.imei);
			
			
			$("#barcode", "#preload_add").val(editObj.barcode);
			$("#unittype", "#preload_add").val(editObj.unittype);
			$("#unittype_id", "#preload_add").val(editObj.unittype_id);
			
			
			$("#vin", "#preload_add").val(editObj.vin);
			$("#engine_no", "#preload_add").val(editObj.engine_no);
			$("#color", "#preload_add").val(editObj.color);
			$("#production_date", "#preload_add").val(editObj.production_date);
			

		}

		editId = null;
		editObj = null;
	}
	
	
	var loadSuccess_modifyCard = function() {
		
		// 填充修改页面编辑前的值
		if (editId && editObj) {
			$("#sim_id", "#preload_modifyCard").val(editObj.sim_id);
		}
		editId = null;
		editObj = null;
	}
	
	
	
	var winClose_import = function() {// 关闭添加页面
		$(document).sgWindow('close', {
			id : 'import_sim'
		});
	}
	
	

	var winClose1 = function() {// 关闭添加页面
		$(document).sgWindow('close', {
			id : 'add_preload'
		});
	}

	var winClose2 = function() {// 关闭查看页面
		$(document).sgWindow('close', {
			id : 'modify_preload'
		});
	}

	var winClose3 = function() {// 关闭修改页面
		$(document).sgWindow('close', {
			id : 'bind_combo'
		});
	}
	
	
	var winClose4 = function() {// 关闭修改页面
		$(document).sgWindow('close', {
			id : 'pay_fee'
		});
	}
	
	var winClose5 = function() {// 关闭修改页面
		$(document).sgWindow('close', {
			id : 'preload_modifyCard'
		});
	}
	
	var saveBind = function() {
		
		 var obj1 = $('#comborecord');
		 var bDiv1 = $('.bDiv', obj1);
		 if ($('input[type=checkbox][checked=checked]', bDiv1) != null
					&& $('input[type=checkbox][checked=checked]', bDiv1).length > 1) {
			 	$(document).sgPup({message:'message_info',text: "只能选择一个选项！"});
			}else if ($('input[type=checkbox][checked=checked]', bDiv1) != null
					&& $('input[type=checkbox][checked=checked]', bDiv1).length == 0) {
				 $(document).sgPup({message:'message_info',text: "请选择一个选项！"});
			}else if ($('input[type=checkbox][checked=checked]', bDiv1) != null
					&& $('input[type=checkbox][checked=checked]', bDiv1).length == 1) {
				$('input[type=checkbox][checked=checked]', bDiv1).each(function() {
					if ($(this).attr("checked")) {
						var editId = this.value;
						var sim_id = $("#sim_id", "#bind_combo").val(); 
						if(sim_id){
							$.ajax({
								type : 'post',
								async : false,
								contentType : 'application/json',
								dataType : 'json',
								url : '../../../preload/updateCombo',
								data : JSON.stringify({
									sim_id : sim_id,
									combo_id :editId
								}),
								success : function(data) {
									if (data) {
										if (data.success) {
											$(document).sgWindow('close', {id : 'bind_combo'});
											$('#monitoring').sgDatagrid('reload', 'sgDatagrid');
										}
										$(document).sgPup({message:'message_alert',text: data.msg});
									}
								},
								error : function(res, error) {
									alert("responseText=" + res.responseText + ";error=" + error);
								}
							});
							
						}
					}
				});
			} 
		
		
	}
	
/*	var savePayFee = function() {
		// 保存服务项
		var params = {};
		var url = '../../../paymentSim/add';
		params.sim_id = $('#sim_id', '#pay_fee').val();
		params.combo_id = $('#combo_id', '#pay_fee').val();
		params.unit_id = $('#unit_id', '#pay_fee').val();
		params.s_date = $('#s_date', '#pay_fee').val();
		params.e_date = $('#e_date', '#pay_fee').val();
		params.s_months= $('#s_months', '#pay_fee').val();
		params.s_days= $('#s_days', '#pay_fee').val();
		params.ac_amount= $('#ac_amount', '#pay_fee').val();
		params.remark= $('#remark', '#pay_fee').val();
		 if(!params.s_months && !params.s_days ){
			 $(document).sgPup({message:'message_info',text: "请输入缴费时间！"});
			 	return false;
		 }
		
		$(document).sgConfirm(
				{
					text : '确定保存吗?',
					cfn : function(r) {
						if (r) {
							$.ajax({
								type : 'post',
								async : false,
								contentType : 'application/json',
								dataType : 'json',
								url : url,
								data : JSON.stringify(params),
								success : function(data) {
									if (data) {
										if (data.success) {

											$(document).sgWindow('close', {
												id : 'pay_fee'
											});
										}
										$(document).sgPup({
											message : 'message_alert',
											text : data.msg
										});
									}
								},
								error : function(res, error) {
									alert(res.responseText);
								}
							});
						}
					}
				});
		$('#pay_fee').unbind(); // 以下两行可以阻止提交2次，暂时注释，也不会提交2次
		return false;
	};
	*/
	
	
	var modifyCard = function() {
		// 保存服务项
		var params = {};
		var url = '../../../preload/modifyCard';
		var sim_id = $('#sim_id', '#preload_modifyCard').val();
		params.sim_id = sim_id;
		params.iccid = $('#iccid', '#preload_modifyCard').val();
		params.imsi = $('#imsi', '#preload_modifyCard').val();
		params.akey = $('#akey', '#preload_modifyCard').val();
		params.esn = $('#esn', '#preload_modifyCard').val();
		params.w_user = $('#w_user', '#preload_modifyCard').val();
		params.w_password = $('#w_password', '#preload_modifyCard').val();
		params.call_letter = $('#call_letter', '#preload_modifyCard').val();
		params.imei = $('#imei', '#preload_modifyCard').val();
		params.telco = $('#telco', '#preload_modifyCard').val();
		params.s_date = $('#s_date', '#preload_modifyCard').val();
		params.remark = $('#remark', '#preload_modifyCard').val();
		 
		 if(!params.call_letter || !params.imei){
			 $(document).sgPup({message:'message_info',text: "呼号与IMEI信息不能为空！"});
			 	return false;
		 }
		 
		
		$(document).sgConfirm(
				{
					text : '确定补卡吗?',
					cfn : function(r) {
						if (r) {
							$.ajax({
								type : 'post',
								async : false,
								contentType : 'application/json',
								dataType : 'json',
								url : url,
								data : JSON.stringify(params),
								success : function(data) {
									if (data) {
										if (data.success) {
											$(document).sgWindow('close', {
												id : 'preload_modifyCard'
											});
											$('#monitoring').sgDatagrid(
													'reload', 'sgDatagrid');
										}
										$(document).sgPup({
											message : 'message_alert',
											text : data.msg
										});
									}
								},
								error : function(res, error) {
									alert(res.responseText);
								}
							});
						}
					}
				});

		$('#preload_modifyCard').unbind(); // 以下两行可以阻止提交2次，暂时注释，也不会提交2次
		return false;
	};
	
	
	
	var save = function() {
		// 保存服务项
		var params = {};
		var url = '../../../preload/add';
		var sim_id = $('#sim_id', '#preload_add').val();
		if(sim_id){
			params.sim_id = sim_id;
		    url = '../../../preload/update';
		}
		params.iccid = $('#iccid', '#preload_add').val();
		params.imsi = $('#imsi', '#preload_add').val();
		params.akey = $('#akey', '#preload_add').val();
		params.esn = $('#esn', '#preload_add').val();
		params.w_user = $('#w_user', '#preload_add').val();
		params.w_password = $('#w_password', '#preload_add').val();
		params.call_letter = $('#call_letter', '#preload_add').val();
		params.imei = $('#imei', '#preload_add').val();
		params.telco = $('#telco', '#preload_add').val();
		params.s_date = $('#s_date', '#preload_add').val();
		
		params.barcode = $('#barcode', '#preload_add').val();
		params.unittype_id = $('#unittype_id', '#preload_add').val();
		
		params.vin = $('#vin', '#preload_add').val();
		params.engine_no = $('#engine_no', '#preload_add').val();
		params.color = $('#color', '#preload_add').val();
		params.remark = $('#remark', '#preload_add').val();
		params.production_date = $('#production_date', '#preload_add').val();
		
		 if(params.vin && params.vin.length != 17){
			 $(document).sgPup({message:'message_info',text: "请输入长度为17位的车架号！"});
	         	   return false;
	       }
		 
		 if(!params.call_letter && !params.imei && !params.barcode && !params.vin){
			 $(document).sgPup({message:'message_info',text: "SIM卡、车辆与车台信息不能全部为空！"});
			 	return false;
		 }
		 
		
		$(document).sgConfirm(
				{
					text : '确定保存该SIM卡信息吗?',
					cfn : function(r) {
						if (r) {
							$.ajax({
								type : 'post',
								async : false,
								contentType : 'application/json',
								dataType : 'json',
								url : url,
								data : JSON.stringify(params),
								success : function(data) {
									if (data) {
										if (data.success) {

											$(document).sgWindow('close', {
												id : 'add_preload'
											});
											$(document).sgWindow('close', {
												id : 'modify_preload'
											});
											$('#monitoring').sgDatagrid(
													'reload', 'sgDatagrid');
										}
										$(document).sgPup({
											message : 'message_alert',
											text : data.msg
										});
									}
								},
								error : function(res, error) {
									alert(res.responseText);
								}
							});
						}
					}
				});

		$('#modify_preload').unbind(); // 以下两行可以阻止提交2次，暂时注释，也不会提交2次
		$('#add_preload').unbind(); 
		return false;
	};
	
	
	
	

	var bindComboItem = function() {
		var obj = $('#monitoring');
		var bDiv = $('.bDiv', obj);
		if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length > 1) {
			$(document).sgPup({
				message : 'message_info',
				text : "只能选择一条记录！"
			});
		} else if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length == 0) {
			$(document).sgPup({
				message : 'message_info',
				text : "请选择一个选项！"
			});
		} else if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length == 1) {
			$('input[type=checkbox][checked=checked]', bDiv).each(function() {
				if ($(this).attr("checked")) {
					editId = this.value;
					editObj = $(this).data('data');
					if(editObj.unit_id){
						 $(document).sgPup({message:'message_info',text: "已入网SIM卡，不能在此更换套餐！"});
					}else{
						var defaults = {
								title : '更换套餐',
								id : 'bind_combo',
								form : 'bind_combo_form',
								url : 'bind_combo.html',
								success : loadSuccess_bind,
								width : 570,
								height : 380,
								buttons : [ {
									name : '保存',
									type : 'submit',
									onpress : saveBind,
								}, {
									name : '关闭',
									onpress : winClose3,
								} ]
							};
						$(document).sgWindow(defaults);
						
					}
					
					
				}
			});
		} else {
			$(document).sgPup({
				message : 'message_info',
				text : "请选择一个选项！"
			});
		}

	}

	var payItem = function() {
		var obj = $('#monitoring');
		var bDiv = $('.bDiv', obj);
		if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length > 1) {
			$(document).sgPup({
				message : 'message_info',
				text : "只能选择一条记录！"
			});
		} else if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length == 0) {
			$(document).sgPup({
				message : 'message_info',
				text : "请选择一个选项！"
			});
		} else if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length == 1) {
			$('input[type=checkbox][checked=checked]', bDiv).each(function() {
				if ($(this).attr("checked")) {
					editId = this.value;
					editObj = $(this).data('data');
						var defaults = {
								title : 'SIM卡缴费',
								id : 'pay_fee',
								form : 'pay_fee_form',
								url : 'pay_fee.html',
								success : loadSuccess_pay,
								width : 630,
								height : 400,
								buttons : [ /*{
									name : '保存',
									type : 'submit',
									onpress : savePayFee,
								}, {
									name : '关闭',
									onpress : winClose4,
								} */]
							};
						$(document).sgWindow(defaults);
				}
			});
		} else {
			$(document).sgPup({
				message : 'message_info',
				text : "请选择一个选项！"
			});
		}

	}

	

	var addItem = function() {// 添加服务项
		var defaults = {
			title : 'SIM卡信息',
			id : 'add_preload',
			form : 'preload_form',
			url : 'preload_add.html',
			width : 730,
			height : 415,
			buttons : [ {
				name : '保存',
				type : 'submit',
				onpress : save,
			}, {
				name : '关闭',
				onpress : winClose1,
			} ]
		};
		$(document).sgWindow(defaults);
	}
	

	var importItem = function() {// 添加服务项
		var defaults = {
			title : 'SIM卡导入',
			id : 'import_sim',
			form : 'sim_import_form',
			url : 'sim_import.html',
			width : 300,
			height : 149,
			buttons : [ 
			            {name: '确定', type: 'submit', onpress : subImport},
			            {name : '关闭',onpress : winClose_import}
			          ]
		};
		$(document).sgWindow(defaults);
	}
	
	function isvalidatefile(obj){
        var extend = obj.substring(obj.lastIndexOf(".") + 1);
        //$(document).sgPup({message:'message_info',text: extend);
        if (extend == "") {
        } else {
            if (!(extend.toLocaleLowerCase() == "xls")) {
                $(document).sgPup({message:'message_info',text: "请上传后缀名为xls的文件!"});
                return false;
            }
        }
        return true;
    }

	
	
    function subImport(){
    	if($("#type").val()== 1 && $('#telco').val() == ''){
    		 $(document).sgPup({message:'message_info',text: '请选择SIM卡运营商!'});
             $('#telco').focus();
             return false;
    	}
    	
        if ($('#sim_file').val() == '') {
            $(document).sgPup({message:'message_info',text: '请选择上传导入文件!'});
            $('#sim_file').focus();
            return false;
        }else{
            var file=$('#sim_file')[0];
            var files=file.files;
            if(files){
                var filesLength=files.length;
                if(filesLength>50){
                    $(document).sgPup({message:'message_info',text: '一次性最多上传50个文件!'});
                        $('#sim_file').focus();
                    return false;
                }
                var isGoOn=true;
                for(var i=0;i<filesLength;i++){
                    if(!isvalidatefile(files[i].name)){
                        isGoOn=false;
                        break;
                    }
                }
                if(!isGoOn){
                  return false;
                }

            }
        }
        var mask=$('<div id="imp_mask"></div>');
        mask.addClass('window-mask');
        mask.css('z-index',Number($('div.window').css('z-index'))+1);//如果有弹出窗口，则将遮罩层置为最上层
        var span=$('<span></span>');
        span.css({position:'absolute',left:$(window).outerWidth()/2-80,top:$(window).outerHeight()/2-60,color:'red','font-size':'x-large','font-weight':'bold'});
        span.text('正在导入中...请稍作休息！');
        mask.append(span);
        $(document.body).append(mask);
        if(isGoOn){
            $("#sim_import").submit();
        }
    }
	
	
    var endItem = function(){
        var obj = $('#monitoring');
        var bDiv = $('.bDiv',obj);

        if($('input[type=checkbox][checked=checked]',bDiv)!=null&&$('input[type=checkbox][checked=checked]',bDiv).length==0){
            $(document).sgPup({message:'message_info',text: "请选择一个选项！"});
        }else if($('input[type=checkbox][checked=checked]',bDiv)!=null&&$('input[type=checkbox][checked=checked]',bDiv).length>0){
       	 $(document).sgConfirm({text: '确定作废吗?',cfn:function(r){ 
		    if(r){
     		var flag = true;
     		var pids=[];
     		$('input[type=checkbox][checked=checked]',bDiv).each(function(){
	                if($(this).attr("checked")){    
	                	editId=this.value;
	                	editobj = $(this).data('data');
	                	if(editobj.flag != 3){
	                		$(document).sgPup({message:'message_info',text: "只有已销号的SIM卡才能作废处理！"});
	                		flag = false;
	                	}else{
	                		pids.push(editobj.sim_id);
	                	}
	                }	
	            });
     		if(flag){
     			//打开窗口
            	$.ajax( {
					  type : 'post', 
            		  async: false,   
            		  dataType : 'json',     
            		  url : '../../../preload/operate',   
            		  data:{ids:pids,type:9},
            		  success : function(data) {
            			  if(data){
            				 if(data.success){
            					 $(document).sgPup({message:'message_info',text: "操作成功！"});
            				 }else{
            					 $(document).sgPup({message:'message_info',text: "操作失败！"});
            				 }
            			  }
            		  } ,     
            		  error : function(res,error) { 
            		  	     if(res && res.responseText){ $(document).sgPup({message:'message_info',text: res.responseText});}     
            		  }    
            		}); 
     		}
     		$('#monitoring').sgDatagrid('reload','sgDatagrid');
     	}	
     	 }});
       	 
        }
    }
    
    
    var comesItem = function(){
        var obj = $('#monitoring');
        var bDiv = $('.bDiv',obj);

        if($('input[type=checkbox][checked=checked]',bDiv)!=null&&$('input[type=checkbox][checked=checked]',bDiv).length==0){
            $(document).sgPup({message:'message_info',text: "请选择一个选项！"});
        }else if($('input[type=checkbox][checked=checked]',bDiv)!=null&&$('input[type=checkbox][checked=checked]',bDiv).length>0){
       	 $(document).sgConfirm({text: '确定申请生效吗?',cfn:function(r){ 
		    if(r){
     		var flag = true;
     		var pids=[];
     		$('input[type=checkbox][checked=checked]',bDiv).each(function(){
	                if($(this).attr("checked")){    
	                	editId=this.value;
	                	editobj = $(this).data('data');
	                	if(editobj.combo_status != 2){
	                		$(document).sgPup({message:'message_info',text: "只有变更套餐的SIM卡才能申请生效！"});
	                		flag =false;;
	                	}else{
	                		pids.push(editobj.sim_id);
	                	}
	                }	
	                
	            });
     		if(flag){
        	//打开窗口
        	$.ajax( {
				  type : 'post', 
        		  async: false,   
        		  dataType : 'json',     
        		  url : '../../../preload/operateCombo',   
        		  data:{ids:pids,type:0},
        		  success : function(data) {
        			  if(data){
        				 if(data.success){
        					 $(document).sgPup({message:'message_info',text: "操作成功！"});
        				 }else{
        					 $(document).sgPup({message:'message_info',text: "操作失败！"});
        				 }
        			  }
        		  } ,     
        		  error : function(res,error) { 
        		  	     if(res && res.responseText){ $(document).sgPup({message:'message_info',text: res.responseText});}     
        		  }    
        		}); 
     		}
     		$('#monitoring').sgDatagrid('reload','sgDatagrid');
     	}	
     	 }});
       	 
        }
    }
        
        

	
    var registerItem = function(){
        var obj = $('#monitoring');
        var bDiv = $('.bDiv',obj);

        if($('input[type=checkbox][checked=checked]',bDiv)!=null&&$('input[type=checkbox][checked=checked]',bDiv).length==0){
            $(document).sgPup({message:'message_info',text: "请选择一个选项！"});
        }else if($('input[type=checkbox][checked=checked]',bDiv)!=null&&$('input[type=checkbox][checked=checked]',bDiv).length>0){
       	 $(document).sgConfirm({text: '确定销号吗?',cfn:function(r){ 
		    if(r){
     		var flag = true;
     		var pids=[];
     		$('input[type=checkbox][checked=checked]',bDiv).each(function(){
	                if($(this).attr("checked")){    
	                	editId=this.value;
	                	editobj = $(this).data('data');
	                	if(editobj.flag != 2){
	                		$(document).sgPup({message:'message_info',text: "销号操作只能针对已停机的SIM卡！"});
	                		flag =false;;
	                	}else{
	                		pids.push(editobj.sim_id);
	                	}
	                }
	                if(flag){
		                	//打开窗口
		                	$.ajax( {
           					  type : 'post', 
			            		  async: false,   
			            		  dataType : 'json',     
			            		  url : '../../../preload/operate',   
			            		  data:{ids:pids,type:3},
			            		  success : function(data) {
			            			  if(data){
			            				 if(data.success){
			            					 $(document).sgPup({message:'message_info',text: "操作成功！"});
			            				 }else{
			            					 $(document).sgPup({message:'message_info',text: "操作失败！"});
			            				 }
			            			  }
			            		  } ,     
			            		  error : function(res,error) { 
			            		  	     if(res && res.responseText){ $(document).sgPup({message:'message_info',text: res.responseText});}     
			            		  }    
			            		}); 
     		}
	                
	            });
     		$('#monitoring').sgDatagrid('reload','sgDatagrid');
     	}	
     	 }});
       	 
        }
    }
    
    
    
    var openItem = function(){
        var obj = $('#monitoring');
        var bDiv = $('.bDiv',obj);

        if($('input[type=checkbox][checked=checked]',bDiv)!=null&&$('input[type=checkbox][checked=checked]',bDiv).length==0){
            $(document).sgPup({message:'message_info',text: "请选择一个选项！"});
        }else if($('input[type=checkbox][checked=checked]',bDiv)!=null&&$('input[type=checkbox][checked=checked]',bDiv).length>0){
       	 $(document).sgConfirm({text: '确定激活吗?',cfn:function(r){ 
		    if(r){
     		var flag = true;
     		var pids=[];
     		$('input[type=checkbox][checked=checked]',bDiv).each(function(){
	                if($(this).attr("checked")){    
	                	editId=this.value;
	                	editobj = $(this).data('data');
	                	if(editobj.flag != 2){
	                		$(document).sgPup({message:'message_info',text: "只能对停机保号状态的SIM卡作激活操作！"});
	                		flag = false;
	                	}else{
	                		pids.push(editobj.sim_id);
	                	}
	                }	
	                if(flag){
		                	//打开窗口
		                	$.ajax( {
           					  type : 'post', 
			            		  async: false,   
			            		  dataType : 'json',     
			            		  url : '../../../preload/operate',   
			            		  data:{ids:pids,type:1},
			            		  success : function(data) {
			            			  if(data){
			            				 if(data.success){
			            					 $(document).sgPup({message:'message_info',text: "操作成功！"});
			            				 }else{
			            					 $(document).sgPup({message:'message_info',text: "操作失败！"});
			            				 }
			            			  }
			            		  } ,     
			            		  error : function(res,error) { 
			            		  	     if(res && res.responseText){ $(document).sgPup({message:'message_info',text: res.responseText});}     
			            		  }    
			            		}); 
	                }
	            });
     		
     		
     		$('#monitoring').sgDatagrid('reload','sgDatagrid');
     	}	
     	 }});
       	 
        }
    }
        
       
	
	
	var modifyItem = function() {
		var obj = $('#monitoring');
		var bDiv = $('.bDiv', obj);
		if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length > 1) {
			$(document).sgPup({
				message : 'message_info',
				text : "只能选择一条记录！"
			});
		} else if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length == 0) {
			$(document).sgPup({
				message : 'message_info',
				text : "请选择一个选项！"
			});
		} else if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length == 1) {
			$('input[type=checkbox][checked=checked]', bDiv).each(function() {
				if ($(this).attr("checked")) {
					editId = this.value;
					editObj = $(this).data('data');
					var defaults = {
						title : 'SIM卡编辑',
						id : 'modify_preload',
						form : 'preload_form',
						url : 'preload_add.html',
						success : loadSuccess,
						width : 730,
						height : 415,
						buttons : [ {
							name : '保存',
							type : 'submit',
							onpress : save
						}, {
							name : '关闭',
							onpress : winClose2
						} ]
					};
					$(document).sgWindow(defaults);
				}
			});
		} else {
			$(document).sgPup({
				message : 'message_info',
				text : "请选择一个选项！"
			});
		}

	}
	
	
	var modifyCardItem = function() {
		var obj = $('#monitoring');
		var bDiv = $('.bDiv', obj);
		if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length > 1) {
			$(document).sgPup({
				message : 'message_info',
				text : "只能选择一条记录！"
			});
		} else if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length == 0) {
			$(document).sgPup({
				message : 'message_info',
				text : "请选择一个选项！"
			});
		} else if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length == 1) {
			$('input[type=checkbox][checked=checked]', bDiv).each(function() {
				if ($(this).attr("checked")) {
					editId = this.value;
					editObj = $(this).data('data');
					var defaults = {
						title : '补卡',
						id : 'preload_modifyCard',
						form : 'preload_modifyCard_form',
						url : 'preload_modifyCard.html',
						success : loadSuccess_modifyCard,
						width : 620,
						height : 246,
						buttons : [ {
							name : '保存',
							type : 'submit',
							onpress : modifyCard
						}, {
							name : '关闭',
							onpress : winClose5
						} ]
					};
					$(document).sgWindow(defaults);
				}
			});
		} else {
			$(document).sgPup({
				message : 'message_info',
				text : "请选择一个选项！"
			});
		}

	}



 	var height = 380;
 	//初始化表格
 	var defaults = {
 		        title: "SIM卡管理",
 		        width:  '970',
 		        height: height,
 		        rownumbers:true,
 		        usepager: true,
 		        url:'../../../preload/findPreloadByPage',
 		        useRp: true,
 		        colid:'id',  //主键
 		        colModel : [
 		                {display: '呼号', name : 'call_letter', width : '11%', sortable : false},
						{display: 'IMEI/MEID', name : 'imei', width : '13%', sortable : false},
						{display: '运营商', name : 'telco', width : '6%', sortable : true,formatter:function(value,row){
    	  	                if(value==1){
    	  	                    value = '移动';
    	  	                }else if(value==2){
    	  	                    value = '联通';
    	  	                }else{
    	  	                	 value = '电信';
    	  	                }
    	  	                return value;
    	  	            }},
						{display: 'TBOX条码', name : 'barcode', width : '13%', sortable : false},
						{display: '车架号', name : 'vin', width : '14%', sortable : false},
						{display: '车辆颜色', name : 'color', width : '7%', sortable : false},
						{display: '是否入网', name : 'unit_id', width : '7%', sortable : true,formatter:function(value,row){
	  	  	                if(value==0){
	  	  	                    value = '否';
	  	  	                }else {
	  	  	                    value = '是';
	  	  	                }
	  	  	                return value;
	  	  	            }},
						{display: 'SIM卡状态', name : 'flag', width : '8%', sortable : true,formatter:function(value,row){
    	  	                if(value==0){
    	  	                    value = '未激活';
    	  	                }else if(value==1){
    	  	                    value = '激活';
    	  	                }else if(value ==2){
    	  	                	 value = '停机';
    	  	                }else if(value ==3){
    	  	                	 value = '销号';
    	  	                }else if(value ==9){
    	  	                	 value = '删除';
    	  	                }
    	  	                return value;
    	  	            }},
    	  	          {display: '套餐状态', name : 'combo_status', width : '7%', sortable : true,formatter:function(value,row){
  	  	                if(value==0){
  	  	                    value = '未生效';
  	  	                }else if(value==1){
  	  	                    value = '生效';
  	  	                }else if(value ==2){
  	  	                	 value = '变更申请';
  	  	                }else if(value ==3){
  	  	                	 value = '变更失败';
  	  	                }else if(value ==9){
  	  	                	 value = '删除';
  	  	                }
  	  	                return value;
  	  	            }},
						{display: '缴费时间', name : 's_date', width : '8%', sortable : false}
 		        ],
 		       buttons : [ 
 		         {name: '添加',bclass : 'add',onpress : addItem},
 		         {name: '导入',bclass : 'import',onpress : importItem}, 
 		 	     {name: '编辑',bclass : 'edit',onpress : modifyItem},
 				 {name: '作废', bclass: 'delete', onpress : endItem},
 				 {name: '销号', bclass: 'register', onpress : registerItem},
 				 {name: '激活', bclass: 'jihuo', onpress : openItem},
 				 {name: '补卡', bclass: 'editCard', onpress : modifyCardItem},
 				 {name: '生效', bclass: 'shengxiao', onpress : comesItem},
 				 {name: '更换套餐', bclass: 'bind', onpress : bindComboItem},
 				 {name: '缴费', bclass: 'pay', onpress : payItem}
	             ],
 		        searchitems :[
 		                      {display:'<span style="padding-left:12px;">呼号</span>',name:'call_letter',type:'text',width:'140'},
 		                      {display:'<span style="padding-left:20px;">IMEI/MEID</span>',name:'imei',type:'text',width:'140'},
 		                      {display:'<span style="padding-left:20px;">车架号</span>',name:'vin',type:'text',width:'140'},
 		                      {display:'<span style="padding-left:20px;">TBOX条码</span>',name:'barcode',type:'text',width:'140'},
 		                      {display:'运营商',name:'telco',html:'<select style="width:145px"  name="telco"><option value="" selected>请选择...</option><option value="1">移动</option><option value="2">联通</option><option value="3">电信</option></select>'},
 		                      {display:'<span style="padding-left:20px;">SIM卡状态</span>',name:'flag',html:'<select style="width:145px"  name="flag"><option value="" selected>请选择...</option><option value="1">激活</option><option value="2">停机</option><option value="3">销号</option><option value="9">删除</option></select>'},
 		                      {display:'<span style="padding-left:7px;">套餐状态</span>',name:'combo_status',html:'<select style="width:145px"  name="combo_status"><option value="" selected>请选择...</option><option value="0">未生效</option><option value="1">生效</option><option value="2">变更申请</option><option value="3">变更失败</option></select>'}
 		    		        ],
 		    		       // exporturl:'../../policy/exportExcelPolicysNew',
 		      		     	order:true,
 		      		        sortname: "stamp",
 		      		        sortorder: "desc"
 		    };
 		    $('#monitoring').sgDatagrid(defaults);
 		    
})(jQuery);