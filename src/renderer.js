// 전역변수 설정
const form = document.getElementById("madang-form");

// 이벤트 바인딩
function addListener(){
    const saveFormBtn = document.querySelector(".madang-bar>.save");
    saveFormBtn.onclick = saveForm;
    const clearFormBtn = document.querySelector(".madang-bar>.clear");
    clearFormBtn.onclick = clearForm;
    const setFormBtn = document.querySelector(".madang-bar>.set");
    setFormBtn.onclick = setForm;
}
addListener();