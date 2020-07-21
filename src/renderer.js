// 전역변수 설정
const form = document.getElementById("madang-form");

// 이벤트 바인딩
function addListener(){
    //// 입력 영역
    const saveFormBtn = document.querySelector(".madang-bar>.save");
    saveFormBtn.onclick = saveForm;
    const clearFormBtn = document.querySelector(".madang-bar>.clear");
    clearFormBtn.onclick = clearForm;
    const setFormBtn = document.querySelector(".madang-bar>.set");
    setFormBtn.onclick = setForm;

    //test ******************************
    document.getElementsByClassName('header')[0].lastElementChild.onclick = read;
    createTable({
        rows: 2, // 아이템 index 종류리스트
        cols: ['시간', '장소', '목적', '대상', '금액', '결제방식', '비고'], // 속성 index 종류리스트
        contents: ['1','2','3','4','5','6','7','8','9'], // 내용 나열리스트
        checkable: false,
        editable: false
    });
}
addListener();