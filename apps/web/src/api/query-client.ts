import { QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 10,

        retry: 1,

        refetchOnWindowFocus: false,
        refetchOnReconnect: true,

        throwOnError: false,
      },

      mutations: {
        retry: 0,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}
