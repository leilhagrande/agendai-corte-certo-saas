#!/bin/bash

echo "🚀 Iniciando configuração do projeto AgendAi..."

# 1. Verifica se Node.js está instalado
if ! command -v node &> /dev/null; then
  echo "❌ Node.js não está instalado. Instale-o antes de continuar."
  exit 1
fi

# 2. Verifica se Supabase CLI está instalado
if ! command -v supabase &> /dev/null; then
  echo "📦 Instalando Supabase CLI..."
  wget https://github.com/supabase/cli/releases/download/v1.157.2/supabase_1.157.2_linux_amd64.tar.gz
  tar -xvzf supabase_1.157.2_linux_amd64.tar.gz
  sudo mv supabase /usr/local/bin
else
  echo "✅ Supabase CLI já instalado"
fi

# 3. Instala dependências do projeto
echo "📦 Instalando dependências do projeto..."
npm install

# 4. Inicia Supabase local
echo "⚙️ Inicializando Supabase local..."
supabase start

# 5. Mensagem final
echo "✅ Projeto AgendAi pronto para uso local!"
echo "Acesse: http://localhost:3000 ou conforme configurado"

