import { Router, Request, Response } from "express";
import { GetUsersController } from "../controllers/get-users/get-users";
import { MongoGetUsersRepository } from "../repositories/get-users/mongo-get-users";
import { MongoCreateUserRepository } from "../repositories/create-user/mongo-create-user";
import { CreateUserController } from "../controllers/create-user/create-user";
import { MongoUpdateUserRepository } from "../repositories/update-user/mongo-update-user";
import { UpdateUserController } from "../controllers/update-user/update-user";
import { MongoDeleteUserRepository } from "../repositories/delete-user/mongo-delete-user";
import { DeleteUserController } from "../controllers/delete-user/delete-user";

const router = Router();

router.get("/", (request: Request, response: Response) => {
    return response.json({ mensagem: "Bem vindo!" });
  });

router.get("/users", async (req: Request, res: Response) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
});

router.post("/users", async (req: Request, res: Response) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
        mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
        body: req.body,
    });

    res.status(statusCode).send(body);
});

router.patch("/users/:id", async (req: Request, res: Response) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();

    const updateUserController = new UpdateUserController(
        mongoUpdateUserRepository
    );

    const { body, statusCode } = await updateUserController.handle({
        body: req.body,
        params: req.params,
    });

    res.status(statusCode).send(body);
});

router.delete("/users/:id", async (req: Request, res: Response) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();

    const deleteUserController = new DeleteUserController(
        mongoDeleteUserRepository
    );

    const { body, statusCode } = await deleteUserController.handle({
        params: req.params,
    });

    res.status(statusCode).send(body);
});

export { router };
