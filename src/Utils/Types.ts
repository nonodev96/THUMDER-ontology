import ACLMessage from "../_Core/ACLMessage";

export type TaskContainer = {
  taskName: string;
  status: "ok" | "error";
  message: ACLMessage | null;
};

/**
 * https://docs.microsoft.com/es-es/cpp/cpp/data-type-ranges?view=msvc-160
 */

export class Int8 {
  private _value: number = 0;

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    if (newValue < -128 || newValue > 127 || Math.round(newValue) !== newValue)
      throw new Error("Range error");
    this._value = newValue;
  }
}

export class UInt8 {
  private _value: number = 0;

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    if (newValue < 0 || newValue > 255 || Math.round(newValue) !== newValue)
      throw new Error("Range error");
    this._value = newValue;
  }
}

export class Int16 {
  private _value: number = 0;

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    if (
      newValue < -32768 ||
      newValue > 32767 ||
      Math.round(newValue) !== newValue
    )
      throw new Error("Range error");
    this._value = newValue;
  }
}

export class UInt16 {
  private _value: number = 0;

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    if (newValue < 0 || newValue > 65535 || Math.round(newValue) !== newValue)
      throw new Error("Range error");
    this._value = newValue;
  }
}

export class Int32 {
  private _value: number = 0;

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    if (
      newValue < -2147483648 ||
      newValue > 2147483647 ||
      Math.round(newValue) !== newValue
    )
      throw new Error("Range error");
    this._value = newValue;
  }
}

export class UInt32 {
  private _value: number = 0;

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    if (
      newValue < 0 ||
      newValue > 4294967295 ||
      Math.round(newValue) !== newValue
    )
      throw new Error("Range error");
    this._value = newValue;
  }
}

export class Int64 {
  private _value: number = 0;

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    if (
      newValue < -9223372036854775808 ||
      newValue > 9223372036854775807 ||
      Math.round(newValue) !== newValue
    )
      throw new Error("Range error");
    this._value = newValue;
  }
}

export class UInt64 {
  private _value: number = 0;

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    if (
      newValue < 0 ||
      newValue > 18446744073709551615 ||
      Math.round(newValue) !== newValue
    )
      throw new Error("Range error");
    this._value = newValue;
  }
}

export class Short {
  private _value: number = 0;

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    if (
      newValue < -32768 ||
      newValue > 32767 ||
      Math.round(newValue) !== newValue
    )
      throw new Error("Range error");
    this._value = newValue;
  }
}

export class UShort {
  private _value: number = 0;

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    if (newValue < 0 || newValue > 65535 || Math.round(newValue) !== newValue)
      throw new Error("Range error");
    this._value = newValue;
  }
}

export class Float32 {
  private _value: number = 0;

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    if (
      newValue < -3.4e38 ||
      newValue > +3.4e38 ||
      Math.round(newValue) !== newValue
    )
      throw new Error("Range error");
    this._value = newValue;
  }
}

export class Double64 {
  private _value: number = 0;

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    if (
      newValue < -1.7e308 ||
      newValue > +1.7e308 ||
      Math.round(newValue) !== newValue
    )
      throw new Error("Range error");
    this._value = newValue;
  }
}
