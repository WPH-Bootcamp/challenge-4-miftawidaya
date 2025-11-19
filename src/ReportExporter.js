/**
 * ReportExporter Module
 * Menangani export laporan ke berbagai format
 */

import fs from 'node:fs';
import path from 'node:path';

class ReportExporter {
  constructor(outputDir = 'reports') {
    this.outputDir = path.join(process.cwd(), outputDir);
    this.#ensureOutputDirectory();
  }

  /**
   * Memastikan direktori output ada
   * @private
   */
  #ensureOutputDirectory() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Generate timestamp untuk nama file
   * @private
   * @returns {string}
   */
  #getTimestamp() {
    const now = new Date();
    return now
      .toISOString()
      .replace(/T/, '_')
      .replace(/\..+/, '')
      .replaceAll(':', '-');
  }

  /**
   * Export laporan semua siswa ke format TXT
   * @param {Array<Student>} students - Array siswa
   * @returns {string|null} Path file yang dibuat, atau null jika gagal
   */
  exportAllStudentsTXT(students) {
    try {
      const timestamp = this.#getTimestamp();
      const filename = `laporan_semua_siswa_${timestamp}.txt`;
      const filepath = path.join(this.outputDir, filename);

      let content = '';
      content += '='.repeat(60) + '\n';
      content += 'LAPORAN DAFTAR SEMUA SISWA\n';
      content += `Tanggal: ${new Date().toLocaleString('id-ID')}\n`;
      content += `Total Siswa: ${students.length}\n`;
      content += '='.repeat(60) + '\n\n';

      if (students.length === 0) {
        content += 'Belum ada data siswa dalam sistem.\n';
      } else {
        for (const [index, student] of students.entries()) {
          content += `[${index + 1}] ${student.name}\n`;
          content += '-'.repeat(60) + '\n';
          content += `ID            : ${student.id}\n`;
          content += `Nama          : ${student.name}\n`;
          content += `Kelas         : ${student.class}\n`;
          content += `Mata Pelajaran:\n`;

          const grades = Object.entries(student.grades);
          if (grades.length === 0) {
            content += `  (Belum ada nilai)\n`;
          } else {
            for (const [subject, score] of grades) {
              content += `  - ${subject}: ${score}\n`;
            }
          }

          content += `Rata-rata     : ${student.getAverage().toFixed(2)}\n`;
          content += `Status        : ${student.getGradeStatus()}\n`;
          content += '\n';
        }
      }

      fs.writeFileSync(filepath, content, 'utf8');
      return filepath;
    } catch (error) {
      console.error('Error exporting TXT report:', error.message);
      return null;
    }
  }

  /**
   * Export laporan top students ke format TXT
   * @param {Array<Student>} topStudents - Array top siswa
   * @param {number} n - Jumlah top students
   * @returns {string|null}
   */
  exportTopStudentsTXT(topStudents, n = 3) {
    try {
      const timestamp = this.#getTimestamp();
      const filename = `laporan_top_${n}_siswa_${timestamp}.txt`;
      const filepath = path.join(this.outputDir, filename);

      let content = '';
      content += '='.repeat(60) + '\n';
      content += `LAPORAN TOP ${n} SISWA TERBAIK\n`;
      content += `Tanggal: ${new Date().toLocaleString('id-ID')}\n`;
      content += '='.repeat(60) + '\n\n';

      if (topStudents.length === 0) {
        content += 'Belum ada data siswa dalam sistem.\n';
      } else {
        for (const [index, student] of topStudents.entries()) {
          content += `PERINGKAT ${index + 1}\n`;
          content += '-'.repeat(60) + '\n';
          content += `ID            : ${student.id}\n`;
          content += `Nama          : ${student.name}\n`;
          content += `Kelas         : ${student.class}\n`;
          content += `Rata-rata     : ${student.getAverage().toFixed(2)}\n`;
          content += `Status        : ${student.getGradeStatus()}\n`;
          content += '\n';
        }
      }

      fs.writeFileSync(filepath, content, 'utf8');
      return filepath;
    } catch (error) {
      console.error('Error exporting top students TXT:', error.message);
      return null;
    }
  }

  /**
   * Export statistik kelas ke format TXT
   * @param {Object} statistics - Object statistik kelas
   * @returns {string|null}
   */
  exportClassStatisticsTXT(statistics) {
    try {
      const timestamp = this.#getTimestamp();
      const filename = `laporan_statistik_kelas_${statistics.className}_${timestamp}.txt`;
      const filepath = path.join(this.outputDir, filename);

      let content = '';
      content += '='.repeat(60) + '\n';
      content += `LAPORAN STATISTIK KELAS ${statistics.className}\n`;
      content += `Tanggal: ${new Date().toLocaleString('id-ID')}\n`;
      content += '='.repeat(60) + '\n\n';

      content += `Total Siswa       : ${statistics.totalStudents}\n`;
      content += `Rata-rata Kelas   : ${statistics.classAverage.toFixed(2)}\n`;
      content += `Nilai Tertinggi   : ${statistics.highestAverage.toFixed(
        2
      )}\n`;
      content += `Nilai Terendah    : ${statistics.lowestAverage.toFixed(2)}\n`;
      content += `Siswa Lulus       : ${statistics.passingStudents}\n`;
      content += `Siswa Tidak Lulus : ${statistics.failingStudents}\n`;
      content += `Persentase Lulus  : ${statistics.passRate.toFixed(2)}%\n`;
      content += '\n';

      fs.writeFileSync(filepath, content, 'utf8');
      return filepath;
    } catch (error) {
      console.error('Error exporting class statistics:', error.message);
      return null;
    }
  }

  /**
   * Export data ke format CSV
   * @param {Array<Student>} students - Array siswa
   * @returns {string|null}
   */
  exportToCSV(students) {
    try {
      const timestamp = this.#getTimestamp();
      const filename = `data_siswa_${timestamp}.csv`;
      const filepath = path.join(this.outputDir, filename);

      // CSV Header
      let content = 'ID,Nama,Kelas,Rata-rata,Status\n';

      // CSV Data
      for (const student of students) {
        const avg = student.getAverage().toFixed(2);
        const status = student.getGradeStatus();
        content += `"${student.id}","${student.name}","${student.class}",${avg},"${status}"\n`;
      }

      fs.writeFileSync(filepath, content, 'utf8');
      return filepath;
    } catch (error) {
      console.error('Error exporting CSV:', error.message);
      return null;
    }
  }

  /**
   * Export detail siswa individual ke TXT
   * @param {Student} student - Object Student
   * @returns {string|null}
   */
  exportStudentDetailTXT(student) {
    try {
      const timestamp = this.#getTimestamp();
      const filename = `siswa_${student.id}_${timestamp}.txt`;
      const filepath = path.join(this.outputDir, filename);

      let content = '';
      content += '='.repeat(60) + '\n';
      content += 'LAPORAN DETAIL SISWA\n';
      content += `Tanggal: ${new Date().toLocaleString('id-ID')}\n`;
      content += '='.repeat(60) + '\n\n';

      content += `ID            : ${student.id}\n`;
      content += `Nama          : ${student.name}\n`;
      content += `Kelas         : ${student.class}\n`;
      content += `\nMata Pelajaran:\n`;

      const grades = Object.entries(student.grades);
      if (grades.length === 0) {
        content += `  (Belum ada nilai)\n`;
      } else {
        for (const [subject, score] of grades) {
          content += `  - ${subject}: ${score}\n`;
        }
      }

      content += `\nRata-rata     : ${student.getAverage().toFixed(2)}\n`;
      content += `Status        : ${student.getGradeStatus()}\n`;

      fs.writeFileSync(filepath, content, 'utf8');
      return filepath;
    } catch (error) {
      console.error('Error exporting student detail:', error.message);
      return null;
    }
  }

  /**
   * List semua file laporan yang ada
   * @returns {Array<string>}
   */
  listReports() {
    try {
      const files = fs.readdirSync(this.outputDir);
      return files.filter(
        (file) => file.endsWith('.txt') || file.endsWith('.csv')
      );
    } catch (error) {
      console.error('Error listing reports:', error.message);
      return [];
    }
  }
}

export default ReportExporter;
