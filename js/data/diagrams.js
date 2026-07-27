/* Inline SVG diagrams for teaching — dark theme, no external deps */
window.DIAGRAMS = {
  http_flow: `
<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HTTP 요청 응답 흐름">
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#00e5ff"/><stop offset="1" stop-color="#a78bfa"/></linearGradient>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#00e5ff"/></marker>
    <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#f472b6"/></marker>
  </defs>
  <rect x="40" y="60" width="140" height="90" rx="14" fill="#151a30" stroke="#00e5ff" stroke-width="1.5"/>
  <text x="110" y="100" text-anchor="middle" fill="#e8eaf6" font-size="15" font-family="system-ui,sans-serif" font-weight="700">클라이언트</text>
  <text x="110" y="122" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">브라우저 · 앱 · curl</text>
  <rect x="500" y="60" width="140" height="90" rx="14" fill="#151a30" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="570" y="100" text-anchor="middle" fill="#e8eaf6" font-size="15" font-family="system-ui,sans-serif" font-weight="700">서버 / API</text>
  <text x="570" y="122" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">앱 · DB · 게이트웨이</text>
  <line x1="190" y1="85" x2="485" y2="85" stroke="#00e5ff" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="340" y="72" text-anchor="middle" fill="#00e5ff" font-size="12" font-family="ui-monospace,monospace">요청 REQUEST →</text>
  <text x="340" y="102" text-anchor="middle" fill="#6b7394" font-size="10" font-family="ui-monospace,monospace">메서드 · 경로 · 헤더 · 바디</text>
  <line x1="485" y1="125" x2="190" y2="125" stroke="#f472b6" stroke-width="2" marker-end="url(#arrow2)"/>
  <text x="340" y="150" text-anchor="middle" fill="#f472b6" font-size="12" font-family="ui-monospace,monospace">← 응답 RESPONSE</text>
  <text x="340" y="168" text-anchor="middle" fill="#6b7394" font-size="10" font-family="ui-monospace,monospace">상태코드 · 헤더 · JSON 등</text>
  <text x="340" y="205" text-anchor="middle" fill="#9aa3c7" font-size="12" font-family="system-ui,sans-serif">테스터는 이 대화를 가로채 읽고, 수정한 뒤 다시 보냅니다</text>
</svg>`,

  http_anatomy: `
<svg viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HTTP 메시지 구조">
  <rect x="30" y="20" width="620" height="240" rx="16" fill="#0e1224" stroke="rgba(148,163,255,0.2)"/>
  <text x="50" y="50" fill="#00e5ff" font-size="13" font-family="ui-monospace,monospace" font-weight="700">① 요청줄 (Request line)</text>
  <rect x="50" y="60" width="580" height="36" rx="8" fill="#151a30" stroke="#00e5ff33"/>
  <text x="65" y="83" fill="#e8eaf6" font-size="13" font-family="ui-monospace,monospace"><tspan fill="#f472b6">POST</tspan>  <tspan fill="#fbbf24">/api/v1/login</tspan>  <tspan fill="#9aa3c7">HTTP/1.1</tspan></text>
  <text x="50" y="125" fill="#a78bfa" font-size="13" font-family="ui-monospace,monospace" font-weight="700">② 헤더 (Headers)</text>
  <rect x="50" y="135" width="580" height="50" rx="8" fill="#151a30" stroke="#a78bfa33"/>
  <text x="65" y="155" fill="#c8cee8" font-size="11" font-family="ui-monospace,monospace">Host: api.example.com</text>
  <text x="65" y="172" fill="#c8cee8" font-size="11" font-family="ui-monospace,monospace">Authorization: Bearer eyJhbG…   Content-Type: application/json</text>
  <text x="50" y="215" fill="#34d399" font-size="13" font-family="ui-monospace,monospace" font-weight="700">③ 바디 (Body) — 필요할 때만</text>
  <rect x="50" y="225" width="580" height="28" rx="8" fill="#151a30" stroke="#34d39933"/>
  <text x="65" y="244" fill="#c8cee8" font-size="11" font-family="ui-monospace,monospace">{"email":"a@b.com","password":"…"}</text>
</svg>`,

  jwt_parts: `
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="JWT 세 부분">
  <rect x="20" y="50" width="200" height="90" rx="14" fill="#151a30" stroke="#00e5ff"/>
  <text x="120" y="85" text-anchor="middle" fill="#00e5ff" font-size="13" font-family="system-ui,sans-serif" font-weight="700">HEADER</text>
  <text x="120" y="108" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="ui-monospace,monospace">alg, typ</text>
  <text x="120" y="125" text-anchor="middle" fill="#6b7394" font-size="10" font-family="system-ui,sans-serif">서명 방식</text>
  <text x="230" y="100" fill="#6b7394" font-size="22" font-family="ui-monospace,monospace">.</text>
  <rect x="250" y="50" width="200" height="90" rx="14" fill="#151a30" stroke="#f472b6"/>
  <text x="350" y="85" text-anchor="middle" fill="#f472b6" font-size="13" font-family="system-ui,sans-serif" font-weight="700">PAYLOAD</text>
  <text x="350" y="108" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="ui-monospace,monospace">sub, role, exp…</text>
  <text x="350" y="125" text-anchor="middle" fill="#6b7394" font-size="10" font-family="system-ui,sans-serif">클레임(주장) 내용</text>
  <text x="460" y="100" fill="#6b7394" font-size="22" font-family="ui-monospace,monospace">.</text>
  <rect x="480" y="50" width="180" height="90" rx="14" fill="#151a30" stroke="#fbbf24"/>
  <text x="570" y="85" text-anchor="middle" fill="#fbbf24" font-size="13" font-family="system-ui,sans-serif" font-weight="700">SIGNATURE</text>
  <text x="570" y="108" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="ui-monospace,monospace">서명 검증</text>
  <text x="570" y="125" text-anchor="middle" fill="#6b7394" font-size="10" font-family="system-ui,sans-serif">위조 방지용 서명</text>
  <text x="340" y="175" text-anchor="middle" fill="#9aa3c7" font-size="12" font-family="system-ui,sans-serif">앞 두 부분은 누구나 디코드 가능 · 진짜 보호는 서명 검증 + 서버 권한 로직</text>
</svg>`,

  bola: `
<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BOLA 개념">
  <text x="340" y="28" text-anchor="middle" fill="#e8eaf6" font-size="14" font-family="system-ui,sans-serif" font-weight="700">BOLA = 로그인은 됐는데, “그 객체 주인인가?”를 안 봄</text>
  <rect x="40" y="50" width="160" height="70" rx="12" fill="#151a30" stroke="#00e5ff"/>
  <text x="120" y="80" text-anchor="middle" fill="#00e5ff" font-size="13" font-family="system-ui,sans-serif" font-weight="700">사용자 A</text>
  <text x="120" y="100" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="ui-monospace,monospace">token = A</text>
  <rect x="40" y="150" width="160" height="70" rx="12" fill="#151a30" stroke="#f472b6"/>
  <text x="120" y="180" text-anchor="middle" fill="#f472b6" font-size="13" font-family="system-ui,sans-serif" font-weight="700">사용자 B</text>
  <text x="120" y="200" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="ui-monospace,monospace">order id = 1002</text>
  <path d="M210 85 H300" stroke="#00e5ff" stroke-width="2" fill="none"/>
  <text x="255" y="75" text-anchor="middle" fill="#00e5ff" font-size="10" font-family="ui-monospace,monospace">GET /orders/1002</text>
  <rect x="310" y="55" width="200" height="150" rx="14" fill="#151a30" stroke="#a78bfa"/>
  <text x="410" y="95" text-anchor="middle" fill="#e8eaf6" font-size="13" font-family="system-ui,sans-serif" font-weight="700">API 서버</text>
  <text x="410" y="120" text-anchor="middle" fill="#fb7185" font-size="12" font-family="system-ui,sans-serif">❌ 소유권 검사 없음</text>
  <text x="410" y="145" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">“로그인만 되면 통과”</text>
  <text x="410" y="175" text-anchor="middle" fill="#34d399" font-size="12" font-family="system-ui,sans-serif">✓ 정상이라면</text>
  <text x="410" y="193" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">order.owner == A ?</text>
  <path d="M520 130 H600" stroke="#fbbf24" stroke-width="2"/>
  <rect x="560" y="100" width="100" height="60" rx="10" fill="#1a1520" stroke="#fbbf24"/>
  <text x="610" y="125" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="system-ui,sans-serif" font-weight="700">200 OK</text>
  <text x="610" y="145" text-anchor="middle" fill="#9aa3c7" font-size="10" font-family="system-ui,sans-serif">B의 주문이 유출됨</text>
  <text x="340" y="245" text-anchor="middle" fill="#9aa3c7" font-size="12" font-family="system-ui,sans-serif">검증: A 토큰 + B의 객체 ID로 데이터가 오면 BOLA</text>
</svg>`,

  rest_vs_gql: `
<svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="REST vs GraphQL">
  <rect x="30" y="30" width="300" height="180" rx="16" fill="#0e1224" stroke="#00e5ff55"/>
  <text x="180" y="58" text-anchor="middle" fill="#00e5ff" font-size="15" font-family="system-ui,sans-serif" font-weight="700">REST</text>
  <text x="50" y="90" fill="#c8cee8" font-size="12" font-family="ui-monospace,monospace">GET /users/1</text>
  <text x="50" y="112" fill="#c8cee8" font-size="12" font-family="ui-monospace,monospace">GET /users/1/orders</text>
  <text x="50" y="134" fill="#c8cee8" font-size="12" font-family="ui-monospace,monospace">GET /orders/9/items</text>
  <text x="50" y="165" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">엔드포인트가 여러 개</text>
  <text x="50" y="185" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">리소스 URL + HTTP 동사</text>
  <rect x="350" y="30" width="300" height="180" rx="16" fill="#0e1224" stroke="#f472b655"/>
  <text x="500" y="58" text-anchor="middle" fill="#f472b6" font-size="15" font-family="system-ui,sans-serif" font-weight="700">GraphQL</text>
  <text x="370" y="90" fill="#c8cee8" font-size="12" font-family="ui-monospace,monospace">POST /graphql</text>
  <text x="370" y="118" fill="#c8cee8" font-size="11" font-family="ui-monospace,monospace">{ user(id:1) {</text>
  <text x="370" y="136" fill="#c8cee8" font-size="11" font-family="ui-monospace,monospace">    name orders { total }</text>
  <text x="370" y="154" fill="#c8cee8" font-size="11" font-family="ui-monospace,monospace">  }}</text>
  <text x="370" y="185" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">보통 엔드포인트 하나 + 쿼리 언어</text>
</svg>`,

  ab_test: `
<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A-B 권한 테스트">
  <text x="340" y="30" text-anchor="middle" fill="#e8eaf6" font-size="14" font-family="system-ui,sans-serif" font-weight="700">권한 버그를 증명하는 가장 간단한 실험: A-B 테스트</text>
  <circle cx="100" cy="110" r="40" fill="#151a30" stroke="#00e5ff" stroke-width="2"/>
  <text x="100" y="105" text-anchor="middle" fill="#00e5ff" font-size="18" font-family="system-ui,sans-serif" font-weight="700">A</text>
  <text x="100" y="125" text-anchor="middle" fill="#9aa3c7" font-size="10" font-family="system-ui,sans-serif">내 계정</text>
  <circle cx="280" cy="110" r="40" fill="#151a30" stroke="#f472b6" stroke-width="2"/>
  <text x="280" y="105" text-anchor="middle" fill="#f472b6" font-size="18" font-family="system-ui,sans-serif" font-weight="700">B</text>
  <text x="280" y="125" text-anchor="middle" fill="#9aa3c7" font-size="10" font-family="system-ui,sans-serif">상대 계정</text>
  <path d="M150 100 H230" stroke="#6b7394" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="190" y="90" text-anchor="middle" fill="#6b7394" font-size="10" font-family="system-ui,sans-serif">각자 로그인</text>
  <rect x="380" y="55" width="260" height="120" rx="14" fill="#151a30" stroke="#fbbf24"/>
  <text x="510" y="90" text-anchor="middle" fill="#fbbf24" font-size="13" font-family="system-ui,sans-serif" font-weight="700">교차 요청</text>
  <text x="510" y="115" text-anchor="middle" fill="#c8cee8" font-size="12" font-family="ui-monospace,monospace">Authorization: A</text>
  <text x="510" y="138" text-anchor="middle" fill="#c8cee8" font-size="12" font-family="ui-monospace,monospace">/resource/ + B의 id</text>
  <text x="510" y="160" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">200 + B 데이터 = 취약</text>
  <text x="340" y="205" text-anchor="middle" fill="#9aa3c7" font-size="12" font-family="system-ui,sans-serif">BFLA는 A-B-A: 관리자(B) 기능을 일반(A) 토큰으로 재전송</text>
</svg>`,

  mass_assign: `
<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="대량 할당">
  <text x="340" y="28" text-anchor="middle" fill="#e8eaf6" font-size="14" font-family="system-ui,sans-serif" font-weight="700">대량 할당: 클라이언트가 보낸 여분 필드가 그대로 DB에 쓰임</text>
  <rect x="40" y="55" width="220" height="130" rx="14" fill="#151a30" stroke="#00e5ff"/>
  <text x="150" y="85" text-anchor="middle" fill="#00e5ff" font-size="12" font-family="system-ui,sans-serif" font-weight="700">요청 JSON</text>
  <text x="60" y="115" fill="#c8cee8" font-size="12" font-family="ui-monospace,monospace">email: me@x.com</text>
  <text x="60" y="138" fill="#c8cee8" font-size="12" font-family="ui-monospace,monospace">password: ***</text>
  <text x="60" y="161" fill="#fb7185" font-size="12" font-family="ui-monospace,monospace">isAdmin: true  ←</text>
  <path d="M275 120 H355" stroke="#fbbf24" stroke-width="2"/>
  <text x="315" y="108" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="system-ui,sans-serif">바인딩</text>
  <rect x="370" y="55" width="270" height="130" rx="14" fill="#151a30" stroke="#f472b6"/>
  <text x="505" y="85" text-anchor="middle" fill="#f472b6" font-size="12" font-family="system-ui,sans-serif" font-weight="700">서버 User 모델</text>
  <text x="395" y="120" fill="#c8cee8" font-size="12" font-family="system-ui,sans-serif">허용 리스트 없으면</text>
  <text x="395" y="145" fill="#fb7185" font-size="13" font-family="system-ui,sans-serif" font-weight="700">일반 유저 → 관리자</text>
  <text x="395" y="168" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">방어: 화이트리스트 필드만 저장</text>
</svg>`,

  attack_pipeline: `
<svg viewBox="0 0 700 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="API 공격 파이프라인">
  <defs>
    <linearGradient id="pipe" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#00e5ff"/><stop offset="0.5" stop-color="#a78bfa"/><stop offset="1" stop-color="#f472b6"/></linearGradient>
  </defs>
  <text x="350" y="28" text-anchor="middle" fill="#e8eaf6" font-size="13" font-family="system-ui,sans-serif" font-weight="700">책 Part III 흐름 — 한 번에 외우기</text>
  <g font-family="system-ui,sans-serif" font-size="11" text-anchor="middle">
    <rect x="15" y="50" width="90" height="56" rx="10" fill="#151a30" stroke="#00e5ff"/><text x="60" y="75" fill="#00e5ff" font-weight="700">발견</text><text x="60" y="92" fill="#9aa3c7" font-size="10">Recon</text>
    <rect x="120" y="50" width="90" height="56" rx="10" fill="#151a30" stroke="#22d3ee"/><text x="165" y="75" fill="#22d3ee" font-weight="700">분석</text><text x="165" y="92" fill="#9aa3c7" font-size="10">엔드포인트</text>
    <rect x="225" y="50" width="90" height="56" rx="10" fill="#151a30" stroke="#a78bfa"/><text x="270" y="75" fill="#a78bfa" font-weight="700">인증</text><text x="270" y="92" fill="#9aa3c7" font-size="10">토큰·JWT</text>
    <rect x="330" y="50" width="90" height="56" rx="10" fill="#151a30" stroke="#c084fc"/><text x="375" y="75" fill="#c084fc" font-weight="700">퍼징</text><text x="375" y="92" fill="#9aa3c7" font-size="10">이상 입력</text>
    <rect x="435" y="50" width="90" height="56" rx="10" fill="#151a30" stroke="#f472b6"/><text x="480" y="75" fill="#f472b6" font-weight="700">권한</text><text x="480" y="92" fill="#9aa3c7" font-size="10">BOLA/BFLA</text>
    <rect x="540" y="50" width="90" height="56" rx="10" fill="#151a30" stroke="#fb7185"/><text x="585" y="75" fill="#fb7185" font-weight="700">착취</text><text x="585" y="92" fill="#9aa3c7" font-size="10">할당·주입</text>
  </g>
  <path d="M105 78 H120 M210 78 H225 M315 78 H330 M420 78 H435 M525 78 H540" stroke="url(#pipe)" stroke-width="2"/>
  <text x="350" y="140" text-anchor="middle" fill="#9aa3c7" font-size="12" font-family="system-ui,sans-serif">앞 단계를 건너뛰면 이후 단계에서 방향을 잃기 쉽습니다</text>
</svg>`,

  threat_boxes: `
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="블랙 그레이 화이트 박스">
  <rect x="30" y="40" width="190" height="130" rx="14" fill="#0a0a12" stroke="#6b7394"/>
  <text x="125" y="75" text-anchor="middle" fill="#e8eaf6" font-size="14" font-family="system-ui,sans-serif" font-weight="700">블랙 박스</text>
  <text x="125" y="100" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">정보 거의 없음</text>
  <text x="125" y="120" text-anchor="middle" fill="#6b7394" font-size="11" font-family="system-ui,sans-serif">외부 해커 시점</text>
  <text x="125" y="145" text-anchor="middle" fill="#00e5ff" font-size="11" font-family="system-ui,sans-serif">OSINT부터</text>
  <rect x="245" y="40" width="190" height="130" rx="14" fill="#151a30" stroke="#a78bfa"/>
  <text x="340" y="75" text-anchor="middle" fill="#e8eaf6" font-size="14" font-family="system-ui,sans-serif" font-weight="700">그레이 박스</text>
  <text x="340" y="100" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">문서·계정 일부</text>
  <text x="340" y="120" text-anchor="middle" fill="#6b7394" font-size="11" font-family="system-ui,sans-serif">버그바운티 느낌</text>
  <text x="340" y="145" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="system-ui,sans-serif">실무 대부분</text>
  <rect x="460" y="40" width="190" height="130" rx="14" fill="#1a2038" stroke="#fbbf24"/>
  <text x="555" y="75" text-anchor="middle" fill="#e8eaf6" font-size="14" font-family="system-ui,sans-serif" font-weight="700">화이트 박스</text>
  <text x="555" y="100" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">소스·설계 전부</text>
  <text x="555" y="120" text-anchor="middle" fill="#6b7394" font-size="11" font-family="system-ui,sans-serif">내부자 위협 모델</text>
  <text x="555" y="145" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="system-ui,sans-serif">코드 리뷰 가능</text>
</svg>`,

  scope_wall: `
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="테스트 범위">
  <rect x="40" y="40" width="400" height="120" rx="16" fill="#102018" stroke="#34d399" stroke-width="2"/>
  <text x="240" y="85" text-anchor="middle" fill="#34d399" font-size="15" font-family="system-ui,sans-serif" font-weight="700">IN SCOPE (공격 가능)</text>
  <text x="240" y="115" text-anchor="middle" fill="#9aa3c7" font-size="12" font-family="system-ui,sans-serif">문서에 적힌 URL · API · 기간</text>
  <text x="240" y="138" text-anchor="middle" fill="#6b7394" font-size="11" font-family="system-ui,sans-serif">여기 안에서만 테스트 모드를 켭니다</text>
  <rect x="470" y="40" width="170" height="120" rx="16" fill="#201018" stroke="#fb7185" stroke-width="2"/>
  <text x="555" y="95" text-anchor="middle" fill="#fb7185" font-size="14" font-family="system-ui,sans-serif" font-weight="700">OUT</text>
  <text x="555" y="120" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">서드파티 · DoS</text>
  <text x="555" y="140" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">실사용자 데이터</text>
  <text x="340" y="185" text-anchor="middle" fill="#9aa3c7" font-size="12" font-family="system-ui,sans-serif">범위 밖 요청 한 번이면 학습이 아니라 사고가 됩니다</text>
</svg>`,

  injection_context: `
<svg viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="주입과 컨텍스트">
  <text x="340" y="28" text-anchor="middle" fill="#e8eaf6" font-size="13" font-family="system-ui,sans-serif" font-weight="700">같은 입력도 어디에 붙는지에 따라 위험이 달라집니다</text>
  <rect x="30" y="50" width="120" height="50" rx="10" fill="#151a30" stroke="#00e5ff"/>
  <text x="90" y="80" text-anchor="middle" fill="#00e5ff" font-size="12" font-family="system-ui,sans-serif">사용자 입력</text>
  <path d="M160 75 H210" stroke="#6b7394" stroke-width="2"/>
  <rect x="220" y="45" width="130" height="40" rx="8" fill="#151a30" stroke="#f472b6"/><text x="285" y="70" text-anchor="middle" fill="#f472b6" font-size="11" font-family="system-ui,sans-serif">SQL 문자열</text>
  <rect x="220" y="95" width="130" height="40" rx="8" fill="#151a30" stroke="#fbbf24"/><text x="285" y="120" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="system-ui,sans-serif">HTML 페이지</text>
  <rect x="220" y="145" width="130" height="40" rx="8" fill="#151a30" stroke="#a78bfa"/><text x="285" y="170" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="system-ui,sans-serif">셸 명령</text>
  <rect x="400" y="45" width="240" height="40" rx="8" fill="#201018" stroke="#fb7185"/><text x="520" y="70" text-anchor="middle" fill="#e8eaf6" font-size="11" font-family="system-ui,sans-serif">→ SQL 주입</text>
  <rect x="400" y="95" width="240" height="40" rx="8" fill="#201018" stroke="#fb7185"/><text x="520" y="120" text-anchor="middle" fill="#e8eaf6" font-size="11" font-family="system-ui,sans-serif">→ XSS</text>
  <rect x="400" y="145" width="240" height="40" rx="8" fill="#201018" stroke="#fb7185"/><text x="520" y="170" text-anchor="middle" fill="#e8eaf6" font-size="11" font-family="system-ui,sans-serif">→ OS 명령 주입</text>
</svg>`,

  rate_limit: `
<svg viewBox="0 0 680 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="속도 제한">
  <text x="340" y="28" text-anchor="middle" fill="#e8eaf6" font-size="13" font-family="system-ui,sans-serif" font-weight="700">속도 제한 = “시간당 이용권” · DoS = “가게 문 닫기”</text>
  <rect x="40" y="55" width="280" height="90" rx="14" fill="#102018" stroke="#34d399"/>
  <text x="180" y="95" text-anchor="middle" fill="#34d399" font-size="14" font-family="system-ui,sans-serif" font-weight="700">Rate limit 테스트</text>
  <text x="180" y="120" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">한도 규칙 우회·수익 모델 구멍</text>
  <rect x="360" y="55" width="280" height="90" rx="14" fill="#201018" stroke="#fb7185"/>
  <text x="500" y="95" text-anchor="middle" fill="#fb7185" font-size="14" font-family="system-ui,sans-serif" font-weight="700">DoS 테스트</text>
  <text x="500" y="120" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">서비스 다운 · 보통 금지</text>
</svg>`,

  burp_postman: `
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Burp와 Postman 역할">
  <rect x="40" y="40" width="260" height="120" rx="14" fill="#151a30" stroke="#fbbf24"/>
  <text x="170" y="85" text-anchor="middle" fill="#fbbf24" font-size="15" font-family="system-ui,sans-serif" font-weight="700">Burp Suite</text>
  <text x="170" y="115" text-anchor="middle" fill="#c8cee8" font-size="12" font-family="system-ui,sans-serif">가로채기 · 개조 · 공격</text>
  <text x="170" y="138" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">Repeater / Intruder</text>
  <rect x="380" y="40" width="260" height="120" rx="14" fill="#151a30" stroke="#00e5ff"/>
  <text x="510" y="85" text-anchor="middle" fill="#00e5ff" font-size="15" font-family="system-ui,sans-serif" font-weight="700">Postman</text>
  <text x="510" y="115" text-anchor="middle" fill="#c8cee8" font-size="12" font-family="system-ui,sans-serif">정리 · 컬렉션 · 시나리오</text>
  <text x="510" y="138" text-anchor="middle" fill="#9aa3c7" font-size="11" font-family="system-ui,sans-serif">문서화 / 러너 / 변수</text>
  <text x="340" y="185" text-anchor="middle" fill="#9aa3c7" font-size="12" font-family="system-ui,sans-serif">Postman으로 지도를 만들고, Burp로 심층 분석을 합니다</text>
</svg>`,
};
