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
    var homeTemplate = fs.readFileSync('./index.html', 'utf-8');
    res.send(homeTemplate);
})


// 정적 파일 제공
app.use('/src', express.static('src'));

/** 앱 리스닝 **/
app.listen(appInfo.port, ()=>{
    console.log(`App listening at "http://localhost:${appInfo.port}"`);
})