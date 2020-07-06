/**************************************************************************
 * AJAX 서비스 영역                                                     *
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
 * 입력폼 서비스 영역                                                     *
 **************************************************************************/
// 입력폼에 적힌 내용을 서버에 보내 저장
function saveForm(){
    const userInput = form.querySelectorAll("input,textarea");
    let mesStr = "";
    for(let i=0; i<userInput.length; ++i){
        mesStr += userInput[i].value.replace(/"/g, '\\"') + '"';
    }

    ajaxPipe({
        method: 'POST',
        url: '/save',
        message: mesStr
    },
    (xhr)=>{/** 성공 메세지 띄우기 & 출력한 내용 변경하기 */},
    (xhr)=>{/** 실패 메세지 띄우기 */}
    );
}

// 입력폼에 적힌 모든 내용 지우기
function clearForm(){
    // 비워져 있지 않을 경우 확인한 후 지우기
    if(!isFormEmpty() && confirm("적혀진 내용이 존재합니다.\n정말로 적혀진 내용을 지웁니까?")){
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
    for(let i=0; i<5; ++i){
        switch(i){
            case 0: userInput[i].value = presentNow.getFullYear(); break;
            case 1: userInput[i].value = presentNow.getMonth()+1; break;
            case 2: userInput[i].value = presentNow.getDate(); break;
            case 3: userInput[i].value = presentNow.getHours(); break;
            case 4: userInput[i].value = presentNow.getMinutes(); break;
        }
    }
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
 * 출력폼 서비스 영역                                                     *
 **************************************************************************/
// [임시] 읽어온 내용 출력하기
 function read(){
    ajaxPipe({
        method: 'GET',
        url: '/read'
    },
    (xhr)=>{console.log(xhr.responseText);}
    );
}