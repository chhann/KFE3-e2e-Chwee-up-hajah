describe('채팅방 목록 페이지', () => {
  const mockUserId = 'a2c61a88-1132-4593-b2a1-5b7a4d3231a5'; // fixture와 일치하는 사용자 ID

  beforeEach(() => {
    // Zustand auth-store의 localStorage를 직접 조작하여 로그인 상태 주입
    const authStore = {
      state: {
        userId: mockUserId,
        isAuthenticated: true,
        isHydrated: true, // 중요: 스토어가 이미 hydration 되었다고 알려줌
      },
      version: 0,
    };
    window.localStorage.setItem('auth-store', JSON.stringify(authStore));

    // 채팅방 목록 API mock
    cy.intercept('GET', '/api/chat/list*', {
      fixture: 'chat-rooms.json',
    }).as('getChatRooms');

    cy.visit('/chat');
    cy.wait('@getChatRooms');
  });

  it('"구매"와 "판매" 탭이 표시되고, 기본으로 "구매" 탭의 채팅방이 보인다', () => {
    // 탭 확인
    cy.contains('button', '구매').should('be.visible');
    cy.contains('button', '판매').should('be.visible');

    // 기본 탭(구매)의 채팅방 내용 확인 (chat-rooms.json fixture 기준)
    cy.contains('MacBook Pro 2022').should('be.visible');
    cy.contains('김철수').should('be.visible'); // 판매자 닉네임
  });

  it('"판매" 탭을 클릭하면 판매 관련 채팅방이 표시된다', () => {
    cy.contains('button', '판매').click();

    // 판매 탭의 채팅방 내용 확인 (chat-rooms.json fixture 기준)
    cy.contains('iPhone 15 Pro').should('be.visible');
    cy.contains('박영희').should('be.visible'); // 구매자 닉네임
  });

  it('채팅방을 클릭하면 해당 채팅방 상세 페이지로 이동한다', () => {
    cy.contains('MacBook Pro 2022').click();
    cy.url().should('include', '/chat/a2c61a88-1132-4593-b2a1-5b7a4d3231a5'); // fixture의 room_id
  });
});
