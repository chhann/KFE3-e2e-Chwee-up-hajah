describe('채팅방 상세 페이지 (ChatMessages + ChatInput)', () => {
  const mockUserId = 'test-user-123';
  const mockRoomId = 'room1';

  let getCallCount = 0;

  beforeEach(() => {
    // ✅ 로그인된 상태로 localStorage 설정
    const authStore = {
      state: {
        userId: mockUserId,
        isAuthenticated: true,
      },
      version: 0,
    };
    window.localStorage.setItem('auth-store', JSON.stringify(authStore));

    // ✅ GET 요청 - 채팅방 메시지 목록
    cy.intercept('GET', `/api/chat/room?roomId=${mockRoomId}`, (req) => {
      getCallCount += 1;

      // 최초 로딩 시 응답
      if (getCallCount === 1) {
        req.reply([
          {
            message_id: 'msg-1',
            content: '처음 메시지입니다',
            sender_id: 'other-user',
            sender_name: '상대방',
            sent_at: new Date().toISOString(),
            room_id: mockRoomId,
            is_read: false,
          },
        ]);
      } else {
        // 전송 후 응답 (새 메시지 포함)
        req.reply([
          {
            message_id: 'msg-1',
            content: '처음 메시지입니다',
            sender_id: 'other-user',
            sender_name: '상대방',
            sent_at: new Date().toISOString(),
            room_id: mockRoomId,
            is_read: false,
          },
          {
            message_id: 'msg-2',
            content: getCallCount === 2 ? '새로운 테스트 메시지' : '엔터 전송 테스트',
            sender_id: mockUserId,
            sender_name: 'Me',
            sent_at: new Date().toISOString(),
            room_id: mockRoomId,
            is_read: false,
          },
        ]);
      }
    });

    // ✅ POST 요청 - 메시지 전송
    cy.intercept('POST', '/api/chat/message-send', (req) => {
      // 요청 내용을 출력 (디버깅용)
      console.log('POST message:', req.body);

      req.reply({
        message_id: 'msg-999',
        ...req.body,
        sent_at: new Date().toISOString(),
        is_read: false,
      });
    }).as('sendMessage');
  });

  it('초기 메시지 렌더링 + 입력 후 전송 확인', () => {
    cy.visit(`/chat/${mockRoomId}`);

    cy.contains('처음 메시지입니다').should('exist');

    cy.get('input[placeholder="메시지를 입력하세요"]')
      .type('새로운 테스트 메시지')
      .should('have.value', '새로운 테스트 메시지');

    cy.contains('전송').click();

    cy.wait('@sendMessage');
    cy.contains('새로운 테스트 메시지').should('exist');
  });

  it('Enter 키로 메시지 전송 가능', () => {
    cy.visit(`/chat/${mockRoomId}`);

    cy.get('input[placeholder="메시지를 입력하세요"]')
      .type('엔터 전송 테스트{enter}')
      .should('have.value', '');

    cy.wait('@sendMessage');
    cy.contains('엔터 전송 테스트').should('exist');
  });
});
