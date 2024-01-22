# 📢 공통 안내 사항

_(👇🏻클릭 시 해당 섹션으로 이동합니다)_

### [🗂️ FE 프로젝트 폴더 구조](#폴더-구조)

### [🛣️ app router 구조](#app-router-브라우저-url-구조)

### [🐈 깃 브랜치 전략](#깃-브랜치)

### [🔬 shadcn 컴포넌트 예시 페이지 링크](#shadcn-컴포넌트-예시-페이지-링크)

### [🧩 설치할 VSCode 익스텐션](#vscode-익스텐션)

### [🖇️ 운영계/개발계 배포 주소](#배포-주소)

### [🔐 커밋 컨벤션 안내](#커밋-컨벤션)

---

# 폴더 구조

```bash
📦public
 ┣ 📂fonts
 ┣ 📂images         # avif > wepb > png
 ┗ 📂svgs           # svg 파일 (아이콘 위주)

 📦src
 ┣ 📂app            # 라우팅
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂components     # 컴포넌트
 ┃ ┗ 📂common       # 공통 컴포넌트 (sidebar, button, ...)
 ┣ 📂constants      # 공통 상수
 ┣ 📂hooks          # 공통 훅
 ┣ 📂libs           # 외부 라이브러리(함수)
 ┣ 📂services       # API 요청
 ┣ 📂states         # 상태관리
 ┣ 📂styles         # 스타일링
 ┃ ┗ 📜globals.css
 ┣ 📂types          # 타입 정의
 ┗ 📂utils          # 기타 함수
```

<br/><br/>

# app router (브라우저 URL) 구조

| URL                   | 페이지                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------ |
| /sample               | UI 컴포넌트 예시 페이지                                                                    |
| /                     | Auth<br/>(진입 시 로그인 체크하여 로그인했을 경우 내떡국 페이지로 랜딩)                    |
| /join                 | 기본 회원가입 페이지                                                                       |
| /make-dish            | 내 떡국 최초 설정 페이지                                                                   |
| /[userId]             | [userId]의 떡국 페이지                                                                     |
| /[userId]/set-garnish | [userId]에게 작성할 떡국의 고명 선택 페이지                                                |
| /[userId]/write       | [userId]에게 떡국 작성 페이지                                                              |
| /[userId]/[garnishId] | [userId]의 [garnishId] 편지 조회 페이지                                                    |
| /account              | [userId]의 마이페이지<br/>(mypage로 하면 유저가 내떡국이랑 헷갈릴까봐 account로 임시 설정) |
| /change-matt          | [userId]의 테이블 매트 변경 페이지                                                         |

<br/><br/>

# 깃 브랜치

```bash
🌳 main
   ┗ 최종 배포(운영)
🪴 develop
   ┗ 내부 검증용
🌱 feature/이니셜/TG-XXX
   ┗ 개인 작업용 (ex.feature/khs/TG-002)

1️⃣ main에서 개인 작업용 new branch 생성
2️⃣ develop으로 1차 merge하여 확인 및 오류 검증
3️⃣ 매 주 (또는 일정 간격)으로 develop에서 main으로 merge
```

<br/><br/>

# [shadcn 컴포넌트 예시 페이지 링크](https://develop-tteokguk.vercel.app/sample)

👆🏻 제목 클릭 시 이동합니다

<br/><br/>

# VSCode 익스텐션

- `Tailwind CSS Intellisense` <br />
  👉🏻 tailwind 작성 중 ctrl + space 누르면 관련된 코드 안내해줌

<br /><br/>

# 배포 주소

|  branch   |  name  |                 url                  |
| :-------: | :----: | :----------------------------------: |
|  `main`   | 운영계 |     https://tteokguk.vercel.app/     |
| `develop` | 개발계 | https://develop-tteokguk.vercel.app/ |

<br /><br/>

# 커밋 컨벤션

| message  |            description             |
| :------: | :--------------------------------: |
|  design  | 사용자 UI, 레이아웃 등 디자인 작업 |
|   feat   |          기능 추가, 수정           |
|   fix    |           버그/오류 수정           |
| refactor |           코드 리팩토링            |
|  chore   | 패키지 설치, 업데이트, 빌드 테스트 |
| comment  |        주석 추가 또는 수정         |
|  rename  |     파일명 또는 파일 경로 변경     |
|  remove  |             파일 삭제              |
|   docs   |     README.md 또는 이미지 추가     |
