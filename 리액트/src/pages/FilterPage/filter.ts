/* eslint-disable @typescript-eslint/no-explicit-any */

export type TypeFilter<T> = {
  checkData: (data: T) => boolean;
  addValue?: (value: any) => void;
  removeValue?: (value: any) => void;
  setValues?: (values: any[]) => void;
  resetValues?: () => void;
  addCallback?: (cb: (...params: any) => void) => void;
};

export class Filter<T extends [keyof any, ...any[keyof any][]]>
  implements TypeFilter<any>
{
  public values: T[] = [];
  private initialValues: T[] = [];
  private method: "OR" | "AND";
  private updateState: () => void = () => {};
  private checkDataCb: (data: any, value: any) => boolean = () => true;

  constructor({
    method,
    values,
    checkDataCb,
  }: {
    method: "OR" | "AND";
    values: T[];
    checkDataCb: (data: any, value: [keyof any, ...any[]]) => boolean;
  }) {
    this.method = method;
    this.values = values;
    this.initialValues = values;
    this.checkDataCb = checkDataCb;
  }

  public checkData(data: any) {
    if (this.values.length === 0) return true;
    const method = this.method === "OR" ? "some" : "every" ?? "every";
    return this.values[method]((value) => {
      return this.checkDataCb(data, value);
    });
  }

  public addValue(value: T) {
    this.values.push(value);
    this.updateState();
  }

  public removeValue(value: T) {
    this.values.filter((v) => _.isEqual(v, value));
    this.updateState();
  }

  public setValues(_values: T[]) {
    this.values = _values;
    this.updateState();
  }

  public resetValues() {
    this.values = this.initialValues;
    this.updateState();
  }

  public addCallback(cb: () => void) {
    this.updateState = cb;
  }
}

// export const timeFilter = new Filter({
//   checkDataCb(data, value) {
//     const startTime = value[1];
//     const endTime = value[2];
//     const dataTime = data.timeStart
//       .split(" ")[1]
//       .split(":")
//       .splice(0, 2)
//       .join(":");
//     if (!startTime || !endTime) return true;
//     const format = "HH:mm";
//     const STANDARD_DATE = new Date();
//     const parsedDataTime = parse(dataTime, format, STANDARD_DATE);
//     const parsedStartTime = parse(startTime, format, STANDARD_DATE);
//     const parsedEndTime = parse(endTime, format, STANDARD_DATE);
//     return (
//       isEqualOrAfter(parsedDataTime, parsedStartTime) &&
//       isEqualOrBefore(dataTime, parsedEndTime)
//     );
//   },
//   method: "OR",
//   values: [["date", "", ""]],
// });
