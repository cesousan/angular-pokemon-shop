export interface Pokemon extends PokemonBase, Partial<PokemonDetail> {}

export interface PokemonBase {
  id: number;
  name: string;
  lastViewedAt: Date;
  price: number;
}

export interface PokemonDetail {
  imgURL: string;
  speciesName: string;
  formsNames: string[];
  baseXP: number;
  height: number;
  weight: number;
  stats: PokemonStat[];
}

export interface PokemonStat {
  name: string;
  base: number;
  effort: number;
}
