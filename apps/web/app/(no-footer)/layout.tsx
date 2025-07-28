import ModalProvider from '@/widgets/modal/ui/ModalProvider';
import { ScrollButton } from '@/widgets/scroll-button/ScrollButton';
import { Header } from '../../widgets/header';

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <ModalProvider />
      <div id="main-scroll-container" className="px-4s relative flex-1 overflow-y-auto">
        {children}
        <ScrollButton />
      </div>
    </div>
  );
};

export default layout;
