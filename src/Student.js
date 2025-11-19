/**
 * Class Student
 * Representasi dari seorang siswa dengan data dan nilai-nilainya
 *
 * Implementasikan class Student dengan:
 * - Constructor untuk inisialisasi properti (id, name, class, grades)
 * - Method addGrade(subject, score) untuk menambah nilai mata pelajaran
 * - Method getAverage() untuk menghitung rata-rata nilai
 * - Method getGradeStatus() untuk menentukan status Lulus/Tidak Lulus
 * - Method displayInfo() untuk menampilkan informasi siswa
 *
 * Kriteria Lulus: rata-rata >= 75
 */

class Student {
  // Implementasikan constructor
  // Properti yang dibutuhkan:
  // - id: ID unik siswa
  // - name: Nama siswa
  // - class: Kelas siswa
  // - grades: Object untuk menyimpan nilai {subject: score}

  static PASSING_SCORE = 75;

  constructor(id, name, studentClass) {
    // Normalize input: Convert to string and trim whitespace
    // Handles: numbers, whitespace, null/undefined
    const trimmedId = String(id || '').trim();
    const trimmedName = (name || '').trim();
    const trimmedClass = (studentClass || '').trim();

    // Validate after normalization to give user-friendly experience
    if (!trimmedId) throw new Error('ID siswa tidak boleh kosong');
    if (!trimmedName) throw new Error('Nama siswa tidak boleh kosong');
    if (!trimmedClass) throw new Error('Kelas siswa tidak boleh kosong');

    // Assign normalized values to properties
    this.id = trimmedId;
    this.name = trimmedName;
    this.class = trimmedClass;
    this.grades = {};
  }

  /**
   * Menambah atau update nilai mata pelajaran
   * @param {string} subject - Nama mata pelajaran
   * @param {number} score - Nilai (0-100)
   * Validasi bahwa score harus antara 0-100
   */
  addGrade(subject, score) {
    // Validate subject
    const trimmedSubject = (subject || '').trim();

    if (!trimmedSubject)
      throw new Error('Nama mata pelajaran tidak boleh kosong');

    // Type validation
    if (typeof score !== 'number')
      throw new TypeError('Nilai harus berupa angka');

    // Special number validation
    if (Number.isNaN(score) || !Number.isFinite(score))
      throw new TypeError('Nilai tidak valid');

    // Business invariant: scores are 0-100
    if (score < 0 || score > 100) throw new Error('Nilai harus antara 0-100');

    // Guaranteed valid: assign
    this.grades[trimmedSubject] = score;
  }

  /**
   * Menghitung rata-rata nilai dari semua mata pelajaran
   * @returns {number} Rata-rata nilai
   * Hitung total nilai dibagi jumlah mata pelajaran
   */
  getAverage() {
    const gradeValues = Object.values(this.grades);
    if (gradeValues.length === 0) return 0;

    const total = gradeValues.reduce((sum, grade) => sum + grade, 0);
    return Math.round((total / gradeValues.length) * 100) / 100;
  }

  /**
   * Menentukan status kelulusan siswa
   * @returns {string} "Lulus" atau "Tidak Lulus"
   * Return "Lulus" jika rata-rata >= 75, selain itu "Tidak Lulus"
   */
  getGradeStatus() {
    if (Object.keys(this.grades).length === 0) {
      return 'Belum Ada Nilai';
    }

    return this.getAverage() >= Student.PASSING_SCORE ? 'Lulus' : 'Tidak Lulus';
  }

  /**
   * Menampilkan informasi lengkap siswa
   * Tampilkan ID, Nama, Kelas, semua nilai, rata-rata, dan status
   */
  displayInfo() {
    console.log(`ID: ${this.id}`);
    console.log(`Nama: ${this.name}`);
    console.log(`Kelas: ${this.class}`);
    console.log('Mata Pelajaran:');

    const entries = Object.entries(this.grades);
    if (entries.length === 0) {
      console.log('  (Belum ada nilai)');
    } else {
      for (const [subject, score] of entries) {
        console.log(`  - ${subject}: ${score}`);
      }
    }

    console.log(`Rata-rata: ${this.getAverage().toFixed(2)}`);
    console.log(`Status: ${this.getGradeStatus()}`);
    console.log('------------------------');
  }
}

export default Student;
