import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <TopNav />
      <main className="ml-64 pt-28 px-10 pb-12">{children}</main>
    </>
  );
}
