import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./features/home/home.component";

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "pokemons",
    loadChildren: () =>
      import("./features/poke-shop/poke-shop.module").then(
        mod => mod.PokeShopModule
      )
  },
  {
    path: "orders",
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
