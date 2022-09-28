# 커픽 Cupick
---
> 커픽 Cupick은 계량 없이 이미지만 보고 만들 수 있는 
카페 레시피를 확인하고 공유하는 서비스입니다.

Git : [https://github.com/Sample-99](https://github.com/Sample-99)  
FE : https://github.com/cupicks/cupicks-fe  
BE : https://github.com/cupicks/cupicks-be  
팀 노션: https://global-giraffe-ef7.notion.site/3-73c1cc9c739a481fa92192ba7676811f  

---

## 0. 그라운드 룰

### 꼭 지켜주세요⚖

- 서로 존중하며 소통하기!

### 모이는 시간⏰

- 전체 모이는 시간: 
	- `평일 22시`
- 프론트 진행 상황 나누는 시간:
	- `평일 11시`
- 백엔드 진행 상황 나누는 시간: 
	- `평일 11시`
- 개발 진행 상황 나누는 시간:
	- `화&목 21시 30분`  그리고 `토 14시 (피드백 이후) ~`
---

## 1. 개발팀 Git 사용 룰

### Git 사용 전략 `Git Flow 전략`
- 레퍼런스 : [https://overcome-the-limits.tistory.com/7](https://overcome-the-limits.tistory.com/7)
- 사전 정보
  - 선아님 :
    - `develop` 와 `feature/login`, `bugfix/login` 브런치를 PR 하고 완료 시 삭제  
  - 원석님 :
     - 위와 동일  
  - 창용님 : 
     - `submain` 과 `dev/작업자명` 유지 한 상태로 지속적으로 PR 을 한 것 
  - 민석님 :
     - `develop` 와 `feature/login` , `bugfix/login` , `refactor/login` , `module/testing-lib`  
  - 승근님 : 
     - 위와 동일  

```
목적에 맞는 브런치 생성

해당 브런치에서 작업 진행
해당 브런치에서 작업 완료 시 PR 을 통해서 develop 으로 병합
병합 이후에는 해당 브런치 삭제
```

`package-lock.json` 이 충돌이 나실 때,

마지막에 `npm i 모듈명` 하신 분의 `package-lock.json` 에서 **기존의 모듈들** 은 그대로 있고 추가로 **설치한 모듈** 만 달라집니다.
그래서, `npm i` 를 해버리면 **모든 모듈** 이 업데이트가 되기 떄문에 가장 안정적인 버전이 `npm i 모듈명` 를 한 사람의 로컬 PC 에 있는 package-lock.json 이 최신입니다.

```
선아님이 npm i axios 를 진행
창용님이 npm i 를 해서 package-lock.json 이 달라지거나 충돌이 났을 경우
창용님은 충돌난 시점에
	선아님의 package-lock.json 전달 받으시고 충돌난 파일 다 지우고 덮어씌우시면
	문제가 해결됩니다.
```

### 2. 브런치 명명법
- main
- develop
- feature/기능명~컴포넌트명
- bugfix/기능명-컴포넌트명
- module/모듈-목적
    - 단수의 경우라면 해당 모듈의 이름
    - 복수의 경우라면 공통된 특징
- refactor/기능명-컴포넌트명
> 일단, 돌아가게 만들어놓은 코드를 여러 가지 이유로 같은 기능을 하되, 조금 더 좋은 방식으로 고치는 작업
>

---

### 3. 커밋 명명법

- Create 파일 생성
- Update 파일 수정
- `Refactor` 대상과 목적
- `Bug-Fix` 대상과 목적
- `Docs` : 문서작업 `[README.md](http://README.md)` 같은 것을 수정 했을 때, …
- `Comment` : 주석 `//` 생성 하거나 수정하는 것 작업 만 진행하실 때, …

### 4. ISSUE, PR, *pull request* 명명법

#### 버그 리포트
![image](https://user-images.githubusercontent.com/94776135/188368100-c205657b-aa3e-4ede-8af1-64bef52a5020.png)

#### 문서 리포트
![image](https://user-images.githubusercontent.com/94776135/188368338-659679f3-7831-4358-8721-d4c6323b56cc.png)

#### PR 양식  
![image](https://user-images.githubusercontent.com/94776135/188368212-bec93eb4-67f9-422d-8d82-2b383396094d.png)

---
## 5. 프로젝트 진행 사항

### 전체 회의록(노션) 
https://www.notion.so/3432686ad26b46e2bfe38bfa8fc3a5da?v=f3b01dabbced45f08f3b616f4b83646c

### 주차별 기술 멘토링 마일스톤
https://github.com/cupicks/cupicks-fe/milestone/1