import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { routing, appRoutingProviders } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { MomentModule } from "angular2-moment";
import { NgxHighlightJsModule } from "@nowzoo/ngx-highlight-js";

import { PanelModule } from "./panel/panel.module";
import { UserService } from "./services/user.service"; //Se importa el service porque el guard lo necesita
import { UserGuard } from "./services/user.guard";
import { NoIdentityGuard } from "./services/no.identity.guard";

import { AppComponent } from "./app.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { HttpClient } from "@angular/common/http";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { TopicsComponent } from "./components/topics/topics.component";
import { TopicDetailComponent } from "./components/topic-detail/topic-detail.component";
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
    declarations: [
        //Aca se cargan componentes
        AppComponent,
        RegisterComponent,
        LoginComponent,
        HomeComponent,
        UserEditComponent,
        TopicsComponent,
        TopicDetailComponent,
        UsersComponent,
        ProfileComponent,
        SearchComponent,
    ],
    imports: [
        //Aca se cargan los modulos
        BrowserModule,
        routing,
        FormsModule,
        HttpClientModule,
        AngularFileUploaderModule,
        PanelModule,
        MomentModule,
        NgxHighlightJsModule.forRoot(),
    ],
    providers: [appRoutingProviders, UserGuard, UserService, NoIdentityGuard], //Aca se cargan los servicios
    bootstrap: [AppComponent],
})
export class AppModule {}
