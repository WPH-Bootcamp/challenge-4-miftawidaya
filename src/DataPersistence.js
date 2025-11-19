/**
 * DataPersistence Module
 * Menangani penyimpanan dan pemuatan data ke/dari file JSON
 */

import fs from 'node:fs';
import path from 'node:path';
import Student from './Student.js';

class DataPersistence {
  constructor(filename = 'students.json') {
    this.filepath = path.join(process.cwd(), 'data', filename);
    this.#ensureDataDirectory();
  }

  /**
   * Memastikan direktori data ada
   * @private
   */
  #ensureDataDirectory() {
    const dataDir = path.dirname(this.filepath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  /**
   * Menyimpan data siswa ke file JSON
   * @param {Array<Student>} students - Array siswa yang akan disimpan
   * @returns {boolean} true jika berhasil, false jika gagal
   */
  saveStudents(students) {
    try {
      // Convert students to plain objects for JSON serialization
      const data = students.map((student) => ({
        id: student.id,
        name: student.name,
        class: student.class,
        grades: student.grades,
      }));

      // Write to file with pretty formatting
      fs.writeFileSync(this.filepath, JSON.stringify(data, null, 2), 'utf8');

      console.log(`\n✓ Data berhasil disimpan ke ${this.filepath}`);
      return true;
    } catch (error) {
      console.error('\n✗ Gagal menyimpan data:', error.message);
      return false;
    }
  }

  /**
   * Memuat data siswa dari file JSON
   * @returns {Array<Student>} Array siswa yang dimuat
   */
  loadStudents() {
    try {
      // Check if file exists
      if (!fs.existsSync(this.filepath)) {
        console.log('\nℹ Belum ada file data. Memulai dengan data kosong.');
        return [];
      }

      // Read and parse JSON file
      const fileContent = fs.readFileSync(this.filepath, 'utf8');
      const data = JSON.parse(fileContent);

      // Convert plain objects back to Student instances
      const students = data.map((studentData) => {
        const student = new Student(
          studentData.id,
          studentData.name,
          studentData.class
        );

        // Restore grades
        for (const [subject, score] of Object.entries(studentData.grades)) {
          student.addGrade(subject, score);
        }

        return student;
      });

      console.log(`\n✓ Data berhasil dimuat dari ${this.filepath}`);
      console.log(`  Total siswa: ${students.length}`);
      return students;
    } catch (error) {
      console.error('\n✗ Gagal memuat data:', error.message);
      console.log('  Memulai dengan data kosong.');
      return [];
    }
  }

  /**
   * Membuat backup file data
   * @returns {boolean} true jika berhasil
   */
  createBackup() {
    try {
      if (!fs.existsSync(this.filepath)) {
        console.log('\nℹ Tidak ada data untuk di-backup.');
        return false;
      }

      const timestamp = new Date().toISOString().replaceAll(':', '-');
      const backupPath = this.filepath.replace(
        '.json',
        `_backup_${timestamp}.json`
      );

      fs.copyFileSync(this.filepath, backupPath);
      console.log(`\n✓ Backup berhasil dibuat: ${backupPath}`);
      return true;
    } catch (error) {
      console.error('\n✗ Gagal membuat backup:', error.message);
      return false;
    }
  }

  /**
   * Mengecek apakah file data ada
   * @returns {boolean}
   */
  fileExists() {
    return fs.existsSync(this.filepath);
  }

  /**
   * Menghapus file data
   * @returns {boolean}
   */
  deleteDataFile() {
    try {
      if (fs.existsSync(this.filepath)) {
        fs.unlinkSync(this.filepath);
        console.log('\n✓ File data berhasil dihapus.');
        return true;
      }
      console.log('\nℹ File data tidak ditemukan.');
      return false;
    } catch (error) {
      console.error('\n✗ Gagal menghapus file data:', error.message);
      return false;
    }
  }
}

export default DataPersistence;
