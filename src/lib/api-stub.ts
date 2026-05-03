// Stub API hooks for standalone build
export function useGetSubscriberCount() {
  return { data: { count: 0 }, isLoading: false, error: null };
}

export function useSubscribe(options: { mutation?: { onSuccess?: () => void; onError?: () => void } } = {}) {
  return {
    mutate: (params: { data: { email: string } }) => {
      // Simulate API call
      setTimeout(() => {
        if (options?.mutation?.onSuccess) {
          options.mutation.onSuccess({ alreadySubscribed: false });
        }
      }, 500);
    },
  };
}
