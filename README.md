# API 해킹 야간 노트

코리 볼 《**API 해킹의 모든 것**》(원서: *Hacking APIs*, No Starch Press)을  
**혼자 정리하며 만든 것처럼** 설계한 인터랙티브 학습 웹사이트입니다.

포트폴리오·개인 학습용으로 쓸 수 있게, 다크 사이버 글래스 UI · 진도/XP/업적 · 퀴즈 · 실험실 · 도구를 넣었습니다.

## 실행

정적 사이트입니다. 아무 로컬 서버로 열면 됩니다.

```bash
cd "api-hacking-notes"
python -m http.server 8765
# 또는
npm install
npm start
```

브라우저: <http://127.0.0.1:8765> (또는 3000)

> `file://` 로 직접 열어도 동작하지만, 일부 브라우저 정책상 로컬 서버를 권장합니다.

## Railway 배포

이 레포는 **Node `serve`로 정적 파일을 `$PORT`에 띄우도록** 설정되어 있습니다.  
HTML만 있으면 Railway가 “실행할 프로세스”를 못 찾아 공개 URL이 안 생기거나 Deploy가 실패합니다.

### 1) GitHub 연결 후 배포

1. [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
2. `JimProKing/api-hacking-notes` 선택
3. 배포가 **Success / Online** 될 때까지 대기 (Build 로그에 `serve` 기동 확인)

### 2) 공개 링크 만들기 (여기 빼먹으면 URL 없음)

Railway는 배포만 해서는 브라우저용 주소가 **자동으로 안 붙는 경우**가 많습니다.

1. 프로젝트에서 해당 **Service** 클릭  
2. 상단 **Settings**  
3. **Networking** → **Public Networking**  
4. **Generate Domain** 클릭  
5. `xxx.up.railway.app` 주소가 생김 → 그 링크로 접속  

포트는 보통 비워 두거나, 앱이 `$PORT`를 쓰므로 Railway 기본값이면 됩니다.

### 3) 안 될 때 체크

| 증상 | 조치 |
|------|------|
| Domain 메뉴가 없음 | 서비스가 아직 실패 상태 → **Deployments** 로그 확인 |
| Build fail | Node 설치/`npm install` 로그 확인. `package.json` 있는지 확인 |
| 502 / Application failed | `start`가 `$PORT`를 안 듣는 경우 → 이 레포 `railway.toml` 유지 |
| 예전 커밋만 배포 | GitHub `main` 최신 push 후 **Redeploy** |

로컬과 동일하게 루트의 `index.html`이 서빙됩니다.

## 구성

| 경로 | 설명 |
|------|------|
| `index.html` | 앱 셸 · 랜딩 · 학습 레이아웃 |
| `css/main.css` | 포트폴리오급 다크 UI |
| `js/app.js` | 라우팅 · 렌더 · 퀴즈 |
| `js/progress.js` | localStorage 진도 · 업적 |
| `js/tools.js` | JWT / HTTP / 상태코드 / 퍼징 |
| `js/data/curriculum.js` | 전 장 학습 노트 (생성됨) |
| `js/data/quizzes.js` | 장별 퀴즈 (생성됨) |
| `generate_content.py` | 커리큘럼·퀴즈 재생성 |

## 커리큘럼 맵

1. **Part I** — 보안 테스트 준비, 웹 기초, API 구조, 일반 취약점  
2. **Part II** — 해킹 시스템(Burp/Postman/툴), 취약 타깃(crAPI 등)  
3. **Part III** — 발견 → 분석 → 인증 → 퍼징 → 권한 → 대량할당 → 주입  
4. **Part IV** — 우회·rate limit, GraphQL, 침해·버그바운티, 부록  

실험실 #1~#9 가이드와 부록 체크리스트를 포함합니다.

## 기능

- 장 단위 학습 + 개인 메모 톤 콜아웃  
- 완료 시 XP, 퀴즈 채점, 랩 완료 표시  
- 업적(저자급 이해 등)  
- JWT 디코더, HTTP raw 빌더, 상태 코드 해석, 퍼징 아이디어  
- OWASP API ↔ 장 매핑, 용어집, 플래시카드  
- **합법 실습 가이드**: 로컬 랩, PortSwigger, THM/HTB, 버그바운티, CTF + 시작 방법  
- 진도는 브라우저 `localStorage`에만 저장  

## 콘텐츠 재생성

```bash
python generate_content.py
```

## 면책

- **교육 목적**의 요약·재구성 노트입니다. 원서의 복제·대체가 아닙니다.  
- 공격 기법은 **허가된 랩·버그바운티 범위** 안에서만 사용하세요.  
- 원문 학습은 제이펍 번역서 / No Starch 원서를 권장합니다.

## 스택

HTML · CSS · Vanilla JS (빌드 툴 없음)
