var rABS = true; // T : 바이너리, F : 어레이 버퍼

var tempInfo = new Array();
var IntentInfo = new Array();
var dicList = new Array();
var statusCode = {
		"200" : "객체생성 완료",
		"500" : "업로드한 파일이 없습니다.",
		"501" : "파일 업로드 중입니다.",
		"502" : "오류 수정 후 재업로드 바랍니다."
};
var status = "500";

// 어레이 버퍼를 처리한다 ( 오직 readAsArrayBuffer 데이터만 가능하다 )
function fixdata(data) {
	var o = "", l = 0, w = 10240;
	for (; l < data.byteLength / w; ++l)
		o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
	o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
	return o;
}

// 데이터를 바이너리 스트링으로 얻는다.
function getConvertDataToBin($data) {
	var arraybuffer = $data;
	var data = new Uint8Array(arraybuffer);
	var arr = new Array();
	for (var i = 0; i != data.length; ++i)
		arr[i] = String.fromCharCode(data[i]);
	var bstr = arr.join("");
	return bstr;
}

function handleFile(e) {
	var files = e.target.files;
	var i, f;
	for (i = 0; i != files.length; ++i) {
		f = files[i];
		var reader = new FileReader();
		var name = f.name;
		reader.onload = function(e) {
			var data = e.target.result;
			var workbook;
			if (rABS) {
				/* if binary string, read with type 'binary' */
				workbook = XLSX.read(data, {
					type : 'binary'
				});
			}
			else {
				/* if array buffer, convert to base64 */
				var arr = fixdata(data);
				workbook = XLSX.read(btoa(arr), {
					type : 'base64'
				});
			}// end. if
			/* 워크북 처리 */
			$("#first_sheet_check").html("");
			$("#first_sheet_output").html("");
			$("#second_sheet_check").html("");
			$("#second_sheet_output").html("");

			console.log(JSON.stringify(workbook));
			workbook.SheetNames.forEach(function(item, index, array) {

				var json = XLSX.utils.sheet_to_json(workbook.Sheets[item]);
// var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[item]);
// var html = XLSX.utils.sheet_to_html(workbook.Sheets[item]);
// var formulae = XLSX.utils .sheet_to_formulae(workbook.Sheets[item]);

				console.log(JSON.stringify(json));

				if (index == 1) { // 첫번째 시트

					var err = 0;
					nullCHKIntentSheet(json).forEach(function(item, index, array) {
						err++;
						$("#first_sheet_output").append("<font color='red'>" + item + "</font>");
						console.log(item, index);
					});
					synCHKIntentSheet(json).forEach(function(item, index, array) {
						err++;
						$("#first_sheet_output").append("<font color='red'>" + item + "</font>");
						console.log(item, index);
					});
					$("#first_sheet_check").append(
								"<h3>" + item + " sheet </h3>" + " 전체 " + json.length + "건, 성공 "
											+ (json.length - err) + "건, 실패 " + err + "건" + "<br>");
					err == 0 ? setIntentSheet(json) : status = "502";

				}
				else if (index == 2) { // 두번째 시트
					var err = 0;
					nullCHKDicSheet(json).forEach(function(item, index, array) {
						err++;
						$("#second_sheet_output").append("<font color='red'>" + item + "</font>");
						console.log(item, index);
					});
					synCHKDicSheet(json).forEach(function(item, index, array) {
						err++;
						$("#second_sheet_output").append("<font color='red'>" + item + "</font>");
						console.log(item, index);
					});
					$("#second_sheet_check").append(
								"<h3>" + item + " sheet </h3>" + " 전체 " + json.length + "건, 성공 "
											+ (json.length - err) + "건, 실패 " + err + "건" + "<br>");

					err == 0 ? setIntentDataforReg(json) : status = "502";

				}
			});// end. forEach
		}; // end onload

		if (rABS)
			reader.readAsBinaryString(f);
		else
			reader.readAsArrayBuffer(f);

	}// end. for
}
function nullCHKIntentSheet(json) {
	var logmsg = new Array();

	for (var i = 0; i < json.length; i++) {
		if (!(json[i].hasOwnProperty('Function'))) {
			logmsg.push((i + 2) + "행 A열 : \'Function\' 항목 누락" + "<br>");
		}
		else if (!(json[i].hasOwnProperty('Intent'))) {
			logmsg.push((i + 2) + "행 B열 : \'Intent\' 항목 누락" + "<br>");
		}
		else if (!(json[i].hasOwnProperty('Example'))) {
			logmsg.push((i + 2) + "행 C열 : \'Example\' 항목 누락" + "<br>");
		}
	}
	return logmsg;
}

function synCHKIntentSheet(json) {
	var logmsg = new Array();
	var regExp = /[`~!@#$%^&*\\\'\";:\/?]/gi;
	for (var i = 0; i < json.length; i++) {
		if (json[i].hasOwnProperty('Function') && regExp.test(json[i]['Function'])) {
			logmsg.push((i + 2) + "행 A열 : \'Function\' 항목 구문오류" + "<br>");
		}
		else if (json[i].hasOwnProperty('Intent') && regExp.test(json[i]['Intent'])) {
			logmsg.push((i + 2) + "행 B열 : \'Intent\' 항목 구문오류" + "<br>");
		}
		else if (json[i].hasOwnProperty('Example') && regExp.test(json[i]['Example'])) {
			logmsg.push((i + 2) + "행 C열 : \'Example\' 항목 구문오류" + "<br>");
		}
	}
	return logmsg;
}

function nullCHKDicSheet(json) {
	var logmsg = new Array();

	for (var i = 0; i < json.length; i++) {
		if (!(json[i].hasOwnProperty('Parameter'))) {
			logmsg.push((i + 2) + "행 A열 : \'Parameter\' 항목 누락" + "<br>");
		}
		else if (!(json[i].hasOwnProperty('식별값'))) {
			logmsg.push((i + 2) + "행 B열 : \'식별값\'  항목 누락" + "<br>");
		}
	}
	return logmsg;
}

function synCHKDicSheet(json) {
	var logmsg = new Array();
	var regExp = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
	for (var i = 0; i < json.length; i++) {
		if (json[i].hasOwnProperty('Parameter') && regExp.test(json[i]['Parameter'])) {
			logmsg.push((i + 2) + "행 A열 : '\Function\' 항목 구문오류" + "<br>");
		}
		else if (json[i].hasOwnProperty('식별값') && regExp.test(json[i]['식별값'])) {
			logmsg.push((i + 2) + "행 B열 : \'Intent\' 항목 구문오류" + "<br>");
		}
	}
	return logmsg;
}

function setIntentSheet(json) { // 인텐트 정의
	for (var i = 0; i < json.length; i++) {
		var intentObj = new Object();
		var from = json[i]['Example'].indexOf('{') + 1;
		var to = json[i]['Example'].indexOf('}');
		var dicNames = (from == 0 || to == -2) ? dicNames = json[i]['Example']
					: dicNames = json[i]['Example'].substring(from, to);

		intentObj["desc"] = json[i]['Function'];
		intentObj["id"] = json[i]['Intent'];
		intentObj["ex"] = dicNames;
		tempInfo.push(intentObj);
	}
	//console.log(JSON.stringify(tempInfo));
}

function getDicList(extra, dicjson) { // 어휘 정의
	var owndicList = new Array();
	var pivot = extra.split('|');

	for (var i = 0; i < pivot.length; i++) {
		var dicObj = new Object();
		dicObj['dicName'] = pivot[i];
		var wordList = new Array();
		for (var j = 0; j < dicjson.length; j++) {
			if (pivot[i] == dicjson[j]['Parameter']) {
				var wordObj = new Object();
				wordObj['word'] = dicjson[j]['식별값'];
				wordList.push(wordObj);
			}
			dicObj['wordList'] = wordList;
		}
		owndicList.push(dicObj);
	}
	//console.log(JSON.stringify(owndicList));
	return owndicList;
}

function setIntentDataforReg(json) { // 전송 데이터 merge
	for (var i = 0; i < tempInfo.length; i++) {
		var IntentObj = new Object();
		IntentObj['id'] = tempInfo[i]['id'];
		IntentObj['desc'] = tempInfo[i]['desc'];
		IntentObj['dicList'] = getDicList(tempInfo[i]['ex'], json);
		IntentInfo.push(IntentObj);
		status = "200";
	}
	// console.log(JSON.stringify(IntentInfo));
}

function getIntentDataforReg() {
	var sendParam = new Object();
	sendParam['resCode'] = status;
	sendParam['resMSG'] = statusCode[status];
	sendParam['resData'] = IntentInfo;
	console.log(JSON.stringify(IntentInfo));
	return sendParam;
}

var input_dom_element;
$(function() {
	input_dom_element = document.getElementById('my_file_input');
	if (input_dom_element.addEventListener) {
		input_dom_element.addEventListener('change', handleFile, false);
	}
});
