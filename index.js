const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

//Conexão com o banco de dados
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mundohp",
  password: "ds564",
  port: 7007,
});

app.use(express.json());

let casaHogwarts = ["Grifinória", "Sonserina", "Corvinal", "Lufa-Lufa"];
let tipoSangue = ["Puro", "Mestiço", "Trouxa"];

//Rota teste
app.get("/", (req, res) => {
  res.send("A rota está funcionando");
});

//pegar todos os bruxos
app.get("/bruxos", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM bruxos");
    res.json({
      total: resultado.rowCount,
      usuarios: resultado.rows,
    });
  } catch (error) {
    console.error("Erro ao ter todos os bruxos", error);
    res.status(500).send("Erro ao obter os bruxos");
  }
});

//pegar todos as varinhas
app.get("/varinhas", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM varinhas");
    res.json({
      total: resultado.rowCount,
      usuarios: resultado.rows,
    });
  } catch (error) {
    console.error("Erro ao ter todas as varinhas", error);
    res.status(500).send("Erro ao obter as varinhas");
  }
});

//Rota que insere bruxos
app.post("/bruxos", async (req, res) => {
  try {
    const { nome, idade, casa, habilidade, status_sangue, patrono } = req.body;
    await pool.query(
      "INSERT INTO bruxos (nome, idade, casa, habilidade, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)",
      [nome, idade, casa, habilidade, status_sangue, patrono]
    );
    res.status(201).send({ mensagem: "Bruxo criado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar o bruxo", error);
    res.status(500).send("Erro ao criar o bruxo");
  }
});

//Rota que insere varinhas
app.post("/varinhas", async (req, res) => {
  try {
    const { material, comprimento, nucleo, data_fabricacao } = req.body;
    await pool.query(
      "INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4)",
      [material, comprimento, nucleo, data_fabricacao]
    );
    res.status(201).send({ mensagem: "Varinha criada com sucesso" });
  } catch (error) {
    console.error("Erro ao criar a varinha", error);
    res.status(500).send("Erro ao criar a varinha");
  }
});

//Rota que deleta bruxos
app.delete("/bruxos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM bruxos WHERE id = $1", [id]);
    res.status(200).send({ mensagem: "Bruxo deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao apagar o bruxo", error);
    res.status(500).send("Erro ao apagar o bruxo");
  }
});

//Rota que deleta varinhas
app.delete("/varinhas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM varinhas WHERE id = $1", [id]);
    res.status(200).send({ mensagem: "Varinha deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao apagar a varinha", error);
    res.status(500).send("Erro ao apagar a varinha");
  }
});

//Rota que atualiza bruxos
app.put("/bruxos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, casa, habilidade, status_sangue, patrono } = req.body;
    await pool.query(
      "UPDATE bruxos SET nome = $1, idade = $2, casa = $3, habilidade = $4, status_sangue = $5, patrono = $6 WHERE id = $7",
      [nome, idade, casa, habilidade, status_sangue, patrono, id]
    );
    res.status(200).send({ mensagem: "Bruxo atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar o bruxo", error);
    res.status(500).send("Erro ao atualizar o bruxo");
  }
});

//Rota que atualiza varinhas
app.put("/varinhas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { material, comprimento, nucleo, data_fabricacao } = req.body;
    await pool.query(
      "UPDATE varinhas SET material = $1, comprimento = $2, nucleo = $3, data_fabricacao = $4 WHERE id = $5",
      [material, comprimento, nucleo, data_fabricacao, id]
    );
    res.status(200).send({ mensagem: "Varinha atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar a varinha", error);
    res.status(500).send("Erro ao atualizar a varinha");
  }
});

//Get bruxo pelo id
app.get("/bruxos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query("SELECT * FROM bruxos WHERE id = $1", [
      id,
    ]);
    if (resultado.rowCount === 0) {
      res.status(404).send({ mensagem: "ID não encontrado" });
    } else {
      res.json(resultado.rows[0]);
    }
  } catch (error) {
    console.error("Erro ao obter bruxo por ID:", error);
    res.status(500).send("Erro ao obter bruxo por ID");
  }
});

//Get varinha pelo id
app.get("/varinhas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query("SELECT * FROM varinhas WHERE id = $1", [
      id,
    ]);
    if (resultado.rowCount === 0) {
      res.status(404).send({ mensagem: "ID não encontrado" });
    } else {
      res.json(resultado.rows[0]);
    }
  } catch (error) {
    console.error("Erro ao obter a varinha por ID:", error);
    res.status(500).send("Erro ao obter a varinha por ID");
  }
});

//Iniciar o servidor-final do código
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
