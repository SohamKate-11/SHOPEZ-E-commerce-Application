import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((toast) => {
          let bg = '#1e293b';
          let border = '#334155';
          if (toast.type === 'success') {
            bg = '#065f46';
            border = '#10b981';
          } else if (toast.type === 'error') {
            bg = '#991b1b';
            border = '#ef4444';
          } else if (toast.type === 'warning') {
            bg = '#92400e';
            border = '#f59e0b';
          }

          return (
            <div
              key={toast.id}
              onClick={() => removeToast(toast.id)}
              style={{
                pointerEvents: 'auto',
                cursor: 'pointer',
                background: bg,
                color: '#ffffff',
                padding: '0.75rem 1.25rem',
                borderRadius: '10px',
                border: `1px solid ${border}`,
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
                fontSize: '0.9rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                animation: 'slideUp 0.2s ease-out',
                maxWidth: '360px',
              }}
            >
              <span>{toast.message}</span>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
