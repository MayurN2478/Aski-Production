type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({
  children,
}: LayoutProps) {
  return (
    <div
      className="
        min-h-screen
        overflow-x-hidden
        bg-white
        text-black
        dark:bg-black
        dark:text-white
        transition-colors
        duration-300
      "
    >
      {children}
    </div>
  );
}