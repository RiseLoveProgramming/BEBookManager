# Backend Project - Setup dan Konfigurasi

Panduan ini akan membantu Anda untuk meng-`clone` dan menjalankan backend proyek ini, termasuk cara mengkonfigurasi file `.env`.

## Langkah-langkah untuk Menjalankan Backend

### 1. **Clone Repository**

Clone repository ini ke mesin lokal Anda:

```bash
git clone https://github.com/username/repository.git
cd repository
```

### 2. Buat file .env

Isi file .env dengan kode berikut

```plaintext
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
PORT=3000
API_KEY=your_api_key
SECRET_KEY=your_secret_key
```

Gantilah nilai pada variabel tersebut dengan yang sesuai dengan konfigurasi sistem atau lingkungan yang Anda gunakan.

### 3. Instalasi Dependensi

Pastikan Anda telah menginstal semua dependensi yang diperlukan untuk menjalankan aplikasi. Jalankan perintah berikut:

```bash
npm install
```

### 4. Jalankan Aplikasi

Setelah konfigurasi selesai, jalankan backend menggunakan perintah:

```bash
npm start
```
