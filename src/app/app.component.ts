import { Component, OnInit, DoCheck } from "@angular/core"; //El on init se importa, es una interface
import { UserService } from "./services/user.service";
import { Router, Params, ActivatedRoute } from "@angular/router";
import { global } from "./services/global";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    providers: [UserService],
})
//Al final el onInit y el do check son un hook. El do check actualiza el componente cada vez que hay un cambio
export class AppComponent implements OnInit, DoCheck {
    public title = "Foro en Angular";
    public identity;
    public token;
    public url;
    public search;

    constructor(
        private _userService: UserService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = global.url;
    }

    ngOnInit() {
        console.log(this.identity);
        console.log(this.token);
    }

    ngDoCheck() {
        this.identity = this._userService.getIdentity();
    }

    logout() {
        localStorage.clear();
        this.identity = null;
        this.token = null;
        this._router.navigate(["/inicio"]);
    }

    goSearch() {
        this._router.navigate(["/buscar", this.search]);
    }
}
