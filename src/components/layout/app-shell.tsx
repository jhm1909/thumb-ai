"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <TopNav onMenuClick={() => setSidebarOpen(true)} />
      <main className="ml-0 lg:ml-64 pt-20 lg:pt-28 px-4 lg:px-10 pb-12">
        {children}
      </main>
    </>
  );
}
