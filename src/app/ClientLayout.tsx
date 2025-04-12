'use client';

import React from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({
  children,
}) => {
  return (
    <body>
      {children}
    </body>
  );
};

export default ClientLayout;

