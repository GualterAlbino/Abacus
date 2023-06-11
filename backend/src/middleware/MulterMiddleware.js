const express = require("express");
const upload = require("../config/MulterConfig"); // importe a configuração do Multer

const router = express.Router();

router.post("/produto", upload.single("imagem"), (req, res) => {
  // O middleware "upload.single" processa o upload de um único arquivo com o nome "imagem"
  // O arquivo enviado estará disponível em "req.file"
  // Outros campos enviados junto com o arquivo estarão disponíveis em "req.body"

  // Processar os dados do produto, incluindo a imagem, se estiver presente

  res.status(200).send("Produto adicionado com sucesso.");
});

module.exports = router;
