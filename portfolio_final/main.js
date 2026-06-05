// main.js

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// 웹페이지의 모든 HTML 요소가 화면에 로드된 이후에 아래 기능들을 실행
window.onload = function () {
  // [ CLI 검색창 ]
  // HTML에서 제어할 요소들(검색창, 출력창, 전체 컨테이너)을 id로 찾아 변수에 저장
  const cliInput = document.getElementById('cli-input');
  const cliOutput = document.getElementById('cli-output');
  const cliContainer = document.getElementById('cli-container');

  // 만약 현재 페이지에 입력창(cliInput)과 출력창(cliOutput)이 존재한다면 작동
  if (cliInput && cliOutput) {
    // 입력창에 키보드를 누르는 이벤트가 발생할 때마다 실행
    cliInput.addEventListener('keypress', function (e) {
      // 누른 키가 Enter일 경우
      if (e.key === 'Enter') {
        // 입력창에 적힌 글씨 가져오고 불필요한 공백 제거(trim)
        const cmd = cliInput.value.trim();
        // 새로운 <p> 태그 요소를 자바스크립트로 생성 (결과를 화면에 띄우기 위해)
        const newP = document.createElement('p');
        // 출력될 기본 형식 지정
        let resultText = 'C:\\cucu\\portfolio> ' + cmd + '\n';

        // 입력된 cmd에 따라 결과 처리
        switch (cmd) {
          case 'ls':
            resultText +=
              'home  about  skills  projects  activity  assignments  team';
            break;
          case 'clear':
            // 화면에 출력된 과거 결과들 없앰
            cliOutput.innerHTML = '';
            // 입력창 비움
            cliInput.value = '';
            return;
          case 'cd home':
            resultText += '메인 페이지의 Home 영역으로 이동합니다.';
            window.location.href = 'index.html#home'; // 해당 URL 페이지로 이동
            break;
          case 'cd about':
            resultText += 'About 영역으로 이동합니다.';
            window.location.href = 'index.html#about';
            break;
          case 'cd skills':
            resultText += 'Skills 영역으로 이동합니다.';
            window.location.href = 'index.html#skills';
            break;
          case 'cd projects':
            resultText += 'Projects 영역으로 이동합니다.';
            window.location.href = 'index.html#projects';
            break;
          case 'cd activity':
            resultText += 'Activity 영역으로 이동합니다.';
            window.location.href = 'index.html#activity';
            break;
          case 'cd assignments':
            resultText += '과제 목록(assignments.html) 페이지로 이동합니다.';
            window.location.href = 'assignments.html';
            break;
          case 'cd team':
            resultText += '팀 소개(team.html) 페이지로 이동합니다.';
            window.location.href = 'team.html';
            break;
          case '': // 아무것도 안치고 엔터만 쳤을 경우
            resultText = 'C:\\cucu\\portfolio> ';
            break;
          default: // 위에 정의되지 않은 명령어를 쳤을 경우
            resultText +=
              '알 수 없는 명령어입니다. (가능한 명령어: ls, clear, cd home, cd about, cd skills, cd projects, cd activity, cd assignments, cd team)';
        }

        // 완성된 텍스트를 이용해 TextNode 생성
        const textNode = document.createTextNode(resultText);
        // 만든 TextNode를 아까 만든 <p> 태그의 자식으로 넣음
        newP.appendChild(textNode);
        // 줄바꿈이 화면에 적용하도록 CSS 조작
        newP.style.whiteSpace = 'pre-wrap';
        // 완성된 <p> 태그를 출력창(cliOutput)에 추가
        cliOutput.appendChild(newP);

        // 입력창 비우기
        cliInput.value = '';

        // 글이 길어질 시 스크롤이 자동으로 가장 아래로 내려가게 함
        cliContainer.scrollTop = cliContainer.scrollHeight;
      }
    });
  }

  // [ 텍스트 복호화 애니메이션 ]
  // '.sec-title' 클래스를 가진 모든 제목을 배열 형태로 가져옴
  const titles = document.querySelectorAll('.sec-title');
  // 복호화 연출 시 사용될 랜덤 문자열
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  // 제목들을 하나씩 꺼내 효과 적용
  for (let i = 0; i < titles.length; i++) {
    let title = titles[i];
    let originalText = title.innerText; // 본래 글자

    // 제목에 마우스가 올라갈 시 실행
    title.addEventListener('mouseover', function () {
      // 몇 글자까지 원래대로 돌아왔는지 체크
      let iteration = 0;

      // setInterval을 사용해 0.05초마다 안에 코드 반복 실행
      let interval = setInterval(function () {
        let newText = '';

        // 글자 수만큼 반복
        for (let j = 0; j < originalText.length; j++) {
          // iteration보다 앞 글자는 원래 글자로 고정
          if (j < iteration) {
            newText += originalText[j];
          } else {
            // 복구되지 않은 뒷부분은 랜덤 문자 사용
            let randomChar = chars[Math.floor(Math.random() * chars.length)];
            newText += randomChar;
          }
        }
        // 조합된 새로운 글자를 텍스트로 변환
        title.innerText = newText;

        // 만약 모든 글자가 원래대로 돌아왔을 시 종료
        if (iteration >= originalText.length) {
          clearInterval(interval);
        }
        iteration += 0.5;
      }, 50);
    });
  }

  // [ 페이지 페이드 인 효과]
  // '.fade-section' 클래스를 가진 모든 요소 가져옴
  const fadeElements = document.querySelectorAll('.fade-section');

  // 스크롤을 할 때마다 요소가 화면에 들어왔는지 검사
  function checkScroll() {
    // 현재 화면 맨 아래쪽이 웹 전체에서 어느 위치인지 계산
    const triggerBottom = window.scrollY + window.innerHeight;

    // 애니메이션 줄 요소 하나씩 검사
    for (let i = 0; i < fadeElements.length; i++) {
      let element = fadeElements[i];

      // 요소의 꼭대기가 웹 맨 위부터 얼마나 떨어져있는지 확인
      let elementTop = element.offsetTop;

      // 화면 아래쪽보다 위로 올라왔는지 검사 (요소가 화면에 보이기 시작했는지 검사)
      if (elementTop < triggerBottom - 0) {
        // 화면에 보일 때) 투명도를 1로 만들고, 아래로 내려갔던걸 제자리(0)로 올림
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      } else {
        // 화면에서 벗어났을 때) 다시 투명하게 만들고, 100px 아래로 내려 숨김
        element.style.opacity = '0';
        element.style.transform = 'translateY(100px)';
      }
    }
  }

  // 마우스 스크롤 이벤트가 발생할 때마다 checkScroll 함수 실행
  window.addEventListener('scroll', checkScroll);

  checkScroll();
};
