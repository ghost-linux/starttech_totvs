Preparar Ambiente Windows
Este guia apresenta os passos para configurar um ambiente de desenvolvimento no Windows usando WSL2 e Docker Engine nativo.

1. Instalar WSL2
1.1. Habilitar recursos necessários do Windows

Execute no PowerShell em modo administrador:


dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart




1.2. Reiniciar o Windows

Após habilitar os recursos, reinicie o computador.

1.3. Instalar o Kernel do WSL2

Baixe e instale o pacote de atualização do kernel do WSL2: WSL2 Kernel Update

1.4. Definir WSL2 como versão padrão

Execute no PowerShell:
wsl --set-default-version 2




2. Instalar Ubuntu
Há duas opções para instalar o Ubuntu:

Opção 1 - Via Microsoft Store (Recomendado)

  1. Acesse a Microsoft Store
  2. Instale o Ubuntu (versão sem número)
  3. Inicie o Ubuntu e configure seu usuário e senha

Opção 2 - Via linha de comando

Execute no PowerShell:


wsl --install -d Ubuntu




3. Instalar Docker Engine no Ubuntu
  1. Atualize o sistema e instale dependências:


sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc



  2. Adicione o repositório do Docker:


echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null



  3. Instale o Docker Engine e ferramentas:


sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin



  4. Adicione seu usuário ao grupo docker:


sudo usermod -aG docker $USER



  5. Reinicie o WSL:


# Execute no PowerShell do Windows
wsl --shutdown



  6. Configure o Docker para iniciar automaticamente:
# Edite o arquivo wsl.conf
sudo vim /etc/wsl.conf


# Adicione o conteúdo (pressione i para inserir):
[boot]
command = service docker start


# Salve e saia (pressione Esc, digite :wq e pressione Enter)




4. Instalar Windows Terminal
  1. Acesse Windows Terminal na Microsoft Store
  2. Clique em Instalar

5. Configurações Recomendadas
5.1. Configurar limites do WSL2

Crie/edite o arquivo .wslconfig na pasta do seu usuário Windows (C:\Users\<seu_usuario>\.wslconfig):

[wsl2]
memory=8GB
processors=4
networkingMode=mirrored
[experimental]
autoMemoryReclaim=gradual
sparseVhd=true
5.2. Otimizar Docker Build

Adicione ao final do arquivo ~/.profile no Ubuntu:


export DOCKER_BUILDKIT=1




Verificação da Instalação
  1. Reinicie o WSL:


wsl --shutdown



  2. Abra o Windows Terminal e inicie o Ubuntu

  3. Verifique se o Docker está funcionando:


docker ps
docker --version
docker compose version



Se todos os comandos executarem sem erros, seu ambiente está pronto para uso!
