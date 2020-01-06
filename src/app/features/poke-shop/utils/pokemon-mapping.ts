import { numberToString, getConstantPriceFromStr } from "src/app/shared/utils";

import { PokemonItem, PokemonDetail, Pokemon, PokemonStat } from "../models";
import {
  PokemonAPI,
  NameUrlIdentifier,
  PokeAPIStat,
  PokeAPIType
} from "../models/poke-api.model";

export function fromBackendModel(be: PokemonAPI): Pokemon {
  if (!be || (!be.id && !be.name)) {
    return null;
  }

  const {
    id,
    name,
    species = {} as NameUrlIdentifier,
    sprites = {},
    stats: _stats = [],
    weight = null,
    height = null,
    base_experience: baseXP = null,
    forms = [],
    types: _types = []
  } = be;
  const price = getConstantPriceFromStr(name);
  const speciesName = species.name || null;
  const imgURL = sprites["front_default"] || null;
  const stats = mapPokemonStats(_stats);
  const types = mapPokemonTypes(_types);
  const formsNames = forms
    .filter(form => !!form && form.name)
    .map(form => form.name);
  return {
    id,
    name,
    lastViewedAt: new Date(),
    price,
    speciesName,
    imgURL,
    weight,
    height,
    baseXP,
    formsNames,
    stats,
    types
  };
}

export function mapPokemonStats(stats: PokeAPIStat[]): PokemonStat[] {
  return !!stats && Array.isArray(stats)
    ? stats.map(({ base_stat: base, stat, effort }) => ({
        name: stat.name,
        base,
        effort
      }))
    : null;
}

export function mapPokemonTypes(types: PokeAPIType[]): string[] {
  const hasValidType = (val: PokeAPIType) =>
    !!val.type && !!val.type.name && typeof val.type.name === "string";
  const hasValidSlot = (val: PokeAPIType) =>
    !!val.slot && Number.isInteger(val.slot);
  const isProperTypeObject = (val: PokeAPIType): boolean =>
    !!val && hasValidType(val) && hasValidSlot(val);
  return !!types && Array.isArray(types)
    ? types
        .filter(isProperTypeObject)
        .sort((a, b) => a.slot - b.slot)
        .map(({ type }) => type.name)
    : null;
}

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
    stats: _stats = [],
    types = null
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
    stats: stats as any,
    types
  };
}
