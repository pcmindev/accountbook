/**************************************************************************
 * 안내 메세지 서비스 영역
 **************************************************************************/
 // 메세지 표시 함수
function showMessage(str, type = 0){
    const msgNode = document.getElementsByClassName('footer')[0];
    // 경고 메세지일 경우
    if(type === 1) msgNode.innerHTML = `<span style='color:red'>[경고]${str}</span>`;
    // 주의 메세지일 경우
    else if(type === 2) msgNode.innerHTML = `<span style='color:yellow'>[주의]${str}</span>`;
    // 일반 메세지
    else msgNode.innerHTML = `<span>${str}</span>`;

    // 2초뒤 해당 내용 지워짐
    setTimeout(()=>{msgNode.innerHTML = "";}, 2000);
}

/**************************************************************************
 * AJAX 서비스 영역
 **************************************************************************/
/** parameter: xhr
 * xhr <= instantof XMLHttpRequest()
 * xhr.para = obj : 원명령 객체
 *   obj.method = "GET","POST": 요청방식
 *   obj.url = 주소
 *   obj.message = POST로 보낼 문자
 **/
function ajaxPipe(
    obj,
    successCallback=((xhr)=>{console.log("SUCCESS", xhr.status, xhr.obj)}),
    failCallback=((xhr)=>{console.log("FAIL", xhr.status, xhr.obj)})
)
{
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){successCallback(this);}
            else{failCallback(this);}
        }
    }
    xhr.para = obj;
    xhr.open(obj.method, obj.url, true);
    if(obj.method==="POST") xhr.send(obj.message);
    else xhr.send();
}

/**************************************************************************
 * 입력폼 서비스 영역
 **************************************************************************/
// 입력폼에 적힌 내용을 서버에 보내 저장
function saveForm(){
    const userInput = form.querySelectorAll("input,textarea");
    let msgStr = "";
    for(let i=0; i<userInput.length; ++i){
        // 각 요소마다 '&'로 묶기
        msgStr += userInput[i].value.replace(/&/g, '\\&');
        if(i != userInput.length-1) msgStr += '&';
    }

    ajaxPipe({
        method: 'POST',
        url: '/save',
        message: msgStr
    },
    (xhr)=>{/** 성공 메세지 띄우기 & 출력한 내용 변경하기 */},
    (xhr)=>{/** 실패 메세지 띄우기 */}
    );
}

// 입력폼에 적힌 모든 내용 지우기
function clearForm(){
    // 비워져 있지 않을 경우 확인한 후 지우기
    if(!isFormEmpty() && confirm("적혀진 내용이 존재합니다.\n정말로 적혀진 모든 내용을 지웁니까?")){
        const userInput = form.querySelectorAll("input,textarea");
        for(let i=0; i<userInput.length; ++i){
            userInput[i].value = "";
        }
    }
}

// 입력폼의 시간을 현 시간으로 설정
function setForm(){
    const userInput = form.querySelectorAll("input,textarea");
    const presentNow = new Date();
    userInput[0].value = presentNow.getFullYear();
    userInput[1].value = presentNow.getMonth()+1;
    userInput[2].value = presentNow.getDate();
    userInput[3].value = presentNow.getHours();
    userInput[4].value = presentNow.getMinutes();
}

// 입력폼이 비워져있는지 확인합니다.
function isFormEmpty(){
    const userInput = form.querySelectorAll("input,textarea");
    for(let i=0; i<userInput.length; ++i){
        if(userInput[i].value != "") return false;
    }
    return true;
}

/**************************************************************************
 * 출력폼 서비스 영역
 **************************************************************************/
// [임시] 읽어온 내용 출력하기
function read(){
    ajaxPipe({
        method: 'GET',
        url: '/read'
    },
    (xhr)=>{
        document.getElementById('namoo').innerHTML = formitize(xhr.responseText);
    });
}

// test ************************************************
function formitize(contentStr){
    // 각 아이템 '`'로 분류
    let content = contentStr.split(/(?<!\\)`/g)
    // 각 아이템 요소 '&'로 분류
    content.forEach((ele, idx, arr) => {
        arr[idx] = arr[idx].split(/(?<!\\)&/g)
    });

    let str = '';
    for(let i=0; i<content.length; ++i){
        str += '<div>'
        for(let j=0; j<content[i].length; ++j){
            str += `<div>${content[i][j].replace(/\\`/g, '`').replace(/\\&/g, '&')}</div>`;
        }
        str += '</div>'
    }
    return str;
}