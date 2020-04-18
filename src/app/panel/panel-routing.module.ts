import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserGuard } from "../services/user.guard";

//Componentes
import { MainComponent } from "./components/main/main.component";
import { AddComponent } from "./components/add/add.component";
import { EditComponent } from "./components/edit/edit.component";
import { ListComponent } from "./components/list/list.component";

const panelRoutes: Routes = [
    {
        path: "panel", //Ruta padre
        component: MainComponent,
        canActivate: [UserGuard], //Puede pasar cuando de true el guard
        children: [
            //Rutas hijas
            { path: "", component: ListComponent },
            { path: "listado", component: ListComponent },
            { path: "crear", component: AddComponent },
            { path: "editar/:id", component: EditComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(panelRoutes)],
    exports: [RouterModule],
})
export class PanelRoutingModule {}
