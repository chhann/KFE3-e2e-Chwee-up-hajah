// 이벤트 객체 타입을 정의합니다.
export interface Event {
  id: number;
  imageUrl: string;
  redirectUrl: string;
  startTime: string;
  endTime: string;
  is_active: boolean;
}
