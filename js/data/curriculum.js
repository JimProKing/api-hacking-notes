/* Auto-generated curriculum — API 해킹 야간 노트 */
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
      "tagline": "해킹하기 전에 ‘무엇을, 어디까지, 왜’를 문서화한다",
      "minutes": 35,
      "xp": 120,
      "difficulty": 1,
      "sections": [
        {
          "id": "0-1",
          "title": "권한 받기 — 합법의 경계선",
          "note": "오늘 정리하면서 가장 먼저 와닿은 문장: “도구보다 범위가 먼저다.”",
          "body": [
            {
              "type": "p",
              "text": "API를 건드리기 전에 반드시 서면 권한(authorization)을 받는다. 침투 테스트에서는 SOW(Statement of Work)로 대상·기간·제외 항목·연락 체계를 못 박는다. 서명자가 실제로 테스트 권한을 위임할 수 있는 사람인지 확인하는 것도 네 책임이다."
            },
            {
              "type": "callout",
              "tone": "warn",
              "title": "해커 노트",
              "text": "클라우드에 올려진 API라면 클라이언트뿐 아니라 AWS/GCP/Azure의 이용 약관도 범위에 영향을 준다. 클라이언트가 ‘우리 거니까 다 해도 돼’라고 해도 호스팅 업체가 막는 항목이 있다."
            },
            {
              "type": "list",
              "items": [
                "계약/SOW에 테스트 가능 대상 URL·API·IP 명시",
                "제외 경로·서드파티 인증·공유 엔드포인트 확인",
                "테스트 기간, 비상 연락처, 서비스 중단 시 에스컬레이션 경로",
                "가능하면 범위 제한을 최소화하도록 클라이언트와 협상 — 제한이 적을수록 실제 위협에 가까운 테스트"
              ]
            }
          ]
        },
        {
          "id": "0-2",
          "title": "위협 모델링 — 적을 가정한다",
          "body": [
            {
              "type": "p",
              "text": "위협 모델링은 ‘누가 API를 노리는가’를 정의하는 과정이다. 그 가정에 따라 블랙/그레이/화이트 박스 접근과 도구 선택이 갈린다."
            },
            {
              "type": "table",
              "headers": [
                "접근",
                "정보 수준",
                "비유"
              ],
              "rows": [
                [
                  "블랙 박스",
                  "대상 이름 정도",
                  "외부 해커·우연한 발견자"
                ],
                [
                  "그레이 박스",
                  "문서·테스트 계정 일부",
                  "버그바운티·파트너"
                ],
                [
                  "화이트 박스",
                  "소스·아키텍처·SDK 전부",
                  "내부자·유출된 직원"
                ]
              ]
            },
            {
              "type": "p",
              "text": "버그 현상금 프로그램은 보통 블랙과 그레이 사이. 범위 URL, 허용 취약점 타입, 공개 조건, 제외 항목을 먼저 읽는다. 보상 테이블을 보고 시간 대비 가치가 낮은 이슈(예: 느슨한 rate limit을 스팸으로 취급하는 프로그램)는 피한다."
            },
            {
              "type": "code",
              "lang": "text",
              "title": "위협 모델 미니 템플릿",
              "code": "위협 행위자: 익명 인터넷 사용자 / 인증된 일반 유저 / 내부 직원\n동기: 데이터 탈취 / 권한 상승 / 수익 우회 / DoS\n자산: PII, 결제, 관리자 API, 파트너 키\n진입점: 공개 REST, 모바일 앱 API, GraphQL, 레거시 SOAP\n가정 능력: OSINT + 자동화 스캔 수준\n목표 산출물: 재현 가능한 PoC + 비즈니스 영향 설명"
            }
          ]
        },
        {
          "id": "0-3",
          "title": "테스트해야 할 API 기능",
          "body": [
            {
              "type": "p",
              "text": "범위 산정의 핵심은 ‘고유 엔드포인트 × 메서드 × 역할 × 버전’ 규모를 가늠하는 것. 아래 기능은 거의 항상 범위에 넣는다."
            },
            {
              "type": "cards",
              "items": [
                {
                  "title": "인증·권한",
                  "text": "여러 역할(게스트/유저/어드민)로 동일 엔드포인트를 비교. 인증 우회·토큰 수명·권한 상승 경로."
                },
                {
                  "title": "WAF",
                  "text": "화이트/그레이라면 WAF 존재 여부 파악. IP allowlist 또는 완화 요청 여부를 협의 — WAF만 테스트하고 끝나지 않게."
                },
                {
                  "title": "모바일 앱",
                  "text": "모바일은 API 클라이언트. 정적 분석(키/엔드포인트 하드코딩) + 동적 프록시 가로채기."
                },
                {
                  "title": "문서 감사",
                  "text": "문서 = 공격 지도. 오래된 엔드포인트, 예제 토큰, 숨은 관리자 경로, 비즈니스 로직 힌트."
                },
                {
                  "title": "속도 제한",
                  "text": "수익 모델과 자원 보호. DoS와 다름 — 한도 우회·역할별 한도·에러 코드(예: 429/420) 검증."
                }
              ]
            }
          ]
        },
        {
          "id": "0-4",
          "title": "제한·제외 · 클라우드 · DoS",
          "body": [
            {
              "type": "p",
              "text": "명시되지 않은 DoS/DDoS는 기본 금지. 소셜 엔지니어링도 보통 침투 테스트와 분리. 알려진 이슈를 클라이언트가 의도적으로 남겨둔 ‘기능’일 수 있으니 제외 목록을 읽는다."
            },
            {
              "type": "list",
              "items": [
                "AWS: 영역 워킹, DoS/DDoS, 플러딩 등 제외 — 그 외는 비교적 관대 (정책 최신판 확인)",
                "GCP: 사전 통보 불필요, 단 AUP/TOS 준수",
                "Azure: Rules of Engagement 페이지 확인",
                "세일즈포스 등 일부는 여전히 사전 승인 문서 요구"
              ]
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "위험 성향(risk appetite)",
              "text": "클라이언트가 얼마나 세게 때려도 되는지 대화로 파악한다. 첨단 스타트업은 넓게, 규제 산업은 계란 위 걷기. 범위 문서는 그 성향의 번역본이다."
            }
          ]
        },
        {
          "id": "0-5",
          "title": "보고 · 개선 테스트 · 버그바운티 노트",
          "body": [
            {
              "type": "p",
              "text": "클라이언트 입장에서 가치가 가장 큰 산출물은 보고서다. 취약점 목록 + 재현 절차 + 비즈니스 영향 + 개선 권고. 개선 후 재테스트(전체 또는 이슈 한정)를 범위에 넣을지 미리 정한다."
            },
            {
              "type": "table",
              "headers": [
                "버그바운티 항목",
                "확인할 것"
              ],
              "rows": [
                [
                  "대상",
                  "허용 URL/서브도메인 (와일드카드 주의)"
                ],
                [
                  "공개 조건",
                  "공개 가능 여부·기간"
                ],
                [
                  "제외",
                  "테스트 금지 경로"
                ],
                [
                  "테스트 제한",
                  "허용 취약점 타입, PoC 요구 수준"
                ],
                [
                  "법적 내용",
                  "관할·데이터센터 위치 관련 조항"
                ]
              ]
            }
          ]
        },
        {
          "id": "0-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "이 장을 대충 넘기면 나중에 도구만 만지다 범위 밖으로 나가거나, 반대로 WAF만 때리고 끝나는 실수를 한다. 침투 테스트·버그바운티·내부 레드팀 모두 “문서화된 합의” 위에서만 의미가 있다."
            },
            {
              "type": "p",
              "text": "실무 루틴: (1) 범위 초안을 표로 만든다 (2) 제외·클라우드 약관·연락 체계를 채운다 (3) 위협 행위자 한 줄 정의를 적는다 (4) 역할별 계정 확보 계획을 세운다 (5) 산출물(보고서 형식)을 합의한다. 이 다섯이 없으면 아직 패킷을 보내면 안 된다."
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "혼자 공부할 때",
              "text": "실제 SOW가 없어도, 연습용으로 ‘가상 클라이언트 한 장’을 써 보라. 대상 URL, 금지 행위, 테스트 기간, 목표 위협을 적으면 이후 장 실습이 훨씬 선명해진다."
            },
            {
              "type": "list",
              "items": [
                "범위 문서 없이 보낸 패킷 = 불법 리스크",
                "위협 모델이 블랙/그레이/화이트와 도구를 결정",
                "속도 제한 테스트 ≠ DoS 테스트",
                "보고서는 테스트의 제품 — 재현 가능성 = 신뢰"
              ]
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "권한·범위 문서 없이 보내는 패킷은 해킹이 아니라 불법이다.",
        "위협 모델이 블랙/그레이/화이트와 도구 세트를 결정한다.",
        "속도 제한 ≠ DoS. 수익·자원 보호 로직을 별도로 테스트한다.",
        "보고서는 테스트의 제품이다. 재현 가능성 = 신뢰."
      ],
      "checklist": [
        "SOW/범위 서명 확인",
        "위협 행위자 정의",
        "역할별 계정 확보 계획",
        "WAF/클라우드 약관 체크",
        "제외 목록 숙지"
      ]
    },
    {
      "id": "ch01",
      "num": "1",
      "part": "part1",
      "title": "웹 애플리케이션이 작동하는 방법",
      "tagline": "API를 해부하려면 HTTP와 데이터 저장부터",
      "minutes": 40,
      "xp": 130,
      "difficulty": 1,
      "sections": [
        {
          "id": "1-1",
          "title": "URL · HTTP 요청 · 응답",
          "note": "‘API 해킹 = 브라우저가 숨겨준 대화를 직접 말하는 일’",
          "body": [
            {
              "type": "p",
              "text": "웹 앱은 클라이언트(브라우저/앱)와 서버가 HTTP로 대화한다. URL은 그 대화의 주소 체계다."
            },
            {
              "type": "code",
              "lang": "text",
              "title": "URL 해부",
              "code": "https://api.example.com:443/v2/users/42?fields=email&pretty=1\n│      │                │   │           │\n│      호스트            포트 경로        쿼리 문자열\n스킴 (https = TLS)"
            },
            {
              "type": "code",
              "lang": "http",
              "title": "요청 골격",
              "code": "POST /sessions HTTP/1.1\nHost: twitter.com\nUser-Agent: Mozilla/5.0 ...\nContent-Type: application/x-www-form-urlencoded\nCookie: ...\n\nusername=hAPI_hacker&password=NotMyPassword"
            },
            {
              "type": "p",
              "text": "요청줄(메서드 + 경로 + 프로토콜) → 헤더(이름: 값) → 빈 줄 → 바디. 응답은 상태줄(예: 302 Found) + 헤더 + 바디. Set-Cookie로 세션 토큰이 심어지고, Location으로 리다이렉트된다."
            }
          ]
        },
        {
          "id": "1-2",
          "title": "상태 코드 · 메서드 · 상태(state)",
          "body": [
            {
              "type": "table",
              "headers": [
                "코드대",
                "의미",
                "해커 관점"
              ],
              "rows": [
                [
                  "1xx",
                  "정보",
                  "드묾"
                ],
                [
                  "2xx",
                  "성공",
                  "정상 동작·데이터 탈취 성공 신호"
                ],
                [
                  "3xx",
                  "리다이렉트",
                  "인증 후 이동, open redirect 단서"
                ],
                [
                  "4xx",
                  "클라이언트 오류",
                  "401/403 권한, 404 존재 여부, 429 한도"
                ],
                [
                  "5xx",
                  "서버 오류",
                  "인젝션·퍼징 히트, 스택 트레이스 누출"
                ]
              ]
            },
            {
              "type": "table",
              "headers": [
                "메서드",
                "관례적 의미",
                "보안 포인트"
              ],
              "rows": [
                [
                  "GET",
                  "조회",
                  "캐시·로그에 쿼리 노출, 멱등"
                ],
                [
                  "POST",
                  "생성/액션",
                  "상태 변경, CSRF·인젝션 타깃"
                ],
                [
                  "PUT",
                  "전체 교체",
                  "대량 할당·IDOR와 자주 결합"
                ],
                [
                  "PATCH",
                  "부분 수정",
                  "숨은 필드 주입 테스트 좋음"
                ],
                [
                  "DELETE",
                  "삭제",
                  "권한 검증 필수"
                ],
                [
                  "OPTIONS/HEAD",
                  "메타",
                  "CORS·허용 메서드 정찰"
                ]
              ]
            },
            {
              "type": "p",
              "text": "HTTP 자체는 무상태(stateless)다. 상태를 쿠키·세션·JWT·API 키로 ‘붙여’ 쓴다. 그 붙인 끈을 훔치거나 위조하는 것이 인증 공격의 본질이다."
            }
          ]
        },
        {
          "id": "1-3",
          "title": "웹 서버 데이터베이스 · API의 역할",
          "body": [
            {
              "type": "p",
              "text": "SQL(관계형)은 표·조인·스키마가 엄격하다. NoSQL(문서/키값 등)은 유연하지만 쿼리 연산자 주입($gt, $ne 등) 같은 다른 공격면이 생긴다."
            },
            {
              "type": "list",
              "items": [
                "SQL 주입: 문자열 연결 쿼리 + 사용자 입력",
                "NoSQL 주입: JSON 바디에 연산자 객체 삽입",
                "API의 역할: UI와 데이터/비즈니스 로직을 분리. 모바일·SPA·파트너가 같은 API를 공유 → 공격면도 공유"
              ]
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "한 줄 요약",
              "text": "API는 ‘프로그램이 부르는 웹 페이지’다. HTML 대신 JSON/XML을 주고받을 뿐, HTTP 취약점의 문법은 그대로다."
            }
          ]
        },
        {
          "id": "1-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "API 해킹의 원재료는 HTTP 대화다. 브라우저가 숨겨 주는 요청줄을 손으로 읽고, 헤더를 고치고, 바디를 바꿔 보내는 훈련이 이후 Burp·Postman 모든 작업의 기초가 된다."
            },
            {
              "type": "p",
              "text": "상태 코드는 권한·존재·성공 여부의 신호등이다. 같은 401이라도 메시지 본문이 다르면 계정 열거 오라클이 되고, 같은 403이라도 A/B 토큰 비교에서 BFLA 단서가 된다. 코드를 외우되, 항상 바디·헤더 길이와 함께 기록하는 습관을 들이자."
            },
            {
              "type": "list",
              "items": [
                "요청줄 = 메서드 + 경로 + 프로토콜",
                "헤더 = 메타데이터(인증, 콘텐츠 타입, 쿠키)",
                "바디 = 생성/수정 데이터의 본체",
                "응답 = 상태줄 + 헤더 + 바디 — 민감 필드는 여기에 숨는다"
              ]
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "손연습",
              "text": "아무 사이트 로그인 요청을 DevTools로 복사해 raw HTTP로 다시 적어 보라. 메서드·경로·Host·Cookie·바디를 빠짐없이 재현할 수 있으면 1장은 통과다."
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "요청/응답 구조를 손으로 쓸 수 있어야 프록시 조작이 된다.",
        "상태 코드는 취약점 신호등이다.",
        "무상태 HTTP + 붙여 넣은 인증 상태 = 토큰 전쟁의 출발점."
      ],
      "checklist": []
    },
    {
      "id": "ch02",
      "num": "2",
      "part": "part1",
      "title": "웹 API의 구조",
      "tagline": "REST · GraphQL · 데이터 형식 · 인증 체계",
      "minutes": 55,
      "xp": 160,
      "difficulty": 2,
      "sections": [
        {
          "id": "2-1",
          "title": "웹 API가 작동하는 방식",
          "body": [
            {
              "type": "p",
              "text": "API(Application Programming Interface)는 소프트웨어가 다른 소프트웨어와 말하는 계약이다. 웹 API는 그 계약을 HTTP 위에 올린 것. 클라이언트는 엔드포인트에 메서드·헤더·바디를 보내고, 서버는 리소스를 표현(representation)으로 돌려준다."
            },
            {
              "type": "list",
              "items": [
                "리소스: /users, /orders/123 처럼 명사 중심 경로",
                "표현: JSON/XML 등 직렬화된 데이터",
                "하이퍼미디어(이상적 HATEOAS): 응답 안에 다음 행동 링크 — 실무에선 자주 생략"
              ]
            }
          ]
        },
        {
          "id": "2-2",
          "title": "RESTful API",
          "note": "완벽히 ‘RESTful’한 API는 드물다. 해커는 관례를 알고 예외를 노린다.",
          "body": [
            {
              "type": "p",
              "text": "REST는 아키텍처 스타일이다. 실무 REST API 특징:"
            },
            {
              "type": "list",
              "items": [
                "리소스 URL + HTTP 동사",
                "무상태 요청 (인증 정보는 매 요청에)",
                "JSON이 사실상 표준 표현",
                "버전: /v1/ 경로 또는 Accept 헤더",
                "복수형 명사, 중첩 리소스 /users/1/orders"
              ]
            },
            {
              "type": "code",
              "lang": "http",
              "title": "전형적인 REST 호출",
              "code": "GET /api/v1/vehicles/1337 HTTP/1.1\nHost: crapi.example\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIs...\nAccept: application/json"
            }
          ]
        },
        {
          "id": "2-3",
          "title": "GraphQL",
          "body": [
            {
              "type": "p",
              "text": "GraphQL은 단일 엔드포인트(보통 /graphql)에 쿼리 언어로 ‘필요한 필드만’ 요청한다. 스키마·타입 시스템·인트로스펙션이 강점이자 정보 누출 지점이다."
            },
            {
              "type": "code",
              "lang": "graphql",
              "title": "쿼리 예",
              "code": "query {\n  user(id: 1) {\n    email\n    role\n    orders { id total }\n  }\n}"
            },
            {
              "type": "callout",
              "tone": "warn",
              "title": "해커 관점",
              "text": "인트로스펙션이 켜져 있으면 전체 스키마가 지도가 된다. 중첩 쿼리로 DoS, 필드 단위 권한 누락(BOLA), 배치 쿼리 남용이 단골이다."
            }
          ]
        },
        {
          "id": "2-4",
          "title": "명세 · 데이터 형식",
          "body": [
            {
              "type": "p",
              "text": "OpenAPI(Swagger), RAML, API Blueprint 같은 명세는 엔드포인트 목록·스키마·예제를 준다. Postman에 임포트하면 컬렉션이 바로 생긴다 — 정찰 치트키."
            },
            {
              "type": "table",
              "headers": [
                "형식",
                "특징",
                "공격 메모"
              ],
              "rows": [
                [
                  "JSON",
                  "키-값, 배열, 타입 유연",
                  "타입 혼동, 프로토타입 오염(일부 스택), 대량 할당"
                ],
                [
                  "XML",
                  "태그·네임스페이스",
                  "XXE, 억지 파싱 DoS"
                ],
                [
                  "YAML",
                  "들여쓰기 민감",
                  "역직렬화(구버전 PyYAML 등)"
                ]
              ]
            },
            {
              "type": "code",
              "lang": "json",
              "title": "JSON 감각",
              "code": "{\n  \"id\": 42,\n  \"email\": \"user@example.com\",\n  \"roles\": [\"user\"],\n  \"meta\": { \"created\": \"2023-01-01\" }\n}"
            }
          ]
        },
        {
          "id": "2-5",
          "title": "API 인증 총정리",
          "body": [
            {
              "type": "cards",
              "items": [
                {
                  "title": "Basic",
                  "text": "user:pass를 Base64. HTTPS 필수. 프록시에 그대로 보이므로 탈취 = 계정 탈취."
                },
                {
                  "title": "API Key",
                  "text": "헤더/쿼리/쿠키. 쿼리 키는 로그·Referer에 새기 쉽다. 권한 범위(scope) 확인."
                },
                {
                  "title": "JWT",
                  "text": "header.payload.signature. 클레임 위조, alg=none, 약한 비밀키 크랙이 고전."
                },
                {
                  "title": "HMAC",
                  "text": "공유 비밀로 요청 서명. 비밀 유출·재전송 공격·정규화 차이 노림."
                },
                {
                  "title": "OAuth 2.0",
                  "text": "인가 코드/클라이언트 자격 등. redirect_uri, state, scope, 토큰 저장 실수가 버그바운티 단골."
                },
                {
                  "title": "인증 없음",
                  "text": "공개 데이터 API. 그래도 쓰기 메서드·내부 필드 노출 여부 확인."
                }
              ]
            },
            {
              "type": "code",
              "lang": "text",
              "title": "JWT 구조 (개념)",
              "code": "eyJhbGciOiJIUzI1NiJ9.  ← header (alg, typ)\neyJzdWIiOiIxMjMifQ.    ← payload (sub, role, exp...)\nSflKxwR...              ← signature"
            }
          ]
        },
        {
          "id": "2-6",
          "title": "실전 감각: 트위터(X) API 스타일",
          "body": [
            {
              "type": "p",
              "text": "책에서는 트위터 API로 인증 티어, rate limit, 문서 구조, 엔드포인트 권한 차이를 살펴본다. 실무 학습 포인트:"
            },
            {
              "type": "list",
              "items": [
                "문서에 적힌 한도·에러 코드를 기준으로 ‘정상 vs 우회’를 측정",
                "앱 전용/유저 컨텍스트 토큰 차이",
                "공개 엔드포인트와 보호 엔드포인트의 응답 필드 차이 (과다 노출)"
              ]
            }
          ]
        },
        {
          "id": "2-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "REST는 리소스를 URL로, 행동을 HTTP 동사로 표현하는 관례에 가깝다. 완벽한 Roy Fielding REST는 드물고, 실무 API는 RPC 스타일 경로(/getUser)와 REST가 섞여 있다. 해커는 이름을 보고 속지 말고, 실제 메서드·권한·사이드이펙트를 Repeater로 확인한다."
            },
            {
              "type": "p",
              "text": "GraphQL은 스키마가 곧 지도다. 인트로스펙션이 열려 있으면 엔드포인트 브루트 없이도 전체 타입이 보인다. 필드 단위 권한이 빠지면 BOLA가 필드 단위로 터지고, 중첩 쿼리는 자원 고갈 공격면이 된다."
            },
            {
              "type": "p",
              "text": "인증 6총사(Basic, API Key, JWT, HMAC, OAuth2, None)는 “어디에 비밀이 있는가”로 기억한다. 헤더냐 쿼리냐 쿠키냐, 서버 세션이냐 클라이언트 토큰이냐에 따라 탈취·위조·재전송 기법이 갈린다."
            },
            {
              "type": "table",
              "headers": [
                "방식",
                "비밀 위치",
                "1순위 실패 모드"
              ],
              "rows": [
                [
                  "Basic",
                  "매 요청 Authorization",
                  "HTTPS 부재·로그 유출"
                ],
                [
                  "API Key",
                  "헤더/쿼리",
                  "쿼리 키 로그·Referer"
                ],
                [
                  "JWT",
                  "클라이언트 보관 토큰",
                  "약한 서명·클레임 신뢰"
                ],
                [
                  "OAuth2",
                  "인가 서버·리다이렉트",
                  "redirect_uri·scope 실수"
                ]
              ]
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "REST는 리소스+동사, GraphQL은 스키마+쿼리 — 정찰 방법이 다르다.",
        "명세/문서는 합법적 치트시트다.",
        "인증 방식마다 실패 모드가 다르다. 메커니즘을 알면 공격 벡터가 보인다."
      ],
      "checklist": []
    },
    {
      "id": "ch03",
      "num": "3",
      "part": "part1",
      "title": "일반적인 API 취약점",
      "tagline": "OWASP API 보안과 맞닿은 ‘해커 지도’",
      "minutes": 50,
      "xp": 180,
      "difficulty": 2,
      "sections": [
        {
          "id": "3-0",
          "title": "취약점 지도를 왜 먼저 외우나",
          "body": [
            {
              "type": "p",
              "text": "이후 파트의 모든 공격 장은 이 지도의 심화다. 이름을 알면 보고서도, 버그바운티 티켓도 설득력이 생긴다. (책의 분류는 OWASP API Security Top 10과 강하게 정렬된다.)"
            }
          ]
        },
        {
          "id": "3-1",
          "title": "정보 누출 (Information Disclosure)",
          "body": [
            {
              "type": "p",
              "text": "에러 메시지, 스택 트레이스, 디버그 엔드포인트, verbose 헤더, 디렉터리 리스팅, GitHub 시크릿. 그 자체가 크리티컬이 아니어도 다음 공격의 연료가 된다."
            }
          ]
        },
        {
          "id": "3-2",
          "title": "BOLA — Broken Object Level Authorization",
          "note": "API 취약점의 왕. IDOR의 API 버전이라고 기억하자.",
          "body": [
            {
              "type": "p",
              "text": "객체(리소스) 단위 권한 검사가 빠졌을 때. /api/orders/1001 을 1002로 바꾸면 남의 주문이 보인다. 인증은 됐지만 ‘그 객체의 소유자인가’를 안 본다."
            },
            {
              "type": "code",
              "lang": "http",
              "title": "BOLA 미니 PoC 패턴",
              "code": "# 피해자 리소스 ID를 공격자 토큰으로 요청\nGET /api/v1/users/VICTIM_ID/location\nAuthorization: Bearer ATTACKER_TOKEN"
            }
          ]
        },
        {
          "id": "3-3",
          "title": "사용자 인증 결함",
          "body": [
            {
              "type": "p",
              "text": "약한 비밀번호 정책, 자격 증명 스터핑에 열린 로그인, 예측 가능한 리셋 토큰, MFA 우회, 세션 고정, ‘이메일 없음/비밀번호 틀림’ 차등 응답으로 계정 열거."
            }
          ]
        },
        {
          "id": "3-4",
          "title": "데이터 과다 노출",
          "body": [
            {
              "type": "p",
              "text": "서버가 전체 객체를 내려주고 클라이언트가 필터링. 응답 JSON에 passwordHash, ssn, internalRole 이 숨어 있다. UI에는 안 보여도 프록시에는 보인다."
            }
          ]
        },
        {
          "id": "3-5",
          "title": "리소스 부족 · 속도 제한",
          "body": [
            {
              "type": "p",
              "text": "한도 없음 → 스크래핑·브루트포스·비용 폭탄. 한도가 있어도 IP/헤더/경로 우회 가능하면 무력화. 비즈니스적으로 ‘무료 티어 남용’도 여기."
            }
          ]
        },
        {
          "id": "3-6",
          "title": "BFLA — Broken Function Level Authorization",
          "body": [
            {
              "type": "p",
              "text": "기능/역할 단위 권한 실패. 일반 유저가 /admin/deleteUser 또는 HTTP 메서드 바꿔 DELETE 호출. BOLA가 ‘객체’면 BFLA는 ‘동작/역할’."
            }
          ]
        },
        {
          "id": "3-7",
          "title": "대량 할당 (Mass Assignment)",
          "body": [
            {
              "type": "p",
              "text": "클라이언트가 보낸 JSON 필드를 모델에 그대로 바인딩. {\"email\":\"a@b.c\",\"isAdmin\":true} 로 가입하면 관리자. 숨은 필드·내부 플래그를 추측·퍼징으로 찾는다."
            }
          ]
        },
        {
          "id": "3-8",
          "title": "보안 설정 오류",
          "body": [
            {
              "type": "list",
              "items": [
                "기본 계정·불필요한 HTTP 메서드",
                "CORS * + credentials",
                "TLS 미적용/혼용",
                "상세 에러, 디렉터리 리스팅",
                "구버전 스택·관리 콘솔 노출"
              ]
            }
          ]
        },
        {
          "id": "3-9",
          "title": "주입 (Injection)",
          "body": [
            {
              "type": "p",
              "text": "SQL/NoSQL/OS 명령/LDAP/서버사이드 템플릿… 입력이 명령으로 해석되면 발생. API는 JSON 바디·헤더·GraphQL 변수 등 주입 면이 넓다."
            }
          ]
        },
        {
          "id": "3-10",
          "title": "부적절한 자원 관리 · 비즈니스 로직",
          "body": [
            {
              "type": "p",
              "text": "버전 관리 실패(구버전 API에 취약점 잔존), 과도한 페이로드, 예측 가능 ID. 비즈니스 로직은 기술 체크리스트에 안 잡히는 ‘워크플로 구멍’ — 쿠폰 재사용, 음수 수량, 결제 우회, 레이스 컨디션."
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "보고서 문장 템플릿",
              "text": "“인증된 일반 사용자가 객체 ID를 순회하여 타 사용자 PII를 조회할 수 있음 (BOLA). 영향: 전 사용자 위치/주문 노출. 재현: …”"
            }
          ]
        },
        {
          "id": "3-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "이 장은 이후 모든 공격 파트의 색인이다. 이름(BOLA, BFLA, Mass Assignment…)을 보고서 문장으로 바로 쓸 수 있을 때까지 반복한다. 취약점을 느낌으로 찾지 말고, 분류 → 재현 패턴 → 영향 → 수정 제안 순으로 고정한다."
            },
            {
              "type": "p",
              "text": "우선순위 감각: (1) 인증 우회·BOLA로 PII/자금 접근 (2) BFLA로 관리 기능 (3) 대량 할당으로 역할 상승 (4) 주입으로 RCE/데이터 (5) 과다 노출·설정 오류로 체인 보강. 점수만 쫓지 말고 비즈니스 피해 크기로 정렬한다."
            },
            {
              "type": "code",
              "lang": "text",
              "title": "보고서 한 단락 템플릿",
              "code": "[제목] BOLA on GET /api/orders/{id}\n[재현] 사용자 A 토큰으로 B의 orderId 요청 → 200 + B 주문 전문\n[영향] 전 고객 주문·배송지 열람 가능\n[수정] 서버에서 order.owner == auth.user 강제"
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "BOLA/BFLA/대량할당/과다노출은 API 특화 빅4로 먼저 몸에 익힌다.",
        "정보 누출은 단독 점수보다 체인 공격의 시작점.",
        "비즈니스 로직은 문서를 읽고 ‘의도된 흐름’을 이해해야 보인다."
      ],
      "checklist": [
        "BOLA 후보 엔드포인트 표시",
        "관리자 기능 URL 목록화",
        "응답 필드 민감정보 스캔",
        "rate limit 존재 여부",
        "에러 메시지 수집"
      ]
    },
    {
      "id": "ch04",
      "num": "4",
      "part": "part2",
      "title": "API 해킹 시스템",
      "tagline": "칼리 · DevTools · Burp · Postman · 보조 툴체인",
      "minutes": 70,
      "xp": 200,
      "difficulty": 2,
      "sections": [
        {
          "id": "4-1",
          "title": "칼리 리눅스와 분석 자세",
          "body": [
            {
              "type": "p",
              "text": "칼리(Kali)는 도구가 미리 깔린 공격자 워크스테이션. 필수는 아니지만 학습·실무 표준에 가깝다. VM 스냅샷을 찍어 ‘실험 전’ 상태를 보존한다."
            }
          ]
        },
        {
          "id": "4-2",
          "title": "브라우저 개발자 도구",
          "body": [
            {
              "type": "list",
              "items": [
                "Network: XHR/Fetch 필터로 API 호출만 보기",
                "Initiator/Preview로 호출 위치·JSON 구조 파악",
                "Application: LocalStorage·쿠키의 토큰",
                "Sources/검색: 번들 JS 안의 엔드포인트·키 문자열"
              ]
            },
            {
              "type": "code",
              "lang": "js",
              "title": "번들에서 자주 검색할 패턴",
              "code": "/api/\napiKey\nAuthorization\nBearer\ngraphql\nswagger\nopenid"
            }
          ]
        },
        {
          "id": "4-3",
          "title": "Burp Suite — 캡처와 개조",
          "body": [
            {
              "type": "p",
              "text": "버프는 중간자 프록시. FoxyProxy로 브라우저 트래픽을 127.0.0.1:8080으로 보내고, 버프 CA 인증서를 신뢰해야 HTTPS를 본다."
            },
            {
              "type": "cards",
              "items": [
                {
                  "title": "Proxy",
                  "text": "Intercept on/off, HTTP history가 타임라인."
                },
                {
                  "title": "Repeater",
                  "text": "한 요청을 손으로 뜯어고치며 재전송. 학습의 핵심."
                },
                {
                  "title": "Intruder",
                  "text": "위치 표시(§) 후 페이로드 대입. 열거·브루트·퍼징."
                },
                {
                  "title": "Decoder / Comparer",
                  "text": "인코딩 변환, 응답 diff."
                },
                {
                  "title": "Extender",
                  "text": "InQL, Autorize, Logger++ 등 확장."
                }
              ]
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "워크플로",
              "text": "History에서  ціка한 요청 → Repeater로 이해 → Intruder로 규모 확장. ‘이해 없이 Intruder’는 노이즈만 만든다."
            }
          ]
        },
        {
          "id": "4-4",
          "title": "Postman — API 작업대",
          "body": [
            {
              "type": "list",
              "items": [
                "Request Builder: 메서드·URL·Params·Auth·Headers·Body",
                "Environments: {{baseUrl}}, {{token}} 변수화",
                "Collections: 폴더로 엔드포인트 지도 구축",
                "Collection Runner: 시나리오 일괄 실행",
                "Code snippets: curl/Python 변환",
                "Tests 탭: 상태코드·JSON 값 단언 (자동화 시드)"
              ]
            },
            {
              "type": "code",
              "lang": "js",
              "title": "Postman Tests 예",
              "code": "pm.test('status 200', () => pm.response.to.have.status(200));\nconst j = pm.response.json();\npm.collectionVariables.set('userId', j.id);"
            }
          ]
        },
        {
          "id": "4-5",
          "title": "Burp + Postman 조합",
          "body": [
            {
              "type": "p",
              "text": "Postman이 버프 프록시를 거치게 설정하면, 컬렉션 실행 트래픽이 버프 History에 쌓인다. 문서 기반 요청 작성(Postman) + 변조·공격(Burp)의 이중주."
            }
          ]
        },
        {
          "id": "4-6",
          "title": "보충 도구 치트시트",
          "body": [
            {
              "type": "table",
              "headers": [
                "도구",
                "역할"
              ],
              "rows": [
                [
                  "OWASP Amass",
                  "서브도메인·OSINT 매핑"
                ],
                [
                  "Kiterunner",
                  "API 특화 경로/콘텐츠 디스커버리"
                ],
                [
                  "Nikto",
                  "웹 서버 구식 이슈 스캔"
                ],
                [
                  "OWASP ZAP",
                  "프록시+스파이더+패시브/액티브 스캔"
                ],
                [
                  "Wfuzz",
                  "CLI 퍼징·필터링"
                ],
                [
                  "Arjun",
                  "숨은 HTTP 파라미터 발견"
                ]
              ]
            }
          ]
        },
        {
          "id": "4-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "도구는 워크플로 안에 넣을 때만 무기가 된다. 추천 루프: 브라우저로 정상 사용 → DevTools Network로 API 식별 → Burp History 축적 → Repeater로 이해 → Postman 컬렉션으로 정리 → Intruder/Wfuzz로 규모 확장."
            },
            {
              "type": "p",
              "text": "Burp 인증서·프록시 설정에서 막히면 하루를 태운다. FoxyProxy 스코프, 버프 CA 신뢰, HTTP/2·WebSocket 이슈를 체크리스트로 남기자. Postman은 환경 변수({{baseUrl}}, {{tokenA}}, {{tokenB}})를 처음부터 분리해 두면 10장 권한 테스트가 편해진다."
            },
            {
              "type": "list",
              "items": [
                "Repeater: 한 요청 완전 이해",
                "Intruder: 열거·브루트·퍼징 규모화",
                "Postman: 문서화·러너·공유",
                "Kiterunner/Arjun: 경로·파라미터 발견",
                "ZAP/Nikto: 보조 스캔 — 맹신은 금물"
              ]
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #1: REST API에서 사용자 계정 열거",
        "goal": "차등 응답·상태코드·타이밍으로 유효 계정/이메일을 구분한다.",
        "steps": [
          "대상 로그인/가입/비밀번호 찾기 엔드포인트를 버프로 캡처",
          "유효/무효 입력의 응답 길이·메시지·코드를 Repeater에서 비교",
          "Intruder로 이메일/유저명 워드리스트 투입",
          "grep·filter로 ‘존재함’ 시그니처만 추출",
          "보고서용: 요청 샘플, 판별 기준, 영향(후속 스프레이 용이)"
        ]
      },
      "keyTakeaways": [
        "DevTools로 보고, Burp로 만지고, Postman으로 정리한다.",
        "도구는 워크플로 안에 넣을 때만 힘이 된다."
      ],
      "checklist": []
    },
    {
      "id": "ch05",
      "num": "5",
      "part": "part2",
      "title": "취약한 API 대상 설정",
      "tagline": "crAPI · Pixi · Juice Shop · DVGA · 실습 플랫폼",
      "minutes": 45,
      "xp": 150,
      "difficulty": 2,
      "sections": [
        {
          "id": "5-1",
          "title": "랩 철학",
          "body": [
            {
              "type": "p",
              "text": "공격 기술을 합법적으로 반복하려면 ‘일부러 약한’ 타깃이 필요하다. 리눅스 VM + Docker Compose로 여러 앱을 올린다. 호스트 네트워크·포트 충돌·스냅샷을 관리한다."
            }
          ]
        },
        {
          "id": "5-2",
          "title": "대표 취약 애플리케이션",
          "body": [
            {
              "type": "cards",
              "items": [
                {
                  "title": "crAPI",
                  "text": "OWASP crAPI — 자동차/커뮤니티 시나리오. BOLA, JWT, 대량할당 등 API 학습 최적."
                },
                {
                  "title": "Pixi",
                  "text": "NoSQL·비즈니스 로직 연습에 자주 등장하는 취약 앱 계열."
                },
                {
                  "title": "Juice Shop",
                  "text": "OWASP 주스 숍 — 넓은 웹/API 챌린지. 점수판으로 동기 부여."
                },
                {
                  "title": "DVGA",
                  "text": "Damn Vulnerable GraphQL Application — GraphQL 전용 사격장."
                }
              ]
            },
            {
              "type": "code",
              "lang": "bash",
              "title": "도커 감각 (개념)",
              "code": "sudo apt install docker.io docker-compose\n# 각 프로젝트 README의 compose up -d\ndocker ps   # 포트 매핑 확인\n# 브라우저: http://HOST:PORT"
            }
          ]
        },
        {
          "id": "5-3",
          "title": "TryHackMe · Hack The Box",
          "body": [
            {
              "type": "p",
              "text": "로컬 랩 외에 THM/HTB의 API 룸·박스로 실전 감각을 보강한다. 작성 노트: 발견한 엔드포인트, 사용한 툴, 실패 원인까지 남긴다."
            }
          ]
        },
        {
          "id": "5-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "랩이 없으면 합법적으로 손을 더럽힐 곳이 없다. Docker Compose로 crAPI·Juice Shop·DVGA를 올리고, 스냅샷을 찍어 “부수기 전 상태”를 보존한다. 계정 2개(일반 A/B 또는 유저·어드민)는 권한 장의 필수 재료다."
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "랩 메모 양식",
              "text": "타깃 URL / 가입 계정 / 발견한 엔드포인트 / 사용한 도구 / 실패 원인 / 다음 시도. 이 양식만 지켜도 포트폴리오 실습 일지가 된다."
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #2: 취약한 API 발견",
        "goal": "새로 올린 타깃에서 인증 전/후 API 표면을 지도로 그린다.",
        "steps": [
          "앱 가입·주요 기능 클릭하며 버프 History 채우기",
          "Postman 컬렉션으로 엔드포인트 정리",
          "/api, /swagger, /openapi.json, /graphql 등 관례 경로 확인",
          "역할 2개 계정을 만들어 이후 BOLA 실습 준비"
        ]
      },
      "keyTakeaways": [
        "로컬 랩 = 무한 재시도 면허",
        "한 타깃을 끝까지 파는 것이 도구 10개보다 낫다"
      ],
      "checklist": []
    },
    {
      "id": "ch06",
      "num": "6",
      "part": "part3",
      "title": "발견 (Discovery)",
      "tagline": "수동·능동 정찰로 API 표면을 드러낸다",
      "minutes": 60,
      "xp": 190,
      "difficulty": 3,
      "sections": [
        {
          "id": "6-1",
          "title": "수동적 사전 조사 (Passive Recon)",
          "body": [
            {
              "type": "p",
              "text": "대상에 패킷을 거의 보내지 않고 공개 정보만 모은다. 버그바운티 초반·범위 확인 전 단계에 적합."
            },
            {
              "type": "list",
              "items": [
                "Google dork: site:target.com api, filetype:json, inurl:swagger",
                "ProgrammableWeb 등 API 디렉터리 (역사적/브랜드 API 힌트)",
                "Shodan: 열린 API 게이트웨이, 배너, SSL 인증서",
                "Amass: 서브도메인 수동 소스 수집",
                "GitHub: org 이름, api_key, Authorization 헤더 유출 검색"
              ]
            },
            {
              "type": "code",
              "lang": "text",
              "title": "구글 도킹 시드",
              "code": "site:example.com inurl:api\nsite:example.com filetype:yaml openapi\nsite:example.com \"api_key\"\nsite:github.com example.com api token"
            }
          ]
        },
        {
          "id": "6-2",
          "title": "능동적 사전 조사 (Active Recon)",
          "body": [
            {
              "type": "list",
              "items": [
                "Nmap: 포트·서비스·HTTP 타이틀",
                "robots.txt / sitemap.xml 숨은 경로",
                "Chrome DevTools: 민감 정보·API 호스트",
                "Burp: 사이트맵·콘텐츠 디스커버리",
                "ZAP spider / AJAX spider",
                "Gobuster/ffuf: 디렉터리·가상 호스트 브루트",
                "Kiterunner: API 워드리스트로 경로·메서드 히트"
              ]
            },
            {
              "type": "code",
              "lang": "bash",
              "title": "감각적 커맨드",
              "code": "nmap -sV -p 80,443,8000,8080,8443 target\ncurl -s https://target/robots.txt\ngobuster dir -u https://target -w api-wordlist.txt\nkr scan https://target -w routes.kite"
            },
            {
              "type": "callout",
              "tone": "warn",
              "title": "범위 주의",
              "text": "능동 스캔은 로그·WAF·법적 범위에 걸린다. SOW에 없는 서브도메인에 오토스캔 돌리지 말 것."
            }
          ]
        },
        {
          "id": "6-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "발견(Discovery)은 공격 표면을 보이게 만드는 단계다. 수동 정찰로 지도를 스케치하고, 범위 확인 후 능동 스캔으로 확정한다. GitHub 시크릿·Swagger·모바일 번들은 아직도 고효율 입구다."
            },
            {
              "type": "p",
              "text": "산출물 기준: 확인된 API 호스트 목록, 추정 경로, 인증 방식 가설, 문서 링크, 범위 내/외 분류 표. 이 표 없이 퍼징을 시작하면 노이즈만 쌓인다."
            },
            {
              "type": "code",
              "lang": "bash",
              "title": "정찰 미니 플레이북",
              "code": "# 1) 수동: 구글 도킹, GitHub, Shodan\n# 2) 범위 확인\n# 3) 능동\nnmap -sV -p 80,443,8000,8080,8443 target\ncurl -s https://target/robots.txt\n# 4) 브라우저 정상 사용 → Burp History\n# 5) kiterunner / gobuster 로 경로 보강"
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #3: 블랙 박스 능동 정찰",
        "goal": "이름만 아는 타깃에서 API 호스트·경로 후보 목록을 만든다.",
        "steps": [
          "수동 OSINT 30분 → 후보 도메인 리스트",
          "허용 범위 확인 후 nmap + 웹 디스커버리",
          "버프로 정상 사용 트래픽 수집",
          "결과를 ‘확인됨/추측/범위 외’로 분류한 표 작성"
        ]
      },
      "keyTakeaways": [
        "수동으로 지도 스케치 → 능동으로 확정",
        "GitHub 시크릿은 아직도 터진다"
      ],
      "checklist": []
    },
    {
      "id": "ch07",
      "num": "7",
      "part": "part3",
      "title": "엔드포인트 분석",
      "tagline": "문서를 먹고, 리버스하고, 기능을 해부한다",
      "minutes": 55,
      "xp": 180,
      "difficulty": 3,
      "sections": [
        {
          "id": "7-1",
          "title": "요청 정보 찾기",
          "body": [
            {
              "type": "list",
              "items": [
                "공식 개발자 문서·포스트맨 공개 워크스페이스",
                "OpenAPI/Swagger UI → 명세 임포트",
                "모바일 APK/JS 번들 리버스 — 하드코딩 베이스 URL, 숨은 플래그",
                "구버전 앱/레거시 도메인에 남은 엔드포인트"
              ]
            }
          ]
        },
        {
          "id": "7-2",
          "title": "Postman에 인증 붙이기",
          "body": [
            {
              "type": "p",
              "text": "컬렉션 Auth를 Bearer/API Key로 통일하고 환경 변수로 토큰 교체. pre-request script로 만료 갱신까지 가면 생산성이 폭발한다."
            }
          ]
        },
        {
          "id": "7-3",
          "title": "기능 분석 루틴",
          "body": [
            {
              "type": "p",
              "text": "1) 의도된 사용(happy path) 2) 권한 필요 작업 3) 응답 필드·상태코드 관찰. ‘정상’을 알아야 ‘비정상’이 보인다."
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
                  "스택 트레이스·SQL 조각",
                  "설정 오류·주입 힌트"
                ],
                [
                  "HTTP만 허용·혼합 콘텐츠",
                  "전송 암호화 부재"
                ],
                [
                  "가격/역할이 클라이언트 결정",
                  "비즈니스 로직·대량 할당"
                ]
              ]
            }
          ]
        },
        {
          "id": "7-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "엔드포인트 분석은 컬렉션을 키우는 작업이다. 문서 임포트, JS/APK 리버스, 정상 플로우 캡처를 합쳐 Postman에 넣고, 응답 JSON을 필드 단위로 읽는다. UI에 없는 필드가 곧 과다 노출·대량 할당 후보다."
            },
            {
              "type": "p",
              "text": "기능 분석 루틴 3단: Happy path → 권한 필요 동작 → 응답/에러 비교. 정상을 기록해야 비정상이 보인다. 비즈니스 로직은 문서의 “하면 안 되는 일”을 체크리스트로 옮길 때 드러난다."
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #4: crAPI 컬렉션 + 과다 노출",
        "goal": "주요 플로우 컬렉션을 만들고 응답 JSON에서 민감 필드를 표시한다.",
        "steps": [
          "가입·로그인·프로필·차량·포스트 등 핵심 요청 저장",
          "각 응답에서 UI에 없는 필드 하이라이트",
          "동일 객체를 다른 역할로 조의해 필드 차이 비교"
        ]
      },
      "keyTakeaways": [
        "컬렉션 = 공격 인벤토리",
        "과다 노출은 ‘보이는 JSON’을 읽는 습관에서 나온다"
      ],
      "checklist": []
    },
    {
      "id": "ch08",
      "num": "8",
      "part": "part3",
      "title": "인증 공격",
      "tagline": "브루트 · 토큰 · JWT 전쟁",
      "minutes": 65,
      "xp": 220,
      "difficulty": 3,
      "sections": [
        {
          "id": "8-1",
          "title": "고전적 인증 공격",
          "body": [
            {
              "type": "cards",
              "items": [
                {
                  "title": "비밀번호 무차별 대입",
                  "text": "단일 계정에 다수 비밀번호. rate limit·락아웃·CAPTCHA 확인."
                },
                {
                  "title": "리셋/MFA 브루트",
                  "text": "6자리 OTP·짧은 숫자 토큰은 공간 탐색 가능. 시도 한도·만료·시도당 새 토큰 여부."
                },
                {
                  "title": "비밀번호 스프레이",
                  "text": "다수 계정에 소수 비밀번호. 락아웃 회피에 유효. 계정 열거와 콤보."
                },
                {
                  "title": "Basic(Base64)",
                  "text": "디코드만 하면 평문. 브루트 시 인코딩 페이로드 생성 필요."
                }
              ]
            }
          ]
        },
        {
          "id": "8-2",
          "title": "토큰 위조·예측",
          "body": [
            {
              "type": "p",
              "text": "세션 토큰이 순차·타임스탬프·짧은 엔트로피면 예측·브루트. 수동으로 패턴을 보고, 실시간 캡처로 분산을 측정한 뒤 Intruder."
            }
          ]
        },
        {
          "id": "8-3",
          "title": "JWT 악용",
          "body": [
            {
              "type": "list",
              "items": [
                "분석: jwt.io 또는 버프 확장으로 header/payload 클레임 확인 (alg, kid, role, exp)",
                "none 공격: alg를 none으로, 서명 제거 — 라이브러리 미검증 시 수락",
                "알고리즘 스위치: RS256→HS256으로 바꾸고 공개키를 HMAC 비밀처럼 사용",
                "크랙: 약한 HMAC 시크릿을 hashcat/jwt-cracker로"
              ]
            },
            {
              "type": "code",
              "lang": "bash",
              "title": "개념 커맨드",
              "code": "# 헤더/페이로드 디코드 (padding 주의)\necho 'eyJhbGciOiJIUzI1NiJ9' | base64 -d\n# 약한 시크릿 워드리스트 크랙 도구 사용"
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "실무 팁",
              "text": "role/admin/is_admin 클레임을 바꿔 서명만 통과하는지 보라. 서명 검증이 있어도 서버가 클레임을 신뢰하면 권한 상승."
            }
          ]
        },
        {
          "id": "8-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "인증 공격은 열거 → 스프레이/브루트 → 토큰 예측 → JWT 변조 순으로 넓힌다. rate limit·락아웃·CAPTCHA·MFA 유무를 먼저 재고 난이도를 조정한다. JWT는 서명 검증과 클레임 권한 모델을 둘 다 봐야 한다."
            },
            {
              "type": "list",
              "items": [
                "none / alg 스위치 / 약한 HS 시크릿 크랙",
                "role·admin 클레임 변조 후 보호 리소스 접근",
                "리셋·OTP 자릿수·시도 한도 측정",
                "Basic 인증 Base64 디코드 습관"
              ]
            },
            {
              "type": "callout",
              "tone": "warn",
              "title": "윤리",
              "text": "프로덕션 계정 락아웃을 유발하는 브루트는 범위·속도 합의 없이 금지. 스테이징·버그바운티 규칙을 따른다."
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #5: crAPI JWT 서명 크랙",
        "goal": "약한 비밀로 서명된 JWT를 크랙하고 클레임을 변조해 권한을 높인다.",
        "steps": [
          "로그인 후 JWT 캡처·디코드",
          "alg와 클레임 구조 기록",
          "워드리스트로 시크릿 크랙",
          "role 등 클레임 수정 후 재서명 → 보호 리소스 접근"
        ]
      },
      "keyTakeaways": [
        "인증 공격은 열거→스프레이→토큰→JWT 순으로 넓힌다",
        "JWT는 ‘서명 검증 + 클레임 권한 모델’ 둘 다 깨야 한다"
      ],
      "checklist": []
    },
    {
      "id": "ch09",
      "num": "9",
      "part": "part3",
      "title": "퍼징",
      "tagline": "넓게 훑고, 깊게 쑤신다",
      "minutes": 55,
      "xp": 200,
      "difficulty": 3,
      "sections": [
        {
          "id": "9-1",
          "title": "효과적인 퍼징",
          "body": [
            {
              "type": "p",
              "text": "퍼징 = 비정상·경계·악성 입력을 대량 투입해 이상 응답을 찾는 것. 페이로드 선택(특수문자, 긴 문자열, 타입 혼동, 경로 순회, 템플릿)과 이상 감지(5xx, 지연, 길이 변화, 에러 시그니처)가 핵심."
            }
          ]
        },
        {
          "id": "9-2",
          "title": "넓은 퍼징 vs 깊은 퍼징",
          "body": [
            {
              "type": "table",
              "headers": [
                "유형",
                "도구",
                "목적"
              ],
              "rows": [
                [
                  "넓게 (broad)",
                  "Postman Runner, 다수 엔드포인트",
                  "어디가 예외를 던지는지 지도화"
                ],
                [
                  "깊게 (deep)",
                  "Burp Intruder, Wfuzz",
                  "한 파라미터를 철저히"
                ]
              ]
            },
            {
              "type": "p",
              "text": "넓은 퍼징은 부적절한 자원 관리(예상 밖 메서드·버전·페이로드 크기)를 드러내기 좋다. Wfuzz로 메서드 스위칭(GET↔DELETE) 테스트도 전형적."
            },
            {
              "type": "code",
              "lang": "bash",
              "title": "Wfuzz 감각",
              "code": "wfuzz -z file,payloads.txt -b 'session=...' \\\n  --hc 404 -u 'https://t/api/user?id=FUZZ'"
            }
          ]
        },
        {
          "id": "9-3",
          "title": "더 깊은 퍼징 · 디렉터리 순회",
          "body": [
            {
              "type": "p",
              "text": "WAF/필터를 우회하는 인코딩 중첩, 유니코드, JSON 중첩 키. 파일 경로 파라미터에 ../, ..%2f, 절대경로. API가 파일·템플릿·URL을 받아 내부 요청하면 SSRF와 연결."
            }
          ]
        },
        {
          "id": "9-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "퍼징은 이상한 입력을 대량으로 넣어 이상을 탐지하는 실험이다. 페이로드 세트와 이상 징후(5xx, 지연, 길이, 에러 시그니처) 규칙이 없으면 로그만 쌓인다. 넓게 지도 → 깊게 착취."
            },
            {
              "type": "p",
              "text": "메서드 스위칭, 숨은 파라미터(Arjun), 인코딩 중첩, 경로 순회, JSON 타입 혼동을 기본 세트로 두고, WAF 우회는 13장과 연결한다."
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #6: 부적절한 자원 관리 퍼징",
        "goal": "문서에 없는 메서드·파라미터·버전에서 5xx 또는 권한 우회를 찾는다.",
        "steps": [
          "컬렉션 전 엔드포인트에 변형 메서드 적용",
          "Intruder로 공통 파라미터 이름 퍼징 (Arjun 결과 활용)",
          "이상 응답만 태그해 Repeater로 원인 분석"
        ]
      },
      "keyTakeaways": [
        "퍼징은 감지 규칙이 없으면 로그만 쌓인다",
        "넓게 지도 → 깊게 착취"
      ],
      "checklist": []
    },
    {
      "id": "ch10",
      "num": "10",
      "part": "part3",
      "title": "권한 공격",
      "tagline": "BOLA · BFLA · A-B 테스트 실전",
      "minutes": 50,
      "xp": 210,
      "difficulty": 4,
      "sections": [
        {
          "id": "10-1",
          "title": "BOLA 찾기",
          "body": [
            {
              "type": "list",
              "items": [
                "ID 탐색: 순차·UUID 패턴·응답에 섞인 타 사용자 ID",
                "A-B 테스트: 사용자 A 토큰으로 B의 object id 요청",
                "부채널 BOLA: 직접 조회는 막히지만 검색·내보내기·알림·썸네일 URL로 유출"
              ]
            },
            {
              "type": "code",
              "lang": "text",
              "title": "A-B 체크리스트",
              "code": "1. A로 로그인 → A 리소스 ID 수집\n2. B로 로그인 → B 리소스 ID 수집\n3. A 토큰 + B ID 요청\n4. 200 + B 데이터면 BOLA\n5. 그래프QL이면 필드·노드 id 단위로 반복"
            }
          ]
        },
        {
          "id": "10-2",
          "title": "BFLA 찾기",
          "body": [
            {
              "type": "p",
              "text": "A-B-A: 관리자(B)로 기능 URL·메서드를 캡처한 뒤 일반 유저(A) 토큰으로 재전송. Postman에서 토큰만 바꿔 컬렉션 러너."
            }
          ]
        },
        {
          "id": "10-3",
          "title": "권한 해킹 생산성 팁",
          "body": [
            {
              "type": "list",
              "items": [
                "Postman collection variables로 userA_token / userB_token 전환",
                "Burp Match & Replace로 Authorization 헤더 일괄 교체",
                "Autorize 확장: 저권한 토큰으로 자동 재전송·비교"
              ]
            }
          ]
        },
        {
          "id": "10-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "권한 버그의 증명 단위는 두 계정이다. A-B(객체)와 A-B-A(기능)를 기계적으로 돌리면 BOLA/BFLA의 대부분이 드러난다. 부채널(검색, export, 알림, 썸네일 URL)을 잊지 말 것."
            },
            {
              "type": "code",
              "lang": "text",
              "title": "A-B 체크 로그",
              "code": "date | endpoint | method | token | objectId | status | notes\n2026-.. | /api/cars/9/loc | GET | A | 9(B) | 200 | BOLA confirmed"
            },
            {
              "type": "list",
              "items": [
                "순차 ID·UUID 패턴 수집",
                "GraphQL 노드 id 교차",
                "Postman 변수로 토큰 전환",
                "Burp Match&Replace / Autorize"
              ]
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #7: 다른 사용자의 자동차 위치 발견",
        "goal": "crAPI 등에서 차량/위치 객체 BOLA를 재현한다.",
        "steps": [
          "두 계정 각각의 vehicle id 확보",
          "토큰 교차 요청",
          "위치·상세 응답 비교 스크린샷",
          "수정 제안: 서버측 소유권 검사"
        ]
      },
      "keyTakeaways": [
        "권한 버그는 ‘두 계정’이 있어야 증명된다",
        "부채널을 잊지 말 것"
      ],
      "checklist": []
    },
    {
      "id": "ch11",
      "num": "11",
      "part": "part3",
      "title": "대량 할당",
      "tagline": "숨은 필드로 권한·가격을 굽는다",
      "minutes": 40,
      "xp": 180,
      "difficulty": 3,
      "sections": [
        {
          "id": "11-1",
          "title": "대상 발견",
          "body": [
            {
              "type": "p",
              "text": "계정 등록·프로필 수정·객체 생성/갱신처럼 ‘JSON을 받아 DB에 쓰는’ 엔드포인트가 1순위. 권한 없는 접근과 결합되면 즉시 치명타."
            }
          ]
        },
        {
          "id": "11-2",
          "title": "변수 발견 기법",
          "body": [
            {
              "type": "list",
              "items": [
                "문서·스키마·모바일 모델 필드명",
                "응답에만 있는 필드를 요청에 되먹이기",
                "Arjun/Intruder로 isAdmin, role, price, balance, verified 등 맹목적 추가",
                "BFLA와 조합: 일반 유저가 admin 전용 필드 수정"
              ]
            },
            {
              "type": "code",
              "lang": "json",
              "title": "전형 페이로드",
              "code": "{\n  \"email\": \"me@x.com\",\n  \"password\": \"...\",\n  \"isAdmin\": true,\n  \"role\": \"admin\",\n  \"credit\": 999999\n}"
            }
          ]
        },
        {
          "id": "11-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "대량 할당은 서버가 클라이언트를 너무 믿을 때 발생한다. 응답에만 있던 필드를 요청에 되먹이거나, isAdmin·price·balance 같은 이름을 퍼징한다. 허용 리스트 바인딩이 정석 방어."
            },
            {
              "type": "p",
              "text": "등록·프로필 수정·주문 생성이 1순위 타깃이다. BFLA와 겹치면 일반 유저가 관리자 전용 필드까지 쓸 수 있다. 가격 조작은 즉시 금전 영향으로 보고서 설득력이 높다."
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #8: 온라인 상점 아이템 가격 변경",
        "goal": "주문/아이템 업데이트에 price 필드를 주입해 결제 금액을 조작한다.",
        "steps": [
          "정상 주문 플로우 캡처",
          "요청 바디에 price/total 변형",
          "서버 최종 청구액 확인",
          "음수·0원·타 통화 필드도 시도"
        ]
      },
      "keyTakeaways": [
        "허용 리스트 바인딩이 정석 방어",
        "응답 필드 = 공격 파라미터 후보"
      ],
      "checklist": []
    },
    {
      "id": "ch12",
      "num": "12",
      "part": "part3",
      "title": "주입",
      "tagline": "XSS · XAS · SQL · NoSQL · OS 명령",
      "minutes": 60,
      "xp": 220,
      "difficulty": 4,
      "sections": [
        {
          "id": "12-1",
          "title": "주입을 찾는 눈",
          "body": [
            {
              "type": "p",
              "text": "입력이 해석 컨텍스트(HTML, SQL, 셸, JSON 쿼리)에 들어가는데 이스케이프/파라미터화가 없으면 주입. API에서는 반사 지점이 UI가 아니라 다른 API·웹훅·PDF·로그일 수 있다."
            }
          ]
        },
        {
          "id": "12-2",
          "title": "XSS와 XAS",
          "body": [
            {
              "type": "p",
              "text": "XSS: 스크립트가 브라우저 문맥에서 실행. 저장형이면 API가 악성 페이로드를 퍼뜨리는 통로. XAS(API 간 스크립팅 개념): 한 API에 넣은 데이터가 다른 소비 API/관리 콘솔에서 실행."
            }
          ]
        },
        {
          "id": "12-3",
          "title": "SQL · NoSQL · OS 명령",
          "body": [
            {
              "type": "code",
              "lang": "text",
              "title": "탐침 페이로드 시드",
              "code": "SQL:  ' OR '1'='1  ·  ' AND SLEEP(5)--  ·  UNION SELECT\nNoSQL: {\"$gt\":\"\"}  ·  {\"$ne\":null}  ·  {\"$where\":\"...\"}\nOS:  ; id   ·  | whoami   ·  `sleep 5`  ·  $(curl ...)"
            },
            {
              "type": "p",
              "text": "sqlmap은 확인된 주입 포인트에 사용. API면 --data, 헤더, JSON Content-Type 옵션 필요. NoSQL은 연산자가 JSON으로 들어가므로 프록시에서 바디 타입을 유지한 채 변조."
            }
          ]
        },
        {
          "id": "12-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "주입은 입력이 명령/쿼리/마크업으로 해석될 때 발생한다. API는 JSON·헤더·GraphQL 변수 등 면이 넓고, 반사 지점이 다른 API나 관리 콘솔일 수 있다(XAS). 컨텍스트를 먼저 정하고 페이로드를 고른다."
            },
            {
              "type": "list",
              "items": [
                "SQL: 메타문자 → 논리 → UNION/time → sqlmap",
                "NoSQL: 연산자 객체, $where",
                "OS: ; | ` $() 와 시간 지연",
                "XSS: 저장형 페이로드가 API를 통해 전파"
              ]
            }
          ]
        }
      ],
      "lab": {
        "title": "실험실 #9: NoSQL 주입으로 쿠폰 위조",
        "goal": "쿠폰 검증 API에 연산자 주입으로 우회·위조 효과를 낸다.",
        "steps": [
          "쿠폰 적용 요청 캡처",
          "문자열 코드 대신 JSON 연산자 시도",
          "성공 조건(할인 적용) 확인",
          "방어: 타입 강제, 연산자 금지, 서버측 화이트리스트"
        ]
      },
      "keyTakeaways": [
        "컨텍스트를 알면 페이로드가 정해진다",
        "API 주입은 ‘다른 소비자’까지 추적"
      ],
      "checklist": []
    },
    {
      "id": "ch13",
      "num": "13",
      "part": "part4",
      "title": "우회 기술과 속도 제한 테스트",
      "tagline": "WAF·한도를 미끄러지듯 지나기",
      "minutes": 50,
      "xp": 200,
      "difficulty": 4,
      "sections": [
        {
          "id": "13-1",
          "title": "보안 컨트롤 우회",
          "body": [
            {
              "type": "p",
              "text": "WAF/게이트웨이는 시그니처·평판·속도·스키마로 막는다. 탐지(차단 페이지, 특이 헤더, 즉각 403) 후 우회 전략을 고른다."
            },
            {
              "type": "list",
              "items": [
                "버너 계정·IP 분산으로 평판 리셋",
                "경로 변형: /api/v1/users ↔ /api/v1/users/ ↔ /API/V1/USERS",
                "인코딩: URL 더블 인코딩, 유니코드, JSON 유니코드 이스케이프",
                "헤더 위조: X-Forwarded-For, X-Originating-IP, True-Client-IP 등",
                "Content-Type 혼동, HTTP/1.1 vs 2, 청크 전송",
                "Burp/Wfuzz로 우회 페이로드 자동화"
              ]
            }
          ]
        },
        {
          "id": "13-2",
          "title": "속도 제한 테스트",
          "body": [
            {
              "type": "p",
              "text": "문서의 한도(X req / Y min)와 실제 차단 코드·본문을 기준선으로 삼는다. 느슨한 한도는 보고 가치가 프로그램마다 다르다."
            },
            {
              "type": "list",
              "items": [
                "경로 우회: 슬래시·대소문자·버전 바꿔 카운터 분리",
                "출처 헤더 위조로 IP 기반 한도 혼란",
                "버프에서 IP 로테이션(헤더 페이로드) 또는 상위 프록시 풀"
              ]
            },
            {
              "type": "callout",
              "tone": "warn",
              "title": "윤리",
              "text": "한도 테스트 ≠ 서비스 다운. 합의된 RPS 안에서, 가능하면 스테이징에서."
            }
          ]
        },
        {
          "id": "13-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "WAF·rate limit은 벽이 아니라 조건 있는 문인 경우가 많다. 경로 정규화, 헤더 IP 위조, 인코딩, 버너 계정으로 우회 여부를 본다. 서비스 다운을 일으키는 테스트는 범위 합의 없이 하지 않는다."
            },
            {
              "type": "list",
              "items": [
                "경로: 슬래시, 대소문자, 버전, 인코딩",
                "IP: X-Forwarded-For 등 신뢰 헤더",
                "자동화: Burp/Wfuzz 페이로드 세트",
                "한도: 문서 기준선 vs 실측 비교"
              ]
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "우회는 창의력 + 체계적 변형 목록",
        "한도는 비즈니스 로직 이슈로 프레이밍"
      ],
      "checklist": []
    },
    {
      "id": "ch14",
      "num": "14",
      "part": "part4",
      "title": "GraphQL 공격",
      "tagline": "스키마를 훔치고 쿼리로 찌른다",
      "minutes": 55,
      "xp": 210,
      "difficulty": 4,
      "sections": [
        {
          "id": "14-1",
          "title": "요청과 IDE",
          "body": [
            {
              "type": "p",
              "text": "GraphiQL/Playground가 열려 있으면 학습·공격 모두 쉬워진다. 쿼리·뮤테이션·구독, 변수 분리, 배치 요청을 이해한다."
            }
          ]
        },
        {
          "id": "14-2",
          "title": "정찰과 리버스",
          "body": [
            {
              "type": "list",
              "items": [
                "경로 브루트: /graphql, /graphiql, /v1/graphql, /api/graphql",
                "쿠키/플래그로 IDE 강제 활성화 (DVGA류)",
                "인트로스펙션 쿼리로 스키마 덤프",
                "Burp InQL 확장으로 스키마→요청 생성",
                "개발자 도구로 프론트엔드 쿼리 문자열 수확"
              ]
            },
            {
              "type": "code",
              "lang": "graphql",
              "title": "인트로스펙션 스케치",
              "code": "query {\n  __schema {\n    types { name fields { name } }\n  }\n}"
            }
          ]
        },
        {
          "id": "14-3",
          "title": "분석·퍼징",
          "body": [
            {
              "type": "p",
              "text": "문서 탐색기로 권한 있는 필드 호출, 중첩 깊이·별칭 폭탄, 필드 단위 BOLA, 뮤테이션 주입. 명령 주입이 되는 리졸버 인자(url, cmd, file)를 퍼징."
            }
          ]
        },
        {
          "id": "14-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "GraphQL 공격 루프: 엔드포인트 찾기 → 인트로스펙션/InQL → 스키마 기반 컬렉션 → 필드 권한(BOLA) → 뮤테이션 주입·중첩 DoS. IDE가 열려 있으면 학습 속도가 몇 배다."
            },
            {
              "type": "code",
              "lang": "graphql",
              "title": "인트로스펙션 스케치",
              "code": "query {\n  __schema {\n    queryType { name }\n    types { name kind fields { name } }\n  }\n}"
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "인트로스펙션 = 자동 생성 문서",
        "GraphQL도 결국 권한·주입·DoS"
      ],
      "checklist": []
    },
    {
      "id": "ch15",
      "num": "15",
      "part": "part4",
      "title": "데이터 침해와 버그 현상금",
      "tagline": "실제 사고에서 배우는 ‘무엇이 돈과 헤드라인이 되나’",
      "minutes": 40,
      "xp": 170,
      "difficulty": 3,
      "sections": [
        {
          "id": "15-1",
          "title": "침해 사례에서 읽는 패턴",
          "body": [
            {
              "type": "cards",
              "items": [
                {
                  "title": "Peloton 등",
                  "text": "인증 없는/약한 객체 접근으로 프로필·PII 대량 조회 — BOLA·인증 결함 교과서."
                },
                {
                  "title": "USPS Informed Visibility",
                  "text": "과도한 데이터 접근·권한 모델 실패로 대량 정보 노출 논란."
                },
                {
                  "title": "T-Mobile API",
                  "text": "API 경유 개인정보 유출 — 외부 공격면으로서의 API 위험 강조."
                }
              ]
            },
            {
              "type": "p",
              "text": "공통점: (1) API가 핵심 데이터 통로 (2) 객체/기능 권한 부재 (3) 모니터링이 늦게 반응 (4) ‘내부용’이 인터넷에 노출."
            }
          ]
        },
        {
          "id": "15-2",
          "title": "현상금 사례 패턴",
          "body": [
            {
              "type": "list",
              "items": [
                "유출 API 키의 가치 — 클라우드·지도·SMS 키는 즉시 과금 피해",
                "비공개 API의 권한 문제 — 숨겨져 있어도 알면 호출 가능",
                "스타벅스 등: 대규모 계정/카드 영향 시나리오",
                "Instagram GraphQL BOLA — 현대적 API 버그바운티 클래식"
              ]
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "현상금 글쓰기",
              "text": "재현 단계 최소 집합, 영향받는 사용자 수 추정, ‘왜 비즈니스에 아픈지’, 수정 제안. 스팸성 rate-limit 리포트는 프로그램 성향을 보고."
            }
          ]
        },
        {
          "id": "15-3",
          "title": "마치며 — 저자급 체크",
          "body": [
            {
              "type": "p",
              "text": "이 노트를 끝까지 돌렸다면 당신은 (1) 범위를 설계하고 (2) 랩을 세우고 (3) 발견→분석→인증→퍼징→권한→할당→주입→우회→GraphQL 체인을 설명하며 (4) 실제 사례에 매핑할 수 있어야 한다. 이제 부족한 장은 원서로 깊게, 랩으로 손에 익히자."
            }
          ]
        },
        {
          "id": "15-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "사례 연구는 이론이 현실에서 어떤 헤드라인·배상·현상금이 되는지를 연결한다. 보고문은 재현 최소 집합 + 영향 규모 + 비즈니스 언어로 쓴다. 스팸성 rate-limit 리포트는 프로그램 성향을 보고 판단한다."
            },
            {
              "type": "list",
              "items": [
                "침해 패턴: 객체 권한 실패 + 과다 데이터",
                "키 유출: 즉시 과금·남용 피해",
                "GraphQL BOLA: 현대 바운티 클래식",
                "커뮤니케이션이 현상금 액수를 좌우"
              ]
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "사례는 취약점 이론에 감정을 붙인다",
        "버그바운티는 기술×커뮤니케이션 게임"
      ],
      "checklist": []
    },
    {
      "id": "apx-a",
      "num": "A",
      "part": "part4",
      "title": "부록 A · API 해킹 체크리스트",
      "tagline": "실전 나가기 전 포켓 카드",
      "minutes": 20,
      "xp": 80,
      "difficulty": 2,
      "sections": [
        {
          "id": "a-1",
          "title": "체크리스트",
          "body": [
            {
              "type": "list",
              "items": [
                "□ 권한·범위·제외·클라우드 약관 확인",
                "□ 수동 OSINT → 능동 디스커버리 → 사이트맵",
                "□ 명세/문서/JS/APK에서 엔드포인트 수확",
                "□ Postman 컬렉션 + 환경(토큰 A/B)",
                "□ 인증: 열거·스프레이·토큰·JWT",
                "□ BOLA A-B, BFLA A-B-A",
                "□ 과다 노출 필드 마킹",
                "□ 대량 할당 필드 퍼징",
                "□ 주입 탐침 + 필요 시 자동화",
                "□ rate limit / WAF 우회 시도 (합의 범위)",
                "□ GraphQL 인트로스펙션·필드 권한",
                "□ 비즈니스 로직 워크스루",
                "□ 증거·영향·수정안 보고서"
              ]
            }
          ]
        },
        {
          "id": "A-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "체크리스트는 피로한 날의 두 번째 뇌다. 출격 전·중간·보고 전에 한 번씩 훑는다. 항목을 자기 도구 단축키와 연결해 개인화하면 더 좋다."
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "체크리스트는 스트레스 상황에서 기억을 대신한다"
      ],
      "checklist": []
    },
    {
      "id": "apx-b",
      "num": "B",
      "part": "part4",
      "title": "부록 B · 추가 자료",
      "tagline": "다음 레벨로 가는 링크 모음",
      "minutes": 15,
      "xp": 50,
      "difficulty": 1,
      "sections": [
        {
          "id": "b-1",
          "title": "계속 공부할 곳",
          "body": [
            {
              "type": "list",
              "items": [
                "원서/번역서: Corey Ball 《Hacking APIs》 / 《API 해킹의 모든 것》(제이펍)",
                "OWASP API Security Top 10 최신판",
                "OWASP crAPI, Juice Shop, DVGA",
                "PortSwigger Web Security Academy (API/GraphQL 랩)",
                "Vickie Li 《Bug Bounty Bootcamp》",
                "Burp 문서 · Postman Learning Center",
                "버그크라우드 유니버시티 API 세션"
              ]
            },
            {
              "type": "callout",
              "tone": "tip",
              "title": "학습 루틴 제안",
              "text": "하루 1섹션 + 주 1랩 + 주 1 버그바운티 스코프 읽기. 노트를 이 사이트 진도로 남기고, 막히면 원서 해당 장을 펼친다."
            }
          ]
        },
        {
          "id": "B-deep",
          "title": "심화 노트 · 혼자 복습",
          "note": "이 블록은 본문을 다시 붙잡는 복습 레이어다. 막히면 위 섹션의 표·코드를 다시 본다.",
          "body": [
            {
              "type": "p",
              "text": "다음 단계는 원서 정독 + PortSwigger Academy + 실제 스코프 읽기다. 이 노트는 지도이고, 손은 랩과 버그바운티에서 만든다."
            }
          ]
        }
      ],
      "lab": null,
      "keyTakeaways": [
        "도구 버전은 빨리 늙는다. 원리와 체크리스트가 남는다"
      ],
      "checklist": []
    }
  ],
  "glossary": [
    {
      "term": "BOLA",
      "def": "Broken Object Level Authorization. 객체 단위 권한 검사 실패(API판 IDOR)."
    },
    {
      "term": "BFLA",
      "def": "Broken Function Level Authorization. 기능·역할 단위 권한 실패."
    },
    {
      "term": "JWT",
      "def": "JSON Web Token. header.payload.signature 구조의 통용 인증 토큰."
    },
    {
      "term": "Mass Assignment",
      "def": "클라이언트가 보낸 여분 필드가 모델에 바인딩되어 권한·상태가 바뀌는 취약점."
    },
    {
      "term": "Rate Limiting",
      "def": "시간당 요청 수 제한. 수익 보호·브루트포스 완화."
    },
    {
      "term": "WAF",
      "def": "Web Application Firewall. HTTP 계층 공격 필터."
    },
    {
      "term": "OSINT",
      "def": "Open Source Intelligence. 공개 정보 기반 정찰."
    },
    {
      "term": "GraphQL Introspection",
      "def": "스키마 자기기술 쿼리. 켜져 있으면 API 지도 노출."
    },
    {
      "term": "crAPI",
      "def": "OWASP Completely Ridiculous API. API 보안 학습용 취약 앱."
    },
    {
      "term": "SOW",
      "def": "Statement of Work. 테스트 범위·기간·산출물을 담은 작업 기술서."
    },
    {
      "term": "A-B Testing (authz)",
      "def": "사용자 A 자격으로 B 리소스 접근을 시도해 BOLA를 검증하는 방법."
    },
    {
      "term": "XAS",
      "def": "Cross-API Scripting 개념 — 한 API에 저장된 스크립트가 다른 소비 맥락에서 실행."
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
