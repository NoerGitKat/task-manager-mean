import { Injectable } from "@angular/core";
import { WebRequestService } from "./web-request.service";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private webReqService: WebRequestService) {}

  createList(title: string) {
    // Send HTTP request to create new list
    return this.webReqService.post("api/lists", { title });
  }

  getTasksByListId(listId: string) {
    return this.webReqService.get(`api/lists/${listId}/tasks`);
  }

  getLists() {
    return this.webReqService.get("api/lists");
  }
}
