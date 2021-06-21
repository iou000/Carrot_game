# Carrot_game

### 순수 자바스크립트로 만든 당근뽑기 게임

게임 링크 : https://kimseop-game1.netlify.app/

![당근게임](https://user-images.githubusercontent.com/68727627/122762026-dcd9e080-d2d7-11eb-90f3-a39e471620aa.JPG)
![당근게임2](https://user-images.githubusercontent.com/68727627/122762144-f67b2800-d2d7-11eb-82a1-23014f334950.JPG)

- ##### 당근을 다 뽑으면 레벨이 올라가고, 벌레를 클릭하면 게임이 끝남.
- ##### 레벨이 올라갈수록 뽑아야 하는 당근의 수와 벌레들이 많아짐.
- ##### 제한시간은 10초입니다. 10초가 지나면 게임이 자동으로 종료.
- ##### 게임이 끝나면 점수가 나오는데 점수는 총 뽑은 당근 수.

---
클래스별 기능
---

 1. Game 클래스
     - start() : 게임을 시작하는 기능
     - level_up() : 다음단계로 레벨업해서 게임을 시작하는 기능
     - stop() : 게임을 멈추는 기능
     - start_timer() : 게임을 시작하면 타이머를 동작시키는 기능
     - show_score() : 남은 당근 수를 표시해주는 기능
   
 2. Field 클래스
     - init_BugOrCarrot(className, imgPath, count) : 당근, 벌레를 랜덤으로 배치해 표시해주는 기능
     - onItemClick : Game클래스의 onItemClick(itme)이다, 당근을 클릭하면  score++, 벌레를 클릭하면 게임종료
 
 3. MessageBox 클래스
    - showWithText(text) : 메시지 표시 기능 (게임 정지, 게임종료, 레벨업을 하면 메시지 박스가 나타남).
    - 메시지 박스의 버튼이 replay면 처음부터 다시시작(Game클래스의 start함수 실행), level up이면 다음단계 시작(Game 클래스의 level_up함수 실행)하고, 메세지박스를 숨김.
