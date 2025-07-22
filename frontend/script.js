async function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) return alert('Please select a file');

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    alert(result.message);
    listFiles();
  } catch (err) {
    console.error(err);
    alert('Error uploading file');
  }
}

async function listFiles() {
  try {
    const response = await fetch('http://localhost:3000/files');
    const files = await response.json();
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    files.forEach(file => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${file.filename}
        <div>
          <button onclick="shareFile(${file.id})">Share</button>
          <button onclick="deleteFile(${file.id})">Delete</button>
        </div>
      `;
      fileList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    alert('Error listing files');
  }
}

async function deleteFile(id) {
  try {
    const response = await fetch(`http://localhost:3000/files/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    alert(result.message);
    listFiles();
  } catch (err) {
    console.error(err);
    alert('Error deleting file');
  }
}

async function shareFile(id) {
  try {
    const response = await fetch(`http://localhost:3000/files/${id}/share`);
    const result = await response.json();
    prompt('Copy this link:', result.url);
  } catch (err) {
    console.error(err);
    alert('Error generating share link');
  }
}

document.addEventListener('DOMContentLoaded', listFiles);