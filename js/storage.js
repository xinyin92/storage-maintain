// storage.js
$(function (){

	/**
	 * 日期选择插件使用格式统一设置
	 * @type {Object}
	 */
	var dateFomat={
		format: "yyyy-mm-dd",
	    minView: 2,
	    language:"zh-CN",
        autoclose: true,
        todayBtn: true
	};

	var popFormat={
		html: true,
		content: function(){
			return $("#popContent").html();
		}
	};
	/**
	 * 期初值录入表添加一行
	 * @param {String} tid [期初值录入表ID]
	 */
	function addTr(tid) {
		var $tbody = $("#"+tid+" tbody");
		var tr = $tbody.find("tr").last().html();
		$tbody.append("<tr>"+tr+"</tr>");
	}

	/**
	 * 期初值录入表删除一行
	 */
	function removeTr(){
		var $tr = $(this).parent().parent();
		var lastTrIdx = $("#iniProTabel>tbody>tr:last").index();
		if(lastTrIdx === 0){
			 $("div.ini-prod>table").addClass("hide");
			 $("#addConfirmBtn").addClass("hide");
		}else{
			$tr.remove();
		}		
	}

	
	/**
	 * 在表格中编辑数据
	 */
	function editData(){
		var $nextAll=$(this).nextAll();
		$(this).addClass("hide");
		$nextAll.removeClass("hide");
		$("a.confirmTd").bind("click", confirmData);
	}

	/**
	 * 在popover中修改产品名
	 */
	function confirmPopData($popRoot){
		var str;
		var $prev=$(this).prev();
		str=$prev.find("option:selected").text();
		$popRoot.text(str);
		
	}

	/**
	 * 确认表格中编辑的数据
	 */
	function confirmData(){
		var str;
		var $prev=$(this).prev();
		var $editable=$(this).siblings(".editable");

		if($prev[0].nodeName==="SELECT"){
			str=$prev.find("option:selected").text();
		}else{
			if ($prev.val()!=="") {
				str=$prev.val();
			}else{
				str="点击编辑";
			}			
		}
		$editable.text(str).removeClass("hide")
				.siblings().addClass("hide");
	}

	/**
	 * 表格中的checkbox全部改为全选状态
	 * @param  {String} tid 表格ID
	 */
	// function checkAll(tid){
	// 	var $allCheckbox=$(tid+" tbody tr td").find("input[type=checkbox]");
	// 	if($(this).prop("checked")==="true"){
	// 		$allCheckbox.prop("checked", true);
	// 	}else{			
	// 		$allCheckbox.prop("checked", false);
	// 	}		
	// }

	////////////////
	// 期初值录入 //
	////////////////

	//期初值录入日期设置
	$("#initialDate").datetimepicker(dateFomat);
	$("#initialDate").on("click",function(){
			$(this).datetimepicker("setEndDate", new Date());  //期初值录入日期不能晚于当前日期
	});
	
	//添加一行期初值录入行
	$("#newTrBtn").on("click", function(){
		var idx = $("div.ini-prod>table.hide").index();
		if (idx !== -1) {
			$("#iniProTabel").removeClass("hide");
			$("#addConfirmBtn").removeClass("hide");
		}else{
			addTr("iniProTabel");
			var $a=$("#iniProTabel>tbody>tr:last>td>a.removeTr");
			$a.bind("click", removeTr);
			// $("span.editable").bind("click",editData);
			$(".pop-editable").popover(popFormat);			
			$("[data-toggle='popover']").popover();
		} 
	});

	//删除一行
	$("a.removeTr").on("click", removeTr);

	//点击编辑
	//popover编辑产品	
	$(".pop-editable").popover(popFormat);
	$("[data-toggle='popover']").popover();
	// $(".pop-editable").on("click",editData);

	//表格上直接编辑数量
	$("span.editable").on("click",editData);

	//确认录入期初值
	$("#addConfirmBtn").on("click",function () {
		$("div.ini-prod>table").addClass("hide");
		$("#addConfirmBtn").addClass("hide");
	});


	//////////////
	// 入库管理 //
	//////////////
	
	//查询日期范围设置
	$("#startDate").datetimepicker(dateFomat);
	$("#endDate").datetimepicker(dateFomat);

	$("#startDate").on("click",function(){
			$(this).datetimepicker("setEndDate", $("#endDate").val());
	});

	$("#endDate").on("click",function(){
			$(this).datetimepicker("setStartDate", $("#startDate").val());
			$(this).datetimepicker("setEndDate", new Date());
	});

	//全选
	// $("#checkAll").on("click", function(){
	// 	checkAll("#inStoTable")
	// });
	



});