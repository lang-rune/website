import { RootProvider } from 'fumadocs-ui/provider';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchDialog } from '@/components/layout/SearchDialog';
import "fumadocs-ui/style.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootProvider>
      <DocsLayout 
        tree={source.pageTree}
        nav={{
          component: <Header />,
        }}
      >
        <div className="flex flex-col min-h-[calc(100vh-var(--fd-nav-height))] justify-between">
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </div>
      </DocsLayout>
      <SearchDialog />
    </RootProvider>
  );
}