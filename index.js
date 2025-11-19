/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 *
 * Implementasikan CLI interface yang interaktif dengan menu:
 * 1. Tambah Siswa Baru
 * 2. Lihat Semua Siswa
 * 3. Cari Siswa (by ID)
 * 4. Update Data Siswa
 * 5. Hapus Siswa
 * 6. Tambah Nilai Siswa
 * 7. Lihat Top 3 Siswa
 * 8. Keluar
 */

import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Lihat Siswa per Kelas (Bonus)');
  console.log('9. Statistik Kelas (Bonus)');
  console.log('0. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 * - Minta input: ID, Nama, Kelas
 * - Buat object Student baru
 * - Tambahkan ke manager
 * - Tampilkan pesan sukses/gagal
 */
function addNewStudent() {
  console.log('\n--- Tambah Siswa Baru ---');

  try {
    // Minta input dari user
    const id = readlineSync.question('ID Siswa: ');
    const name = readlineSync.question('Nama: ');
    const studentClass = readlineSync.question('Kelas: ');

    // Buat object Student baru (akan divalidasi di constructor)
    const student = new Student(id, name, studentClass);

    // Tambahkan ke manager (akan cek duplicate ID)
    const success = manager.addStudent(student);

    if (success) {
      console.log('\nSiswa berhasil ditambahkan!');
      console.log(`  ID: ${student.id}`);
      console.log(`  Nama: ${student.name}`);
      console.log(`  Kelas: ${student.class}`);
    } else {
      console.log('\nGagal menambahkan siswa!');
      console.log(`  ID "${id}" sudah digunakan oleh siswa lain.`);
      console.log('  Gunakan ID yang berbeda.');
    }
  } catch (error) {
    console.log('\nError:', error.message);
    console.log('  Pastikan semua field diisi dengan benar.');
  }
}

/**
 * Handler untuk melihat semua siswa
 * - Panggil method displayAllStudents dari manager
 * - Jika tidak ada siswa, tampilkan pesan
 */
function viewAllStudents() {
  console.log('\n--- Daftar Semua Siswa ---');
  manager.displayAllStudents();
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 * - Minta input ID
 * - Cari siswa menggunakan manager
 * - Tampilkan info siswa jika ditemukan
 */
function searchStudent() {
  console.log('\n--- Cari Siswa ---');

  const id = readlineSync.question('Masukkan ID siswa: ');

  const student = manager.findStudent(id);

  if (student) {
    console.log('\nSiswa ditemukan:\n');
    student.displayInfo();
  } else {
    console.log('\nSiswa tidak ditemukan!');
    console.log(`  ID "${id}" tidak ada dalam sistem.`);
  }
}

/**
 * Handler untuk update data siswa
 * - Minta input ID siswa
 * - Tampilkan data saat ini
 * - Minta input data baru (nama, kelas)
 * - Update menggunakan manager
 */
function updateStudent() {
  console.log('\n--- Update Data Siswa ---');

  const id = readlineSync.question('Masukkan ID siswa: ');

  // Cari siswa terlebih dahulu
  const student = manager.findStudent(id);

  if (!student) {
    console.log('\nSiswa tidak ditemukan!');
    console.log(`  ID "${id}" tidak ada dalam sistem.`);
    return;
  }

  // Tampilkan data saat ini
  console.log('\nData saat ini:');
  console.log(`  ID: ${student.id}`);
  console.log(`  Nama: ${student.name}`);
  console.log(`  Kelas: ${student.class}`);

  console.log('\nMasukkan data baru (tekan Enter untuk skip):');

  // Minta input data baru
  const newName = readlineSync.question(`Nama baru [${student.name}]: `);
  const newClass = readlineSync.question(`Kelas baru [${student.class}]: `);

  // Prepare data object (only include if user provided input)
  const updateData = {};

  if (newName.trim() !== '') {
    updateData.name = newName;
  }

  if (newClass.trim() !== '') {
    updateData.class = newClass;
  }

  // Check if user provided any updates
  if (Object.keys(updateData).length === 0) {
    console.log('\nTidak ada perubahan data.');
    return;
  }

  try {
    // Update student
    const success = manager.updateStudent(id, updateData);

    if (success) {
      console.log('\nData siswa berhasil diupdate!');
      console.log('\nData setelah update:');
      student.displayInfo();
    } else {
      console.log('\nGagal mengupdate data siswa!');
    }
  } catch (error) {
    console.log('\nError:', error.message);
  }
}

/**
 * Handler untuk menghapus siswa
 * - Minta input ID siswa
 * - Konfirmasi penghapusan
 * - Hapus menggunakan manager
 */
function deleteStudent() {
  console.log('\n--- Hapus Siswa ---');

  const id = readlineSync.question('Masukkan ID siswa yang akan dihapus: ');

  // Cari siswa terlebih dahulu
  const student = manager.findStudent(id);

  if (!student) {
    console.log('\nSiswa tidak ditemukan!');
    console.log(`  ID "${id}" tidak ada dalam sistem.`);
    return;
  }

  // Tampilkan data siswa yang akan dihapus
  console.log('\nData siswa yang akan dihapus:');
  console.log(`  ID: ${student.id}`);
  console.log(`  Nama: ${student.name}`);
  console.log(`  Kelas: ${student.class}`);

  // Konfirmasi penghapusan
  const confirmation = readlineSync.question(
    '\nApakah Anda yakin ingin menghapus siswa ini? (y/n): '
  );

  if (
    confirmation.toLowerCase() === 'y' ||
    confirmation.toLowerCase() === 'yes'
  ) {
    const success = manager.removeStudent(id);

    if (success) {
      console.log('\nSiswa berhasil dihapus!');
    } else {
      console.log('\nGagal menghapus siswa!');
    }
  } else {
    console.log('\nPenghapusan dibatalkan.');
  }
}

/**
 * Handler untuk menambah nilai siswa
 * - Minta input ID siswa
 * - Tampilkan data siswa
 * - Minta input mata pelajaran dan nilai
 * - Tambahkan nilai menggunakan method addGrade
 */
function addGradeToStudent() {
  console.log('\n--- Tambah Nilai Siswa ---');

  const id = readlineSync.question('Masukkan ID siswa: ');

  // Cari siswa
  const student = manager.findStudent(id);

  if (!student) {
    console.log('\nSiswa tidak ditemukan!');
    console.log(`  ID "${id}" tidak ada dalam sistem.`);
    return;
  }

  // Tampilkan data siswa
  console.log('\nData siswa:');
  student.displayInfo();

  try {
    // Minta input mata pelajaran dan nilai
    const subject = readlineSync.question('\nMata Pelajaran: ');
    const scoreInput = readlineSync.question('Nilai (0-100): ');

    // Konversi input nilai ke number
    const score = Number.parseFloat(scoreInput);

    // Validasi apakah input adalah angka
    if (Number.isNaN(score)) {
      console.log('\nError: Nilai harus berupa angka!');
      return;
    }

    // Tambahkan nilai (akan divalidasi di method addGrade)
    student.addGrade(subject, score);

    console.log('\nNilai berhasil ditambahkan!');
    console.log(`  ${subject}: ${score}`);
    console.log(`  Rata-rata baru: ${student.getAverage().toFixed(2)}`);
    console.log(`  Status: ${student.getGradeStatus()}`);
  } catch (error) {
    console.log('\nError:', error.message);
  }
}

/**
 * Handler untuk melihat top 3 students
 * - Panggil getTopStudents(3) dari manager
 * - Tampilkan informasi siswa
 */
function viewTopStudents() {
  console.log('\n--- Top 3 Siswa ---');

  const topStudents = manager.getTopStudents(3);

  if (topStudents.length === 0) {
    console.log('\nBelum ada data siswa dalam sistem.');
    return;
  }

  console.log(`\nMenampilkan ${topStudents.length} siswa terbaik:\n`);

  let rank = 1;
  for (const student of topStudents) {
    console.log(`[Peringkat ${rank}]`);
    console.log(`ID: ${student.id}`);
    console.log(`Nama: ${student.name}`);
    console.log(`Kelas: ${student.class}`);
    console.log(`Rata-rata: ${student.getAverage().toFixed(2)}`);
    console.log(`Status: ${student.getGradeStatus()}`);
    console.log('------------------------');
    rank += 1;
  }
}

/**
 * Handler untuk melihat siswa berdasarkan kelas
 * - Input nama kelas
 * - Tampilkan seluruh siswa yang cocok
 */
function viewStudentsByClass() {
  console.log('\n--- Lihat Siswa per Kelas ---');

  const className = readlineSync.question('Masukkan nama kelas: ').trim();

  if (!className) {
    console.log('\nNama kelas tidak boleh kosong.');
    return;
  }

  const students = manager.getStudentsByClass(className);

  if (students.length === 0) {
    console.log(`\nBelum ada siswa untuk kelas "${className}".`);
    return;
  }

  console.log(
    `\nMenampilkan ${students.length} siswa untuk kelas "${className}":\n`
  );

  let index = 1;
  for (const student of students) {
    console.log(`[${index}]`);
    student.displayInfo();
    console.log();
    index += 1;
  }
}

/**
 * Handler untuk melihat statistik kelas
 * - Input nama kelas
 * - Tampilkan informasi agregat kelas (jumlah siswa, rata-rata, dll)
 */
function viewClassStatistics() {
  console.log('\n--- Statistik Kelas ---');

  const className = readlineSync.question('Masukkan nama kelas: ').trim();

  if (!className) {
    console.log('\nNama kelas tidak boleh kosong.');
    return;
  }

  const stats = manager.getClassStatistics(className);

  if (!stats) {
    console.log(`\nTidak ditemukan data untuk kelas "${className}".`);
    return;
  }

  console.log(`\nStatistik kelas "${stats.className}":`);
  console.log(`  Total Siswa    : ${stats.totalStudents}`);
  console.log(`  Rata-rata Kelas: ${stats.classAverage.toFixed(2)}`);
  console.log(`  Nilai Tertinggi: ${stats.highestAverage.toFixed(2)}`);
  console.log(`  Nilai Terendah : ${stats.lowestAverage.toFixed(2)}`);
  console.log(`  Lulus          : ${stats.passingStudents}`);
  console.log(`  Tidak Lulus    : ${stats.failingStudents}`);
  console.log(`  Persentase Lulus: ${stats.passRate.toFixed(2)}%`);
}

/**
 * Main program loop
 * - Tampilkan menu
 * - Baca input pilihan
 * - Panggil handler yang sesuai
 * - Ulangi sampai user pilih keluar
 */
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');
  let running = true;

  while (running) {
    // Tampilkan menu
    displayMenu();

    // Baca pilihan user
    const choice = readlineSync.question('\nPilih menu (0-9): ');

    // Handle pilihan user dengan switch-case
    switch (choice) {
      case '1':
        addNewStudent();
        break;

      case '2':
        viewAllStudents();
        break;

      case '3':
        searchStudent();
        break;

      case '4':
        updateStudent();
        break;

      case '5':
        deleteStudent();
        break;

      case '6':
        addGradeToStudent();
        break;

      case '7':
        viewTopStudents();
        break;

      case '8':
        viewStudentsByClass();
        break;

      case '9':
        viewClassStatistics();
        break;

      case '0':
        console.log('\nTerima kasih telah menggunakan aplikasi ini!');
        running = false;
        break;

      default:
        console.log('\nPilihan tidak valid!');
        console.log('  Silakan pilih menu (0-9)');
        break;
    }

    // Pause untuk readability (kecuali exit)
    if (running && choice !== '0') {
      readlineSync.question('\nTekan Enter untuk kembali...');
    }
  }
}

// Jalankan aplikasi
main();
