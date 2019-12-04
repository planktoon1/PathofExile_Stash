export function isEmpty(obj: object): boolean {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function onlyUnique(value: any, index: number, self: any) {
  return self.indexOf(value) === index;
}

export function getRndInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

export function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}

export function mapObject(object: object, callback) {
  return Object.keys(object).map(function (key) {
    return callback(key, object[key]);
  });
}

export function scrollToElement(element: Element) {
  element.scrollIntoView(true);
}

export const notImplementedString: string =
  "This feature is not implemented yet";
