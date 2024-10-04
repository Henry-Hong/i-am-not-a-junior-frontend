/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSyncExternalStore } from "react";

interface IFilter<TypeItem> {
  values: string[];
  test: (item: TypeItem, values: string[]) => boolean;
}

class SubObjectClass<TypeItem> implements IFilter<TypeItem> {
  public values: any;
  public test: (item: TypeItem, values: string[]) => boolean;

  constructor(values: string[], test?: (...args: any) => boolean) {
    this.values = values;
    this.test = test ?? (() => true);
  }
}

class ObjectClass<TypeItem> {
  private initialObj: Record<string, string[]> = {};
  public obj: Record<string, string[]> = {};
  private methods: Record<string, () => void> = {};
  private tests: ((item: TypeItem, values: string[]) => boolean)[] = [];
  private listeners: (() => void)[] = [];

  constructor(combinedObj: Record<string, IFilter<TypeItem>>) {
    const extractedObj = Object.entries(combinedObj).reduce(
      (result, [name, subObj]) =>
        Object.assign({ [name]: subObj.values }, result),
      {}
    );
    this.obj = extractedObj;
    this.initialObj = extractedObj;
    this.methods = Object.entries(combinedObj).reduce(
      (result, [name, subObj]) =>
        Object.assign({ [name]: subObj.test }, result),
      {}
    );
    this.tests = Object.values(combinedObj).map((obj) => obj.test);
  }

  public update(key: string, newValues: any) {
    if (this.obj[key]) {
      this.obj = { ...this.obj, [key]: newValues };
      this.emitChange();
    }
  }

  public resets() {
    this.obj = this.initialObj;
    this.emitChange();
  }

  public runMethod(key: string) {
    if (this.methods[key]) {
      this.methods[key]();
    }
  }

  public echo() {
    console.log(this.obj);
  }

  public subsribe(listener: () => void) {
    this.listeners = [...this.listeners, listener];
    return () => {
      this.listeners = this.listeners.filter((l) => l != listener);
    };
  }

  public emitChange() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  public getTests() {
    return this.tests;
  }
}

const subObj1 = new SubObjectClass(["1", "2", "3"]);
const subObj2 = new SubObjectClass(["4", "5", "6"]);
const objStore = new ObjectClass({ subObj1, subObj2 });

export default function ExternalPage() {
  const obj = useSyncExternalStore(
    (cb) => objStore.subsribe(cb),
    () => objStore.obj
  );

  return (
    <div>
      <p>{JSON.stringify(obj)}</p>
      <button
        onClick={() => {
          objStore.update("subObj1", ["999999"]);
        }}
      >
        click
      </button>
      <button
        onClick={() => {
          objStore.resets();
        }}
      >
        reset
      </button>
      <button
        onClick={() => {
          objStore.runMethod("subObj1");
        }}
      >
        run method
      </button>
    </div>
  );
}
