import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/task.service";

@Component({
  selector: "app-task-view",
  templateUrl: "./task-view.component.html",
  styleUrls: ["./task-view.component.scss"],
})
export class TaskViewComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  createNewList(title: string) {
    this.taskService.createList("new list test").subscribe((response: any) => {
      console.log("the response is...", response);
    });
  }
}
