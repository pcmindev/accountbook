function createTable(para={
    rows: null, // 아이템 index 종류리스트
    cols: null, // 속성 index 종류리스트
    contents: [], // 내용 나열리스트
    checkable: false,
    editable: false
}){
    if(para.contents === undefined) para.contents = [];
    if(para.checkable === undefined) para.checkable = false;
    if(para.editable === undefined) para.editable = false;

    // 데이터 전처리
    // 적절하지 않은 자료형일 경우 -1 반환
    // 초기화가 되지 않을 경우 -2 반환
    let rowlen;
    let collen;
    switch(typeof(para.rows)){
        case 'undefined':
            try { rowlen = para.contents.length; }
            catch (err) { return -1; }
            break;
        case 'number':
            rowlen = para.rows;
            para.rows = null;
            break;
        case 'object':
            if(Array.isArray(para.rows)) rowlen = para.rows.length;
            else if(para.rows === null) return -2;
            else return -1;
            break;
        default: return -1;
    }
    switch(typeof(para.cols)){
        case 'undefined': collen = 1; break;
        case 'number':
            collen = para.cols;
            para.cols = null;
            break;
        case 'object':
            if(Array.isArray(para.cols)) collen = para.cols.length;
            else return -1;
            break;
        default: return -1;
    }

    const newTable = document.createElement('table');
    newTable.classList.add('mt')
    let tmpTr = null;
    let tmpTd = null;

    if(para.cols !== null && para.cols.length !== 0){
        tmpTr = document.createElement('tr');
        //// 맨 윗줄 속성이름 나열
        if(para.rows !== null && para.rows.length !== 0){
            // 구분표시
            tmpTd = document.createElement('th');
            tmpTd.innerHTML = '#';
            tmpTr.appendChild(tmpTd);
        }
        // 속성표시
        for(let i=0; i<collen; ++i){
            tmpTd = document.createElement("th");
            tmpTd.innerHTML = para.cols[i];
            tmpTr.appendChild(tmpTd);
        }
        newTable.appendChild(tmpTr);
    }

    //// 내용값 나열
    for(let i=0; i<rowlen; ++i){
        tmpTr = document.createElement('tr');
        if(para.rows !== null && para.rows.length !== 0){
            // 종류 인덱스 표시
            tmpTd = document.createElement('th');
            tmpTd.innerHTML = para.rows[i];
            tmpTr.appendChild(tmpTd);
        }
        // 내용값 표시
        for(let j=0; j<collen; ++j){
            tmpTd = document.createElement('td');
            
            const cell = document.createElement('div');
            cell.classList.add('cell');
            // checkable 기능
            if(para.checkable){
                cell.classList.add('btnbox');
                cell.dataset.checkstate = 0;
                const checkEvent = 'click'
                //cell.addEventListener(checkEvent, (ev)=>{});
            }
            // editable 기능
            if(para.editable){
                const editEvent = 'dblclick'
                //cell.addEventListener(editEvent, (ev)=>{});
            }
            // 내용 할당
            if(i*collen+j < para.contents.length) cell.innerHTML = para.contents[i*collen+j];
            // 내용이 존재하지 않을 경우 => 칸에 슬래시 긋기
            else{
                tmpTd.style.background = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray"/></svg>')`;
                // backslash: background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="100%" y2="100%" stroke="gray"/></svg>');}
            };
            tmpTd.appendChild(cell);
            tmpTr.appendChild(tmpTd);
        }
        newTable.appendChild(tmpTr);
    }
    // 초기화
    document.getElementById('namoo').innerHTML = "";
    // 테이블 추가
    document.getElementById('namoo').appendChild(newTable);
}