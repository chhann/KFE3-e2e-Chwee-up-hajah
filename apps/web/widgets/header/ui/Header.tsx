import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { useModalStore } from '../../../stores/modal';

export const Header = () => {
  const { setOpenModal } = useModalStore();

  return (
    <header className="text-neutral-70 flex h-[68px] cursor-pointer items-center justify-end">
      <Button
        variants="transparent"
        size="thinMd"
        onClick={() => setOpenModal('notification')}
        className="px-0"
      >
        <h2>알림</h2>
      </Button>
      <Button size="thinMd" variants="transparent" onClick={() => setOpenModal('location')}>
        <h2>내 위치</h2>
      </Button>{' '}
      <Button size="thinMd" variants="transparent" onClick={() => setOpenModal('auth')}>
        <h2>내 위치</h2>
      </Button>
    </header>
  );
};
