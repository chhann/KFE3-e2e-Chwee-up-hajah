export const PrivacyPolicyContent = () => {
  return (
    <div className="space-y-8">
      <h2 className="mb-4">
        <strong>개요</strong>
      </h2>
      <p>
        '타임옥션'은 서비스 제공을 위해 필요한 최소한의 범위 내에서 아래와 같이 개인정보를 수집하고
        이용합니다.
      </p>

      <h2 className="mb-4">
        <strong>제1조 (회원 식별 및 서비스 제공)</strong>
      </h2>
      <ul>
        <li>
          <strong>수집 항목:</strong> 아이디, 비밀번호, 닉네임, 연락처
        </li>
        <li>
          <strong>보유 및 이용 기간:</strong> 회원 탈퇴 시까지
        </li>
      </ul>

      <h4>
        <strong>제2조 (분쟁 처리 및 CS 응대)</strong>
      </h4>
      <ul>
        <li>
          <strong>수집 항목:</strong> 서비스 이용 기록, 접속 로그, 기기 정보, 문의 및 상담 내용
        </li>
        <li>
          <strong>보유 및 이용 기간:</strong> 회원 탈퇴 시까지 (단, 관련 법령에 따라 보관 의무가
          있을 경우 해당 기간까지 보관)
        </li>
      </ul>

      <h4>
        <strong>제3조 (정책 위반 사용자에 대한 제재 및 관리)</strong>
      </h4>
      <ul>
        <li>
          <strong>수집 항목:</strong> 서비스 이용 기록, 제재 기록
        </li>
        <li>
          <strong>보유 및 이용 기간:</strong> 회원 탈퇴 시까지
        </li>
      </ul>

      <p className="font-semibold">
        귀하는 위 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할
        경우, 회원가입 및 '타임옥션'의 정상적인 서비스 이용이 불가능합니다.
      </p>

      <p>위 내용을 모두 확인하였으며, 이에 동의합니다.</p>
    </div>
  );
};
