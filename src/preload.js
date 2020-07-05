// 입력폼에 적힌 내용을 서버에 보내 저장
function saveForm(){}

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