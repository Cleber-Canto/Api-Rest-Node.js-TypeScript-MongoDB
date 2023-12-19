import { User } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        console.error("Bad Request: Missing fields.");
        return badRequest("Missing fields.");
      }

      if (!id) {
        console.error("Bad Request: Missing user id");
        return badRequest("Missing user id");
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        console.error("Bad Request: Some received field is not allowed");
        console.error("Received fields:", body);
        console.error("Allowed fields:", allowedFieldsToUpdate);
        return badRequest("Some received field is not allowed");
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      console.log("User updated successfully:", user);
      return ok<User>(user);
    } catch (error) {
      console.error("Server Error:", error);
      return serverError();
    }
  }
}
