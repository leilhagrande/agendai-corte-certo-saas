#!/bin/bash

echo "🔧 Iniciando configuração automática do projeto AgendAi - Corte Certo..."

# Passo 1: Instalar dependências Node
if [ -f package-lock.json ]; then
  echo "📦 Instalando dependências com npm..."
  npm install
else
  echo "📦 Instalando dependências com yarn..."
  yarn install
fi

# Passo 2: Instalar Supabase CLI se não existir
if ! command -v supabase &> /dev/null
then
  echo "📥 Baixando e instalando o Supabase CLI..."
  curl -L https://github.com/supabase/cli/releases/latest/download/supabase-cli-linux-x64.tar.gz | tar -xz
  sudo mv supabase /usr/local/bin/
else
  echo "✅ Supabase CLI já instalado."
fi

# Passo 3: Inicializar Supabase local (caso ainda não esteja rodando)
if [ ! -d ".supabase" ]; then
  echo "🚀 Inicializando Supabase local..."
  supabase init
else
  echo "✅ Supabase local já configurado."
fi

# Passo 4: Rodar Supabase localmente
echo "▶️ Iniciando Supabase local..."
supabase start

# Passo 5: Mensagem final
echo "✅ Projeto configurado com sucesso!"
echo "Acesse seu projeto localmente e comece a desenvolver."

