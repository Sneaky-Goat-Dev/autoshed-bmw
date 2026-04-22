'use client';

import { FormspreeProvider as Provider } from '@formspree/react';
import { ReactNode } from 'react';

interface FormspreeProviderProps {
  children: ReactNode;
}

export default function FormspreeProvider({ children }: FormspreeProviderProps) {
  return (
    <Provider project="2985612806176374566">
      {children}
    </Provider>
  );
}
