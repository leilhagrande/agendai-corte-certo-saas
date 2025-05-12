#!/bin/bash

echo "🚀 Iniciando configuração do projeto AgendAi Corte Certo..."

# Parar o script em caso de erro
set -e

# Verifica se o Supabase CLI já está instalado
if ! command -v supabase &> /dev/null; then
  echo "⬇️ Baixando e instalando o Supabase CLI..."
  curl -L https://github.com/supabase/cli/releases/latest/download/supabase-cli-linux-x64.tar.gz | tar -xz
  sudo mv supabase /usr/local/bin/supabase
else
  echo "✅ Supabase CLI já está instalado."
fi

# Verifica se Docker está instalado
if ! command -v docker &> /dev/null; then
  echo "❌ Docker não encontrado. Instale o Docker antes de continuar: https://docs.docker.com/get-docker/"
  exit 1
fi

# Inicializa Supabase local
echo "🔧 Iniciando Supabase local..."
supabase start

# Finaliza
echo "✅ Ambiente configurado com sucesso!"
