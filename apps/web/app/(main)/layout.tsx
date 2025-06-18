import { Footer } from '../../widgets/footer';
import { Header } from '../../widgets/header';

interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-1 overflow-y-auto px-4">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
