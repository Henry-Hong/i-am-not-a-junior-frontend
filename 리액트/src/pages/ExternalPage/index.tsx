/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSyncExternalStore } from "react";

interface ISubObject {
  values: string[];
  test: () => void;
}

class SubObjectClass implements ISubObject {
  public values: any;

  constructor(values: string[]) {
    this.values = values;
  }

  test() {
    alert("hello");
  }
}

class ObjectClass {
  private initialObj: Record<string, string[]> = {};
  public obj: Record<string, string[]> = {};
  private methods: Record<string, () => void> = {};
  private tests: (() => void)[] = [];
  private listeners: (() => void)[] = [];

  constructor(combinedObj: Record<string, ISubObject>) {
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

      <button
        onClick={() => {
          objStore.getTests().forEach((test) => test());
        }}
      >
        run all tests
      </button>
    </div>
  );
}
