import { Component, OnInit } from "@angular/core";
import { Router, Params, ActivatedRoute } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { global } from "../../services/global";

@Component({
    selector: "app-user-edit",
    templateUrl: "./user-edit.component.html",
    styleUrls: ["./user-edit.component.css"],
    providers: [UserService],
})
export class UserEditComponent implements OnInit {
    public page_title: string;
    public user: User;
    public identity;
    public token;
    public status;
    public afuConfig;
    public url;

    constructor(
        private _userService: UserService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {
        this.page_title = "Actualizar ajustes de usuario";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
        this.url = global.url;
        this.afuConfig = {
            multiple: false, //No se podran subir multiples archivos
            formatsAllowed: ".jpg, .jpeg, .png, .gif",
            maxSize: "50",
            uploadAPI: {
                //La ruta a la cual se subira el archivo
                url: this.url + "upload-avatar",
                headers: {
                    Authorization: this.token,
                },
            },
            theme: "attachPin",
            hideProgressBar: false,
            hideResetBtn: true,
            hideSelectBtn: false,
            replaceTexts: {
                selectFileBtn: "Select Files",
                resetBtn: "Reset",
                uploadBtn: "Upload",
                dragNDropBox: "Drag N Drop",
                attachPinBtn: "Sube tu foto",
                afterUploadMsg_success: "Successfully Uploaded !",
                afterUploadMsg_error: "Upload Failed !",
            },
        };
    }

    avatarUpload(data) {
        let data_obj = JSON.parse(data.response);
        this.user.image = data_obj.user.image;
        console.log(this.user);
    }

    ngOnInit() {}

    onSubmit() {
        this._userService.update(this.user).subscribe(
            (response) => {
                if (!response.user) {
                    this.status = "Error";
                } else {
                    this.status = "Success";
                    localStorage.setItem("identity", JSON.stringify(this.user));
                }
            },
            (error) => {
                this.status = "Error";
                console.log(error);
            },
        );
    }
}
