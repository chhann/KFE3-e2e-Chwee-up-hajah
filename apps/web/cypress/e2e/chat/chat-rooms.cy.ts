describe('채팅방 목록 페이지', () => {
  const mockUserId = 'test-user-123';

  beforeEach(() => {
    // 로그인 상태 mock
    const authStore = {
      state: {
        userId: mockUserId,
        isAuthenticated: true,
      },
      version: 0,
    };
    window.localStorage.setItem('auth-store', JSON.stringify(authStore));

    // ✅ 채팅방 목록 API mock (Next.js API Route)
    cy.intercept('GET', '/api/chat/list*', {
      statusCode: 200,
      body: [
        {
          room_id: 'room1',
          product_id: 'p1',
          product_name: '중고 맥북 에어',
          buyer_id: mockUserId,
          buyer_nickname: '나',
          seller_id: 'user-2',
          seller_nickname: '맥북판매왕',
          created_at: '2025-07-01T12:00:00Z',
        },
      ],
    });
  });

  it('채팅방 항목이 올바르게 렌더링된다', () => {
    cy.visit('/chat');

    cy.contains('내 채팅방').should('exist');
    cy.contains('중고 맥북 에어').should('exist');
    cy.contains('맥북판매왕').should('exist');
    cy.contains('서울시 강남구').should('exist');
    cy.contains('낙찰가').should('exist');
    cy.contains('50,000원').should('exist');
  });

  it('채팅방 클릭 시 상세 페이지로 이동한다', () => {
    cy.visit('/chat');

    cy.contains('중고 맥북 에어')
      .click()
      .then(() => {
        cy.url().should('include', '/chat/room1');
      });
  });
});
