import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AbilitiesComponent } from './character/abilities/abilities.component';
import { InventoryComponent } from './character/inventory/inventory.component';
import { SpellsComponent } from './character/spells/spells.component';
import { FeatsComponent } from './character/feats/feats.component';
import { SpecialAbilitiesComponent } from './character/special-abilities/special-abilities.component';
import { WeaponsComponent } from './character/weapons/weapons.component';
import { ArmorComponent } from './character/armor/armor.component';
import { SkillsComponent } from './character/skills/skills.component';
import { SavingThrowsComponent } from './character/saving-throws/saving-throws.component';
import { CharacterSheetNewComponent } from './character-sheet-new/character-sheet-new.component';
import {JwtInterceptor} from "./authorization/jwt-interceptor.interceptor";
import { LoginComponent } from './login/login.component';
import {JWTTokenService} from "./authorization/jwttoken.service";
import { LogoutComponent } from './logout/logout.component';
import { ScrollToDirective } from './scroll-to.directive';
import { AutoFocusDirective } from './auto-focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AbilitiesComponent,
    InventoryComponent,
    SpellsComponent,
    FeatsComponent,
    SpecialAbilitiesComponent,
    WeaponsComponent,
    ArmorComponent,
    SkillsComponent,
    SavingThrowsComponent,
    CharacterSheetNewComponent,
    LoginComponent,
    LogoutComponent,
    ScrollToDirective,
    AutoFocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})


export class AppModule {}
