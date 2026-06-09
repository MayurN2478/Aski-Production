type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({
  children,
}: LayoutProps) {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {children}
    </div>
  );
}