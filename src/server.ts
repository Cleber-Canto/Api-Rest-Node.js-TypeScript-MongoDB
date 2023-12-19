import { app } from "./app";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";

config();

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port} 🚀🚀🚀`);
});

const handleExit = () => {
  console.log("Servidor encerrado 🚨🚨🚨");
  server.close(() => {
    process.exit(0);
  });
};

// Lida com sinais de encerramento do processo
process.on("SIGINT", handleExit);

(async () => {
  try {
    await MongoClient.connect();
    console.log(`Conectado ao MongoDB 🍃`);
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    handleExit(); // Encerra o servidor em caso de erro na conexão
  }
})();
