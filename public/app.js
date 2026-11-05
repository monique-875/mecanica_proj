let token = localStorage.getItem("token");

function elemento(id) {
  return document.getElementById(id);
}

async function api(caminho, metodo, dados) {
  const configuracao = {
    method: metodo || "GET",
    headers: { "Content-Type": "application/json" }
  };

  if (token) configuracao.headers.Authorization = "Bearer " + token;
  if (dados) configuracao.body = JSON.stringify(dados);

  const resposta = await fetch(caminho, configuracao);
  const resultado = await resposta.json().catch(function () { return {}; });

  if (!resposta.ok) {
    throw new Error(resultado.mensagem || "Erro na requisição");
  }
  return resultado;
}

function dadosDoFormulario(formulario) {
  const dados = {};
  const campos = new FormData(formulario);
  campos.forEach(function (valor, nome) { dados[nome] = valor; });
  return dados;
}

elemento("loginForm").onsubmit = async function (evento) {
  evento.preventDefault();

  try {
    const dados = await api("/login", "POST", {
      email: elemento("email").value,
      senha: elemento("senha").value
    });
    token = dados.token;
    localStorage.setItem("token", token);
    mostrarSistema();
  } catch (erro) {
    elemento("loginErro").textContent = erro.message;
  }
};

function mostrarSistema() {
  elemento("loginView").hidden = true;
  elemento("appView").hidden = false;
  carregarClientes();
  carregarVeiculos();
  carregarAgendamentos();
}

if (token) mostrarSistema();

elemento("logout").onclick = function () {
  localStorage.removeItem("token");
  location.reload();
};

const botoesAba = document.querySelectorAll("[data-tab]");
botoesAba.forEach(function (botao) {
  botao.onclick = function () {
    const abas = document.querySelectorAll(".tab");
    abas.forEach(function (aba) { aba.hidden = true; });
    elemento(botao.dataset.tab).hidden = false;
  };
});

async function carregarClientes() {
  let caminho = "/clientes";
  const busca = elemento("busca").value;
  if (busca) caminho += "?busca=" + encodeURIComponent(busca);

  try {
    const clientes = await api(caminho, "GET");
    let html = "";

    for (let i = 0; i < clientes.length; i++) {
      const cliente = clientes[i];
      const cpf = typeof cliente.cpf === "string" ? cliente.cpf : "";
      html += '<div class="item"><span><b>' + cliente.nome + '</b><br>';
      html += cpf ? cpf + " · " : "";
      html += (cliente.email || "") + "</span></div>";
    }
    elemento("clientesLista").innerHTML = html;
  } catch (erro) {
    alert(erro.message);
  }
}

elemento("busca").oninput = carregarClientes;

elemento("clienteForm").onsubmit = async function (evento) {
  evento.preventDefault();
  try {
    await api("/clientes", "POST", dadosDoFormulario(evento.target));
    evento.target.reset();
    carregarClientes();
  } catch (erro) { alert(erro.message); }
};

async function carregarVeiculos() {
  try {
    const veiculos = await api("/veiculos", "GET");
    let html = "";

    for (let i = 0; i < veiculos.length; i++) {
      const veiculo = veiculos[i];
      html += '<div class="item"><span>' + veiculo.marca + " " + veiculo.modelo;
      html += " (" + veiculo.placa + ") · cliente " + veiculo.id_cliente + "</span></div>";
    }
    elemento("veiculosLista").innerHTML = html;
  } catch (erro) { alert(erro.message); }
}

elemento("veiculoForm").onsubmit = async function (evento) {
  evento.preventDefault();
  try {
    const dados = dadosDoFormulario(evento.target);
    dados.cliente_id = Number(dados.cliente_id);
    dados.ano = Number(dados.ano) || null;
    await api("/veiculos", "POST", dados);
    evento.target.reset();
    carregarVeiculos();
  } catch (erro) { alert(erro.message); }
};

async function carregarAgendamentos() {
  try {
    const agendamentos = await api("/agendamentos", "GET");
    let html = "";

    for (let i = 0; i < agendamentos.length; i++) {
      const agendamento = agendamentos[i];
      const data = String(agendamento.data_agendamento || "").slice(0, 10);
      const partes = data.split("-");
      let textoData = data;
      if (partes.length === 3) textoData = partes[2] + "/" + partes[1] + "/" + partes[0];

      html += '<div class="item"><span><b>' + textoData + "</b> · ";
      html += agendamento.cliente_nome + " · " + agendamento.placa + "<br>";
      html += (agendamento.descricao_servico || "") + "</span></div>";
    }
    elemento("agendamentosLista").innerHTML = html;
  } catch (erro) { alert(erro.message); }
}

elemento("agendamentoForm").onsubmit = async function (evento) {
  evento.preventDefault();
  try {
    const dados = dadosDoFormulario(evento.target);
    dados.veiculo_id = Number(dados.veiculo_id);
    await api("/agendamentos", "POST", dados);
    evento.target.reset();
    carregarAgendamentos();
  } catch (erro) { alert(erro.message); }
};
