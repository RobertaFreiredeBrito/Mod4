const req = require("express/lib/request");

const getAll = async (req, res) => {
  const cadastro = await Cadastros.find();
  if (cadastro.length === 0) {
    res.send({ message: "Lista vazia" });
  }
  res.send({ cadastro });
};

const getById = async (req, res) => {
  const id = req.params.id;

  try {
    const cadastro = await Cadastros.findById(id);
    if (!cadastro) {
      res.status(404).json({ message: "Cadastro não encontrado" });
      return;
    }
    res.send({ cadastro });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const create = async (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    res.status(400).send({
      message: "Você não enviou todos os dados para o cadastro",
    });
    return;
  }

  const novoCadastro = await new Cadastros({
    nome,
    email,
  });

  try {
    await novoCadastro.save();
    return res
      .status(201)
      .send({ message: "Cadastro criado com sucesso", novoCadastro });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const update = async (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    res.status(400).send({
      message: "Você não enviou todos os dados para o cadastro",
    });
    return;
  }
  res.cliente.nome = nome;
  res.cliente.email = email;

  try {
    await res.cadastro.save();
    res.send({ message: "Dados atualizados com sucesso!!!" });
  } catch (err) {
    return res.status(500).send({ error: "Erro na criação de cadastro" });
  }
};

const del = async (req, res) => {
  try {
    await res.cadastro.remove();
    return res.send({ message: "Cadastro removido com sucesso" });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const filter = async (req, res) => {
  let { nome, email } = req.query;

  !nome ? (nome = "") : (nome = nome);
  !email ? (email = "") : (email = email);

  try {
    const cadastro = await Cadastros.find({
      nome: { $regex: `${nome}`, $options: "i" },
      email: { $regex: `${email}`, $options: "i" },
    });
    if (cadastro.length === 0) {
      return res.status(404).send({ error: "Cadastro não encontrado" });
    }
    res.send({ cadastro });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
  filter,
};
