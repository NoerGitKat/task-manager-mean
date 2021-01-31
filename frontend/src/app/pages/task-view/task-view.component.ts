import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { TaskService } from "src/app/task.service";

@Component({
  selector: "app-task-view",
  templateUrl: "./task-view.component.html",
  styleUrls: ["./task-view.component.scss"],
})
export class TaskViewComponent implements OnInit {
  lists: any[];
  tasks: any[];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.taskService
        .getTasksByListId(params.listId)
        .subscribe((tasks: any[]) => {
          console.log("tasks are what...", tasks);
          if (tasks.length > 0) {
            this.tasks = tasks;
          } else {
            this.tasks = [];
          }
        });
    });

    this.taskService.getLists().subscribe((lists: any[]) => {
      this.lists = lists;
    });
  }
}
