const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mailer = require("../../modules/mailer");
const app = express();

const authConfig = require("../../config/auth");

const User = require("../models/user");

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.get("/alunosSalas/:codSala", async (req, res) => {
  const codSala = req.params.codSala;

  try {
    const users = await User.find({ codSala });

    res.json(users);
  } catch (err) {
    res.status(500).send({ message: "nao deu certo" });
  }
});

router.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "Este email já está sendo utilizado" });

    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (err) {
    return res.status(400).send({ error: "Falha no registro" });
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(400).send({ error: "Usuário não encontrado" });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: "Senha inválida" });

  user.password = undefined;

  res.send({
    user,
    token: generateToken({ id: user.id }),
  });
});

// Cria campo token no usuario
//manda token por email e tbm salva no usuario
// quando receber token do front verificar se token existe e permitir trocar senha.
router.post("/forgot_password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send({ error: "Usuário não encontrado" });

    const token = crypto.randomBytes(20).toString("hex");

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });
    mailer.sendMail(
      {
        to: email,
        from: "JaineSaconiSecundario@gmail.com",
        subject: "Token",
        text: token,
      },
      (err) => {
        if (err)
          return res
            .status(400)
            .send({ error: "Não foi possível restaurar a senha" });

        return res.send(token);
      }
    );
    console.log(token);
  } catch (err) {
    res
      .status(400)
      .send({ error: "Erro na recuperação de senha, tente novamente" });
  }
});

router.post("/reset_password", async (req, res) => {
  const { email, token, newPassord } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email }).select(
      "+passswordResetToken passwordResetExpires"
    );

    if (!user) return res.status(400).send({ error: "Usuário não encontrado" });

    if (token !== user.passwordResetToken)
      return res.status(400).send({ error: "Token inválido" });

    const now = new Date();

    if (now > user.passwordResetExpires)
      return res
        .status(400)
        .send({ error: "Token expirou, gere um novo token" });

    user.password = newPassord;
    console.log(user);

    user.save();
    res.send();
  } catch (err) {
    res
      .status(400)
      .send({ error: "Não foi possível resetar a senha, tente novamente" });
  }
});

router.patch("/update/:id", async (req, res) => {
  const _id = req.params.id;

  if (!_id) {
    res.json({ message: "sem id" });
  }
  try {
    const updateUser = await User.updateOne(
      { _id: req.params.id },
      { codSala: req.body.codSala }
    );

    res.send(updateUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById({ _id });

    res.json(user);
  } catch (err) {
    res.status(500).send({ message: "nao deu certo" });
  }
});
module.exports = (app) => app.use("/auth", router);
