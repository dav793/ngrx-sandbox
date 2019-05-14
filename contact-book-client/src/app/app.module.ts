import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material/material.module';

import { StateInterfaceService } from './store/state-interface.service';
import { WebSocketService } from './shared/ws.service';
import { WSInterfaceService } from './shared/ws-interface.service';
import { ContactService } from './contact/contact.service';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactViewComponent } from './contact/contact-view/contact-view.component';

import { ContactEffects } from './store/effects/contact.effects';
import { contactReducer } from './store/reducers/contact.reducer';
import { clientReducer } from './store/reducers/client.reducer';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
        client: clientReducer,
        contacts: contactReducer
    }),
    EffectsModule.forRoot([ContactEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,                       // Retains last 25 states
      logOnly: environment.production,  // Restrict extension to log-only mode in production
    }),
    ToastrModule.forRoot(),
    MaterialModule
  ],
  providers: [
    StateInterfaceService,
    WebSocketService,
    WSInterfaceService,
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
