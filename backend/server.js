require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());

// Configuração robusta do CORS
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      "http://localhost:5173" // Apenas para desenvolvimento
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(helmet());

// Limitação de requisições
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Muitas requisições. Tente novamente mais tarde.",
});
app.use(limiter);

// Configuração do banco de dados (APENAS variáveis de ambiente)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

// Verificação de conexão com o banco de dados
db.getConnection((err, connection) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados MySQL!");
    connection.release();
  }
});

// Configuração do nodemailer (APENAS variáveis de ambiente)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

// Middleware para verificar token JWT
const verifyToken = (allowedTypes) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token não fornecido." });
  
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token mal formatado." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (allowedTypes && !allowedTypes.includes(decoded.tipo)) {
      return res.status(403).json({ message: "Acesso negado. Tipo de usuário não permitido." });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
};

// Login de usuário
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const [rows] = await db.promise().query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ error: "Credenciais inválidas." }); // Mensagem genérica por segurança
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Credenciais inválidas." }); // Mesma mensagem por segurança
    }

    const token = jwt.sign(
      { id: user.id, nome: user.nome, tipo: user.tipo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login bem-sucedido",
      nome: user.nome,
      tipo: user.tipo,
      token,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Cadastro de usuário
app.post("/signup", async (req, res) => {
  try {
    let { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }
    
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "E-mail inválido." });
    }
    
    if (senha.length < 8) {
      return res.status(400).json({ message: "A senha deve ter pelo menos 8 caracteres." });
    }

    const [rows] = await db.promise().query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "E-mail já cadastrado." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    await db.promise().query(
      "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)", 
      [nome, email, senhaHash, tipo]
    );
    
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// Esqueci minha senha
app.post("/esqueci-senha", async (req, res) => {
  try {
    const { email } = req.body;
    const [rows] = await db.promise().query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(200).json({ message: "Se o e-mail existir, você receberá um link de redefinição." }); // Mensagem genérica por segurança
    }

    const token = crypto.randomBytes(20).toString("hex");
    const dataExpiracao = new Date(Date.now() + 3600000);
    
    await db.promise().query(
      "INSERT INTO tokens_recuperacao (usuario_id, token, data_expiracao) VALUES (?, ?, ?)", 
      [rows[0].id, token, dataExpiracao]
    );

    const resetLink = `${process.env.FRONTEND_URL}/redefinir-senha?token=${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Redefinição de Senha",
      html: `<p>Clique no link para redefinir sua senha: <a href="${resetLink}">Redefinir Senha</a></p>`,
    });
    
    res.status(200).json({ message: "Se o e-mail existir, você receberá um link de redefinição." });
  } catch (error) {
    console.error("Erro no esqueci-senha:", error);
    res.status(500).json({ message: "Erro ao processar a solicitação." });
  }
});

// Rota protegida para desenvolvedores
app.get("/rota-restrita", verifyToken(["desenvolvedor"]), (req, res) => {
  res.status(200).json({ message: `Bem-vindo, ${req.user.nome}!` });
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error("Erro:", err.stack);
  res.status(500).json({ message: "Erro interno do servidor." });
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));