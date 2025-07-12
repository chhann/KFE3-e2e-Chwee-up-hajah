// describe('경매 전체 흐름 테스트', () => {
//   const auctionId = 'd92863e2-1bf5-4f6a-9a58-62a5d6eb5c57';

//   beforeEach(() => {
//     // 경매 목록 API 모의 처리
//     cy.intercept('GET', '/api/auction/list*', {
//       fixture: 'auction-list.json',
//     }).as('getAuctionList');

//     // 경매 상세 API 모의 처리
//     cy.intercept('GET', `/api/auction/detail/${auctionId}`, {
//       // auctionId가 URL 경로에 직접 포함됩니다.
//       fixture: 'auction-detail.json',
//     }).as('getAuctionDetail');

//     // 입찰 내역 API 모의 처리 (상세 페이지에서 호출)
//     cy.intercept('GET', `/api/auction/bid?auction_id=${auctionId}*`, {
//       // auction_id 파라미터 형식에 따라 수정
//       fixture: 'bids.json',
//     }).as('getBids');

//     // 입찰 요청 API 모의 처리
//     cy.intercept('POST', '/api/auction/bid', {
//       statusCode: 201,
//       fixture: 'bid-success.json',
//     }).as('postBid');

//     // 사용자 인증 상태 모의 처리 (로그인된 상태로 가정)
//     cy.login(); // 가상의 로그인 커맨드, cypress/support/commands.ts에 추가 필요
//   });

//   it('경매 목록에서 상세 페이지로 이동하여 입찰에 성공한다', () => {
//     // 1. 경매 목록 페이지 방문
//     cy.visit('/auction/auction-list');
//     cy.wait('@getAuctionList');

//     // 2. 경매 목록 확인 및 특정 아이템 클릭
//     cy.get(`a[href="/auction/${auctionId}/auction-detail"]`) // 정확한 href를 가진 <a> 태그를 선택합니다.
//       .should('be.visible') // 해당 요소가 화면에 보이는지 확인합니다.
//       .click(); // 확인 후 클릭합니다.

//     // 3. 상세 페이지로 이동 확인
//     cy.url().should('include', `/auction/${auctionId}/auction-detail`);
//     cy.wait(500); // 클라이언트 측에서 API 요청을 시작할 시간을 줍니다.
//     cy.wait('@getAuctionDetail');
//     cy.url().should('include', `/auction/${auctionId}/auction-detail`); // 페이지 전환이 완료되었음을 다시 확인

//     // 4. 상세 페이지 내용 확인
//     cy.get('h1').should('be.visible').and('contain.text', '테스트 경매 상품');
//     cy.contains('로딩 중...').should('not.exist'); // 로딩 텍스트가 사라질 때까지 기다립니다.

//     // 5. 입찰가 조절 및 입찰 실행
//     cy.get(
//       '.border-neutral-30.bg-neutral-0.flex.w-full.max-w-md.flex-col.items-center.justify-center.rounded-lg.border.p-4'
//     ).within(() => {
//       const initialBid = 15000;
//       const bidUnit = 5000;
//       cy.get('.text-neutral-70.my-6.flex.items-center.gap-5.font-bold button').eq(1).click();
//       const expectedBidText = (initialBid + bidUnit + 5000).toLocaleString() + '원';
//       cy.get('.text-neutral-70.my-6.flex.items-center.gap-5.font-bold').should(
//         'contain.text',
//         expectedBidText
//       );
//       cy.contains('입찰하기').click();
//     });

//     // 6. 입찰 API 호출 및 성공 확인
//     cy.wait('@postBid')
//       .its('request.body')
//       .then((body) => {
//         console.log('Actual request body:', body);
//         // 여기에 실제 요청 본문과 예상하는 본문을 비교하는 assertion을 추가합니다.
//         // 예를 들어, body.auctionId === auctionId 등을 확인할 수 있습니다.
//         expect(body.auctionId).to.equal(auctionId);
//         expect(body.bidderId).to.equal('test-user-id'); // cy.login()에서 설정한 userId와 일치하는지 확인
//         expect(body.bidPrice).to.equal(25000);
//       });

//     // 7. 성공 피드백 확인 (예: alert 또는 toast 메시지)
//     // 이 부분은 실제 애플리케이션의 피드백 방식에 따라 수정 필요
//     // 여기서는 useAuctionBidState가 alert를 사용한다고 가정
//     cy.on('window:alert', (text) => {
//       expect(text).to.contains('입찰이 완료되었습니다.');
//     });
//   });
// });
