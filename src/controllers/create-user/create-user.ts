import validator from "validator";
import { User } from "../../models/user";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          const errorMessage = `Bad Request: Field ${field} is required`;
          console.error(errorMessage);
          return badRequest(errorMessage);
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        const errorMessage = "Bad Request: E-mail is invalid";
        console.error(errorMessage);
        return badRequest(errorMessage);
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      console.log("User created successfully:", user);
      return created<User>(user);
    } catch (error) {
      const errorMessage = "Server Error:";
      console.error(errorMessage, error);
      return serverError();
    }
  }
}
