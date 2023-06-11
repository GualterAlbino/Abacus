const multer = require("multer");

// Configuração do destino e nome do arquivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // diretório onde os arquivos enviados serão salvos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// Filtro de tipos de arquivo permitidos
const fileFilter = (req, file, cb) => {
  // Verifique o tipo de arquivo usando a extensão do arquivo ou o mimetype
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true); // aceitar o arquivo
  } else {
    cb(new Error("Tipo de arquivo inválido. Apenas arquivos JPEG, JPG e PNG são permitidos."), false); // rejeitar o arquivo
  }
};

// Configuração do Multer
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
