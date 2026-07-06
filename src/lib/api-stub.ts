import { useState } from 'react';

// Stub API hooks for standalone build
export function useGetSubscriberCount() {
  return { data: { count: 0 }, isLoading: false, error: null };
}

export interface SubscribeData {
  alreadySubscribed: boolean;
}

export function useSubscribe(options: { mutation?: { onSuccess?: (data: SubscribeData) => void; onError?: (err: Error) => void } } = {}) {
  const [isPending, setIsPending] = useState(false);

  const mutate = (params: { data: { email: string } }) => {
    // Log target email to satisfy unused parameter checks
    console.log('Stub subscribing email:', params.data.email);
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      if (options?.mutation?.onSuccess) {
        options.mutation.onSuccess({ alreadySubscribed: false });
      }
    }, 500);
  };

  return { mutate, isPending };
}
