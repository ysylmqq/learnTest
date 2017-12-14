(function($) {	
	
	var loadSuccess_modifyCard = function() {
		
		// 填充修改页面编辑前的值
		if (editId && editObj) {
			$("#sim_id", "#preload_modifyCard").val(editObj.sim_id);
		}
		editId = null;
		editObj = null;
	}
	
	
	
	

	var winClose1 = function() {// 关闭添加页面
		$(document).sgWindow('close', {
			id : 'add_upgrade'
		});
	}

	

	
	
	var save = function() {
		
		var call_letters = [];
		var is_all = 0;
		var obj = $('#monitoring');
		var bDiv = $('.bDiv', obj);
		var ids = document.getElementsByName("checkall");
        var flag = false ;               
        for(var i=0;i<ids.length;i++){
             if(ids[i].checked){
                 flag = true ;
                 break ;
             }
         }
         if(!flag){
             $('input[type=checkbox][checked=checked]', bDiv).each(function() {
   				if ($(this).attr("checked")) {
   					call_letters.push($(this).data('data').call_letter);
   					// alert($(this).data('data').call_letter);
   				}
   			});
         }else{
        	 is_all = 1;
         }
		
		// 保存
		var params = {};
		var urladd = '../../../upgrade/add';
		params.ip = $('#ip', '#upgrade_add').val();
		params.port = $('#port', '#upgrade_add').val();
		params.ug_ver = $('#ug_ver', '#upgrade_add').val();
		params.is_all =is_all;
		params.call_letters =call_letters;
		
		if(!params.port ){
			 $(document).sgPup({message:'message_info',text: "升级服务器端口不能为空！"});
			 	return false;
		 }
		 
		if(!params.ug_ver ){
			 $(document).sgPup({message:'message_info',text: "升级版本号不能为空！"});
			 	return false;
		 }
		
		 if(!params.ip ){
			 $(document).sgPup({message:'message_info',text: "升级服务器ip不能为空！"});
			 	return false;
		 }
		 
		
		$(document).sgConfirm(
				{
					text : '确定保存该升级信息吗?',
					cfn : function(r) {
						if (r) {
							$.ajax({
								type : 'post',
								async : false,
								contentType : 'application/json',
								dataType : 'json',
								url : urladd,
								data : JSON.stringify(params),
								success : function(data) {
									if (data) {
										if (data.success) {

											$(document).sgWindow('close', {
												id : 'add_upgrade'
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
		$('#add_upgrade').unbind(); 
		return false;
	};
	
	
	
	

	var addItem = function() {
		var obj = $('#monitoring');
		var bDiv = $('.bDiv', obj);
		if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length == 0) {
			$(document).sgPup({
				message : 'message_info',
				text : "请选择一个选项！"
			});
		} else if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length >= 1) {
					var defaults = {
							title : '升级',
							id : 'add_upgrade',
							form : 'upgrade_form',
							url : 'upgrade_add.html',
							width : 360,
							height : 145,
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

	}

	var cancelItem = function() {

		var call_letters = [];
		var is_all = 0;
		var obj = $('#monitoring');
		var bDiv = $('.bDiv', obj);
		var ids = document.getElementsByName("checkall");
        var flag = false ;               
        for(var i=0;i<ids.length;i++){
             if(ids[i].checked){
                 flag = true ;
                 break ;
             }
         }
         if(!flag){
             $('input[type=checkbox][checked=checked]', bDiv).each(function() {
   				if ($(this).attr("checked")) {
   					call_letters.push($(this).data('data').call_letter);
   					// alert($(this).data('data').call_letter);
   				}
   			});
         }else{
        	 is_all = 1;
         }
		
		// 保存
		var params = {};
		var url = '../../../upgrade/cancel';	
		params.is_all =is_all;
		params.call_letters =call_letters;
		
		if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length == 0) {
			$(document).sgPup({
				message : 'message_info',
				text : "请选择一个选项！"
			});
		} else if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length >= 1) {
			$(document).sgConfirm(
						{
							text : '确定取消升级吗?',
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

				}
						

	}
	
	// 查询配置指令
	var confItem = function() {

		var call_letters = [];
		var is_all = 0;
		var obj = $('#monitoring');
		var bDiv = $('.bDiv', obj);
		var ids = document.getElementsByName("checkall");
        var flag = false ;               
        for(var i=0;i<ids.length;i++){
             if(ids[i].checked){
                 flag = true ;
                 break ;
             }
         }
         if(!flag){
             $('input[type=checkbox][checked=checked]', bDiv).each(function() {
   				if ($(this).attr("checked")) {
   					call_letters.push($(this).data('data').call_letter);
   					// alert($(this).data('data').call_letter);
   				}
   			});
         }else{
        	 is_all = 1;
         }
		
		// 保存
		var params = {};
		var url = '../../../upgrade/confCommand';	
		params.is_all = is_all;
		params.call_letters =call_letters;
		
		if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length == 0) {
			$(document).sgPup({
				message : 'message_info',
				text : "请选择一个选项！"
			});
		} else if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length >= 1) {
			$(document).sgConfirm(
						{
							text : '确定下发查询配置指令吗?',
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
													$('#monitoring').sgDatagrid('reload', 'sgDatagrid');
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

				}
	}
	
	var searchItem = function() {

		var call_letters = [];
		var is_all = 0;
		var obj = $('#monitoring');
		var bDiv = $('.bDiv', obj);
		var ids = document.getElementsByName("checkall");
        var flag = false ;               
        for(var i=0;i<ids.length;i++){
             if(ids[i].checked){
                 flag = true ;
                 break ;
             }
         }
         if(!flag){
             $('input[type=checkbox][checked=checked]', bDiv).each(function() {
   				if ($(this).attr("checked")) {
   					call_letters.push($(this).data('data').call_letter);
   					// alert($(this).data('data').call_letter);
   				}
   			});
         }else{
        	 is_all = 1;
         }
		
		// 保存
		var params = {};
		var url = '../../../upgrade/searchCommand';	
		params.is_all =is_all;
		params.call_letters =call_letters;
		
		if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length == 0) {
			$(document).sgPup({
				message : 'message_info',
				text : "请选择一个选项！"
			});
		} else if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length >= 1) {
			$(document).sgConfirm(
						{
							text : '确定下发查车唤醒终端吗?',
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

				}
	}
	
	var importItem = function() {// 导入
		var defaults = {
			title : '升级资料导入',
			id : 'import_upgrade',
			form : 'upgrade_importForm',
			url : 'upgrade_import.html',
			width : 360,
			height : 149,
			buttons : [ 
			            {name: '确定', type: 'submit', onpress : subImport},
			            {name : '关闭',onpress : winClose_import}
			          ]
		};
		$(document).sgWindow(defaults);	
}

	var winClose_import = function() {// 关闭添加页面
		$(document).sgWindow('close', {
			id : 'import_upgrade'
		});
	}
	function isvalidatefile(obj){
        var extend = obj.substring(obj.lastIndexOf(".") + 1);
        // $(document).sgPup({message:'message_info',text: extend);
        if (extend == "") {
        } else {
            if (!(extend.toLocaleLowerCase() == "xls")) {
                $(document).sgPup({message:'message_info',text: "请上传后缀名为xls的文件!"});
                return false;
            }
        }
        return true;
    }

	
	
    var subImport = function(){
    	
        if ($('#upgrade_file').val() == '') {
            $(document).sgPup({message:'message_info',text: '请选择上传导入文件!'});
            $('#upgrade_file').focus();
            return false;
        }else{
            var file=$('#upgrade_file')[0];
            var files=file.files;
            if(files){
                var filesLength=files.length;
                if(filesLength>50){
                    $(document).sgPup({message:'message_info',text: '一次性最多上传50个文件!'});
                        $('#upgrade_file').focus();
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
        mask.css('z-index',Number($('div.window').css('z-index'))+1);// 如果有弹出窗口，则将遮罩层置为最上层
        var span=$('<span></span>');
        span.css({position:'absolute',left:$(window).outerWidth()/2-80,top:$(window).outerHeight()/2-60,color:'red','font-size':'x-large','font-weight':'bold'});
        span.text('正在导入中...请稍作休息！');
        mask.append(span);
        $(document.body).append(mask);
        
        /*
		 * var paramsimport = {}; var urlimport =
		 * '../../../upgrade/importUpgrade'; paramsimport.ip = $('#ip',
		 * '#upgrade_import').val(); paramsimport.port = $('#port',
		 * '#upgrade_import').val(); paramsimport.upgrade_file =
		 * $('#upgrade_file', '#upgrade_import').val(); $(document).sgConfirm( {
		 * text : '确定保存该升级信息吗?', cfn : function(r) { if (r) { $.ajax({ type :
		 * 'post', async : false, contentType : 'application/json', dataType :
		 * 'json', url : urlimport, data : JSON.stringify(paramsimport), success :
		 * function(data) { if (data) { if (data.success) {
		 * 
		 * $(document).sgWindow('close', { id : 'import_upgrade' });
		 * $('#monitoring').sgDatagrid( 'reload', 'sgDatagrid'); }
		 * $(document).sgPup({ message : 'message_alert', text : data.msg }); } },
		 * error : function(res, error) { alert(res.responseText); } }); } } });
		 * $('#upgrade_import').unbind(); return false;
		 */
        if(isGoOn){
            $("#upgrade_import").submit();
           
        }
    }    
    
    /**
	 * 开启反控指令选项
	 * 
	 * @returns
	 */
    function openItem(){
    	var obj = $('#monitoring');
		var bDiv = $('.bDiv', obj);

		if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length == 0) {
				$(document).sgPup({
					message : 'message_info',
					text : "请至少选择一个选项！"
				});
		} else if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length >= 1) {
			
			$('input[type=checkbox][checked=checked]', bDiv).each(function() {
   				if ($(this).attr("checked")) {
   					console.log($(this).data('data'));
   				}
   			});
			
			$(document).sgConfirm({text: '确定开启所选sim卡的反控指令吗?',cfn:function(r){ 
			    if(r){
			    	var simIds='';
			    	$('input[type=checkbox][checked=checked]',bDiv).each(function(){
		                if($(this).attr("checked")){    
		                	var editobj = $(this).data('data');
		                	simIds+=editobj.sim_id+',';
		                }
		            });
			    	if(simIds !=null && simIds != ''){
			    		simIds = simIds.substr(0,simIds.length -1);
			    	}
			    	var params = {};
			    	params.simIds=simIds,
			    	params.opType=1;			    			
			    	
			    	
	     			// 发送打开反控指令请求
	            	$.ajax({
						  type : 'post', 
	            		  async: false,   
	            		  dataType : 'json',     
	            		  url : '../../../fccmdManage/updateFankongCmd',
	            		  data:JSON.stringify(params),
	            		  contentType : 'application/json',
	            		  success : function(data) {
	            			  console.log(data);
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
	            	
	     		$('#monitoring').sgDatagrid('reload','sgDatagrid');
			    }
			  }
		    });
		}
    };
    /**
	 * 关闭反控指令选项
	 * 
	 * @returns
	 */
    function closeItem(){
    	var obj = $('#monitoring');
		var bDiv = $('.bDiv', obj);

		if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length == 0) {
				$(document).sgPup({
					message : 'message_info',
					text : "请至少选择一个选项！"
				});
		} else if ($('input[type=checkbox][checked=checked]', bDiv) != null
				&& $('input[type=checkbox][checked=checked]', bDiv).length >= 1) {
			
			$('input[type=checkbox][checked=checked]', bDiv).each(function() {
   				if ($(this).attr("checked")) {
   					console.log($(this).data('data'));
   				}
   			});
			
			$(document).sgConfirm({text: '确定关闭所选sim卡的反控指令吗?',cfn:function(r){ 
			    if(r){
			    	var simIds='';
			    	$('input[type=checkbox][checked=checked]',bDiv).each(function(){
		                if($(this).attr("checked")){    
		                	var editobj = $(this).data('data');
		                	simIds+=editobj.sim_id+',';
		                }
		            });
			    	if(simIds !=null && simIds != ''){
			    		simIds = simIds.substr(0,simIds.length -1);
			    	}
			    	var params = {};
			    	params.simIds=simIds,
			    	params.opType=0;			    			
			    	
			    	
	     			// 发送关闭反控指令请求
	            	$.ajax({
						  type : 'post', 
	            		  async: false,   
	            		  dataType : 'json',     
	            		  url : '../../../fccmdManage/updateFankongCmd',
	            		  data:JSON.stringify(params),
	            		  contentType : 'application/json',
	            		  success : function(data) {
	            			  console.log(data);
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
	            	
	     		$('#monitoring').sgDatagrid('reload','sgDatagrid');
			    }
			  }
		    });
		}
    }
	
 	var height = '100%';
 	// 初始化表格
 	var defaults = {
				title: "反控指令管理",
				width:  '100%',
				height: height,
				rownumbers:true,
				rowList:[20,50,100],
				usepager: true,
				url:'../../../fccmdManage/getAllSimPage',
 		        useRp: true,
 		        colid:'id',  // 主键
 		        colModel : [ 		                
						{display: '车载号码', name : 'callLetter',width : '20%',align:'center',  sortable : false},
						{display: 'IMEI号', name : 'imei',width : '20%',align:'center',sortable : false},
						{display: '车架号', name : 'vin',width : '20%',align:'center',  sortable : false},
						{display: '终端类型', name : 'unitType', width : '20%',align:'center', sortable : false},
						{display: '反控指令状态', name : 'remoteCtrlStatus', width : '15%',align:'center', sortable : false,formatter:function(value,row){
							   var statusStr = '其他';
							   if(value != null && value == 1){
									statusStr='开启';
								}else if(value != null && value ==0 ){
									statusStr='关闭';
								}else{
									statusStr='其他';
								}
							   return statusStr;
							}
						}
 		        ],
 		       buttons : [
 		    	  {name: '开启',bclass : 'open',onpress : openItem},
			      {name: '关闭',bclass : 'close',onpress : closeItem}
 		       ],
		 	   searchitems : [
				{
					display : '<span style="padding-left:2px;">IMEI号</span>',
					name : 'imei',
					type : 'text',
					width : '100'
				},
				{
					display : '<span style="padding-left:20px;">车载号码</span>',
					name : 'callLetter',
					type : 'text',
					width : '110'
				},
				{
					display : '<span style="padding-left:24px;">终端类型</span>',
					name : 'unitTypeId',
					type : 'text',
					width : '140'
				},				
				{
					display : '<span style="padding-left:2px;">反控指令状态</span>',
					name : 'flag',
					html : '<select style="width:80px"  name="remoteCtrlStatus"><option value="1">开启</option><option value="0">关闭</option></select>'
				}]
 				//,exporturl:'../../../upgrade/exportUpgrade'
 		    };
		
	    $('#monitoring').sgDatagrid(defaults);
	    
	    
		$.ajax({
			  type : 'post', 
			  async: true,   
			  contentType : 'application/json',     
			  dataType : 'json',     
			  url : '../../../upgrade/getUpgradeList',   
			  data:JSON.stringify({}),
			  success : function(data) {
				  if(data){
					  var companys = data;
					  if(companys.length>0){
						     $("#companyDataList").empty();
					  		companyDataList = {};
					   }
					  $.each( companys, function(key,value){
						  var op = $("<option></option>");
						  op.val(value.cur_ver);
						  $("#companyDataList").append(op);
						  
						  companyDataList[value.cur_ver]=value.id;
						});
					  
					  // $("#companyName").on('keyup',stockCompany);
					  $("#cur_ver").on('change',function(){
						    var strs = this.value.split(" ");
						    if(companyDataList[strs[strs.length-1]]){
						    	$(this).val(strs[strs.length-1]);
								
								$("#subcoNo").val(companyDataList[strs[strs.length-1]]);
								
								if($("#subcoNo").val().length==0){
									$("#cur_ver").val("");
								}
						    }else{
						    	$(this).val('');
						    	$("#subcoNo").val("");
						   }
						});
					  
				  }else{
					  $(document).sgPup({message:'message_info',text: data});
				  }
			  } ,     
			  error : function(res,error) { 
			  	     if(res && res.responseText){ $(document).sgPup({message:'message_info',text: res.responseText});}     
			  }
		});
 		    
})(jQuery);