## **Tugas 2 – CRUD Express.js dengan Middleware & Error Handling**

### **Nama Mahasiswa**

**Irfansyah**
**NIM:** 20230140223
**Kelas:** TI-5A (PAW – E-PPAW-TI503P-2025)

---

### **Deskripsi Proyek**

Tugas ini merupakan kelanjutan dari praktikum **Pengembangan Aplikasi Web (PAW)** yang bertujuan untuk:

* Mempelajari pembuatan **RESTful API** dengan **Express.js**
* Mengimplementasikan fitur **CRUD (Create, Read, Update, Delete)** untuk manajemen data buku
* Menerapkan **middleware** untuk logging aktivitas server
* Menambahkan **error handling** agar API lebih stabil dan profesional

---

### **Langkah Menjalankan Proyek**

1. Buka terminal pada folder `express-demo`

2. Jalankan perintah berikut:

   ```bash
   npm install
   node app.js
   ```

3. Server akan berjalan di:

   ```
   http://localhost:3000/
   ```

4. Uji semua endpoint menggunakan **Postman** atau **cURL**

---

### **Daftar Endpoint API**

| HTTP Method | Endpoint         | Deskripsi                       | Body (JSON)                                                |
| ----------- | ---------------- | ------------------------------- | ---------------------------------------------------------- |
| **GET**     | `/api/books`     | Menampilkan semua buku          | –                                                          |
| **GET**     | `/api/books/:id` | Menampilkan buku berdasarkan ID | –                                                          |
| **POST**    | `/api/books`     | Menambahkan buku baru           | `{ "title": "Book Title", "author": "Author Name" }`       |
| **PUT**     | `/api/books/:id` | Memperbarui data buku           | `{ "title": "Updated Title", "author": "Updated Author" }` |
| **DELETE**  | `/api/books/:id` | Menghapus buku berdasarkan ID   | –                                                          |

---

### **Contoh Respons API**

#### GET `/api/books`

```json
[
  { "id": 1, "title": "Laskar Pelangi", "author": "Andrea Hirata" },
  { "id": 2, "title": "Bumi Manusia", "author": "Pramoedya Ananta Toer" }
]
```

#### POST `/api/books`

```json
{
  "message": "Book created successfully",
  "data": {
    "id": 3,
    "title": "Negeri 5 Menara",
    "author": "Ahmad Fuadi"
  }
}
```

#### PUT `/api/books/2`

```json
{
  "message": "Book updated successfully",
  "data": {
    "id": 2,
    "title": "Bumi Manusia (Revisi)",
    "author": "Pramoedya Ananta Toer"
  }
}
```

#### DELETE `/api/books/1`

```json
{
  "message": "Book deleted successfully",
  "data": {
    "id": 1,
    "title": "Laskar Pelangi",
    "author": "Andrea Hirata"
  }
}
```

---

### **Middleware yang Digunakan**

#### 1. **Body Parser**

```js
app.use(express.json());
```

Memungkinkan server membaca body request berformat JSON.

#### 2. **CORS**

```js
app.use(cors());
```

Mengizinkan akses API dari domain lain (misalnya frontend React).

#### 3. **Logger Custom**

```js
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});
```

Menampilkan timestamp, method, dan URL dari setiap request.

---

### **Error Handling**

#### 404 Middleware

Menangani URL yang tidak ditemukan:

```js
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint Not Found' });
});
```

#### Global Error Handler

Menangani kesalahan internal server:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
```

---

### **Commit Log**

```bash
git add express-demo TUGAS
git commit -m "Menambahkan tugas kedua: folder express-demo (CRUD Express.js lengkap) dan folder TUGAS (dokumentasi endpoint praktikum PAW)"
git push origin main
```

---

### **Status Tugas**

- CRUD API Berfungsi
- Middleware Logging
- Error Handling
- Dokumentasi Markdown
- Struktur Folder Sesuai Format Praktikum
- Sudah Diuji di Postman

---

### **Catatan Akhir**

Project ini merupakan bagian dari praktikum **Pengembangan Aplikasi Web (PAW)**
pada **Universitas Muhammadiyah Yogyakarta**
dengan fokus pada pemahaman **Express.js, REST API, dan Middleware Handling**.
