import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Topic } from "../../models/topic";
import { Comment } from "../../models/commen";
import { User } from "../../models/user";
import { TopicService } from "../../services/topic.service";
import { UserService } from "../../services/user.service";
import { CommentService } from "../../services/comment.service";
import { global } from "../../services/global";

@Component({
    selector: "app-topic-detail",
    templateUrl: "./topic-detail.component.html",
    styleUrls: ["./topic-detail.component.css"],
    providers: [TopicService, UserService, CommentService],
})
export class TopicDetailComponent implements OnInit {
    public topic: Topic;
    public comment: Comment;
    public identity;
    public token;
    public status;
    public url;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _topicService: TopicService,
        private _userService: UserService,
        private _commentService: CommentService,
    ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.comment = new Comment("", "", "", this.identity._id);
        this.url = global.url;
    }

    ngOnInit() {
        this.Topic();
        console.log(this.topic);
    }

    Topic() {
        this._route.params.subscribe((params) => {
            var id = params["id"];

            this._topicService.getTopic(id).subscribe(
                (response) => {
                    if (response.topic) {
                        this.topic = response.topic;
                    } else {
                        this._router.navigate(["/inicio"]);
                    }
                },
                (error) => {
                    console.log(error);
                },
            );
        });
    }

    onSubmit(form) {
        this._commentService.add(this.token, this.comment, this.topic._id).subscribe(
            (response) => {
                if (!response.topic) {
                    this.status = "Error";
                } else {
                    this.status = "Success";
                    this.topic = response.topic;
                    form.reset();
                }
            },
            (error) => {
                this.status = "Error";
                console.log(error);
            },
        );
    }

    deleteComment(id) {
        this._commentService.delete(this.token, this.topic._id, id).subscribe(
            (response) => {
                if (!response.topic) {
                    this.status = "Error";
                } else {
                    this.status = "Success";
                    this.topic = response.topic;
                }
            },
            (error) => {
                this.status = "Error";
                console.log(error);
            },
        );
    }
}
