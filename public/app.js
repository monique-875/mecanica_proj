let token = localStorage.getItem("token");
const $ = (id) => document.getElementById(id);

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  const data = await ressponse.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.mensagem || "Erro na requisição");
  return data;
}

function formObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

$("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const data = await api("/login", {
      method: "POST",
      headers: {},
      body: JSON.stringify({
        email: $("email").value,
        senha: $("senha").value,
      }),
    });
    token = data.token;
    localStorage.setItem("token", token);
    mostrarApp();
  } catch (error) {
    $("loginErro").textContent = error.message;
  }
});

function mostrarApp() {
  $("loginView").hidden = true;
  $("appView").hidden = false;
  carregarTudo();
}
if (token) mostrarApp();
$("logout").onclick = () => {
  localStorage.removeItem("token");
  location.reload();
};
document.querySelectorAll("[data-tab]").forEach(
  (b) =>
    (b.onclick = () => {
      document.querySelectorAll(".tab").forEach((t) => (t.hidden = true));
      $(b.dataset.tab).hidden = false;
    }),
);

async function carregarClientes() {
  const busca = $("busca").value;
  const rows = await api(
    `/clientes${busca ? `?busca=${encodeURIComponent(busca)}` : ""}`,
  );
  $("clientesLista").innerHTML = rows
    .map((c) => {
      const cpf = typeof c.cpf === "string" ? c.cpf : "";
      return `<div class="item"><span><b>${c.nome}</b><br>${cpf ? `${cpf} · ` : ""}${c.email || ""}</span></div>`;
    })
    .join("");
}
$("busca").oninput = carregarClientes;
$("clienteForm").onsubmit = async (e) => {
  e.preventDefault();
  try {
    await api("/clientes", {
      method: "POST",
      body: JSON.stringify(formObject(e.target)),
    });
    e.target.reset();
    await carregarClientes();
  } catch (erro) {
    alert(erro.message);
  }
};

async function carregarVeiculos() {
  const rows = await api("/veiculos");
  $("veiculosLista").innerHTML = rows
    .map(
      (v) =>
        `<div class="item"><span>${v.marca} ${v.modelo} (${v.placa}) · cliente ${v.id_cliente}</span></div>`,
    )
    .join("");
}
$("veiculoForm").onsubmit = async (e) => {
  e.preventDefault();
  try {
    const dados = formObject(e.target);
    dados.ano = dados.ano ? Number(dados.ano) : null;
    dados.cliente_id = Number(dados.cliente_id);
    await api("/veiculos", { method: "POST", body: JSON.stringify(dados) });
    e.target.reset();
    await carregarVeiculos();
  } catch (erro) {
    alert(erro.message);
  }
};

async function carregarAgendamentos() {
  const rows = await api("/agendamentos");
  $("agendamentosLista").innerHTML = rows
    .map((a) => {
      const data = new Date(a.data_agendamento);
      const textoData = Number.isNaN(data.getTime())
        ? String(a.data_agendamento || "")
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/")
        : data.toLocaleDateString("pt-BR");
      return `<div class="item"><span><b>${textoData}</b> · ${a.cliente_nome} · ${a.placa}<br>${a.descricao_servico || ""}</span></div>`;
    })
    .join("");
}
$("agendamentoForm").onsubmit = async (e) => {
  e.preventDefa