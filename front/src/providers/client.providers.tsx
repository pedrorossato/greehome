'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <SessionProvider>{children}</SessionProvider>;
}
