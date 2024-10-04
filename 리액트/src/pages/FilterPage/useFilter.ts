import { useCallback, useMemo, useReducer, useSyncExternalStore } from "react";

interface IFilter<TypeItem, TypeValues> {
  values: TypeValues;
  test: (item: TypeItem, values: TypeValues) => boolean;
}

/**
 * 이런 로직은 잘못되았음.
 * 클래스 문법을 사용할거면, 해당 클래스 내부에서 상태를 관리하는게 더 이치에 맞는것 같음.
 * 그러니까 이 Filter 클래스 내부에서 setValue랑 reset 등등이 관리되어야 한다는것임.
 */
export class Filter<TypeItem, TypeValues>
  implements IFilter<TypeItem, TypeValues>
{
  public values: TypeValues;
  public test: (item: TypeItem, values: TypeValues) => boolean;
  constructor({
    test,
    values,
  }: {
    values: TypeValues;
    test: (item: TypeItem, values: TypeValues) => boolean;
  }) {
    this.values = values;
    this.test = test;
  }
}

type TypeFilterName = string;

class CombinedFilter {
  private value: {
    [K in keyof Record<TypeFilterName, InstanceType<typeof Filter>>]: Record<
      TypeFilterName,
      InstanceType<typeof Filter>
    >[K]["values"];
  };
  private initValue: {
    [K in keyof Record<TypeFilterName, InstanceType<typeof Filter>>]: Record<
      TypeFilterName,
      InstanceType<typeof Filter>
    >[K]["values"];
  };
  private tests: {
    [K in keyof Record<TypeFilterName, InstanceType<typeof Filter>>]: Record<
      TypeFilterName,
      InstanceType<typeof Filter>
    >[K]["test"];
  };
  private listeners: (() => void)[] = [];

  constructor(filters: Record<TypeFilterName, InstanceType<typeof Filter>>) {
    const extractedValue = Object.entries(filters).reduce(
      (a, [name, filter]) => Object.assign({ [name]: filter.values }, a),
      {}
    );
    this.value = extractedValue;
    this.initValue = extractedValue;
    this.tests = Object.entries(filters).reduce(
      (a, [name, filter]) => Object.assign({ [name]: filter.test }, a),
      {}
    );
  }

  public getValue() {
    return this.value;
  }

  public getTests() {
    return this.tests;
  }

  public resetValue() {
    this.value = this.initValue;
    this.emitChange();
  }

  public setValue(
    name: TypeFilterName,
    newValue: {
      [K in keyof Record<TypeFilterName, InstanceType<typeof Filter>>]: Record<
        TypeFilterName,
        InstanceType<typeof Filter>
      >[K]["values"];
    }[TypeFilterName]
  ) {
    this.value = { ...this.value, [name]: newValue };
    this.emitChange();
  }

  public subscribe(listener: () => void) {
    this.listeners = [...this.listeners, listener];
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private emitChange() {
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

  const filter = useMemo(() => new CombinedFilter(filterMap), [filterMap]);

  const value = useSyncExternalStore(
    (cb) => filter.subscribe(cb),
    () => filter.getValue()
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
