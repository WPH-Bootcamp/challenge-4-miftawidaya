/**
 * Class StudentManager
 * Mengelola koleksi siswa dan operasi-operasi terkait
 *
 * TODO: Implementasikan class StudentManager dengan:
 * - Constructor untuk inisialisasi array students
 * - Method addStudent(student) untuk menambah siswa
 * - Method removeStudent(id) untuk menghapus siswa
 * - Method findStudent(id) untuk mencari siswa
 * - Method updateStudent(id, data) untuk update data siswa
 * - Method getAllStudents() untuk mendapatkan semua siswa
 * - Method getTopStudents(n) untuk mendapatkan top n siswa
 * - Method displayAllStudents() untuk menampilkan semua siswa
 */

class StudentManager {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - students: Array untuk menyimpan semua siswa

  #students;

  constructor() {
    this.#students = [];
  }

  /**
   * Normalisasi nilai string umum (id, nama, kelas, dsb).
   * Selalu mengembalikan string trim (bisa kosong).
   * @param {*} value
   * @returns {string}
   */
  #normalizeText(value) {
    if (value === undefined || value === null) {
      return '';
    }

    return String(value).trim();
  }

  /**
   * Normalisasi ID siswa untuk konsistensi pencarian.
   * @param {*} id
   * @returns {string}
   */
  #normalizeId(id) {
    return this.#normalizeText(id);
  }

  /**
   * Menyediakan akses read-only terhadap daftar siswa.
   * Mengembalikan salinan beku agar pihak luar tidak bisa memodifikasi
   * koleksi internal secara langsung.
   */
  get students() {
    return Object.freeze([...this.#students]);
  }

  /**
   * Menambah siswa baru ke dalam sistem
   * @param {Student} student - Object Student yang akan ditambahkan
   * @returns {boolean} true jika berhasil, false jika ID sudah ada
   * TODO: Validasi bahwa ID belum digunakan
   */
  addStudent(student) {
    if (!student) {
      console.error('Student object is required');
      return false;
    }

    // Validation: Check if student has an ID
    if (!student.id) {
      console.error('Student must have an ID');
      return false;
    }

    // Business Rule: Check for duplicate ID
    const normalizedId = this.#normalizeId(student.id);
    if (!normalizedId) {
      console.error('Student must have a valid ID');
      return false;
    }

    const existingStudent = this.findStudent(normalizedId);

    if (existingStudent) {
      // Duplicate ID found - business rule violation
      return false;
    }

    // Add student to collection
    this.#students.push(student);
    return true;
  }

  /**
   * Menghapus siswa berdasarkan ID
   * @param {string} id - ID siswa yang akan dihapus
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari dan hapus siswa dari array
   */
  removeStudent(id) {
    if (!id) {
      return false;
    }

    // Store initial length to detect if removal occurred
    const normalizedId = this.#normalizeId(id);
    if (!normalizedId) {
      return false;
    }

    const initialLength = this.#students.length;

    // Filter out the student with matching ID
    this.#students = this.#students.filter(
      (student) => student.id !== normalizedId
    );

    // Return true if array length changed (student was removed)
    return this.#students.length < initialLength;
  }

  /**
   * Mencari siswa berdasarkan ID
   * @param {string} id - ID siswa yang dicari
   * @returns {Student|null} Object Student jika ditemukan, null jika tidak
   * TODO: Gunakan method array untuk mencari siswa
   */
  findStudent(id) {
    if (!id) {
      return null;
    }

    // Normalize ID for comparison (trim whitespace)
    const normalizedId = this.#normalizeId(id);
    if (!normalizedId) {
      return null;
    }

    // Find student with matching ID
    const student = this.#students.find((s) => s.id === normalizedId);

    // Return student or null if not found
    return student || null;
  }

  /**
   * Update data siswa
   * @param {string} id - ID siswa yang akan diupdate
   * @param {object} data - Data baru (name, class, dll)
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari siswa dan update propertinya
   */
  updateStudent(id, data) {
    // Validation: Check parameters
    if (!id || !data) {
      return false;
    }

    // Find the student
    const student = this.findStudent(id);

    if (!student) {
      // Student not found
      return false;
    }

    // Update name if provided
    if (Object.hasOwn(data, 'name')) {
      const trimmedName = this.#normalizeText(data.name);

      if (!trimmedName) {
        // Don't allow empty name
        throw new Error('Nama siswa tidak boleh kosong');
      }

      student.name = trimmedName;
    }

    // Update class if provided
    if (Object.hasOwn(data, 'class')) {
      const trimmedClass = this.#normalizeText(data.class);

      if (!trimmedClass) {
        // Don't allow empty class
        throw new Error('Kelas siswa tidak boleh kosong');
      }

      student.class = trimmedClass;
    }

    // Note: ID and grades are not updated through this method
    // - ID is immutable (business rule)
    // - Grades should be updated through student.addGrade()

    return true;
  }

  /**
   * Mendapatkan semua siswa
   * @returns {Array} Array berisi semua siswa
   */
  getAllStudents() {
    return [...this.#students];
  }

  /**
   * Mendapatkan top n siswa berdasarkan rata-rata nilai
   * @param {number} n - Jumlah siswa yang ingin didapatkan
   * @returns {Array} Array berisi top n siswa
   * TODO: Sort siswa berdasarkan rata-rata (descending) dan ambil n teratas
   */
  getTopStudents(n) {
    // Validation: n must be positive
    if (!n || n <= 0) {
      return [];
    }

    // Create a copy and sort by average (descending)
    const sorted = [...this.#students].sort((a, b) => {
      return b.getAverage() - a.getAverage();
    });

    // Return top n students
    // slice() handles case where n > array length
    return sorted.slice(0, n);
  }

  /**
   * Menampilkan informasi semua siswa
   * TODO: Loop semua siswa dan panggil displayInfo() untuk masing-masing
   */
  displayAllStudents() {
    // Implementasi method di sini
  }

  /**
   * BONUS: Mendapatkan siswa berdasarkan kelas
   * @param {string} className - Nama kelas
   * @returns {Array} Array siswa dalam kelas tersebut
   */
  getStudentsByClass(className) {
    // Implementasi method di sini (BONUS)
  }

  /**
   * BONUS: Mendapatkan statistik kelas
   * @param {string} className - Nama kelas
   * @returns {object} Object berisi statistik (jumlah siswa, rata-rata kelas, dll)
   */
  getClassStatistics(className) {
    // Implementasi method di sini (BONUS)
  }
}

export default StudentManager;
