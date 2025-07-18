import { Button } from '@repo/ui/design-system/base-components/Button/index';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@repo/ui/design-system/base-components/Modal/index';

interface TermsModalProps {
  onClose: () => void;
}

export const TermsModal = ({ onClose }: TermsModalProps) => {
  return (
    <Modal>
      <ModalContent className="max-w-lg bg-white shadow-lg">
        <ModalHeader title="이용약관 및 개인정보 처리방침" onClose={onClose} />
        <div className="p-6 pt-0">
          <div className="prose prose-sm max-h-80 w-full max-w-none overflow-y-auto rounded-md border p-4">
            <h4>제1조 (목적)</h4>
            <p>
              이 약관은 Chwee-up-hajah(이하 "회사")가 제공하는 중고 경매 관련 서비스(이하
              "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한
              사항을 규정함을 목적으로 합니다.
            </p>
            <h4>제2조 (정의)</h4>
            <p>
              1. "서비스"라 함은 구현되는 단말기(PC, 모바일, 태블릿 등의 각종 유무선 장치를 포함)와
              상관없이 "회원"이 이용할 수 있는 회사의 중고 경매 관련 제반 서비스를 의미합니다.
            </p>
            <p>
              2. "회원"이라 함은 회사의 "서비스"에 접속하여 이 약관에 따라 "회사"와 이용계약을
              체결하고 "회사"가 제공하는 "서비스"를 이용하는 고객을 말합니다.
            </p>
            <h4>제3조 (약관의 게시와 개정)</h4>
            <p>
              1. "회사"는 이 약관의 내용을 "회원"이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.
            </p>
            <p>
              2. "회사"는 "약관의 규제에 관한 법률", "정보통신망 이용촉진 및 정보보호 등에 관한
              법률(이하 "정보통신망법")" 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수
              있습니다.
            </p>
            {/* 추가 약관 내용... */}
          </div>
          <ModalFooter className="flex justify-end p-4">
            <Button onClick={onClose} variants="primary">
              확인
            </Button>
          </ModalFooter>
        </div>
      </ModalContent>
    </Modal>
  );
};
