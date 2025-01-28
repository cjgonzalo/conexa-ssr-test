import { PopulateOptions } from "mongoose";

// Se seleccionan solo algunos campos de cada coleccion a modo de ejemplo

export const peoplePopulation: PopulateOptions = {
  path: "characters",
  model: "people",
  localField: "characters",
  foreignField: "id",
  select: "name height mass hair_color skin_color birth_year gender"
}

export const planetsPopulation: PopulateOptions = {
  path: "planets",
  model: "planets",
  localField: "planets",
  foreignField: "id",
  select: "name rotation_period orbital_period diameter climate gravity terrain surface_water population"
}

export const speciesPopulation: PopulateOptions = {
  path: "species",
  model: "species",
  localField: "species",
  foreignField: "id",
  select: "name classification designation average_height skin_colors hair_colors eye_colors average_lifespan languaje"
}

export const starshipsPopulation: PopulateOptions = {
  path: "starships",
  model: "starships",
  localField: "starships",
  foreignField: "id",
  select: "name model manufacturer cost_in_credits lenght max_athmosphering_speed crew passengers cargo_capacity consumables hyperdrive_rating MGLT starship_class"
}

export const vehiclesPopulation: PopulateOptions = {
  path: "vehicles",
  model: "vehicles",
  localField: "vehicles",
  foreignField: "id",
  select: "name model manufacturer cost_in_credits lenght max_athmosphering_speed crew passengers cargo_capacity consumables vehicle_class"
}

// Se exporta un array de populations para no concatenar muchos .populate() en la query, también se exporta cada population por separado si se quisieran usar individualmente
export const allPopulations: PopulateOptions[] = [
  peoplePopulation,
  planetsPopulation,
  speciesPopulation,
  starshipsPopulation,
  vehiclesPopulation
]