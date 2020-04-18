import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Topic } from "../../../models/topic";
import { UserService } from "../../../services/user.service";
import { TopicService } from "../../../services/topic.service";

@Component({
    selector: "app-add",
    templateUrl: "./add.component.html",
    styleUrls: ["./add.component.css"],
    providers: [UserService, TopicService],
})
export class AddComponent implements OnInit {
    public page_title: string;
    public topic: Topic;
    public identity;
    public token;
    public status;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _topicService: TopicService,
    ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.page_title = "Crear nuevo tema";
        this.topic = new Topic("", "", "", "", "", "", this.identity._id, null);
    }

    ngOnInit() {}

    onSubmit(form) {
        this._topicService.addTopic(this.token, this.topic).subscribe(
            (response) => {
                if (response.topic) {
                    this.status = "Success";
                    this.topic = response.topic;
                    this._router.navigate(["/panel"]);
                } else {
                    this.status = "Error";
                }
            },
            (error) => {
                this.status = "Error";
                console.log(error);
            },
        );
    }
}
