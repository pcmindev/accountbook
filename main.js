const fs = require('fs');
const express = require('express');
const app = express();

/**
 * appInfo
 * 
 * 앱 바탕 정보를 저장합니다.
 */
const appInfo = {
    // 서버 포트 번호
    port : 5000,
    // 시스템 디렉토리/파일/환경변수
    sysDirPath : './data/',
    sysFileName : ['item.json'],
    sysExist : [0],
    // 의사기능semantic feature sign 변환convert to 해당파일주소related file path
    sysPath : function(sign){
        switch (sign) {
            case 0: case'save': return this.sysDirPath+this.sysFileName[0];
            default: if(sign < this.sysFileName.length) return this.sysDirPath+this.sysFileName[sign];
        }
    },
    // 의사기능semantic feature sign 변환convert to 색인신호index sign
    sysSign : function(signChar){
        switch (signChar) {
            case 'save': return 0;
            default: return -1;
        }
    }
}

// 주요 디렉토리 기본값인지 확인
// 존재하는지 확인후 미존재일 경우 자동생성
fs.stat(appInfo.sysDirPath, (err)=>{
    if(err){
        // 디렉토리 미존재 => 생성
        if(err.code === 'ENOENT'){
            console.log(`Create nessary directory: ${appInfo.sysDirPath}`);
            fs.mkdirSync(appInfo.sysDirPath, (err)=>{if(err) throw err;});
        }
        else throw err;
    }
    // 디렉토리 존재
    // 주요 파일이 기본값인지 확인
    for(let i=0; i<appInfo.sysFileName.length; ++i){
        fs.stat(appInfo.sysPath(i), (err, stats)=>{
            if(err){
                // 주요 파일 미존재 => 생성
                if(err.code === 'ENOENT'){
                    console.log(`Create nessary file: ${appInfo.sysPath(i)}`);
                    fs.writeFile(appInfo.sysPath(i), '', 'utf-8', (err)=>{if(err) throw err;});
                }
                else throw err;
            }
            // 주요파일 존재
            else{
                if(i === 0 && stats.size === 0) appInfo.sysExist[i] = 2; // 빈파일일 경우 2
                else appInfo.sysExist[i] = 1;
            }
        });
    }
});

/**************************************************************************
 * 앱 서버 서비스 영역
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
        // 아이템끼리의 구분은 '`'으로 분류
        // 빈 파일이 아닌 경우
        if(appInfo.sysExist[appInfo.sysSign('save')] !== 2) body = '`'+body.replace(/`/g, '\\`');

        fs.appendFile(appInfo.sysPath('save'), body, (err)=>{
            if(err){
                res.status(404).send();
                throw err;
            }
            res.send();
        });
    });
});

/**
 * host/read/
 * 
 * 읽기 내용 보내는 주소
 */
app.get('/read', (req, res)=>{
    if(appInfo.sysExist[appInfo.sysSign('save')] !== 0){
        // 모든 내용 보내기
        fs.readFile(appInfo.sysPath('save'), (err, data)=>{
            if(err){
                res.status(404).send();
                throw err;
            }
            
            // 전송 전 전처리
            // 맨 처음이나 끝에 아이템 구분자가 있을 경우 이를 삭제
            body = body.replace(/^`/g, '').replace(/`$/g, '');

            res.send(data);
            console.log("Send All Item");
        });
    }
    // 파일에 내용이 없을 경우
    else res.send();
});

// 스트립트 소스
app.use('/src', express.static('src'));

/** 앱 리스닝 **/
app.listen(appInfo.port, ()=>{
    console.log(`App listening at "http://localhost:${appInfo.port}"`);
})