// eslint-disable-next-line @typescript-eslint/no-empty-function -- comment
const proxy = () => {};

/**
 * Used in place of `new Proxy` where each handler will map 1 level deep to another value.
 *
 * @internal
 */
export const createFlatProxy = <TFaux>(
  callback: (path: keyof TFaux & string) => TFaux[keyof TFaux & string]
): TFaux => {
  return new Proxy(proxy, {
    get(_obj, name) {
      if (typeof name !== "string" || name === "then") {
        // special case for if the proxy is accidentally treated
        // like a PromiseLike (like in `Promise.resolve(proxy)`)
        return undefined;
      }
      return callback(name as keyof TFaux & string);
    },
  }) as TFaux;
};
