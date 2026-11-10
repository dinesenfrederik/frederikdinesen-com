'use client';

import React, { createContext, useContext, useState } from 'react';
import TestMixModal from './TestMixModal';

interface TestMixModalContextType {
  openModal: (service?: string) => void;
  closeModal: () => void;
  isOpen: boolean;
}

const TestMixModalContext = createContext<TestMixModalContextType>({
  openModal: () => {},
  closeModal: () => {},
  isOpen: false,
});

export function TestMixModalProvider({
  children,
  lang = 'da',
}: {
  children: React.ReactNode;
  lang?: 'da' | 'en';
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultService, setDefaultService] = useState<string | undefined>(undefined);

  const openModal = (service?: string) => {
    setDefaultService(service);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <TestMixModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      <TestMixModal
        isOpen={isOpen}
        onClose={closeModal}
        lang={lang}
        defaultService={defaultService}
      />
    </TestMixModalContext.Provider>
  );
}

export function useTestMixModal() {
  return useContext(TestMixModalContext);
}

