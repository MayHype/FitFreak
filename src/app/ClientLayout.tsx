'use client';

import React from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
  geistSansVariable: string;
  geistMonoVariable: string;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({
  children,
  geistSansVariable,
  geistMonoVariable,
}) => {
  return (
    <body className={`${geistSansVariable} ${geistMonoVariable} antialiased`}>
      {children}
    </body>
  );
};

export default ClientLayout;
