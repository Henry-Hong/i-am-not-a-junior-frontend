import {
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useSyncExternalStore,
} from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IFilter<TypeItem, TypeValues> {
  values: TypeValues;
  test: (item: TypeItem, values: TypeValues) => boolean;
}

export class Filter<TypeItem, TypeValues>
  implements IFilter<TypeItem, TypeValues>
{
  private listeners: (() => void)[] = [];
  public values: TypeValues;
  public test: (item: TypeItem, values: TypeValues) => boolean;
  private initValues: TypeValues;

  constructor({
    values,
    test,
  }: {
    values: TypeValues;
    test: (item: TypeItem, values: TypeValues) => boolean;
  }) {
    this.values = values;
    this.initValues = values;
    this.test = test;
  }

  // 상태 변경 메서드
  public setValue(newValue: TypeValues) {
    this.values = newValue;
    this.emitChange();
  }

  // 초기 상태로 리셋하는 메서드
  public reset() {
    this.values = this.initValues;
    this.emitChange();
  }

  // 상태를 구독할 수 있게 하는 메서드
  public subscribe(listener: () => void) {
    this.listeners = [...this.listeners, listener];
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private emitChange() {
    console.log("filter", this.values, "listener", this.listeners);
    this.listeners.forEach((listener) => listener());
  }
}

type TypeFilterName = string;

class CombinedFilter {
  private filters: Record<TypeFilterName, Filter<any, any>>;
  private listeners: (() => void)[] = [];

  constructor(filters: Record<TypeFilterName, Filter<any, any>>) {
    this.filters = filters;

    // 각 필터의 상태 변화를 구독
    Object.values(filters).forEach((filter) =>
      filter.subscribe(() => this.emitChange())
    );
  }

  public getValue() {
    return Object.fromEntries(
      Object.entries(this.filters).map(([name, filter]) => [
        name,
        filter.values,
      ])
    );
  }

  public getTests() {
    return Object.fromEntries(
      Object.entries(this.filters).map(([name, filter]) => [name, filter.test])
    );
  }

  public subscribe(listener: () => void) {
    this.listeners = [...this.listeners, listener];
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private emitChange() {
    console.log("combined : did you call me?", this.listeners, this.getValue());
    this.listeners.forEach((listener) => listener());
  }
}

export const useFilter = <
  TypeItem,
  TypeFilterMap extends Record<string, InstanceType<typeof Filter>>
>({
  items,
  filterMap,
}: {
  items: TypeItem[];
  filterMap: TypeFilterMap;
}) => {
  const [filterStyle, toggleFilterStyle] = useReducer(
    (state) => (state === "AND" ? "OR" : "AND"),
    "AND"
  );

  const ref = useRef(new CombinedFilter(filterMap));

  const filter = ref.current;

  const snapshot = useMemo(() => ref.current.getValue(), []);

  const value = useSyncExternalStore(
    (cb) => ref.current.subscribe(cb),
    () => snapshot
  );

  const getItems = useCallback(() => {
    return items.filter((item) => {
      const method = filterStyle === "AND" ? "every" : "some";
      const filters = Object.values(filterMap);
      const hasNoFilter = filters.length === 0;
      return hasNoFilter
        ? true
        : Object.entries(filter.getTests())[method](([name, test]) =>
            test(item, value[name])
          );
    });
  }, [filter, filterMap, filterStyle, items, value]);

  return {
    rawItems: items,
    getItems,
    filterStyle,
    toggleFilterStyle,
  };
};
