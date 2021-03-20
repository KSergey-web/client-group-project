import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlayComponent } from './play/play.component';
import { RoomsComponent } from './rooms/rooms.component';

const routes: Routes = [
  { path: '', component: AuthComponent},
    { path: 'auth', component: AuthComponent},
    { path: 'rooms', component: RoomsComponent},
    { path: 'play/:id', component: PlayComponent},
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
