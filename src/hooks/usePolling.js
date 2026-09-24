import { useEffect, useRef, useState } from "react";

/**
 * Fetches `fetcher()` immediately, then re-runs it every `intervalMs`.
 * Returns { data, loading, error, refetch }. `loading` is only true for
 * the very first load — later polls update silently so the UI doesn't flicker.
 */
export default function usePolling(fetcher, deps = [], intervalMs = 0) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  useEffect(() => {
    let cancelled = false;
    let firstLoad = true;

    async function run() {
      if (firstLoad) setLoading(true);
      try {
        const result = await fetcherRef.current();
        if (cancelled) return;
        setData(result);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err?.message || "Something went wrong");
      } finally {
        if (!cancelled && firstLoad) {
          setLoading(false);
          firstLoad = false;
        }
      }
    }

    run();
    const id = intervalMs ? setInterval(run, intervalMs) : null;

    return () => {
      cancelled = true;
      if (id) clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs, ...deps]);

  const refetch = () => fetcherRef.current().then(setData).catch((err) => setError(err?.message || "Something went wrong"));

  return { data, loading, error, refetch };
}
