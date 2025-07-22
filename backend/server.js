const express = require('express');
const { Pool } = require('pg');
const Minio = require('minio');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors());
app.use(express.json());

// Configuração do Multer para upload de arquivos
const upload = multer({ storage: multer.memoryStorage() });

// Configuração do PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Configuração do MinIO
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

// Criar bucket no MinIO se não existir
minioClient.bucketExists(process.env.MINIO_BUCKET, (err, exists) => {
  if (err) return console.error(err);
  if (!exists) {
    minioClient.makeBucket(process.env.MINIO_BUCKET, 'us-east-1', (err) => {
      if (err) console.error('Error creating bucket:', err);
      else console.log('Bucket created successfully');
    });
  }
});

// Rota para upload de arquivo
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { originalname } = req.file;
    await minioClient.putObject(process.env.MINIO_BUCKET, originalname, req.file.buffer);

    const { rows } = await pool.query(
      'INSERT INTO files (filename, bucket) VALUES ($1, $2) RETURNING *',
      [originalname, process.env.MINIO_BUCKET]
    );

    res.json({ message: 'File uploaded successfully', file: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Rota para listar arquivos
app.get('/files', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM files ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list files' });
  }
});

// Rota para deletar arquivo
app.delete('/files/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT filename FROM files WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'File not found' });

    await minioClient.removeObject(process.env.MINIO_BUCKET, rows[0].filename);
    await pool.query('DELETE FROM files WHERE id = $1', [id]);

    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Rota para compartilhar arquivo (gerar URL pré-assinada)
app.get('/files/:id/share', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT filename FROM files WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'File not found' });

    const url = await minioClient.presignedUrl('GET', process.env.MINIO_BUCKET, rows[0].filename, 24 * 60 * 60);
    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate share link' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
