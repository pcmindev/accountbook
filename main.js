const fs = require('fs');
const express = require('express');
const app = express();

/**
 * appInfo
 * 
 * 앱 바탕 정보를 저장합니다.
 */
const appInfo = {
    port : 5000
}

/**
 * host/
 * 
 * 메인 홈페이지 : index.html
 */
app.get('/', (req, res)=>{
    const homeTemplate = fs.readFileSync('./index.html', 'utf-8');
    res.send(homeTemplate);
});

/**
 * host/save/
 * 
 * 저장 내용 보내는 주소
 */
app.post('/save', (req, res)=>{

});

/**
 * host/read/
 * 
 * 읽기 내용 보내는 주소
 */
app.post('/read', (req, res)=>{

});

// 스트립트 소스
app.use('/src', express.static('src'));

/** 앱 리스닝 **/
app.listen(appInfo.port, ()=>{
    console.log(`App listening at "http://localhost:${appInfo.port}"`);
})