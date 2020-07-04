# 기본 시스템 기능

저장은 기본적으로 frontend와 backend의 동시 변경을 기능한다.
frontend의 신호와 내용이 backend로 보내지고
backend에서 변경을 성공적으로 완료하면 frontend에 신호를 보내고
    frontend를 변경한다.
backend에서 변경을 실패하면 frontend에 신호, 오류내용을 보내고
    frontend에서는 오류상황을 알리고 미변경

구현종류
1. 저장
   1. 추가
   2. 변경
   3. 제거

읽기는 대량의 정보를 fontend의 변경을 기능한다.
frontend에서 신호를 보내면 backend에서 해당 내용들을 보냅니다.

구현종류
2. 읽기
   1. 나열
      1. 토큰(일반/압축) 나열
      2. 테이블 나열