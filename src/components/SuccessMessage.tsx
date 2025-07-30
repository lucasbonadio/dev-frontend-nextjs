// app/components/SuccessMessage.tsx
"use client";

import { useEffect, useState } from "react";

interface SuccessMessageProps {
  initialVisibility: boolean;
  message?: string;
}

export function SuccessMessage({ initialVisibility, message = "Produto criado com sucesso!" }: SuccessMessageProps) {
  const [isVisible, setIsVisible] = useState(initialVisibility);
  const [displayMessage, setDisplayMessage] = useState(message);

  useEffect(() => {
    if (message) {
      setDisplayMessage(message);
    }
    if (initialVisibility) {
        setIsVisible(true);
    }
  }, [initialVisibility, message]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        const url = new URL(window.location.href);
        url.searchParams.delete("success");
        url.searchParams.delete("message");
        window.history.replaceState({}, "", url.toString());
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl shadow animate-fade-in-up">
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#22c55e" />
        <path
          d="M8 12l2 2 4-4"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {displayMessage}
    </div>
  );
}