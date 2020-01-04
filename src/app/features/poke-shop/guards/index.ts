import { PokemonsGuard } from "./pokemons.guard";
import { PokemonDetailGuard } from "./pokemon-detail.guard";

export const guards = [PokemonsGuard, PokemonDetailGuard];

export * from "./pokemons.guard";
export * from "./pokemon-detail.guard";
