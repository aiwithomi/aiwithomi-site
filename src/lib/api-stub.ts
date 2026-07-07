// Stub API hooks for standalone build.
// Email capture is handled by Substack (see Newsletter.tsx); no backend exists.
// Returns null so the Hero subscriber badge stays hidden until a real count source exists.
export function useGetSubscriberCount() {
  return { data: null as { count: number } | null, isLoading: false, error: null };
}
