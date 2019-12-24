export function arrayToEntities<T>(
  collection: T[],
  propKey: string = "id"
): EntitiesObject<T> {
  return !!collection && Array.isArray(collection)
    ? collection
        .filter(poke => !!poke[propKey])
        .reduce(
          (acc, curr) => ({
            ...acc,
            [curr[propKey]]: curr
          }),
          {}
        )
    : {};
}

export function entitiesToArray<T>(entities: EntitiesObject<T>): T[] {
  return !!entities && typeof entities === "object"
    ? Object.keys(entities).map(key => entities[key])
    : [];
}

export interface EntitiesObject<T> {
  [keyId: string]: T;
}
