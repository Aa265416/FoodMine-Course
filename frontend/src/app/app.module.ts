import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/partials/header/header.component';
import { HomeComponent } from './component/pages/home/home.component';
import { SearchComponent } from './component/partials/search/search.component';
import { FoodPageComponent } from './component/pages/food-page/food-page.component';
import { TagsComponent } from './component/partials/tags/tags.component';
import { CartPageComponent } from './component/pages/cart-page/cart-page.component';
import { TitleComponent } from './component/partials/title/title.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    FoodPageComponent,
    TagsComponent,
    CartPageComponent,
    TitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
