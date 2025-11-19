/**
 * Main Application - Enhanced CLI Interface
 * With data persistence, export features, and colored UI
 */

import readlineSync from 'readline-sync';
import chalk from 'chalk';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';
import DataPersistence from './src/DataPersistence.js';
import ReportExporter from './src/ReportExporter.js';

// Initialize modules
const manager = new StudentManager();
const persistence = new DataPersistence();
const exporter = new ReportExporter();

// Load existing data on startup
const loadedStudents = persistence.loadStudents();
for (const student of loadedStudents) {
  manager.addStudent(student);
}

/**
 * Auto-save data after each operation
 */
function autoSave() {
  persistence.saveStudents(manager.getAllStudents());
}

/**
 * Display main menu with colors
 */
function displayMenu() {
  console.log('\n' + chalk.cyan('='.repeat(35)));
  console.log(chalk.bold.cyan('   SISTEM MANAJEMEN NILAI SISWA'));
  console.log(chalk.cyan('='.repeat(35)));
  console.log(chalk.yellow('   CRUD Operations'));
  console.log('   1. Tambah Siswa Baru');
  console.log('   2. Lihat Semua Siswa');
  console.log('   3. Cari Siswa');
  console.log('   4. Update Data Siswa');
  console.log('   5. Hapus Siswa');
  console.log('   6. Tambah Nilai Siswa');
  console.log(chalk.yellow('\n   Reports & Analysis'));
  console.log('   7. Lihat Top 3 Siswa');
  console.log('   8. Lihat Siswa per Kelas');
  console.log('   9. Statistik Kelas');
  console.log(chalk.yellow('\n   Data Management'));
  console.log('   10. Export Laporan');
  console.log('   11. Backup Data');
  console.log(chalk.yellow('\n   System'));
  console.log('   0. Keluar');
  console.log(chalk.cyan('='.repeat(35)));
}

/**
 * Add new student with enhanced UI
 */
function addNewStudent() {
  console.log('\n' + chalk.bgBlue.white(' Tambah Siswa Baru '));

  try {
    const id = readlineSync.question(chalk.gray('ID Siswa: '));
    const name = readlineSync.question(chalk.gray('Nama: '));
    const studentClass = readlineSync.question(chalk.gray('Kelas: '));

    const student = new Student(id, name, studentClass);
    const success = manager.addStudent(student);

    if (success) {
      console.log(chalk.green('\n✓ Siswa berhasil ditambahkan!'));
      console.log(chalk.gray(`  ID: ${student.id}`));
      console.log(chalk.gray(`  Nama: ${student.name}`));
      console.log(chalk.gray(`  Kelas: ${student.class}`));
      autoSave();
    } else {
      console.log(chalk.red('\n✗ Gagal menambahkan siswa!'));
      console.log(chalk.yellow(`  ID "${id}" sudah digunakan.`));
    }
  } catch (error) {
    console.log(chalk.red('\n✗ Error: ') + error.message);
  }
}

/**
 * View all students with colors
 */
function viewAllStudents() {
  console.log('\n' + chalk.bgBlue.white(' Daftar Semua Siswa '));

  const students = manager.getAllStudents();

  if (students.length === 0) {
    console.log(chalk.yellow('\nℹ Belum ada data siswa dalam sistem.'));
    return;
  }

  console.log(chalk.cyan(`\n=== ${students.length} SISWA TERDAFTAR ===\n`));

  for (const [index, student] of students.entries()) {
    const status = student.getGradeStatus();
    let statusColor;
    if (status === 'Lulus') {
      statusColor = chalk.green;
    } else if (status === 'Tidak Lulus') {
      statusColor = chalk.red;
    } else {
      statusColor = chalk.gray;
    }

    console.log(chalk.bold(`[${index + 1}] ${student.name}`));
    console.log(chalk.gray(`    ID: ${student.id} | Kelas: ${student.class}`));
    console.log(
      chalk.gray(`    Rata-rata: ${student.getAverage().toFixed(2)} | `) +
        statusColor(`Status: ${status}`)
    );
    console.log();
  }
}

/**
 * Search student with enhanced display
 */
function searchStudent() {
  console.log('\n' + chalk.bgBlue.white(' Cari Siswa '));

  const id = readlineSync.question(chalk.gray('Masukkan ID siswa: '));
  const student = manager.findStudent(id);

  if (student) {
    console.log(chalk.green('\n✓ Siswa ditemukan:\n'));
    displayStudentDetails(student);
  } else {
    console.log(chalk.red('\n✗ Siswa tidak ditemukan!'));
    console.log(chalk.yellow(`  ID "${id}" tidak ada dalam sistem.`));
  }
}

/**
 * Display student details with colors
 */
function displayStudentDetails(student) {
  console.log(chalk.cyan('─'.repeat(35)));
  console.log(chalk.bold(`ID: ${student.id}`));
  console.log(`Nama: ${student.name}`);
  console.log(`Kelas: ${student.class}`);
  console.log(chalk.yellow('\nMata Pelajaran:'));

  const grades = Object.entries(student.grades);
  if (grades.length === 0) {
    console.log(chalk.gray('  (Belum ada nilai)'));
  } else {
    for (const [subject, score] of grades) {
      let scoreColor;
      if (score >= 75) {
        scoreColor = chalk.green;
      } else if (score >= 60) {
        scoreColor = chalk.yellow;
      } else {
        scoreColor = chalk.red;
      }
      console.log(`  - ${subject}: ${scoreColor(score)}`);
    }
  }

  const avg = student.getAverage();
  const status = student.getGradeStatus();
  const avgColor = avg >= 75 ? chalk.green : chalk.red;
  let statusColor;
  if (status === 'Lulus') {
    statusColor = chalk.green;
  } else if (status === 'Tidak Lulus') {
    statusColor = chalk.red;
  } else {
    statusColor = chalk.gray;
  }

  console.log(`\nRata-rata: ${avgColor(avg.toFixed(2))}`);
  console.log(`Status: ${statusColor(status)}`);
  console.log(chalk.cyan('─'.repeat(35)));
}

/**
 * Update student with enhanced UI
 */
function updateStudent() {
  console.log('\n' + chalk.bgBlue.white(' Update Data Siswa '));

  const id = readlineSync.question(chalk.gray('Masukkan ID siswa: '));
  const student = manager.findStudent(id);

  if (!student) {
    console.log(chalk.red('\n✗ Siswa tidak ditemukan!'));
    return;
  }

  console.log(chalk.green('\n✓ Data saat ini:'));
  console.log(chalk.gray(`  Nama: ${student.name}`));
  console.log(chalk.gray(`  Kelas: ${student.class}`));

  console.log(chalk.yellow('\nMasukkan data baru (Enter untuk skip):'));
  const newName = readlineSync.question(`Nama baru [${student.name}]: `);
  const newClass = readlineSync.question(`Kelas baru [${student.class}]: `);

  const updateData = {};
  if (newName.trim()) updateData.name = newName;
  if (newClass.trim()) updateData.class = newClass;

  if (Object.keys(updateData).length === 0) {
    console.log(chalk.yellow('\nℹ Tidak ada perubahan data.'));
    return;
  }

  try {
    const success = manager.updateStudent(id, updateData);
    if (success) {
      console.log(chalk.green('\n✓ Data siswa berhasil diupdate!'));
      autoSave();
    }
  } catch (error) {
    console.log(chalk.red('\n✗ Error: ') + error.message);
  }
}

/**
 * Delete student with confirmation
 */
function deleteStudent() {
  console.log('\n' + chalk.bgRed.white(' Hapus Siswa '));

  const id = readlineSync.question(chalk.gray('Masukkan ID siswa: '));
  const student = manager.findStudent(id);

  if (!student) {
    console.log(chalk.red('\n✗ Siswa tidak ditemukan!'));
    return;
  }

  console.log(chalk.yellow('\n⚠️  Data siswa yang akan dihapus:'));
  console.log(chalk.gray(`  ID: ${student.id}`));
  console.log(chalk.gray(`  Nama: ${student.name}`));
  console.log(chalk.gray(`  Kelas: ${student.class}`));

  const confirmation = readlineSync.question(
    chalk.red('\nYakin ingin menghapus? (y/n): ')
  );

  if (confirmation.toLowerCase() === 'y') {
    const success = manager.removeStudent(id);
    if (success) {
      console.log(chalk.green('\n✓ Siswa berhasil dihapus!'));
      autoSave();
    }
  } else {
    console.log(chalk.yellow('\nℹ Penghapusan dibatalkan.'));
  }
}

/**
 * Add grade to student
 */
function addGradeToStudent() {
  console.log('\n' + chalk.bgBlue.white(' Tambah Nilai Siswa '));

  const id = readlineSync.question(chalk.gray('Masukkan ID siswa: '));
  const student = manager.findStudent(id);

  if (!student) {
    console.log(chalk.red('\n✗ Siswa tidak ditemukan!'));
    return;
  }

  console.log(chalk.green('\n✓ Data siswa:'));
  console.log(chalk.gray(`  Nama: ${student.name}`));
  console.log(
    chalk.gray(`  Rata-rata saat ini: ${student.getAverage().toFixed(2)}`)
  );

  try {
    const subject = readlineSync.question(chalk.gray('\nMata Pelajaran: '));
    const scoreInput = readlineSync.question(chalk.gray('Nilai (0-100): '));
    const score = Number.parseFloat(scoreInput);

    if (Number.isNaN(score)) {
      console.log(chalk.red('\n✗ Nilai harus berupa angka!'));
      return;
    }

    student.addGrade(subject, score);
    console.log(chalk.green('\n✓ Nilai berhasil ditambahkan!'));
    console.log(chalk.gray(`  ${subject}: ${score}`));
    console.log(
      chalk.gray(`  Rata-rata baru: ${student.getAverage().toFixed(2)}`)
    );
    autoSave();
  } catch (error) {
    console.log(chalk.red('\n✗ Error: ') + error.message);
  }
}

/**
 * View top students
 */
function viewTopStudents() {
  console.log('\n' + chalk.bgBlue.white(' Top 3 Siswa Terbaik '));

  const topStudents = manager.getTopStudents(3);

  if (topStudents.length === 0) {
    console.log(chalk.yellow('\nℹ Belum ada data siswa.'));
    return;
  }

  console.log(chalk.cyan(`\n🏆 ${topStudents.length} SISWA TERBAIK\n`));

  for (const [index, student] of topStudents.entries()) {
    const medal = ['🥇', '🥈', '🥉'][index] || '🎖️';
    console.log(chalk.bold(`${medal} PERINGKAT ${index + 1}`));
    console.log(chalk.gray(`   ID: ${student.id} | Nama: ${student.name}`));
    console.log(
      chalk.green(`   Rata-rata: ${student.getAverage().toFixed(2)}`)
    );
    console.log();
  }
}

/**
 * View students by class
 */
function viewStudentsByClass() {
  console.log('\n' + chalk.bgBlue.white(' Lihat Siswa per Kelas '));

  const className = readlineSync.question(chalk.gray('Masukkan nama kelas: '));
  const students = manager.getStudentsByClass(className);

  if (students.length === 0) {
    console.log(
      chalk.yellow(`\nℹ Belum ada siswa untuk kelas "${className}".`)
    );
    return;
  }

  console.log(
    chalk.cyan(`\n=== ${students.length} SISWA KELAS ${className} ===\n`)
  );

  for (const [index, student] of students.entries()) {
    console.log(chalk.bold(`[${index + 1}] ${student.name}`));
    console.log(chalk.gray(`    ID: ${student.id}`));
    console.log(
      chalk.gray(`    Rata-rata: ${student.getAverage().toFixed(2)}`)
    );
    console.log();
  }
}

/**
 * View class statistics
 */
function viewClassStatistics() {
  console.log('\n' + chalk.bgBlue.white(' Statistik Kelas '));

  const className = readlineSync.question(chalk.gray('Masukkan nama kelas: '));
  const stats = manager.getClassStatistics(className);

  if (!stats) {
    console.log(chalk.yellow(`\nℹ Tidak ada data untuk kelas "${className}".`));
    return;
  }

  console.log(chalk.cyan(`\n📊 STATISTIK KELAS ${stats.className}\n`));
  console.log(`Total Siswa      : ${chalk.bold(stats.totalStudents)}`);
  console.log(
    `Rata-rata Kelas  : ${chalk.green(stats.classAverage.toFixed(2))}`
  );
  console.log(
    `Nilai Tertinggi  : ${chalk.green(stats.highestAverage.toFixed(2))}`
  );
  console.log(
    `Nilai Terendah   : ${chalk.yellow(stats.lowestAverage.toFixed(2))}`
  );
  console.log(`Lulus            : ${chalk.green(stats.passingStudents)}`);
  console.log(`Tidak Lulus      : ${chalk.red(stats.failingStudents)}`);
  console.log(
    `Persentase Lulus : ${chalk.bold(stats.passRate.toFixed(2) + '%')}`
  );
}

/**
 * Export reports menu
 */
function exportReports() {
  console.log('\n' + chalk.bgBlue.white(' Export Laporan '));
  console.log('\n1. Export Semua Siswa (TXT)');
  console.log('2. Export Top 3 Siswa (TXT)');
  console.log('3. Export Data ke CSV');
  console.log('4. Export Statistik Kelas (TXT)');
  console.log('0. Kembali');

  const choice = readlineSync.question(chalk.gray('\nPilih (0-4): '));

  switch (choice) {
    case '1': {
      const filepath = exporter.exportAllStudentsTXT(manager.getAllStudents());
      if (filepath) {
        console.log(chalk.green(`\n✓ Laporan berhasil di-export ke:`));
        console.log(chalk.cyan(`  ${filepath}`));
      }
      break;
    }

    case '2': {
      const topStudents = manager.getTopStudents(3);
      const filepath = exporter.exportTopStudentsTXT(topStudents, 3);
      if (filepath) {
        console.log(chalk.green(`\n✓ Laporan berhasil di-export ke:`));
        console.log(chalk.cyan(`  ${filepath}`));
      }
      break;
    }

    case '3': {
      const filepath = exporter.exportToCSV(manager.getAllStudents());
      if (filepath) {
        console.log(chalk.green(`\n✓ Data berhasil di-export ke:`));
        console.log(chalk.cyan(`  ${filepath}`));
      }
      break;
    }

    case '4': {
      const className = readlineSync.question(chalk.gray('Nama kelas: '));
      const stats = manager.getClassStatistics(className);
      if (stats) {
        const filepath = exporter.exportClassStatisticsTXT(stats);
        if (filepath) {
          console.log(chalk.green(`\n✓ Statistik berhasil di-export ke:`));
          console.log(chalk.cyan(`  ${filepath}`));
        }
      } else {
        console.log(
          chalk.yellow(`\nℹ Tidak ada data untuk kelas "${className}".`)
        );
      }
      break;
    }

    case '0':
      return;

    default:
      console.log(chalk.red('\n✗ Pilihan tidak valid!'));
  }
}

/**
 * Backup data
 */
function backupData() {
  console.log('\n' + chalk.bgBlue.white(' Backup Data '));
  persistence.createBackup();
}

/**
 * Main program loop
 */
function main() {
  console.log(
    chalk.bold.green(
      '\n✨ Selamat datang di Sistem Manajemen Nilai Siswa! ✨\n'
    )
  );

  let running = true;

  while (running) {
    displayMenu();
    const choice = readlineSync.question(chalk.bold('\nPilih menu (0-11): '));

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
      case '10':
        exportReports();
        break;
      case '11':
        backupData();
        break;
      case '0':
        console.log(
          chalk.green('\n✨ Terima kasih telah menggunakan aplikasi ini! ✨\n')
        );
        running = false;
        break;
      default:
        console.log(chalk.red('\n✗ Pilihan tidak valid!'));
    }

    if (running && choice !== '0') {
      readlineSync.question(chalk.gray('\n[Tekan Enter untuk kembali...]'));
    }
  }
}

// Run application
main();
