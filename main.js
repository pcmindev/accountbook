const fs = require('fs');
const express = require('express');
const app = express();

/**
 * appInfo
 * 
 * 앱 바탕 정보를 저장합니다.
 */
const appInfo = {
    port : 5000,
    saveItemDirPath : './data/',
    saveItemFileName : 'item.json',
    saveItemExist : 0
}

// 주요 디렉토리 기본값인지 확인
fs.stat(appInfo.saveItemDirPath, (err)=>{
    if(err){
        // 디렉토리 미존재 => 생성
        if(err.code === 'ENOENT'){
            console.log(`Create nessary directory: ${appInfo.saveItemDirPath}`);
            fs.mkdirSync(appInfo.saveItemDirPath, (err)=>{if(err) throw err;});
        }
        else throw err;
    }
    // 디렉토리 존재
    // 주요 파일이 기본값인지 확인
    fs.stat(appInfo.saveItemDirPath + appInfo.saveItemFileName, (err)=>{
        if(err){
            // 주요 파일 미존재 => 생성
            if(err.code === 'ENOENT'){
                console.log(`Create Save file: ${appInfo.saveItemDirPath + appInfo.saveItemFileName}`);
                fs.writeFile(appInfo.saveItemDirPath + appInfo.saveItemFileName, '', 'utf-8', (err)=>{if(err) throw err;});
            }
            else throw err;
        }
        // 주요파일 존재
        else appInfo.saveItemExist = 1;
    });
});

/**************************************************************************
 * 앱 서버 서비스 영역                                                     *
 **************************************************************************/

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
    let body = '';
    req.on('data', (data)=>{body += data});
    req.on('end', ()=>{
        console.log(1, body.split(/(?<!\\)"/g));
        res.send()
    });
});

/**
 * host/read/
 * 
 * 읽기 내용 보내는 주소
 */
app.get('/read', (req, res)=>{

});

// 스트립트 소스
app.use('/src', express.static('src'));

/** 앱 리스닝 **/
app.listen(appInfo.port, ()=>{
    console.log(`App listening at "http://localhost:${appInfo.port}"`);
})