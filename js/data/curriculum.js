/* Rich curriculum — friendly teaching + diagrams */
window.CURRICULUM = {
  "parts": [
    {
      "id": "part1",
      "num": "I",
      "title": "웹 API 보안이 작동하는 방식",
      "subtitle": "기초 · 구조 · 취약점 지도",
      "color": "#00e5ff",
      "icon": "◈"
    },
    {
      "id": "part2",
      "num": "II",
      "title": "API 테스트 실험실 구축",
      "subtitle": "도구 · 랩 · 타깃 세팅",
      "color": "#a78bfa",
      "icon": "⬡"
    },
    {
      "id": "part3",
      "num": "III",
      "title": "API 공격",
      "subtitle": "발견 → 분석 → 악용",
      "color": "#f472b6",
      "icon": "▲"
    },
    {
      "id": "part4",
      "num": "IV",
      "title": "실전 API 해킹",
      "subtitle": "우회 · GraphQL · 사례",
      "color": "#fbbf24",
      "icon": "✦"
    }
  ],
  "chapters": [
    {
      "id": "ch00",
      "num": "0",
      "part": "part1",
      "title": "보안 테스트 준비",
      "tagline": "해킹 기술보다 먼저: 무엇을, 어디까지, 왜 다루는지 문서로 못 박습니다",
      "minutes": 45,
      "xp": 140,
      "difficulty": 1,
      "sections": [
        {
          "id": "0-0",
          "title": "이 장을 왜 맨 앞에 두었을까",
          "note": "처음에는 ‘빨리 버프 켜고 싶다’고 느꼈습니다. 읽고 나니 이 장이 없으면 나머지는 전부 위험 부담이 됩니다.",
          "body": [
            {
              "type": "p",
              "text": "많은 입문자가 도구 설치부터 시작합니다. 당연합니다. 화려해 보이기 때문입니다. 하지만 이 책이(그리고 이 노트가) 0장을 맨 앞에 둔 이유는 단순합니다. API 해킹에서 가장 비싼 실수는 기술 부족이 아니라, 허가되지 않은 대상에 손을 대는 것입니다."
            },
            {
              "type": "p",
              "text": "이 장에서 다루는 건 ‘법과 계약의 지루한 이야기’처럼 보이지만, 실제로는 테스터의 작업 설계서다. 범위를 정하면 시간이 보이고, 위협을 정하면 도구가 보이고, 제외를 정하면 사고를 피하시기 바랍니다."
            },
            {
              "type": "analogy",
              "title": "게임 서버 선택",
              "text": "아무 서버에 핵을 쓰시면 계정 정지고 끝입니다. 침투 테스트·버그바운티도 같습니다. ‘연습 서버(스코프 안)’에서만 스킬을 씁니다."
            },
            {
              "type": "diagram",
              "id": "scope_wall",
              "caption": "스코프 안(IN)에서만 공격 모드를 켭니다. 밖은 빨간 구역."
            },
            {
              "type": "steps",
              "title": "오늘 이 장을 끝낸 뒤 할 수 있어야 하는 것",
              "items": [
                "SOW/범위 문서에 뭐가 들어가야 하는지 말로 설명하기",
                "블랙·그레이·화이트 박스 차이를 한 문장씩 말하기",
                "속도 제한 테스트와 DoS가 왜 다른지 구분하기",
                "버그바운티 참여 전 반드시 읽을 항목 3가지 말하기"
              ]
            }
          ]
        },
        {
          "id": "0-1",
          "title": "권한 받기 — 합법의 출발선",
          "body": [
            {
              "type": "p",
              "text": "API를 ‘공격’하기 전에 필요한 건 멋진 익스플로잇이 아니라 서면 권한입니다. 침투 테스트에서는 보통 SOW(Statement of Work, 작업 기술서)와 계약서로 대상·기간·제외·연락 체계를 고정합니다."
            },
            {
              "type": "p",
              "text": "여기서 놓치기 쉬운 포인트: 서명자가 진짜로 그 시스템을 테스트할 권한을 가진 사람인가? 클라우드에 올려진 서비스라면 클라이언트 허락만으로는 부족할 수 있습니다. AWS·GCP·Azure 같은 호스팅 업체의 이용 약관이 따로 있습니다."
            },
            {
              "type": "h3",
              "text": "문서에 넣고 싶은 최소 항목"
            },
            {
              "type": "list",
              "items": [
                "테스트 가능한 URL, API, IP, 모바일 앱 패키지명",
                "제외 경로·서드파티 결제·공유 엔드포인트",
                "테스트 시작·종료 시각, 타임존",
                "비상 연락처(서비스 장애 시 누구를 깨울지)",
                "허용/금지 기법(예: DoS 금지, 소셜 엔지니어링 금지)",
                "산출물 형식(보고서 템플릿, 재테스트 여부)"
              ]
            },
            {
              "type": "callout",
              "tone": "warn",
              "title": "학습 참고",
              "text": "‘우리 거니까 다 해도 돼’라는 구두 합의만으로는 부족합니다. 나중에 분쟁이 생기면 남은 건 문서다. 가능하시면 이메일 스레드라도 남겨라."
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "혼자 학습하실 때",
              "text": "실제 SOW가 없어도 A4 한 장 ‘가상 클라이언트 범위서’를 써 보라. 이후 실습이 ‘아무거나 두드리기’에서 ‘시나리오 있는 테스트’로 바뀝니다."
            }
          ]
        },
        {
          "id": "0-2",
          "title": "위협 모델링 — 적을 가정하면 테스트가 선명해진다",
          "body": [
            {
              "type": "p",
              "text": "위협 모델링은 거창한 컨설팅 용어처럼 들리지만, 본질은 질문 몇 개다. 누가 이 API를 노릴까? 그 사람은 무엇을 이미 알고 있을까? 무엇을 훔치거나 망가뜨리고 싶을까? 이 가정에 따라 테스트 깊이·도구·일정이 갈립니다."
            },
            {
              "type": "diagram",
              "id": "threat_boxes",
              "caption": "정보가 적을수록(블랙) 정찰 비중이 커지고, 정보가 많을수록(화이트) 코드·설계 결함을 깊게 판다."
            },
            {
              "type": "table",
              "headers": [
                "접근",
                "내가 받는 정보",
                "비유",
                "테스트 감각"
              ],
              "rows": [
                [
                  "블랙 박스",
                  "회사 이름 정도",
                  "인터넷의 외부 해커",
                  "OSINT·디스커버리부터"
                ],
                [
                  "그레이 박스",
                  "문서, 테스트 계정",
                  "파트너·바운티 헌터",
                  "실무에서 가장 흔함"
                ],
                [
                  "화이트 박스",
                  "소스, 아키텍처, SDK",
                  "권한이 큰 내부자",
                  "리뷰+동적 테스트"
                ]
              ]
            },
            {
              "type": "p",
              "text": "버그 현상금 프로그램은 보통 블랙과 그레이 사이에 있습니다. 대상 URL 목록과 규칙은 주지만, 내부 설계 문서는 안 줍니다. 그래서 스코프를 읽고 ‘내가 어떤 적 역할인지’를 스스로 정의해야 합니다."
            },
            {
              "type": "code",
              "title": "위협 모델 미니 템플릿 (복붙해서 채워 보세요)",
              "lang": "text",
              "code": "위협 행위자: 익명 사용자 / 로그인 일반 유저 / 퇴사한 직원\n동기: PII 탈취 / 권한 상승 / 결제 우회 / 데이터 변조\n핵심 자산: 개인정보, 토큰, 관리자 API, 파트여러분 키\n진입점: 공개 REST, 모바일 API, GraphQL, 레거시 엔드포인트\n가정 능력: 구글·깃허브 검색 + Burp + 자동화 스캔 수준\n성공의 정의: 재현 가능한 PoC + 비즈니스 영향 한 문단"
            }
          ]
        },
        {
          "id": "0-3",
          "title": "테스트 범위에 거의 항상 들어가는 기능들",
          "body": [
            {
              "type": "p",
              "text": "범위를 산정합니다는 건 ‘고유 엔드포인트 × 메서드 × 역할 × 버전’이 얼마나 되는지 가늠하는 일이기도 하다. 아래 영역은 책에서 특별히 강조하는, 빼먹으면 아쉬운 체크 포인트다."
            },
            {
              "type": "cards",
              "items": [
                {
                  "title": "인증·권한",
                  "text": "게스트/유저/어드민처럼 역할이 다르면 같은 URL도 다른 세계입니다. 토큰 수명, 우회, 권한 상승을 봅니다."
                },
                {
                  "title": "WAF",
                  "text": "방화벽이 테스트를 조기에 끊을 수 있습니다. 완화(allowlist)를 협의할지, WAF 우회까지 볼지 미리 정합니다."
                },
                {
                  "title": "모바일 앱",
                  "text": "앱은 예쁜 UI일 뿐, 데이터는 API로 갑니다. 하드코딩 키·숨은 엔드포인트를 정적/동적으로 찾습니다."
                },
                {
                  "title": "문서 감사",
                  "text": "문서는 공격 지도입니다. 오래된 경로, 예제 토큰, 관리자 API 힌트가 그대로 남아 있는 경우가 많습니다."
                },
                {
                  "title": "속도 제한",
                  "text": "수익 모델과 자원 보호. ‘한도를 넘기면 뭐가 나오는지’와 ‘우회가 되는지’를 봅니다."
                }
              ]
            },
            {
              "type": "diagram",
              "id": "rate_limit",
              "caption": "속도 제한 테스트와 DoS는 목적이 다릅니다. 후자는 합의 없이 하면 사고다."
            },
            {
              "type": "p",
              "text": "속도 제한 테스트는 ‘무료 티어가 유료만큼 쓰는 구멍’ 같은 비즈니스 이슈를 드러낼 수 있습니다. DoS는 서비스를 멈추게 하는 쪽에 가깝습니다. 문서에 명시되지 않으면 DoS는 하지 않는 것이 기본값입니다."
            }
          ]
        },
        {
          "id": "0-4",
          "title": "제한·제외 · 클라우드 · 보고",
          "body": [
            {
              "type": "p",
              "text": "계약서의 제외 목록은 귀찮아 보이지만, 사실 당신을 보호하는 방패입니다. 서드파티 인증, 공유 데이터 경로, 이미 ‘의도된 기능’으로 남겨 둔 열거 메시지 등이 제외될 수 있습니다."
            },
            {
              "type": "h3",
              "text": "클라우드에 올려진 API"
            },
            {
              "type": "list",
              "items": [
                "AWS: 일부 공격(영역 워킹, DoS/플러딩 등)은 별도 승인 — 최신 정책 확인",
                "GCP: 사전 통보가 없어도 AUP/TOS는 지켜야 함",
                "Azure: Rules of Engagement 페이지를 기준으로",
                "일부 SaaS(예: 세일즈포스류)는 여전히 사전 승인 문서 요구"
              ]
            },
            {
              "type": "h3",
              "text": "보고와 개선 테스트"
            },
            {
              "type": "p",
              "text": "클라이언트 입장에서 진짜 상품은 ‘당신이 뚫은 밤샘’이 아니라 보고서입니다. 재현 단계, 영향, 수정 제안, 필요하시면 스크린샷·요청/응답 샘플. 개선 후 재테스트를 범위에 넣을지도 미리 정해 보세요."
            },
            {
              "type": "h3",
              "text": "버그바운티 참여 전 읽을 표"
            },
            {
              "type": "table",
              "headers": [
                "항목",
                "왜 읽나"
              ],
              "rows": [
                [
                  "대상(Scope)",
                  "허용 URL/서브도메인. 와일드카드 함정 주의"
                ],
                [
                  "제외",
                  "건드리면 규칙 위반"
                ],
                [
                  "테스트 제한",
                  "허용 취약점 타입, PoC 수준"
                ],
                [
                  "공개 조건",
                  "블로그에 써도 되는지"
                ],
                [
                  "보상 표",
                  "시간 대비 가치. rate-limit만 스팸 취급하는 곳도"
                ]
              ]
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "기술보다 범위·권한이 먼저다. 문서가 테스터의 안전벨트입니다.",
        "위협 모델이 블랙/그레이/화이트와 일정을 결정합니다.",
        "속도 제한 ≠ DoS. 목적을 섞지 마세요.",
        "보고서는 테스트의 제품입니다. 재현 가능성 = 신뢰."
      ],
      "checklist": [
        "가상 또는 실제 범위서 한 장 작성",
        "위협 행위자 한 줄 정의",
        "역할별 계정 계획",
        "클라우드/제외 항목 확인"
      ]
    },
    {
      "id": "ch01",
      "num": "1",
      "part": "part1",
      "title": "웹 애플리케이션이 작동하는 방법",
      "tagline": "API를 해킹하려면, 먼저 웹이 서로 어떻게 대화하는지 귀로 들을 수 있어야 합니다",
      "minutes": 50,
      "xp": 150,
      "difficulty": 1,
      "sections": [
        {
          "id": "1-0",
          "title": "이 장의 목표 — ‘대화’를 눈으로 보기",
          "note": "브라우저 주소창 뒤에 숨은 편지를 읽는 연습이라고 생각하니 갑자기 흥미로워졌습니다.",
          "body": [
            {
              "type": "p",
              "text": "웹 API도, 일반 웹페이지도, 결국 HTTP라는 언어로 서버와 이야기합니다. 차이라면 사람이 읽는 HTML 대신, 프로그램이 읽기 좋은 JSON 같은 데이터를 주고받는 비중이 큽니다는 점입니다."
            },
            {
              "type": "p",
              "text": "이 장을 대충 넘기면 이후 Burp에서 패킷이 쏟아질 때 ‘이게 정상인지 공격인지’ 감각이 안 선다. 천천히, 요청 한 줄·헤더 한 줄의 손으로 따라 적어 보세요."
            },
            {
              "type": "diagram",
              "id": "http_flow",
              "caption": "클라이언트와 서버는 요청을 보내고 응답을 받는 왕복으로 동작합니다. 해킹은 그 왕복을 관찰·변조하는 일에서 시작합니다."
            }
          ]
        },
        {
          "id": "1-1",
          "title": "URL — 인터넷 위 주소 체계",
          "body": [
            {
              "type": "p",
              "text": "URL은 단순히 ‘홈페이지 주소’가 아니라, 서버에게 “어떤 문을 어떤 방식으로 열어 달라”고 말하는 구조화된 문장입니다."
            },
            {
              "type": "code",
              "title": "URL을 토막 내 보기",
              "lang": "text",
              "code": "https://api.example.com:443/v2/users/42?fields=email&pretty=1\n│      │                │    │           │\n│      호스트            포트  경로        쿼리 문자열\n스킴 (https = 암호화된 HTTP)"
            },
            {
              "type": "analogy",
              "title": "아파트 주소",
              "text": "스킴은 ‘어떻게 찾아갈지(도보/차량=http/https)’, 호스트는 아파트 단지, 경로는 동·호수, 쿼리는 ‘초인종에 남기는 메모(추가 옵션)’에 가깝습니다."
            },
            {
              "type": "p",
              "text": "쿼리 문자열은 ? 로 시작하고, 여러 개는 & 로 잇는다. 보안 테스트 관점에서는 쿼리·경로·바디 어디에 사용자 입력이 들어가는지 표시해 두는 습관이 곧 취약점 지도가 됩니다."
            }
          ]
        },
        {
          "id": "1-2",
          "title": "HTTP 요청과 응답 — 편지의 형식",
          "body": [
            {
              "type": "diagram",
              "id": "http_anatomy",
              "caption": "요청은 보통 요청줄 → 헤더들 → (빈 줄) → 바디 순서다. 응답도 상태줄 → 헤더 → 바디."
            },
            {
              "type": "p",
              "text": "요청줄에는 메서드(무엇을 할지), 경로(어디에), 프로토콜 버전이 옵니다. 헤더는 ‘부가 정보’다. 누구 명의로 말하는지(Authorization), 어떤 형식인지(Content-Type), 쿠키에 뭐가 있는지 등."
            },
            {
              "type": "p",
              "text": "바디는 항상 있지 않다. GET은 보통 바디가 없고, POST/PUT/PATCH에 JSON이나 폼 데이터가 실린다. 비밀번호·토큰·개인정보가 바디에 있으면 로그·프록시 기록에 남는지까지 생각해야 합니다."
            },
            {
              "type": "h3",
              "text": "상태 코드를 해커 감각으로 읽기"
            },
            {
              "type": "table",
              "headers": [
                "코드대",
                "일상 언어",
                "해킹에서 쓰는 법"
              ],
              "rows": [
                [
                  "2xx",
                  "잘 처리됨",
                  "성공한 유출·변조 신호일 수도"
                ],
                [
                  "3xx",
                  "다른 곳으로 가봐",
                  "로그인 후 이동, open redirect 단서"
                ],
                [
                  "4xx",
                  "여러분의 요청에 문제",
                  "401/403 권한, 404 존재 오라클, 429 한도"
                ],
                [
                  "5xx",
                  "서버가 체함",
                  "퍼징·주입이 먹힌 신호, 스택 누출 확인"
                ]
              ]
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "연습",
              "text": "아무 사이트 로그인 시도를 DevTools Network에서 찾아, 요청줄·헤더·바디를 노트에 손으로 옮겨 적어 보세요. 한 번만 해도 이후 장이 쉬워진다."
            }
          ]
        },
        {
          "id": "1-3",
          "title": "메서드 · 상태(state) · 데이터베이스 · API 역할",
          "body": [
            {
              "type": "p",
              "text": "HTTP 메서드는 서버에게 보내는 동사다. 관례상 GET은 조회, POST는 생성/액션, PUT/PATCH는 수정, DELETE는 삭제. 하지만 실무 API는 관례를 어기는 경우가 많습니다. 이름보다 실제 부수효과(사이드 이펙트)를 Repeater로 확인하는 편이 안전합니다."
            },
            {
              "type": "p",
              "text": "HTTP 자체는 무상태(stateless)에 가깝습니다. 매 요청이 독립적입니다. 그래서 로그인 상태를 유지하려면 쿠키, 세션 ID, JWT, API 키 같은 ‘출입증’을 매 요청에 붙입니다. 인증 공격의 대부분은 이 출입증을 훔치거나, 위조하거나, 남에 것을 재사용하는 것입니다."
            },
            {
              "type": "h3",
              "text": "데이터베이스 한 스푼"
            },
            {
              "type": "p",
              "text": "많은 API 뒤에 SQL(표 형태) 또는 NoSQL(문서/키값)이 있습니다. 입력이 쿼리에 잘못 섞이면 주입이 됩니다. SQL은 따옴표와 UNION의 세계, NoSQL은 JSON 연산자($gt, $ne)의 세계로 감각이 조금 다릅니다. 자세한 공격은 12장에서."
            },
            {
              "type": "analogy",
              "title": "식당 주문서",
              "text": "웹 UI는 예쁜 메뉴판, API는 주방에 전달되는 주문 슬립, DB는 냉장고다. 테스터는 메뉴판이 아니라 주문 슬립을 위조합니다."
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "한 줄 요약",
              "text": "API 해킹 = 프로그램이 주고받는 HTTP 대화를, 사람(해커)이 직접 읽고 고쳐 쓰는 일."
            }
          ]
        },
        {
          "id": "1-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "h3",
              "text": "자주 하는 착각"
            },
            {
              "type": "p",
              "text": "“HTTPS니까 안전합니다”는 전송 구간 이야기고, 서버가 권한을 제대로 검사하는지는 별개입니다. “GET은 안전합니다”도 관례일 뿐, 구현이 이상하면 GET으로도 상태가 바뀝니다."
            },
            {
              "type": "p",
              "text": "상태 코드를 외울 때 200=성공만 외우지 말고, “이 코드가 공격자에게 어떤 정보를 주나?”를 한 줄씩 붙여 보세요. 404가 항상 안전하지 않다. 존재 여부를 알려 주는 오라클이 될 수 있습니다."
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "요청/응답 3단(줄·헤더·바디)을 손으로 그릴 수 있어야 프록시가 보인다.",
        "상태 코드는 성공/실패를 넘어 ‘오라클’이 될 수 있습니다.",
        "무상태 HTTP + 붙여 넣은 출입증 = 이후 모든 인증 이야기의 토대."
      ],
      "checklist": []
    },
    {
      "id": "ch02",
      "num": "2",
      "part": "part1",
      "title": "웹 API의 구조",
      "tagline": "REST와 GraphQL, 데이터 형식, 인증 — API를 ‘해부’하는 장",
      "minutes": 65,
      "xp": 180,
      "difficulty": 2,
      "sections": [
        {
          "id": "2-0",
          "title": "API란 무엇인가 — 프로그램 사이의 계약",
          "body": [
            {
              "type": "p",
              "text": "API(Application Programming Interface)는 소프트웨어가 다른 소프트웨어와 대화하기 위해 약속한 방식입니다. 웹 API는 그 약속을 HTTP 위에 올려 둔 것입니다. 모바일 앱, 프론트엔드 SPA, 제휴사 서버가 같은 API를 부르기 때문에, 한 번 뚫리면 영향 범위가 넓습니다."
            },
            {
              "type": "analogy",
              "title": "창구 업무",
              "text": "은행 창구(API)에 ‘출금 전표’를 내면 정해진 형식일 때만 처리합니다. 전표 양식(JSON)·신분증(토큰)·업무 종류(메서드/쿼리)가 바로 API 스펙입니다."
            },
            {
              "type": "p",
              "text": "이 장에서는 REST와 GraphQL이라는 두 가지 흔한 ‘창구 운영 방식’, 데이터를 실어 나르는 포장지(JSON 등), 그리고 출입증 종류(인증)를 익혀 보세요."
            }
          ]
        },
        {
          "id": "2-1",
          "title": "RESTful API — 리소스와 동사",
          "body": [
            {
              "type": "p",
              "text": "REST는 완벽한 교리라기보다 실무에서 넓게 쓰이는 스타일입니다. 핵심 감각은 이렇다. 명사(리소스)를 URL로 드러내고, 동사(행동)는 HTTP 메서드에 맡깁니다. /users/42 는 ‘42번 사용자’라는 자원이고, GET이면 조회, DELETE면 삭제 시도다."
            },
            {
              "type": "code",
              "title": "전형적인 REST 호출",
              "lang": "http",
              "code": "GET /api/v1/vehicles/1337 HTTP/1.1\nHost: crapi.example\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIs...\nAccept: application/json"
            },
            {
              "type": "list",
              "items": [
                "버전: /v1/ 경로 또는 Accept 헤더",
                "중첩: /users/1/orders 처럼 관계 표현",
                "상태코드·에러 바디로 결과를 알림",
                "완벽히 RESTful한 API는 드묾 — 관례를 깨는 RPC식 경로(/getUser)도 흔함"
              ]
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "권장 습관",
              "text": "문서의 이름보다 실제 메서드·권한·사이드이펙트를 Repeater로 확인합니다. ‘GET인데 삭제되는’ 미친 구현이 실제로 있습니다."
            }
          ]
        },
        {
          "id": "2-2",
          "title": "GraphQL — 한 창구, 원하는 필드만",
          "body": [
            {
              "type": "diagram",
              "id": "rest_vs_gql",
              "caption": "REST는 문을 여러 개 두드린다. GraphQL은 보통 한 문(/graphql)에서 질문 문장을 보냅니다."
            },
            {
              "type": "p",
              "text": "GraphQL은 클라이언트가 필요한 필드만 골라 요청합니다. 스키마(타입 시스템)가 있고, 인트로스펙션으로 그 스키마를 물어볼 수 있는 경우가 있습니다. 개발에는 축복이지만, 켜져 있으면 공격자에게 완전한 지도가 됩니다."
            },
            {
              "type": "code",
              "title": "쿼리 스케치",
              "lang": "graphql",
              "code": "query {\n  user(id: 1) {\n    email\n    role\n    orders { id total }\n  }\n}"
            },
            {
              "type": "callout",
              "tone": "warn",
              "title": "보안 테스트 관점",
              "text": "필드 단위 권한 누락(BOLA), 중첩 쿼리로 서버 자원 고갈, 배치 쿼리 남용이 단골입니다. 14장에서 본격적으로 다룬다."
            }
          ]
        },
        {
          "id": "2-3",
          "title": "명세와 데이터 형식",
          "body": [
            {
              "type": "p",
              "text": "OpenAPI(Swagger) 같은 명세는 엔드포인트 목록·파라미터·예제 응답을 줍니다. 발견되면 Postman에 임포트해 컬렉션을 순식간에 만들 수 있습니다. ‘합법적 치트키’에 가깝습니다."
            },
            {
              "type": "table",
              "headers": [
                "형식",
                "느낌",
                "공격 메모"
              ],
              "rows": [
                [
                  "JSON",
                  "가장 흔함, 키-값",
                  "타입 혼동, 대량 할당, 중첩 키"
                ],
                [
                  "XML",
                  "태그 기반",
                  "XXE, 거대 엔티티"
                ],
                [
                  "YAML",
                  "들여쓰기",
                  "구버전 파서 역직렬화 이슈"
                ]
              ]
            },
            {
              "type": "p",
              "text": "응답 JSON을 UI 없이 읽는 훈련이 중요합니다. 화면에 안 보이는 passwordHash, internalRole, ssn 필드가 과다 노출로 이어집니다."
            }
          ]
        },
        {
          "id": "2-4",
          "title": "API 인증 — 출입증 종류 총정리",
          "body": [
            {
              "type": "diagram",
              "id": "jwt_parts",
              "caption": "JWT는 header.payload.signature 세 덩어리다. 앞 둘은 디코드만 하면 내용이 보인다."
            },
            {
              "type": "cards",
              "items": [
                {
                  "title": "Basic",
                  "text": "user:pass를 Base64. 암호화가 아닙니다. HTTPS 필수. 프록시에 그대로 보인다."
                },
                {
                  "title": "API Key",
                  "text": "헤더/쿼리/쿠키. 쿼리에 넣으면 로그·Referer에 새기 쉽습니다."
                },
                {
                  "title": "JWT",
                  "text": "클레임+서명. none 공격, alg 스위치, 약한 비밀 크랙, 클레임 변조가 고전."
                },
                {
                  "title": "HMAC",
                  "text": "공유 비밀로 요청 서명. 비밀 유출·재전송·정규화 차이를 노린다."
                },
                {
                  "title": "OAuth 2.0",
                  "text": "위임 인가. redirect_uri, state, scope, 토큰 저장 실수가 바운티 단골."
                },
                {
                  "title": "인증 없음",
                  "text": "공개 API. 그래도 쓰기 메서드·내부 필드 노출은 검사."
                }
              ]
            },
            {
              "type": "p",
              "text": "트위터(X) API 같은 실전 문서를 보시면, 권한 티어·rate limit·에러 코드가 함께 적혀 있습니다. ‘정상 동작의 기준선’을 문서에서 먼저 읽는 습관이 이후 우회·남용 테스트의 출발점입니다."
            }
          ]
        },
        {
          "id": "2-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "h3",
              "text": "실전에서 문서를 읽는 법"
            },
            {
              "type": "p",
              "text": "문서를 소설처럼 통독하기보다 (1) 인증 방법 (2) 베이스 URL (3) 주요 리소스 (4) 에러 코드 (5) rate limit 다섯 칸만 먼저 채운다. 그다음 예제 요청을 Postman에 옮긴다."
            },
            {
              "type": "p",
              "text": "GraphQL을 처음 보시면 REST보다 어려워 보이지만, “질문이 곧 엔드포인트 목록”이라고 생각하시면 정찰이 오히려 단순해진다. 스키마만 있으면 필드 단위로 BOLA를 체크리스트화할 수 있습니다."
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "REST는 리소스+동사, GraphQL은 스키마+쿼리 — 정찰법이 다릅니다.",
        "명세/문서는 합법 치트시트다.",
        "인증 방식마다 실패 모드가 다릅니다. 출입증 종류를 알면 공격 벡터가 보인다."
      ],
      "checklist": []
    },
    {
      "id": "ch03",
      "num": "3",
      "part": "part1",
      "title": "일반적인 API 취약점",
      "tagline": "이름을 알면 보고서가 됩니다 — API 취약점 지도 완전 정복",
      "minutes": 60,
      "xp": 200,
      "difficulty": 2,
      "sections": [
        {
          "id": "3-0",
          "title": "지도를 먼저 외우는 이유",
          "body": [
            {
              "type": "p",
              "text": "이후 공격 장(6~12)은 이 지도의 확대경입니다. 취약점에 이름을 붙이면 팀과 대화할 수 있고, 버그바운티 티켓이 설득력을 얻고, 수정 담당자가 공감합니다. OWASP API Security Top 10과 강하게 맞닿아 있으니 함께 보시면 좋습니다."
            },
            {
              "type": "analogy",
              "title": "병원 차트",
              "text": "증상만 “배 아픔”이라고 하면 치료 방향이 안 선다. ‘BOLA로 타 환자 기록 열람’처럼 진단명이 있으면 처방이 나옵니다."
            },
            {
              "type": "steps",
              "title": "각 취약점을 만날 때마다 적을 여러분의 칸",
              "items": [
                "한 줄 정의 (이게 뭐지?)",
                "재현 패턴 (어떻게 증명하지?)",
                "영향 (비즈니스가 왜 아프지?)",
                "수정 방향 (서버가 뭘 고치지?)"
              ]
            }
          ]
        },
        {
          "id": "3-1",
          "title": "정보 누출 · 과다 노출 · 설정 오류",
          "body": [
            {
              "type": "h3",
              "text": "정보 누출"
            },
            {
              "type": "p",
              "text": "스택 트레이스, 상세 에러, 디버그 엔드포인트, 디렉터리 리스팅, GitHub에 올라간 키. 단독으로 Critical이 아니어도 다음 공격의 연료가 됩니다."
            },
            {
              "type": "h3",
              "text": "데이터 과다 노출"
            },
            {
              "type": "p",
              "text": "서버가 객체 전체를 내려주고 화면에서만 가리는 패턴. 프록시로 보시면 passwordHash, 내부 등급, 다른 사람 이메일이 버젓이 있습니다. ‘UI에 없으니 안전’은 착각입니다."
            },
            {
              "type": "h3",
              "text": "보안 설정 오류"
            },
            {
              "type": "list",
              "items": [
                "기본 계정, 불필요 HTTP 메서드",
                "CORS * + credentials",
                "TLS 미적용",
                "관리 콘솔 인터넷 노출",
                "구버전 스택"
              ]
            }
          ]
        },
        {
          "id": "3-2",
          "title": "BOLA와 BFLA — 권한의 두 축",
          "body": [
            {
              "type": "diagram",
              "id": "bola",
              "caption": "BOLA: 객체(데이터 한 건) 단위 권한이 빠짐. 로그인만 되면 남의 id를 넣어 열람."
            },
            {
              "type": "p",
              "text": "BOLA(Broken Object Level Authorization)는 API판 IDOR라고 기억하시면 빠릅니다. /orders/1001 을 1002로 바꿨을 때 남의 주문이 보이면 그것입니다. 인증(누구인가)과 인가(이 객체에 권한이 있는가)를 헷갈리면 안 됩니다."
            },
            {
              "type": "p",
              "text": "BFLA(Broken Function Level Authorization)는 기능·역할 단위 실패다. 일반 유저가 /admin/deleteUser 를 호출하거나, 메서드를 DELETE로 바꿔 관리 기능을 수행하는 식. BOLA가 ‘Whose data?’, BFLA가 ‘Are you allowed to do this action?’에 가깝습니다."
            },
            {
              "type": "diagram",
              "id": "ab_test",
              "caption": "증명 실험은 단순합니다. 계정 두 개로 교차 요청합니다."
            }
          ]
        },
        {
          "id": "3-3",
          "title": "인증 결함 · 대량 할당 · 리소스 · 주입 · 비즈니스 로직",
          "body": [
            {
              "type": "h3",
              "text": "사용자 인증 결함"
            },
            {
              "type": "p",
              "text": "약한 비밀번호, 자격 증명 스터핑에 열린 로그인, 예측 가능한 리셋 토큰, MFA 우회, 계정 열거(이메일 없음/비번 틀림 메시지 차이)."
            },
            {
              "type": "h3",
              "text": "대량 할당 (Mass Assignment)"
            },
            {
              "type": "diagram",
              "id": "mass_assign",
              "caption": "JSON에 isAdmin:true 를 슬쩍 넣었더니 가입과 동시에 관리자가 되는 그림."
            },
            {
              "type": "p",
              "text": "서버가 클라이언트가 보낸 필드를 모델에 그대로 붙일 때 발생합니다. 응답에만 보이던 필드를 요청에 되먹이거나, 이름을 추측·퍼징합니다."
            },
            {
              "type": "h3",
              "text": "리소스 부족·속도 제한 / 부적절한 자산 관리"
            },
            {
              "type": "p",
              "text": "한도 없음은 스크래핑·브루트·비용 폭탄. 구버전 API가 인터넷에 남아 있으면 ‘고친 줄 알았던 구멍’이 그대로다."
            },
            {
              "type": "h3",
              "text": "주입"
            },
            {
              "type": "diagram",
              "id": "injection_context",
              "caption": "입력이 SQL·HTML·셸 어디에 붙는지에 따라 공격 이름이 달라진다."
            },
            {
              "type": "h3",
              "text": "비즈니스 로직"
            },
            {
              "type": "p",
              "text": "기술 스캐너가 잘 못 잡는 영역. 쿠폰 재사용, 음수 수량, 결제 순서 건너뛰기, 레이스 컨디션. 문서를 읽고 ‘의도된 흐름’을 이해해야 보인다."
            },
            {
              "type": "code",
              "title": "보고서 한 단락 템플릿",
              "lang": "text",
              "code": "[제목] BOLA on GET /api/orders/{id}\n[재현] 사용자 A 토큰으로 B의 orderId 요청 → 200 + B 주문 전문\n[영향] 전 고객 주문·배송지 열람 가능 추정\n[수정] 서버에서 order.owner == auth.user 강제 검증"
            }
          ]
        },
        {
          "id": "3-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "h3",
              "text": "우선순위를 매기는 감각"
            },
            {
              "type": "p",
              "text": "모든 취약점을 동등하게 보지 않습니다. 보통 (1) 인증 우회·BOLA로 대량 PII (2) BFLA로 관리 기능 (3) 대량 할당으로 역할/가격 (4) 주입으로 DB/OS (5) 과다 노출·설정 오류 체인 보강 순으로 비즈니스 아픔이 큽니다."
            },
            {
              "type": "p",
              "text": "이름을 영어 약어로만 외우면 보고서에 힘이 없습니다. “BOLA로 타 사용자 주문 열람”처럼 한국어 한 문장 정의를 항상 옆에 적어두세요."
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "BOLA/BFLA/대량할당/과다노출을 API 빅4로 먼저 몸에 익히자.",
        "이름 → 재현 → 영향 → 수정의 여러분의 칸 일지를 쓰세요.",
        "비즈니스 로직은 ‘의도된 흐름’ 이해가 선행됩니다."
      ],
      "checklist": [
        "취약점 이름 11개를 빈 종이에 써 보기",
        "각각 재현 패턴 한 줄",
        "BOLA A-B 실험 설계"
      ]
    },
    {
      "id": "ch04",
      "num": "4",
      "part": "part2",
      "title": "API 해킹 시스템",
      "tagline": "손과 눈을 붙일 작업대 — 칼리, DevTools, Burp, Postman, 보조 툴",
      "minutes": 75,
      "xp": 210,
      "difficulty": 2,
      "sections": [
        {
          "id": "4-0",
          "title": "도구는 ‘워크플로’ 안에 넣을 때만 무기다",
          "body": [
            {
              "type": "p",
              "text": "도구 목록을 수집하는 취미와, 취약점을 재현하는 실력은 다릅니다. 이 장은 ‘무엇을 설치할까’보다 ‘어떤 순서로 손을 움직이나’에 초점을 둔다."
            },
            {
              "type": "diagram",
              "id": "burp_postman",
              "caption": "Postman으로 지도를 그리고, Burp로 칼질합니다. 역할이 겹치지만 강점이 다릅니다."
            },
            {
              "type": "steps",
              "title": "추천 하루 루프",
              "items": [
                "브라우저로 정상 사용 (가입·주요 기능 클릭)",
                "DevTools Network에서 XHR/Fetch만 필터",
                "Burp History에 쌓인 요청을 분류",
                "흥미로운 요청을 Repeater로 이해",
                "Postman 컬렉션에 저장·변수화",
                "필요하실 때만 Intruder/Wfuzz로 규모 확장"
              ]
            }
          ]
        },
        {
          "id": "4-1",
          "title": "칼리 · DevTools · Burp",
          "body": [
            {
              "type": "p",
              "text": "칼리 리눅스는 도구가 미리 깔린 공격자 워크스테이션입니다. 필수는 아니지만 학습 표준에 가깝습니다. VM 스냅샷을 ‘실험 전’ 상태로 남겨 두세요."
            },
            {
              "type": "h3",
              "text": "브라우저 개발자 도구"
            },
            {
              "type": "list",
              "items": [
                "Network: API 호출만 보기 (XHR/Fetch)",
                "Preview/Response: JSON 필드 읽기",
                "Application: 토큰이 쿠키·LocalStorage 어디에 있는지",
                "Sources 검색: /api/, swagger, graphql, apiKey 문자열"
              ]
            },
            {
              "type": "h3",
              "text": "Burp Suite"
            },
            {
              "type": "p",
              "text": "중간자 프록시다. 브라우저 트래픽을 127.0.0.1:8080으로 보내고, Burp CA를 신뢰해야 HTTPS 내용이 보인다. Proxy로 보고, Repeater로 이해하고, Intruder로 대량 시험합니다."
            },
            {
              "type": "cards",
              "items": [
                {
                  "title": "Proxy / History",
                  "text": "타임라인. 나중에 다시 꺼낼 수 있는 기록."
                },
                {
                  "title": "Repeater",
                  "text": "학습의 핵심. 한 요청을 손으로 뜯어고칩니다."
                },
                {
                  "title": "Intruder",
                  "text": "위치를 정해 페이로드를 꽂는다. 열거·브루트."
                },
                {
                  "title": "Extender",
                  "text": "InQL, Autorize 등 확장으로 생산성 폭발."
                }
              ]
            },
            {
              "type": "callout",
              "tone": "warn",
              "title": "막히는 지점",
              "text": "인증서·프록시 스코프 설정에서 하루를 태우는 사람이 많습니다. 체크리스트를 만들어 두면 다음부터 5분입니다."
            }
          ]
        },
        {
          "id": "4-2",
          "title": "Postman과 보조 도구",
          "body": [
            {
              "type": "p",
              "text": "Postman은 API 작업대다. 환경 변수({{baseUrl}}, {{tokenA}}, {{tokenB}})를 처음부터 나누면 10장 권한 테스트가 편해진다. Collection Runner로 시나리오를 돌리고, Tests 탭으로 간단한 단언을 붙일 수 있습니다."
            },
            {
              "type": "code",
              "title": "Postman Tests 예",
              "lang": "js",
              "code": "pm.test('status 200', () => pm.response.to.have.status(200));\nconst j = pm.response.json();\npm.collectionVariables.set('userId', j.id);"
            },
            {
              "type": "table",
              "headers": [
                "도구",
                "한 줄 역할"
              ],
              "rows": [
                [
                  "OWASP Amass",
                  "서브도메인·OSINT 매핑"
                ],
                [
                  "Kiterunner",
                  "API 경로 디스커버리"
                ],
                [
                  "Nikto / ZAP",
                  "웹 취약점 스캔 보조"
                ],
                [
                  "Wfuzz",
                  "CLI 퍼징"
                ],
                [
                  "Arjun",
                  "숨은 파라미터 이름 발견"
                ]
              ]
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "조합",
              "text": "Postman 트래픽이 Burp를 거치게 프록시를 연결하시면, 문서 기반 요청 + 공격 변조를 한 흐름으로 묶을 수 있습니다."
            }
          ]
        },
        {
          "id": "4-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "h3",
              "text": "도구 설치보다 손 근육"
            },
            {
              "type": "p",
              "text": "Burp History만 眺め보지 말고, Repeater에서 헤더 하나를 지워 보고 응답이 어떻게 바뀌는지 관찰하는 5분 훈련을 넣어 보세요. 그 5분이 툴 수집 5시간보다 값지다."
            },
            {
              "type": "p",
              "text": "Postman 환경은 최소 baseUrl, tokenA, tokenB 세 변수부터 만듭니다. 컬렉션 폴더는 도메인/기능 단위로 나누면 검색이 쉬워진다."
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #1: REST API에서 사용자 계정 열거",
        "goal": "로그인/가입/비밀번호 찾기 응답 차이로 유효 계정·이메일을 구분합니다.",
        "steps": [
          "대상 인증 관련 요청을 Burp로 캡처합니다",
          "유효/무효 입력의 상태코드·메시지·길이를 Repeater에서 표로 비교합니다",
          "차이나는 필드를 ‘존재 시그니처’로 정의합니다",
          "Intruder에 이메일/유저명 워드리스트를 넣고 필터링합니다",
          "보고서용으로 요청 샘플·판별 기준·후속 위험(스프레이)을 적는다"
        ]
      },
      "keyTakeaways": [
        "DevTools로 보고, Burp로 만지고, Postman으로 정리합니다.",
        "이해 없는 Intruder는 로그만 만듭니다."
      ],
      "checklist": []
    },
    {
      "id": "ch05",
      "num": "5",
      "part": "part2",
      "title": "취약한 API 대상 설정",
      "tagline": "합법적으로 점검할 장난감을 집에 들입니다",
      "minutes": 50,
      "xp": 160,
      "difficulty": 2,
      "sections": [
        {
          "id": "5-0",
          "title": "왜 일부러 약한 서버를 띄우나",
          "body": [
            {
              "type": "p",
              "text": "실력을 키우려면 반복이 필요합니다. 인터넷의 아무 사이트에 반복 공격을 할 수는 없습니다. 그래서 커뮤니티가 만들어 둔 ‘일부러 취약한’ 앱을 Docker로 올려 나만의 사격장을 만듭니다."
            },
            {
              "type": "analogy",
              "title": "격투기 도장",
              "text": "길거리에서 사람을 때리는 게 아니라, 도장 매트 위에서 스파링합니다. 로컬 랩이 그 매트다."
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "계정 2개 규칙",
              "text": "지금 당장 유저 A/B(또는 유저·어드민)를 만들어 두세요. 권한 장에서 필수 재료다."
            }
          ]
        },
        {
          "id": "5-1",
          "title": "대표 타깃 소개",
          "body": [
            {
              "type": "cards",
              "items": [
                {
                  "title": "crAPI",
                  "text": "OWASP. 자동차·커뮤니티 스토리. BOLA·JWT·대량할당 연습 최적. 이 책의 단골."
                },
                {
                  "title": "Juice Shop",
                  "text": "점수판형 챌린지. 웹+API를 넓게. 동기 부여에 최고."
                },
                {
                  "title": "DVGA",
                  "text": "GraphQL 전용. 인트로스펙션·인젝션 연습."
                },
                {
                  "title": "VAmPI 등",
                  "text": "가벼운 API Top 10 미니 랩."
                }
              ]
            },
            {
              "type": "steps",
              "title": "Docker로 올리는 일반 순서",
              "items": [
                "Docker Desktop 또는 리눅스에 Docker·Compose 설치",
                "공식 README의 clone → compose up 명령 실행",
                "docker ps 로 포트 확인 후 브라우저 접속",
                "Burp 프록시에 해당 호스트를 포함",
                "스냅샷/볼륨 백업 습관"
              ]
            },
            {
              "type": "p",
              "text": "TryHackMe·Hack The Box는 ‘원격에 있는 합법 사격장’입니다. 로컬 랩과 병행하면 환경 구성 스트레스와 실전 감각을 균형 있게 얻을 수 있습니다. 자세한 플랫폼 가이드는 사이드바 「합법 실습」을 보세요."
            }
          ]
        },
        {
          "id": "5-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "h3",
              "text": "랩을 키우는 일상"
            },
            {
              "type": "p",
              "text": "랩은 한 번 올리고 끝이 아닙니다. docker compose ps, 로그, 볼륨 초기화 명령을 README 옆에 메모해 두세요. “어제 됐는데 오늘 안 됨”을 줄이는 게 학습 지속성의 핵심입니다."
            },
            {
              "type": "p",
              "text": "crAPI와 Juice Shop을 동시에 띄울 때는 포트 충돌을 피하시기 바랍니다. 브라우저 북마크에 이름표를 붙여 두면 헷갈리지 않습니다."
            },
            {
              "type": "steps",
              "title": "오늘 저녁 60분 세팅 루틴",
              "items": [
                "Docker 상태 확인 및 타깃 하나 compose up",
                "계정 A/B 생성 후 id·토큰 위치 기록",
                "Burp가 해당 호스트를 가로채는지 확인",
                "Postman에 baseUrl 컬렉션 생성",
                "Ch.6 들어가기 전 스냅샷 저장"
              ]
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "합법 실습 메뉴와 연결",
              "text": "로컬이 지겨우면 사이드바 「합법 실습」에서 TryHackMe·PortSwigger로 넘어가면 됩니다."
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #2: 취약한 API 발견",
        "goal": "새로 올린 타깃의 인증 전/후 API 표면 지도를 만듭니다.",
        "steps": [
          "가입·주요 기능 클릭으로 Burp History를 채운다",
          "Postman 컬렉션으로 엔드포인트를 정리합니다",
          "/api, /swagger, /openapi.json, /graphql 관례 경로를 확인합니다",
          "역할이 다른 계정 2개를 확보합니다"
        ]
      },
      "keyTakeaways": [
        "로컬 랩 = 무한 재시도 면허",
        "한 타깃을 깊게 파는 편이 도구 수집보다 낫다"
      ],
      "checklist": []
    },
    {
      "id": "ch06",
      "num": "6",
      "part": "part3",
      "title": "발견 (Discovery)",
      "tagline": "안 보이면 못 친다 — 수동·능동 정찰로 표면을 드러냅니다",
      "minutes": 65,
      "xp": 200,
      "difficulty": 3,
      "sections": [
        {
          "id": "6-0",
          "title": "공격 파이프라인의 첫 단추",
          "body": [
            {
              "type": "diagram",
              "id": "attack_pipeline",
              "caption": "발견 → 분석 → 인증 → 퍼징 → 권한 → 착취. 발견을 건너뛰면 이후가 표류합니다."
            },
            {
              "type": "p",
              "text": "Discovery는 거창한 해킹 기술이라기보다 ‘지도 제작’입니다. 어떤 호스트가 있고, 어떤 경로가 열려 있으며, 문서는 어디에 있고, 깃허브에 키가 흘렀는지. 지도 없이 퍼징하면 노이즈만 쌓입니다."
            },
            {
              "type": "analogy",
              "title": "탐정",
              "text": "현장에 들어가기 전 공개 기록·SNS·건축 도면을 모읍니다. 수동 정찰이 그 단계고, 능동 정찰은 초인종을 눌러 보는 단계다. 초인종은 로그에 남습니다."
            }
          ]
        },
        {
          "id": "6-1",
          "title": "수동적 사전 조사 (Passive)",
          "body": [
            {
              "type": "p",
              "text": "대상에 직접 패킷을 거의 보내지 않고 공개 정보만 모읍니다. 버그바운티 초반, 범위 확인 전에 특히 중요합니다."
            },
            {
              "type": "list",
              "items": [
                "구글 도킹: site:target.com inurl:api, filetype:json, swagger",
                "Shodan 등으로 열린 서비스·배여러분 힌트",
                "Amass 등 서브도메인 OSINT",
                "GitHub: org명, api_key, Authorization 헤더 유출",
                "공개 Postman 워크스페이스·옛 문서 미러"
              ]
            },
            {
              "type": "code",
              "title": "구글 도킹 시드",
              "lang": "text",
              "code": "site:example.com inurl:api\nsite:example.com filetype:yaml openapi\nsite:example.com \"api_key\"\nsite:github.com example.com authorization bearer"
            }
          ]
        },
        {
          "id": "6-2",
          "title": "능동적 사전 조사 (Active)",
          "body": [
            {
              "type": "p",
              "text": "범위가 확인된 뒤에, 실제로 포트를 찍고 경로를 두드린다. Nmap, robots.txt, 브라우저 정상 사용, Burp 사이트맵, ZAP 스파이더, Gobuster/ffuf, Kiterunner 등이 등장합니다."
            },
            {
              "type": "steps",
              "title": "능동 정찰 미니 플레이북",
              "items": [
                "허용 대상 목록을 종이에 적는다 (감정으로 확장 금지)",
                "주요 포트·TLS 확인",
                "브라우저로 사람처럼 쓰며 History를 채운다",
                "관례 경로·워드리스트로 API 단서 보강",
                "결과를 확인됨/추측/범위 외로 분류한 표로 남깁니다"
              ]
            },
            {
              "type": "callout",
              "tone": "warn",
              "title": "범위 주의",
              "text": "자동 스캐너는 로그와 WAF를 깨운다. SOW에 없는 서브도메인에 오토스캔을 돌리지 마세요."
            }
          ]
        },
        {
          "id": "6-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "h3",
              "text": "정찰 결과물을 예쁜 출력으로 착각하지 않기"
            },
            {
              "type": "p",
              "text": "nmap 컬러 출력은 성취감을 주지만, 쓸 수 있는 산출물은 “확인된 API 호스트 / 추정 경로 / 인증 가설 / 범위 내외” 표다. 표를 못 만들면 아직 발견이 끝난 게 아닙니다."
            },
            {
              "type": "p",
              "text": "GitHub 시크릿 검색은 여전히 잘 터집니다. 도메인·org 이름을 스코프와 대조하는 습관을 들이자."
            },
            {
              "type": "analogy",
              "title": "등산 전 지도",
              "text": "정상(착취)만 보고 등산하면 계곡에 빠진다. 능선(호스트)·샘터(문서)·위험 구역(범위 외)을 먼저 표시하는 것이 발견 단계다."
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #3: 블랙 박스 능동 정찰",
        "goal": "이름만 아는 타깃에서 API 호스트·경로 후보 목록을 만듭니다.",
        "steps": [
          "수동 OSINT 30분 → 후보 도메인",
          "범위 확인 후 nmap + 웹 디스커버리",
          "Burp로 정상 사용 트래픽 수집",
          "확인됨/추측/범위 외 표 작성"
        ]
      },
      "keyTakeaways": [
        "수동으로 스케치 → 능동으로 확정",
        "산출물은 ‘예쁜 툴 출력’이 아니라 분류된 표"
      ],
      "checklist": []
    },
    {
      "id": "ch07",
      "num": "7",
      "part": "part3",
      "title": "엔드포인트 분석",
      "tagline": "문서를 먹고 컬렉션을 키웁니다 — 기능을 해부하는 장",
      "minutes": 60,
      "xp": 190,
      "difficulty": 3,
      "sections": [
        {
          "id": "7-0",
          "title": "분석이란 ‘정상’을 기록하는 일",
          "body": [
            {
              "type": "p",
              "text": "취약점은 ‘이상한 것’입니다. 그런데 정상을 모르시면 이상도 모른다. 이 장의 목표는 대상 API의 의도된 사용법, 인증 방식, 응답 필드, 에러 모양을 컬렉션과 메모로 고정하는 것입니다."
            },
            {
              "type": "steps",
              "title": "기능 분석 3단",
              "items": [
                {
                  "title": "Happy path",
                  "text": "문서·UI가 기대한 대로 호출해 봅니다"
                },
                {
                  "title": "권한 필요 동작",
                  "text": "로그인이 필요한 기능을 역할별로"
                },
                {
                  "title": "응답 해부",
                  "text": "JSON 필드를 UI와 비교해 과다 노출 표시"
                }
              ]
            }
          ]
        },
        {
          "id": "7-1",
          "title": "정보를 모으는 원천",
          "body": [
            {
              "type": "list",
              "items": [
                "공식 개발자 문서, 상태 코드 표, rate limit 설명",
                "OpenAPI/Swagger UI → 명세 임포트",
                "모바일 APK·JS 번들 리버스 (하드코딩 베이스 URL, 플래그)",
                "구버전 앱·레거시 도메인에 남은 그림자 API"
              ]
            },
            {
              "type": "p",
              "text": "Postman에 인증을 환경 변수로 붙이면, 이후 BOLA 실험에서 토큰만 바꿔 가며 같은 컬렉션을 재사용할 수 있습니다. pre-request script로 토큰 갱신까지 가면 생산성이 크게 오른다."
            },
            {
              "type": "table",
              "headers": [
                "관찰",
                "의심 취약점"
              ],
              "rows": [
                [
                  "응답에 내부 ID·역할·해시",
                  "과다 노출"
                ],
                [
                  "스택·SQL 조각",
                  "설정 오류·주입 힌트"
                ],
                [
                  "가격/역할이 클라이언트 결정",
                  "비즈니스 로직·대량 할당"
                ],
                [
                  "HTTP 평문 혼용",
                  "전송 구간 위험"
                ]
              ]
            }
          ]
        },
        {
          "id": "7-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "p",
              "text": "분석 단계의 산출물은 컬렉션과 필드 주석입니다. 응답의 user.id 옆에 “순차 ID → BOLA 후보”, role 옆에 “대량 할당 시 되먹이기”라고 적는다."
            },
            {
              "type": "p",
              "text": "에러 메시지 톤도 기록해 보세요. 퍼징 때 정상 에러와 이상한 에러를 가르는 기준선이 됩니다."
            },
            {
              "type": "steps",
              "title": "30분 분석 스프린트",
              "items": [
                "핵심 플로우 3개 캡처",
                "Postman 폴더 3개로 정리",
                "민감·내부 필드 하이라이트",
                "인증 헤더를 환경 변수로 통일",
                "가설 이슈 제목 3개 적기"
              ]
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #4: crAPI 컬렉션 + 과다 노출",
        "goal": "핵심 플로우 컬렉션을 만들고 응답 JSON에서 민감 필드를 표시합니다.",
        "steps": [
          "가입·로그인·프로필·주요 자원 요청을 저장",
          "UI에 없는 필드를 하이라이트",
          "다른 역할로 같은 객체를 조의해 필드 차이 비교"
        ]
      },
      "keyTakeaways": [
        "컬렉션 = 공격 인벤토리",
        "과다 노출은 JSON을 읽는 습관에서 나옵니다"
      ],
      "checklist": []
    },
    {
      "id": "ch08",
      "num": "8",
      "part": "part3",
      "title": "인증 공격",
      "tagline": "출입증을 훔치고, 찍고, 위조합니다",
      "minutes": 70,
      "xp": 230,
      "difficulty": 3,
      "sections": [
        {
          "id": "8-0",
          "title": "인증 공격의 큰 그림",
          "body": [
            {
              "type": "p",
              "text": "인증은 ‘당신이 누구인지’를 서버가 믿는 과정입니다. 공격자는 (1) 비밀번호를 알아내거나 (2) 발급된 토큰을 훔치거나 (3) 토큰·JWT를 위조·변조합니다. rate limit·락아웃·CAPTCHA·MFA 유무를 먼저 재면 난이도가 보인다."
            },
            {
              "type": "steps",
              "title": "넓혀 가는 순서",
              "items": [
                "계정 열거 가능 여부",
                "스프레이/신중한 브루트",
                "리셋·OTP 엔트로피",
                "세션 토큰 예측",
                "JWT 분석·변조·크랙"
              ]
            }
          ]
        },
        {
          "id": "8-1",
          "title": "고전적 기법과 토큰",
          "body": [
            {
              "type": "cards",
              "items": [
                {
                  "title": "비밀번호 무차별 대입",
                  "text": "한 계정에 많은 비밀번호. 락아웃을 먼저 확인."
                },
                {
                  "title": "스프레이",
                  "text": "많은 계정에 적은 비밀번호. 열거와 콤보."
                },
                {
                  "title": "리셋/MFA 브루트",
                  "text": "6자리 OTP는 공간 탐색 여지를 봅니다. 시도 한도·만료."
                },
                {
                  "title": "Basic",
                  "text": "Base64는 암호화가 아닙니다. 디코드 습관."
                }
              ]
            },
            {
              "type": "p",
              "text": "세션 토큰이 순차·짧은 엔트로피라면 예측 가능합니다. 샘플을 모아 패턴을 보고 Intruder로 확인합니다."
            }
          ]
        },
        {
          "id": "8-2",
          "title": "JWT를 친절하게 부수기",
          "body": [
            {
              "type": "diagram",
              "id": "jwt_parts",
              "caption": "헤더·페이로드는 비밀이 아닙니다. 서명이 핵심입니다. 그런데 서버가 서명을 제대로 안 보시면?"
            },
            {
              "type": "p",
              "text": "none 공격: 알고리즘을 none으로 두고 서명을 비우는 고전. 알고리즘 스위치: 비대칭(RS) 검증을 대칭(HS)으로 착각하게 만드는 류. 약한 HS 시크릿은 워드리스트 크랙. 서명 검증이 통과해도 role 클레임을 서버가 맹신하면 권한 상승입니다."
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "실무 루틴",
              "text": "토큰을 디코드 → 클레임 목록 메모 → 만료·역할 관련 키 표시 → 위조 시나리오 가설 → 랩에서만 실험."
            },
            {
              "type": "callout",
              "tone": "warn",
              "title": "윤리",
              "text": "프로덕션에서 계정 락아웃을 유발하는 브루트는 범위·속도 합의 없이 금지."
            }
          ]
        },
        {
          "id": "8-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "p",
              "text": "인증 공격을 비밀번호 맞히기로만 생각하시면 JWT·세션·OAuth에서 길을 잃는다. 서버가 믿게 되는 모든 출입증이 대상입니다."
            },
            {
              "type": "p",
              "text": "JWT 실습 전 도구 페이지 디코더로 토큰을 까보세요. 클레임을 눈으로 본 뒤 랩에서만 변조를 실험합니다."
            },
            {
              "type": "callout",
              "tone": "warn",
              "title": "운영 환경 주의",
              "text": "락아웃 유발 브루트, 타인 메일 리셋 폭탄은 정책 위반인 경우가 많습니다. 자기 테스트 계정, 합의된 속도."
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #5: crAPI JWT 서명 크랙",
        "goal": "약한 비밀로 서명된 JWT를 크랙하고 클레임을 바꿔 권한을 높인다.",
        "steps": [
          "로그인 후 JWT 캡처·디코드",
          "alg와 클레임 구조 기록",
          "워드리스트로 시크릿 크랙",
          "role 등 수정 후 재서명 → 보호 리소스 접근"
        ]
      },
      "keyTakeaways": [
        "열거 → 스프레이 → 토큰 → JWT 순으로 넓힌다",
        "JWT는 서명 검증과 클레임 권한 모델 둘 다 봐야 합니다"
      ],
      "checklist": []
    },
    {
      "id": "ch09",
      "num": "9",
      "part": "part3",
      "title": "퍼징",
      "tagline": "이상한 입력을 체계적으로 던져 금이 간 곳을 찾습니다",
      "minutes": 60,
      "xp": 210,
      "difficulty": 3,
      "sections": [
        {
          "id": "9-0",
          "title": "퍼징이 실패하는 이유",
          "body": [
            {
              "type": "p",
              "text": "초보는 페이로드 파일을 무한히 돌립니다. 그리고 지치기 쉽습니다. 효과적인 퍼징은 (1) 무엇을 넣을지 (2) 어떤 응답을 ‘이상’으로 볼지 를 먼저 정하는 실험입니다."
            },
            {
              "type": "analogy",
              "title": "병원에서 알레르기 테스트",
              "text": "아무 약이나 투약하는 게 아니라, 의심 항원을 소량씩 넣고 반응(발진=5xx, 지연, 길이 변화)을 기록합니다."
            },
            {
              "type": "table",
              "headers": [
                "이상 징후",
                "의미 후보"
              ],
              "rows": [
                [
                  "5xx",
                  "파서·쿼리 예외"
                ],
                [
                  "지연",
                  "타임블라인드, 무거운 쿼리"
                ],
                [
                  "길이/필드 변화",
                  "다른 코드 경로"
                ],
                [
                  "상세 에러",
                  "정보 누출·다음 페이로드 힌트"
                ]
              ]
            }
          ]
        },
        {
          "id": "9-1",
          "title": "넓게, 그리고 깊게",
          "body": [
            {
              "type": "p",
              "text": "넓은 퍼징: 많은 엔드포인트에 가벼운 변형을 가해 ‘어디가 아픈지’ 지도화 (Postman Runner 등). 깊은 퍼징: 한 파라미터를 Intruder/Wfuzz로 철저히."
            },
            {
              "type": "list",
              "items": [
                "메서드 스위칭 (GET↔DELETE…)",
                "타입 혼동 (숫자↔문자열↔배열↔객체)",
                "특수문자·인코딩 중첩",
                "경로 순회 ../",
                "Arjun으로 숨은 파라미터 이름 발견 후 재퍼징"
              ]
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "워크플로",
              "text": "넓게 지도 → 태그 → 깊게 착취. 순서가 뒤집히면 시간 낭비다."
            }
          ]
        },
        {
          "id": "9-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "p",
              "text": "대상이 기대하는 타입을 먼저 관찰해 보세요. 숫자 자리에 배열, 문자열 자리에 객체를 넣는 것이 API JSON 퍼징의 기본기다."
            },
            {
              "type": "p",
              "text": "Intruder 결과 1만 줄을 스크롤하지 말고, 상태코드·길이 필터를 걸어 남은 것만 Repeater로 옮긴다."
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #6: 부적절한 자원 관리 퍼징",
        "goal": "문서에 없는 메서드·파라미터·버전에서 이상 응답을 찾습니다.",
        "steps": [
          "컬렉션 전 엔드포인트에 변형 메서드 적용",
          "공통 파라미터 이름 퍼징",
          "이상 응답만 Repeater로 원인 분석"
        ]
      },
      "keyTakeaways": [
        "감지 규칙 없는 퍼징은 로그만 쌓입니다",
        "넓게 지도 → 깊게 착취"
      ],
      "checklist": []
    },
    {
      "id": "ch10",
      "num": "10",
      "part": "part3",
      "title": "권한 공격",
      "tagline": "두 계정이면 충분합니다 — BOLA·BFLA 실전",
      "minutes": 55,
      "xp": 220,
      "difficulty": 4,
      "sections": [
        {
          "id": "10-0",
          "title": "권한 버그는 ‘교차’로 증명합니다",
          "body": [
            {
              "type": "diagram",
              "id": "ab_test",
              "caption": "A의 출입증으로 B의 금고를 열어 보는 실험."
            },
            {
              "type": "p",
              "text": "BOLA를 찾는 가장 정직한 방법은 계정 두 개다. 각각 자원을 만들고 ID를 교환해 요청합니다. 200과 함께 상대 데이터가 오면 취약합니다. 403/404로 막히시면 그 엔드포인트는 일단 통과."
            },
            {
              "type": "p",
              "text": "부채널 BOLA도 있습니다. 직접 조회는 막히는데 검색·내보내기·알림·썸네일 URL로 새는 경우. ‘문이 잠겼다’고 끝내지 말고 창문을 봅니다."
            }
          ]
        },
        {
          "id": "10-1",
          "title": "BFLA와 생산성 팁",
          "body": [
            {
              "type": "p",
              "text": "BFLA는 A-B-A가 편합니다. 관리자(B)로 기능을 캡처한 뒤 일반 유저(A) 토큰으로 재전송. Postman 변수 전환, Burp Match & Replace, Autorize 확장이 시간을 아껴 줍니다."
            },
            {
              "type": "code",
              "title": "A-B 체크 로그 헤더",
              "lang": "text",
              "code": "date | endpoint | method | token | objectId | status | notes\n... | /api/cars/9/loc | GET | A | 9(B) | 200 | BOLA confirmed"
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "보고서",
              "text": "권한 버그는 비즈니스 임팩트를 쓰기 쉽습니다. ‘전 사용자 위치/주문 노출’처럼 한 문장 영향을 앞에 두세요."
            }
          ]
        },
        {
          "id": "10-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "p",
              "text": "계정 하나로 id만 바꾸면 거짓 음성이 나옵니다. A/B를 둘 다 정상 동작시킨 뒤 교차합니다."
            },
            {
              "type": "p",
              "text": "GraphQL이라면 쿼리 변수·노드 id를 교환하고, 필드 단위 권한까지 봅니다."
            },
            {
              "type": "analogy",
              "title": "호텔 키카드",
              "text": "로비 입장(인증)은 됐는데 다른 방 번호(객체 id)로 문이 열리면 BOLA. 직원 전용 문이 손님 키로 열리면 BFLA."
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #7: 다른 사용자의 자동차 위치 발견",
        "goal": "crAPI 등에서 차량/위치 객체 BOLA를 재현해 보세요.",
        "steps": [
          "두 계정의 vehicle id 확보",
          "토큰 교차 요청",
          "위치·상세 비교 증거 저장",
          "수정 제안: 서버측 소유권 검사"
        ]
      },
      "keyTakeaways": [
        "증명 단위는 두 계정",
        "부채널을 잊지 마세요"
      ],
      "checklist": []
    },
    {
      "id": "ch11",
      "num": "11",
      "part": "part3",
      "title": "대량 할당",
      "tagline": "숨은 필드로 권한과 가격을 굽는다",
      "minutes": 50,
      "xp": 190,
      "difficulty": 3,
      "sections": [
        {
          "id": "11-0",
          "title": "개념을 이야기로",
          "body": [
            {
              "type": "diagram",
              "id": "mass_assign",
              "caption": "서버가 ‘손님이 적어 준 모든 칸’을 민다고 가정할 때 사고가 납니다."
            },
            {
              "type": "p",
              "text": "회원가입 폼에는 email·password만 있는데, 요청 JSON에 isAdmin:true, credit:999999 를 추가했더니 받아주는 경우가 있습니다. 이를 대량 할당이라 부른다. 프레임워크의 자동 바인딩이 편의인 동시에 칼이 됩니다."
            },
            {
              "type": "analogy",
              "title": "병원 초진 용지",
              "text": "환자가 ‘나는 의사입니다’라고 용지에 스스로 쓰시면 접수 직원이 그대로 전산에 올리는 셈. 역할은 창구 직원이 내부 기준으로 부여해야 합니다."
            }
          ]
        },
        {
          "id": "11-1",
          "title": "어떻게 찾나",
          "body": [
            {
              "type": "steps",
              "title": "실전 순서",
              "items": [
                "등록·프로필 수정·객체 생성/갱신 엔드포인트 표시",
                "응답에만 있는 필드를 요청에 되먹이기",
                "문서·모바일 모델 필드명 수집",
                "Arjun/Intruder로 isAdmin, role, price, balance, verified…",
                "BFLA와 결합: 일반 유저가 admin 전용 필드 수정?"
              ]
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "방어 한 줄",
              "text": "서버는 허용 필드 화이트리스트만 모델에 복사합니다. 클라이언트를 믿지 않습니다."
            }
          ]
        },
        {
          "id": "11-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "p",
              "text": "isAdmin만 노리지 마세요. 할인율, 잔액, 인증 플래그, 조직 id, 구독 티어가 더 현실적인 돈·권한 문제로 이어집니다."
            },
            {
              "type": "p",
              "text": "문서·모바일 모델 이름을 수집하면 적중률이 올라갑니다. camelCase/snake_case 습관도 맞추자."
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #8: 온라인 상점 아이템 가격 변경",
        "goal": "주문/아이템 업데이트에 price 필드를 주입해 결제 금액을 조작합니다.",
        "steps": [
          "정상 주문 플로우 캡처",
          "바디에 price/total 변형",
          "서버 최종 청구액 확인",
          "0원·음수·타 필드도 시도"
        ]
      },
      "keyTakeaways": [
        "응답 필드 = 공격 파라미터 후보",
        "화이트리스트 바인딩이 정석"
      ],
      "checklist": []
    },
    {
      "id": "ch12",
      "num": "12",
      "part": "part3",
      "title": "주입",
      "tagline": "입력이 명령이 되는 순간 — SQL·NoSQL·XSS·OS",
      "minutes": 65,
      "xp": 230,
      "difficulty": 4,
      "sections": [
        {
          "id": "12-0",
          "title": "컨텍스트가 전부다",
          "body": [
            {
              "type": "diagram",
              "id": "injection_context",
              "caption": "같은 문자열도 SQL에 붙으면 SQLI, HTML이면 XSS, 셸이면 명령 주입."
            },
            {
              "type": "p",
              "text": "주입을 ‘페이로드 암기 대회’로 접근하면 금방 한계가 옵니다. 먼저 입력이 서버에서 어디로 흘러 어떤 해석기에 들어가는지 가설을 세운다. API에서는 반사 지점이 브라우저가 아니라 다른 API·관리 콘솔·PDF·로그일 수 있습니다(XAS 감각)."
            }
          ]
        },
        {
          "id": "12-1",
          "title": "유형별 친절 가이드",
          "body": [
            {
              "type": "h3",
              "text": "XSS / XAS"
            },
            {
              "type": "p",
              "text": "스크립트가 브라우저 문맥에서 실행되면 XSS. API가 악성 데이터를 저장·전달하는 통로가 되면 피해가 증폭됩니다."
            },
            {
              "type": "h3",
              "text": "SQL"
            },
            {
              "type": "p",
              "text": "문자열 연결 쿼리가 남아 있으면 ' OR '1'='1, 타임 지연, UNION 등으로 탐침. 확인 후 sqlmap. API면 JSON Content-Type·헤더 옵션을 맞춰야 합니다."
            },
            {
              "type": "h3",
              "text": "NoSQL"
            },
            {
              "type": "p",
              "text": "JSON 바디에 {\"$gt\":\"\"}, {\"$ne\":null} 같은 연산자 객체를 넣는 식. 로그인 우회·쿠폰 검증 우회 시나리오가 유명합니다."
            },
            {
              "type": "h3",
              "text": "OS 명령"
            },
            {
              "type": "p",
              "text": "입력이 핑·변환·렌더 명령에 붙을 때 ; | ` $() . 시간 지연으로 존재를 짐작합니다."
            },
            {
              "type": "callout",
              "tone": "warn",
              "title": "랩에서만",
              "text": "실시스템 주입 자동화는 데이터 파괴·법적 이슈 위험이 큽니다. 합법 랩·명시 범위에서."
            }
          ]
        },
        {
          "id": "12-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "p",
              "text": "매 타깃마다 “입력이 어디로 붙는가” 가설을 한 줄 쓰세요. 가설 없는 페이로드 살포는 WAF만 시끄럽게 합니다."
            },
            {
              "type": "p",
              "text": "내 브라우저에서 XSS가 안 보여도 관리자 콘솔에서 터질 수 있습니다. 데이터 흐름을 따라가 보세요."
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #9: NoSQL 주입으로 쿠폰 위조",
        "goal": "쿠폰 검증 API에 연산자 주입으로 우회 효과를 낸다.",
        "steps": [
          "쿠폰 적용 요청 캡처",
          "문자열 대신 JSON 연산자 시도",
          "할인 적용 여부 확인",
          "방어: 타입 강제, 연산자 금지, 화이트리스트"
        ]
      },
      "keyTakeaways": [
        "컨텍스트 → 페이로드",
        "API 주입은 다른 소비자까지 추적"
      ],
      "checklist": []
    },
    {
      "id": "ch13",
      "num": "13",
      "part": "part4",
      "title": "우회 기술과 속도 제한 테스트",
      "tagline": "벽처럼 보이는 문, 조건을 알면 열린다",
      "minutes": 55,
      "xp": 210,
      "difficulty": 4,
      "sections": [
        {
          "id": "13-0",
          "title": "보안 컨트롤을 미워하지 말고 이해합니다",
          "body": [
            {
              "type": "p",
              "text": "WAF·게이트웨이·rate limit은 당신을 괴롭히려고 있는 게 아니라, 운영자가 쌓아 둔 방어 레이어다. 테스터는 이를 존중하되(범위 안에서) 한계를 측정합니다."
            },
            {
              "type": "diagram",
              "id": "rate_limit",
              "caption": "한도 우회 실험과 서비스 파괴 실험을 절대 혼동하지 마세요."
            },
            {
              "type": "list",
              "items": [
                "경로 변형: 슬래시, 대소문자, 버전, 인코딩",
                "헤더 IP 위조: X-Forwarded-For 등 (서버가 신뢰할 때만 의미)",
                "버여러분 계정·IP로 평판 리셋",
                "Content-Type·HTTP 버전 혼동",
                "Burp/Wfuzz로 우회 페이로드 자동화"
              ]
            },
            {
              "type": "callout",
              "tone": "warn",
              "title": "윤리",
              "text": "합의된 RPS 안에서. 가능하시면 스테이징. 프로덕션 다운은 이력서에 안 씁니다."
            }
          ]
        },
        {
          "id": "13-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "p",
              "text": "막힌 것이 WAF인지 앱 로직인지 구분해 보세요. 차단 페이지, 특이 헤더, 즉시 403 vs 이후 429가 단서다."
            },
            {
              "type": "p",
              "text": "rate limit 보고서는 기준선 RPS와 우회 후 배수를 숫자로 보여 주자. 다만 보상 여부는 스코프를 읽습니다."
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "우회는 창의력+체계적 변형 목록",
        "한도는 비즈니스 이슈로 프레이밍"
      ],
      "checklist": []
    },
    {
      "id": "ch14",
      "num": "14",
      "part": "part4",
      "title": "GraphQL 공격",
      "tagline": "스키마를 훔치고 쿼리로 찌른다",
      "minutes": 60,
      "xp": 220,
      "difficulty": 4,
      "sections": [
        {
          "id": "14-0",
          "title": "REST 뇌를 GraphQL로 전환",
          "body": [
            {
              "type": "diagram",
              "id": "rest_vs_gql",
              "caption": "문이 하나여도 질문 문장이 곧 엔드포인트 목록입니다."
            },
            {
              "type": "p",
              "text": "GraphiQL 같은 IDE가 열려 있으면 학습 속도가 몇 배다. 없어도 인트로스펙션 쿼리·Burp InQL·프론트엔드 번들 속 쿼리 문자열로 지도를 복원할 수 있습니다."
            },
            {
              "type": "steps",
              "title": "공격 루프",
              "items": [
                "경로 후보 브루트 (/graphql, /api/graphql…)",
                "인트로스펙션/스키마 덤프",
                "스키마 기반 컬렉션 생성",
                "필드 단위 권한(BOLA) 검사",
                "뮤테이션·중첩·인젝션 퍼징"
              ]
            },
            {
              "type": "code",
              "title": "인트로스펙션 스케치",
              "lang": "graphql",
              "code": "query {\n  __schema {\n    types { name fields { name } }\n  }\n}"
            }
          ]
        },
        {
          "id": "14-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "p",
              "text": "스키마 덤프 다음은 REST와 같은 질문입니다. 필드 권한? 뮤테이션 대상? 인자가 파일/URL/명령으로 이어지나?"
            },
            {
              "type": "p",
              "text": "중첩 쿼리 폭탄은 부하가 큽니다. 합법 랩이 아니면 돌리지 마세요."
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "인트로스펙션 = 자동 문서",
        "GraphQL도 결국 권한·주입·DoS"
      ],
      "checklist": []
    },
    {
      "id": "ch15",
      "num": "15",
      "part": "part4",
      "title": "데이터 침해와 버그 현상금",
      "tagline": "이론이 헤드라인과 현상금이 되는 순간",
      "minutes": 50,
      "xp": 180,
      "difficulty": 3,
      "sections": [
        {
          "id": "15-0",
          "title": "사례에서 패턴을 훔친다",
          "body": [
            {
              "type": "p",
              "text": "Peloton·USPS·통신사 API 침해 같은 사례의 공통 분모는 단순합니다. API가 핵심 데이터 통로인데 객체/기능 권한이 약했고, 모니터링이 늦었으며, ‘내부용’이 인터넷에 노출됐다."
            },
            {
              "type": "cards",
              "items": [
                {
                  "title": "침해 패턴",
                  "text": "BOLA·인증 약화·과다 데이터 접근 → 대규모 PII"
                },
                {
                  "title": "키 유출",
                  "text": "클라우드·SMS·지도 키는 즉시 과금 피해"
                },
                {
                  "title": "GraphQL BOLA",
                  "text": "현대 바운티 클래식 스토리"
                },
                {
                  "title": "보고 문장",
                  "text": "재현 최소 집합 + 영향 규모 + 비즈니스 언어"
                }
              ]
            },
            {
              "type": "p",
              "text": "현상금은 기술 점수만이 아닙니다. 리뷰어가 5분 안에 재현하고 ‘왜 아픈지’ 이해하게 쓰는 사람이 이긴다. rate-limit 이슈는 프로그램 성향을 보고 우선순위를 조절해 보세요."
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "마치며",
              "text": "이 노트를 끝냈다면 범위 설계 → 랩 → 발견~주입 체인 → 사례 매핑을 설명해야 합니다. 부족한 장은 원서로, 손은 합법 랩으로."
            }
          ]
        },
        {
          "id": "15-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "p",
              "text": "사례를 연예 뉴스로 소비하지 말고 “어떤 API 설계 가정이 깨졌나” 한 줄로 번역해 보세요."
            },
            {
              "type": "p",
              "text": "리포트 템플릿: 요약 / 재현 / 영향 / 수정 / 부가 증거. 미리 만들어 두면 흥분 속에서도 구조가 유지됩니다."
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "사례는 이론에 감정을 붙입니다",
        "바운티는 기술×커뮤니케이션"
      ],
      "checklist": []
    },
    {
      "id": "apx-a",
      "num": "A",
      "part": "part4",
      "title": "부록 A · API 해킹 체크리스트",
      "tagline": "출격 전 포켓 카드 — 피곤할수록 읽습니다",
      "minutes": 25,
      "xp": 90,
      "difficulty": 2,
      "sections": [
        {
          "id": "a-1",
          "title": "한 장 체크리스트",
          "body": [
            {
              "type": "p",
              "text": "스트레스와 수면 부족은 메모리를 지웁니다. 체크리스트는 그 대체재다. 출격 전·중간·보고 전에 훑자."
            },
            {
              "type": "list",
              "items": [
                "□ 권한·범위·제외·클라우드 약관",
                "□ 수동 OSINT → 능동 디스커버리 → 사이트맵",
                "□ 명세/JS/APK에서 엔드포인트 수확",
                "□ Postman 컬렉션 + token A/B",
                "□ 인증: 열거·스프레이·토큰·JWT",
                "□ BOLA A-B, BFLA A-B-A",
                "□ 과다 노출 필드 마킹",
                "□ 대량 할당 필드 퍼징",
                "□ 주입 탐침 (범위 내)",
                "□ rate limit / WAF 우회 (합의 범위)",
                "□ GraphQL 스키마·필드 권한",
                "□ 비즈니스 로직 워크스루",
                "□ 증거·영향·수정안 보고서"
              ]
            },
            {
              "type": "diagram",
              "id": "attack_pipeline",
              "caption": "체크리스트는 이 파이프라인을 빠짐없이 돌기 위한 안전장치다."
            }
          ]
        },
        {
          "id": "A-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "p",
              "text": "체크리스트에 자신만의 도구 단축키를 추가해 보세요. 예: BOLA → Autorize 프리셋."
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "체크리스트는 두 번째 뇌다"
      ],
      "checklist": []
    },
    {
      "id": "apx-b",
      "num": "B",
      "part": "part4",
      "title": "부록 B · 추가 자료",
      "tagline": "지도 밖의 길을 이어 주는 링크",
      "minutes": 20,
      "xp": 60,
      "difficulty": 1,
      "sections": [
        {
          "id": "b-1",
          "title": "다음 스텝",
          "body": [
            {
              "type": "p",
              "text": "이 사이트는 지도입니다. 근육은 합법 랩과 바운티 스코프 읽기에서 만듭니다."
            },
            {
              "type": "list",
              "items": [
                "원서/번역: Corey Ball Hacking APIs / 《API 해킹의 모든 것》",
                "OWASP API Security Top 10, crAPI, Juice Shop, DVGA",
                "PortSwigger Web Security Academy",
                "사이드바 「합법 실습」 전체 가이드",
                "Vickie Li Bug Bounty Bootcamp"
              ]
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "루틴",
              "text": "하루 1섹션 + 주 1랩 + 주 1 스코프 읽기. 막히시면 원서 해당 장."
            }
          ]
        },
        {
          "id": "B-more",
          "title": "한 번 더, 친절하게 붙잡는 메모",
          "note": "짧게 읽히는 복습 레이어. 위에서 개념이 미끄러웠을 때 여기만 다시 봐도 됩니다.",
          "body": [
            {
              "type": "p",
              "text": "북마크만 하지 말고 이번 주 하나에 깊게: PortSwigger Access control 랩 + Ch.10 복습."
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "원리와 체크리스트는 도구 버전보다 오래 산다"
      ],
      "checklist": []
    }
  ],
  "glossary": [
    {
      "term": "BOLA",
      "def": "Broken Object Level Authorization. 객체 단위 권한 실패(API판 IDOR)."
    },
    {
      "term": "BFLA",
      "def": "Broken Function Level Authorization. 기능·역할 단위 권한 실패."
    },
    {
      "term": "JWT",
      "def": "JSON Web Token. header.payload.signature 구조의 통용 토큰."
    },
    {
      "term": "Mass Assignment",
      "def": "클라이언트가 보낸 여분 필드가 모델에 바인딩되어 권한·상태가 바뀌는 취약점."
    },
    {
      "term": "Rate Limiting",
      "def": "시간당 요청 수 제한. 수익 보호·브루트 완화."
    },
    {
      "term": "WAF",
      "def": "Web Application Firewall. HTTP 계층 필터."
    },
    {
      "term": "OSINT",
      "def": "공개 정보 기반 정찰."
    },
    {
      "term": "GraphQL Introspection",
      "def": "스키마 자기기술. 켜져 있으면 API 지도 노출."
    },
    {
      "term": "crAPI",
      "def": "OWASP Completely Ridiculous API. 학습용 취약 API 앱."
    },
    {
      "term": "SOW",
      "def": "Statement of Work. 범위·기간·산출물 작업 기술서."
    },
    {
      "term": "A-B Testing (authz)",
      "def": "A 자격으로 B 리소스 접근을 시도해 BOLA를 검증."
    },
    {
      "term": "XAS",
      "def": "한 API에 저장된 스크립트/데이터가 다른 소비 맥락에서 실행되는 감각."
    }
  ],
  "achievements": [
    {
      "id": "first_step",
      "title": "첫 패킷",
      "desc": "아무 장이든 완료",
      "icon": "⚡"
    },
    {
      "id": "part1_done",
      "title": "기초 해커",
      "desc": "Part I 전부 완료",
      "icon": "◈"
    },
    {
      "id": "part2_done",
      "title": "랩 건축가",
      "desc": "Part II 전부 완료",
      "icon": "⬡"
    },
    {
      "id": "part3_done",
      "title": "공격 연쇄",
      "desc": "Part III 전부 완료",
      "icon": "▲"
    },
    {
      "id": "part4_done",
      "title": "실전 대응",
      "desc": "Part IV 전부 완료",
      "icon": "✦"
    },
    {
      "id": "quiz_ace",
      "title": "완벽한 응답",
      "desc": "퀴즈 만점 5회",
      "icon": "🎯"
    },
    {
      "id": "lab_rat",
      "title": "랩 랫",
      "desc": "실험실 3개 완료 표시",
      "icon": "🧪"
    },
    {
      "id": "author_level",
      "title": "저자급 이해",
      "desc": "전 커리큘럼 완료",
      "icon": "👑"
    },
    {
      "id": "night_owl",
      "title": "야간 노트",
      "desc": "도구 페이지 방문",
      "icon": "🌙"
    },
    {
      "id": "bola_hunter",
      "title": "BOLA 헌터",
      "desc": "Ch.10 완료",
      "icon": "🎯"
    }
  ]
};
