import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/task.service";

@Component({
  selector: "app-new-list",
  templateUrl: "./new-list.component.html",
  styleUrls: ["./new-list.component.scss"],
})
export class NewListComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  createNewList(title: string) {
    this.taskService.createList(title).subscribe((response: any) => {
      alert("list is created!");
      console.log("the response is...", response);
      // Navigate to /lists/response._id
    });
  }
}
