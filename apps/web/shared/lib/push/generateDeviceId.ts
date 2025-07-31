// 디바이스 식별을 위한 간단한 해시 생성
export const generateDeviceId = (userAgent: string, endpoint: string): string => {
  // UserAgent + endpoint의 일부로 디바이스 구분
  const deviceInfo = userAgent + endpoint.slice(-20);
  return Buffer.from(deviceInfo).toString('base64').slice(0, 16);
};
