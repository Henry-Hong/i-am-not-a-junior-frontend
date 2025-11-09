import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import classNames from "classnames";

const ITEMS_API_URL = "https://example.com/api/items";
const DEBOUNCE_MS = 500;

type Props = {
  onSelectItem?: (item: string) => void;
};

function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
  deps: React.DependencyList = []
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(
    () =>
      debounce((...args: Args) => {
        callbackRef.current(...args);
      }, delay),
    [delay, ...deps]
  );

  return debouncedCallback;
}

function useAutocomplete() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(async (q: string): Promise<string[]> => {
    if (!q.trim()) return [];

    const { data } = await axios.get<string[]>(ITEMS_API_URL, {
      params: { q },
    });

    return Array.isArray(data) ? data : [];
  }, []);

  const debouncedFetch = useDebouncedCallback(
    async (q: string) => {
      if (!q.trim()) {
        setItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const data = await fetchItems(q);
        setItems(data);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    },
    DEBOUNCE_MS,
    [fetchItems]
  );

  useEffect(() => {
    debouncedFetch(query);
  }, [query, debouncedFetch]);

  return {
    query,
    setQuery,
    items,
    loading,
  };
}

// View component
const Autocomplete: React.FC<Props> = ({ onSelectItem }) => {
  const { query, setQuery, items, loading } = useAutocomplete();

  const handleSelect = useCallback(
    (item: string) => {
      onSelectItem?.(item);
    },
    [onSelectItem]
  );

  return (
    <div className="wrapper">
      <div className={classNames("control", { "is-loading": loading })}>
        <input
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search…"
        />
      </div>

      {!loading && items.length > 0 && (
        <div className="list">
          {items.map((item, idx) => (
            <a
              key={`${item}-${idx}`}
              className="list-item"
              onClick={() => handleSelect(item)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
