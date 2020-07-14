import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from "./modules/login/login.component";
import {SharedModule} from "./shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NotFoundComponent} from "./shared/components/notFound/notFound.component";
import {HomeComponent} from "./modules/home/home.component";
import {GameControlComponent} from "./shared/components/gameControl/gameControl.component";


const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '', pathMatch: 'full', redirectTo: '/home'},
    {
        path: 'competitions',
        children: [{
            'path': '',
            loadChildren: () => import('./modules/competitions/competitions.module').then(m => m.CompetitionsModule)
        }]
    },
    {
        path: 'teams',
        children: [{
            'path': '',
            loadChildren: () => import('./modules/teams/teams.module').then(m => m.TeamsModule)
        }]
    },
    {
        path: 'players',
        children: [{
            'path': '',
            loadChildren: () => import('./modules/players/players.module').then(m => m.PlayersModule)
        }]
    },
    {path: 'login', component: LoginComponent},
    {path: 'notFound', component: NotFoundComponent},
    {path: 'gameControl', component: GameControlComponent},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [SharedModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [
        LoginComponent,
    ]
})
export class AppRoutingModule {
}