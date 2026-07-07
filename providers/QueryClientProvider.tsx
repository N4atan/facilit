// Providers.tsx (ou no seu layout principal)
'use client'; // Necessário se estiver usando Next.js App Router

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Garantir que o QueryClient seja criado apenas uma vez por sessão de usuário
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 4, // Define que os dados ficam 'frescos' por 5 minutos globalmente
            // refetchOnWindowFocus: false, // Evita refetch automático ao trocar de aba (opcional)
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}