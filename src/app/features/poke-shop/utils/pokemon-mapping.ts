import { PokemonItem, PokemonDetail } from "../models";

import { numberToString } from "src/app/shared/utils";

export function getPokemonDetail(
  pokemon: PokemonItem = {} as PokemonItem
): PokemonDetail {
  if (!pokemon) {
    return null;
  }
  const {
    imgURL = null,
    speciesName = null,
    formsNames = [],
    baseXP = null,
    height = null,
    weight = null,
    stats: _stats = []
  } = pokemon;

  const stats = _stats.map(stat => ({
    ...stat,
    effort: numberToString(stat.effort),
    base: numberToString(stat.base)
  }));

  return {
    imgURL,
    speciesName,
    formsNames,
    baseXP: numberToString(baseXP),
    height: numberToString(height),
    weight: numberToString(weight) || null,
    stats: stats as any
  };
}
