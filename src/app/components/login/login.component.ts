import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { Router, Params, ActivatedRoute } from "@angular/router";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    providers: [UserService],
})
export class LoginComponent implements OnInit {
    public page_title: string;
    public user: User;
    public status: string;
    public identity;
    public token;
    public message;

    constructor(
        private _userService: UserService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {
        this.page_title = "Identificate";
        this.user = new User("", "", "", "", "", "", "ROLE_USER");
    }

    ngOnInit() {}

    onSubmit(form) {
        //Conseguir objeto completo del usuario logueado
        this._userService.signup(this.user).subscribe(
            (response) => {
                if (response.user && response.user._id) {
                    //Guardamos el usuario en una propiedad
                    this.identity = response.user;
                    localStorage.setItem("identity", JSON.stringify(this.identity));

                    //Conseguir el token del usuario identificado
                    this._userService.signup(this.user, true).subscribe(
                        (response) => {
                            if (response.token) {
                                //Guardar token del usuario en una propiedad
                                this.token = response.token;
                                localStorage.setItem("token", this.token);
                                this.status = "Success";
                                this._router.navigate(["inicio"]);
                            } else {
                                this.status = "Error";
                            }
                        },
                        (error) => {
                            this.status = "Error";
                            console.log(error);
                        },
                    );
                } else {
                    this.status = "Error";
                }
            },
            (error) => {
                this.status = "Error";
                this.message = error.error.message;
                console.log(error);
            },
        );
    }
}
