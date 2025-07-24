# 📁 File Storage App com Node.js, PostgreSQL e MinIO
> Sistema simples de upload, listagem, exclusão e compartilhamento de arquivos com link público

## 📌 Descrição

Este projeto é uma aplicação para **armazenamento e compartilhamento de arquivos**, composta por:

- Backend em **Node.js com Express**
- Banco de dados **PostgreSQL**
- Armazenamento de objetos no **MinIO** (compatível com S3)
- Interface web simples para upload, listagem, exclusão e compartilhamento de arquivos

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js + Express
- PostgreSQL
- MinIO (S3 compatible)
- Multer (upload de arquivos)

### Frontend
- HTML, CSS, JavaScript

### Infraestrutura
- Docker e Docker Compose (opcional)

## ⚙️ Funcionalidades

- 📤 Upload de arquivos para o MinIO
- 📋 Listagem de arquivos cadastrados
- 🗑️ Exclusão de arquivos
- 🔗 Compartilhamento de arquivos via link pré-assinado

## ✅ Pré-requisitos

- Node.js e npm instalados
- PostgreSQL em execução
- MinIO em execução e acessível na rede

### ⚠️ Atenção: Configuração do arquivo `hosts`

Para que os **links de compartilhamento funcionem corretamente**, é necessário mapear o IP do servidor MinIO para o nome `minio` no arquivo `hosts` de cada máquina cliente.

#### Exemplo de entrada no arquivo `hosts`:

```
192.168.1.12    minio
```

Substitua `192.168.1.12` pelo IP real do servidor MinIO na sua rede.

- **Windows:** `C:\Windows\System32\drivers\etc\hosts`
- **Linux/Mac:** `/etc/hosts`

#### Como editar o arquivo `hosts` no Linux:

```bash
sudo vim /etc/hosts
```

Adicione a linha:

```
192.168.1.12    minio
```

No Vim, salve com `Esc`, digite `:wq` e pressione `Enter`.

---

## 🧪 Como rodar o projeto

### 🔧 Com Docker (recomendado)

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd <nome-do-projeto>
```

2. Build do projeto:
```bash
docker-compose build
```

3. Subir os containers:
```bash
docker-compose up -d
```

4. Parar os containers:
```bash
docker-compose down
```

5. Parar e remover volumes e containers órfãos:
```bash
docker-compose down --volumes --remove-orphans
```

---

## 🌐 Acesso aos Serviços

- 🖥️ Frontend: http://localhost:3001
- 🔌 Backend (API): http://localhost:3000
- 🐘 PgAdmin: http://localhost:5050  
  (login: `admin@admin.com` / senha: `admin`)
- ☁️ MinIO Console: http://localhost:9001  
  (login: `minioadmin` / senha: `minioadmin`)

---

## 🐘 Como registrar o servidor no PgAdmin

Para acessar o banco de dados via PgAdmin, siga os passos abaixo:

1. Acesse [http://localhost:5050](http://localhost:5050)
2. Faça login com:
   - **Usuário:** `admin@admin.com`
   - **Senha:** `admin`

3. Clique com o botão direito em "Servers" > "Register" > "Server..."
4. Na aba **General**:
   - **Name:** `starttech_totvs`

5. Na aba **Connection**:
   - **Host name/address:** `starttech_totvs_db_1`
   - **Port:** `5432`
   - **Username:** `user`
   - **Password:** `password`
   - Marque a opção "Save Password"

6. Clique em "Save" para concluir.

---

## 🧾 Consulta SQL de exemplo

Após registrar o servidor, selecione o banco `file_storage` e execute a seguinte query para visualizar os arquivos cadastrados:

```sql
SELECT * FROM files;

```

## 📄 Licença
A vontade...
