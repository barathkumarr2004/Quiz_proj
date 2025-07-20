import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './document/home/home.component';
import { AboutComponent } from './document/about/about.component';
import { QuizComponent } from './document/quiz/quiz.component';
import { ResultComponent } from './document/result/result.component';
import { GameComponent } from './document/game/game.component';
import { LoginComponent } from './document/login/login.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'result', component: ResultComponent },
  { path: 'game' , component: GameComponent },
  { path: 'login', component: LoginComponent },
  { path:'',redirectTo:'login',pathMatch:'full'},
  { path:'',redirectTo:'home',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
