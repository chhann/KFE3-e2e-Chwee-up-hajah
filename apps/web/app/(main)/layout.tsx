import ModalProvider from '@/widgets/modal/ui/ModalProvider';
import { ScrollButton } from '@/widgets/scroll-button/ScrollButton';

import { Footer } from '../../widgets/footer';
import { Header } from '../../widgets/header';

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <ModalProvider />
      <div
        id="main-scroll-container"
        className="relative h-[calc(100dvh-68px-80px)] overflow-y-auto px-4"
      >
        {children}
        <ScrollButton />
      </div>
      <Footer />
    </div>
  );
};

export default layout;
