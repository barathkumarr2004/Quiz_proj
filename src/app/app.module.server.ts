import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
  ],
  imports: [
    AppModule, 
    ServerModule,
    AppRoutingModule
  ],
  providers: [
    // Provide any services needed for server-side rendering
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
