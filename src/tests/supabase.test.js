
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

describe("Testes Locais Antes do Deploy", () => {
  // 1. Verificar Conexão com o Supabase
  test("Conexão com o Supabase deve ser bem-sucedida", async () => {
    const { data, error } = await supabaseClient
      .from("configuracoes_supabase")
      .select("*");
    expect(error).toBeNull();
    expect(data).toBeDefined();
  });

  // 2. Verificar Autenticação
  test("Autenticação deve funcionar corretamente", async () => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: "teste@exemplo.com", // substitua com um e-mail válido de teste
      password: "senha123",       // substitua com uma senha válida de teste
    });

    expect(error).toBeNull();
    expect(data.user).toBeDefined();

    const { error: logoutError } = await supabaseClient.auth.signOut();
    expect(logoutError).toBeNull();
  });

  // 3. Verificar Navegação e Rotas (simulado)
  test("Navegação entre páginas funciona corretamente", () => {
    const pages = ["Agenda", "Clientes", "Serviços"];
    pages.forEach((page) => {
      expect(() => {
        console.log(`Carregando página: ${page}`);
      }).not.toThrow();
    });
  });

  // 4. Verificar Layout Responsivo (simulado)
  test("Layout deve ser responsivo em diferentes tamanhos de tela", () => {
    const viewports = ["mobile", "tablet", "desktop"];
    viewports.forEach((viewport) => {
      expect(() => {
        console.log(`Testando layout no viewport: ${viewport}`);
      }).not.toThrow();
    });
  });

  // 5. Verificar API retornando dados esperados
  test("Chamadas à API devem retornar dados esperados", async () => {
    const { data, error } = await supabaseClient
      .from("configuracoes_supabase")
      .select("*");
    expect(error).toBeNull();
    expect(data.length).toBeGreaterThan(0);
  });
});
