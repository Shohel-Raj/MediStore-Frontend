
export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <h1>from mainlayout</h1>
      {children}
    </div>
  );
}
