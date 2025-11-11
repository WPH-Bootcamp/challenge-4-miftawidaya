[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mN9h8nSd)
# Challenge 4: Sistem Manajemen Nilai Siswa

## Deskripsi
Buatlah aplikasi CLI (Command Line Interface) untuk sistem manajemen nilai siswa menggunakan JavaScript dengan pendekatan Object-Oriented Programming (OOP).

## Tujuan Pembelajaran
- Memahami konsep OOP dalam JavaScript (Class, Object, Inheritance, Encapsulation)
- Mengimplementasikan CRUD operations
- Mengelola data menggunakan array dan object
- Membuat interactive CLI application
- Menerapkan error handling

## Fitur yang Harus Diimplementasikan

### 1. Class Student
Buat class `Student` dengan properti:
- `id` (string/number) - ID unik siswa
- `name` (string) - Nama siswa
- `class` (string) - Kelas siswa (misal: "10A", "11B")
- `grades` (object) - Object berisi nilai mata pelajaran

Method yang harus ada:
- `addGrade(subject, score)` - Menambah nilai mata pelajaran
- `getAverage()` - Menghitung rata-rata nilai
- `getGradeStatus()` - Menentukan status (Lulus/Tidak Lulus)
- `displayInfo()` - Menampilkan informasi siswa

### 2. Class StudentManager
Buat class `StudentManager` untuk mengelola data siswa:

Method yang harus ada:
- `addStudent(student)` - Menambah siswa baru
- `removeStudent(id)` - Menghapus siswa berdasarkan ID
- `findStudent(id)` - Mencari siswa berdasarkan ID
- `updateStudent(id, data)` - Update data siswa
- `getAllStudents()` - Mendapatkan semua data siswa
- `getTopStudents(n)` - Mendapatkan n siswa dengan rata-rata tertinggi
- `displayAllStudents()` - Menampilkan semua siswa

### 3. CLI Interface
Implementasikan menu interaktif dengan pilihan:
1. Tambah Siswa Baru
2. Lihat Semua Siswa
3. Cari Siswa (by ID)
4. Update Data Siswa
5. Hapus Siswa
6. Tambah Nilai Siswa
7. Lihat Top 3 Siswa
8. Keluar

## Kriteria Penilaian

### OOP Implementation (40%)
- Penggunaan class dengan benar
- Encapsulation (private/public properties)
- Method yang sesuai dengan tanggung jawab class
- Constructor yang tepat

### Functionality (40%)
- Semua fitur CRUD berfungsi dengan baik
- Perhitungan rata-rata dan status benar
- Pencarian dan sorting berfungsi
- Data persistence (bonus jika menggunakan file)

### Code Quality (20%)
- Clean code dan readable
- Error handling yang baik
- Validasi input
- Dokumentasi/komentar yang jelas

## Ketentuan Teknis

1. **Struktur Nilai:**
   - Setiap siswa memiliki nilai untuk berbagai mata pelajaran
   - Nilai harus dalam rentang 0-100
   - Rata-rata >= 75 = Lulus, < 75 = Tidak Lulus

2. **Validasi:**
   - ID siswa harus unik
   - Nama tidak boleh kosong
   - Nilai harus berupa angka 0-100
   - Input harus divalidasi sebelum diproses

3. **Error Handling:**
   - Tangani error saat siswa tidak ditemukan
   - Tangani input yang tidak valid
   - Berikan pesan error yang informatif

## Contoh Output

```
=== SISTEM MANAJEMEN NILAI SISWA ===
1. Tambah Siswa Baru
2. Lihat Semua Siswa
3. Cari Siswa
4. Update Data Siswa
5. Hapus Siswa
6. Tambah Nilai Siswa
7. Lihat Top 3 Siswa
8. Keluar
Pilih menu (1-8): 2

=== DAFTAR SISWA ===
ID: S001
Nama: Budi Santoso
Kelas: 10A
Mata Pelajaran:
  - Matematika: 85
  - Bahasa Indonesia: 90
  - IPA: 88
Rata-rata: 87.67
Status: Lulus
------------------------
```

## Cara Mengerjakan

1. Clone repository ini
2. Implementasikan class-class yang diperlukan di folder `src/`
3. Implementasikan CLI di file `index.js`
4. Test aplikasi Anda dengan menjalankan `node index.js`
5. Pastikan semua fitur berfungsi dengan baik

## Bonus Points

- Implementasi data persistence menggunakan JSON file
- Tambah fitur export laporan ke file
- Implementasi filtering (misal: filter by class)
- Tambah fitur statistik kelas
- UI yang lebih menarik dengan colors (chalk/colors library)

## Submission

Pastikan repository Anda berisi:
- Source code lengkap
- README.md dengan cara menjalankan
- Contoh data atau screenshot hasil running
- Dokumentasi kode yang jelas

## Tips

- Mulai dengan membuat class Student terlebih dahulu
- Test setiap method sebelum melanjutkan
- Gunakan readline-sync atau inquirer untuk input CLI
- Pisahkan logic dan UI untuk code yang lebih clean
- Commit secara berkala dengan pesan yang jelas

## Resources

- [MDN - Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Node.js readline-sync](https://www.npmjs.com/package/readline-sync)
- [JavaScript OOP Guide](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming)

---
**Deadline:** [Tentukan deadline sesuai kebutuhan]

**Happy Coding!**
# t-challenge-4-rep
