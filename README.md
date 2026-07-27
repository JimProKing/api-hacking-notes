# API 해킹 야간 노트

코리 볼 《**API 해킹의 모든 것**》(원서: *Hacking APIs*, No Starch Press)을  
**혼자 정리하며 만든 것처럼** 설계한 인터랙티브 학습 웹사이트입니다.

포트폴리오·개인 학습용: 다크 UI · 진도/XP/업적 · 퀴즈 · 실험실 · 도구 · 합법 실습 가이드 · SVG 다이어그램.

## 로컬 실행

```bash
cd api-hacking-notes
node server.js
# 또는
npm start
```

브라우저: <http://127.0.0.1:3000>  
(`PORT=8765 node server.js` 로 포트 변경 가능)

## Railway 배포 (이 레포 기준)

**의존성 0개.** `server.js`가 `0.0.0.0:$PORT` 에서 정적 파일을 서빙합니다.  
HTML만 올리면 Railway가 실행할 프로세스를 못 찾아 공개 URL이 안 생기거나 502가 납니다.

### 설정 파일

| 파일 | 역할 |
|------|------|
| `server.js` | Node 정적 서버 + `/health` |
| `package.json` | `"start": "node server.js"` |
| `railway.toml` | startCommand, healthcheck |
| `nixpacks.toml` | Node 20, start 명령 |
| `.railwayignore` | 디버그 이미지 등 제외 |

### 배포 순서

1. 이 레포를 GitHub에 push (`main`)
2. [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
3. `JimProKing/api-hacking-notes` 선택
4. Deployments가 **Success** 될 때까지 대기  
   - 로그에 `[api-hacking-notes] listening on http://0.0.0.0:XXXX` 보이면 OK
5. **공개 링크 (필수)**  
   - Service → **Settings** → **Networking** → **Public Networking**  
   - **Generate Domain** → `xxx.up.railway.app`
6. 그 URL로 접속

### 안 될 때

| 증상 | 조치 |
|------|------|
| 도메인이 안 보임 | Generate Domain을 안 누름 (배포 성공과 별개) |
| Deploy 실패 | 로그 확인. Root Directory가 레포 루트인지 확인 |
| 502 | 예전 커밋(서버 없음) → 최신 `main` Redeploy |
| Healthcheck 실패 | `/health` 가 200인지. `railway.toml` 유지 |
| 빈 화면 | 브라우저 강력 새로고침. DevTools Network에서 `js/data/*.js` 404 여부 |

### Railway 변수

보통 **추가 환경 변수 불필요**. Railway가 넣는 `PORT`만 사용합니다.

## 구성

| 경로 | 설명 |
|------|------|
| `server.js` | Railway/로컬 정적 서버 |
| `index.html` | 앱 셸 |
| `css/main.css` | UI |
| `js/app.js` | 라우팅 · 렌더 · 퀴즈 |
| `js/data/curriculum.js` | 학습 본문 |
| `js/data/diagrams.js` | SVG 다이어그램 |
| `js/data/legal-labs.js` | 합법 실습 가이드 |
| `js/data/quizzes.js` | 퀴즈 |
| `build_rich_curriculum.py` | 본문 재생성 (선택) |

## 기능

- Part I~IV · Ch.0~15 · 실험실 · 부록  
- 친절 설명 · 비유 · 단계 · SVG 그림  
- XP · 업적 · 퀴즈 · 플래시카드 · 용어집  
- JWT 디코더 등 도구  
- 합법 실습 플랫폼 가이드  
- 진도: 브라우저 `localStorage` only  

## 면책

교육·포트폴리오용 요약 노트입니다. 원서 대체가 아니며, 공격은 **허가된 환경**에서만.

## 스택

HTML · CSS · Vanilla JS · Node `http` (빌드/번들러 없음)
