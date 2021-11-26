export namespace Utils {
  export function isArray(obj: any) {
    return obj !== undefined && obj !== null && obj.constructor === Array;
  }

  export function isBoolean(obj: any) {
    return obj !== undefined && obj !== null && obj.constructor === Boolean;
  }

  export function isFunction(obj: any) {
    return obj !== undefined && obj !== null && obj.constructor === Function;
  }

  export function isNumber(obj: any) {
    return obj !== undefined && obj !== null && obj.constructor === Number;
  }

  export function isString(obj: any) {
    return obj !== undefined && obj !== null && obj.constructor === String;
  }

  export function isObject(obj: any) {
    return obj !== undefined && obj !== null && obj.constructor === Object;
  }

  export function isInstanced(obj: any) {
    if (obj === undefined || obj === null) {
      return false;
    }
    if (isArray(obj)) {
      return false;
    }
    if (isBoolean(obj)) {
      return false;
    }
    if (isFunction(obj)) {
      return false;
    }
    if (isNumber(obj)) {
      return false;
    }
    if (isObject(obj)) {
      return false;
    }
    if (isString(obj)) {
      return false;
    }

    return true;
  }

  export function enumKeys<O extends object, K extends keyof O = keyof O>(
    obj: O
  ): K[] {
    return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
  }

  export class Convert {
    static NumberToInt8(x: number): number {
      let r: number = 0;
      const n = this.NumberToUint8(x);
      if (n & 0x80) r = 0xffffff80 | (n & 0x7f);
      else r = n;
      return r;
    }

    static NumberToUint8(x: number): number {
      return this.NumberToUint32(x) & 0xff;
    }

    static NumberToInt16(x: number): number {
      let r: number = 0;
      const n = this.NumberToUint16(x);
      if (n & 0x8000) r = 0xffff8000 | (n & 0x7fff);
      else r = n;
      return r;
    }

    static NumberToUint16(x: number): number {
      return this.NumberToUint32(x) & 0xffff;
    }

    static NumberToInt32(x: number): number {
      return x >> 0;
    }

    static NumberToUint32(x: number): number {
      return x >>> 0;
    }

    static StrToNumber(_val: string, defaultVal: number = 0): number {
      let val = _val;
      let result: number = defaultVal;
      if (val == null) return result;
      if (val.length === 0) return result;
      val = val.trim();
      if (val.length === 0) return result;
      let sign: number = 1;
      //
      // . obtain sign from string, and place result in "sign" local varible. The Sign naturally defaults to positive
      //     1 for positive, -1 for negative.
      // . remove sign character from val.
      //      Note, before the function returns, the result is multiplied by the sign local variable to reflect the sign.
      // . error check for multiple sign characters
      // . error check to make sure sign character is at the head or tail of the string
      //
      {
        const positiveSignIndex = val.indexOf("+");
        const negativeSignIndex = val.indexOf("-");
        const nTailIndex = val.length - 1;
        //
        // make sure both negative and positive signs are not in the string
        //
        if (positiveSignIndex !== -1 && negativeSignIndex !== -1) return result;
        //
        // handle postive sign
        //
        if (positiveSignIndex !== -1) {
          //
          // make sure there is only one sign character
          //
          if (positiveSignIndex !== val.lastIndexOf("+")) return result;
          //
          // make sure the sign is at the head or tail
          //
          if (positiveSignIndex > 0 && positiveSignIndex < nTailIndex)
            return result;
          //
          // remove sign from string
          //
          val = val.replace("+", "").trim();
        }
        //
        // handle negative sign
        //
        if (negativeSignIndex !== -1) {
          //
          // make sure there is only one sign character
          //
          if (negativeSignIndex !== val.lastIndexOf("-")) return result;
          //
          // make sure the sign is at the head or tail
          //
          if (negativeSignIndex > 0 && negativeSignIndex < nTailIndex)
            return result;
          //
          // remove sign from string
          //
          val = val.replace("-", "").trim();
          sign = -1;
        }
        //
        // make sure text length is greater than 0
        //
        if (val.length === 0) return result;
      }
      //
      // convert string to a number
      //
      const r = +(<any>val);
      //
      // apply sign if no errors
      //
      if (r != null && !Number.isNaN(r)) {
        result = r * sign;
      }
      return result;
    }
  }
}
