interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 overflow-y-auto px-4">{children}</div>
    </div>
  );
};

export default layout;
