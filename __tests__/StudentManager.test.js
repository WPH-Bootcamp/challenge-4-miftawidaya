/**
 * Test Suite for Student Class
 *
 * Run with: npm run test:student
 */

import Student from '../src/Student.js';
import StudentManager from '../src/StudentManager.js';
import TestRunner from './utils/TestRunner.js';

const runner = new TestRunner();

// --------------------------------------------------
// TES STUDENTMANAGER - KONSTRUKTOR
// --------------------------------------------------
console.log('\n' + '='.repeat(50));
console.log('TES STUDENTMANAGER - KONSTRUKTOR');
console.log('='.repeat(50) + '\n');

console.log('--- Kategori 1: Inisialisasi Manager ---\n');

runner.test('Manager dibuat dengan array students kosong', () => {
  const manager = new StudentManager();

  runner.assertTypeOf(
    manager.students,
    'object',
    'students harus berupa object (array)'
  );
  runner.assertTrue(
    Array.isArray(manager.students),
    'students harus berupa array'
  );
  runner.assertArrayLength(manager.students, 0, 'Array students awal kosong');
});

runner.test('Setiap instance manager memiliki students terpisah', () => {
  const manager1 = new StudentManager();
  const manager2 = new StudentManager();

  runner.assertTrue(
    manager1.students !== manager2.students,
    'Array students berbeda objek'
  );
});

runner.test('Array students bersifat read-only (frozen)', () => {
  const manager = new StudentManager();
  const studentsRef = manager.students;

  runner.assertTrue(
    Object.isFrozen(studentsRef),
    'Array students harus frozen'
  );
});

// --------------------------------------------------
// TES STUDENTMANAGER - METHOD addStudent
// --------------------------------------------------
console.log('\n' + '='.repeat(50));
console.log('TES STUDENTMANAGER - METHOD addStudent');
console.log('='.repeat(50) + '\n');

console.log('\n--- Kategori 2: addStudent Operasi Valid ---\n');

runner.test('Tambah satu siswa berhasil', () => {
  const manager = new StudentManager();
  const student = new Student('S001', 'Budi Santoso', '10A');

  const result = manager.addStudent(student);

  runner.assertTrue(result, 'addStudent mengembalikan true');
  runner.assertArrayLength(manager.students, 1, 'Array berisi 1 siswa');
});

runner.test('Tambah beberapa siswa dengan ID berbeda', () => {
  const manager = new StudentManager();
  const student1 = new Student('S001', 'Budi', '10A');
  const student2 = new Student('S002', 'Ahmad', '10B');
  const student3 = new Student('S003', 'Siti', '10A');

  manager.addStudent(student1);
  manager.addStudent(student2);
  manager.addStudent(student3);

  runner.assertArrayLength(manager.students, 3, 'Manager berisi 3 siswa');
});

runner.test('Siswa yang ditambahkan tersimpan dengan benar', () => {
  const manager = new StudentManager();
  const student = new Student('S001', 'Budi', '10A');

  manager.addStudent(student);

  const stored = manager.students[0];
  runner.assertEqual(stored.id, 'S001', 'ID tersimpan benar');
  runner.assertEqual(stored.name, 'Budi', 'Nama tersimpan benar');
  runner.assertEqual(stored.class, '10A', 'Kelas tersimpan benar');
});

console.log('\n--- Kategori 3: addStudent Validasi Duplicate ID ---\n');

runner.test('Gagal menambah siswa dengan ID duplikat', () => {
  const manager = new StudentManager();
  const student1 = new Student('S001', 'Budi', '10A');
  const student2 = new Student('S001', 'Ahmad', '10B');

  const result1 = manager.addStudent(student1);
  const result2 = manager.addStudent(student2);

  runner.assertTrue(result1, 'Siswa pertama berhasil ditambah');
  runner.assertFalse(result2, 'Siswa kedua gagal (ID duplikat)');
  runner.assertArrayLength(manager.students, 1, 'Hanya 1 siswa tersimpan');
});

runner.test('ID dengan spasi dinormalisasi, duplikat terdeteksi', () => {
  const manager = new StudentManager();
  const student1 = new Student('S001', 'Budi', '10A');
  const student2 = new Student('  S001  ', 'Ahmad', '10B');

  const result1 = manager.addStudent(student1);
  const result2 = manager.addStudent(student2);

  runner.assertTrue(result1, 'Siswa pertama berhasil');
  runner.assertFalse(result2, 'Siswa kedua gagal (ID sama setelah trim)');
  runner.assertArrayLength(manager.students, 1, 'Hanya 1 siswa');
});

runner.test('ID case-sensitive - S001 dan s001 berbeda', () => {
  const manager = new StudentManager();
  const student1 = new Student('S001', 'Budi', '10A');
  const student2 = new Student('s001', 'Ahmad', '10B');

  const result1 = manager.addStudent(student1);
  const result2 = manager.addStudent(student2);

  runner.assertTrue(result1, 'S001 berhasil');
  runner.assertTrue(result2, 's001 berhasil (berbeda dari S001)');
  runner.assertArrayLength(manager.students, 2, 'Kedua siswa tersimpan');
});

console.log('\n--- Kategori 4: addStudent Validasi Input ---\n');

runner.test('Gagal menambah null', () => {
  const manager = new StudentManager();

  const result = manager.addStudent(null);

  runner.assertFalse(result, 'Mengembalikan false untuk null');
  runner.assertArrayLength(manager.students, 0, 'Array tetap kosong');
});

runner.test('Gagal menambah undefined', () => {
  const manager = new StudentManager();

  const result = manager.addStudent(undefined);

  runner.assertFalse(result, 'Mengembalikan false untuk undefined');
  runner.assertArrayLength(manager.students, 0, 'Array tetap kosong');
});

runner.test('Gagal menambah siswa tanpa ID', () => {
  const manager = new StudentManager();
  const invalidStudent = { name: 'Budi', class: '10A' };

  const result = manager.addStudent(invalidStudent);

  runner.assertFalse(result, 'Mengembalikan false untuk siswa tanpa ID');
  runner.assertArrayLength(manager.students, 0, 'Array tetap kosong');
});

runner.test('Gagal menambah siswa dengan ID kosong', () => {
  const manager = new StudentManager();
  const invalidStudent = { id: '', name: 'Budi', class: '10A' };

  const result = manager.addStudent(invalidStudent);

  runner.assertFalse(result, 'Mengembalikan false untuk ID kosong');
  runner.assertArrayLength(manager.students, 0, 'Array tetap kosong');
});

runner.test('Gagal menambah siswa dengan ID hanya spasi', () => {
  const manager = new StudentManager();
  const invalidStudent = { id: '   ', name: 'Budi', class: '10A' };

  const result = manager.addStudent(invalidStudent);

  runner.assertFalse(result, 'Mengembalikan false untuk ID hanya spasi');
  runner.assertArrayLength(manager.students, 0, 'Array tetap kosong');
});

// --------------------------------------------------
// TES STUDENTMANAGER - METHOD removeStudent
// --------------------------------------------------
runner.test('Hapus siswa yang ada', () => {
  const manager = new StudentManager();
  const student = new Student('S001', 'Budi', '10A');
  manager.addStudent(student);

  const result = manager.removeStudent('S001');

  runner.assertTrue(result, 'Hapus berhasil');
  runner.assertArrayLength(manager.students, 0, 'Harus kosong');
});

runner.test('Hapus ID tidak ada harus false', () => {
  const manager = new StudentManager();

  const result = manager.removeStudent('NONEXISTENT');

  runner.assertFalse(result, 'Harus false');
});

runner.test('Hapus siswa di tengah daftar', () => {
  const manager = new StudentManager();
  manager.addStudent(new Student('S001', 'Budi', '10A'));
  manager.addStudent(new Student('S002', 'Ahmad', '10B'));
  manager.addStudent(new Student('S003', 'Siti', '10C'));

  manager.removeStudent('S002');

  runner.assertArrayLength(manager.students, 2, 'Sisa 2 siswa');
  runner.assertNull(manager.findStudent('S002'), 'S002 terhapus');
  runner.assertNotNull(manager.findStudent('S001'), 'S001 masih ada');
  runner.assertNotNull(manager.findStudent('S003'), 'S003 masih ada');
});

runner.test('ID kosong saat hapus harus false', () => {
  const manager = new StudentManager();

  const result = manager.removeStudent('');

  runner.assertFalse(result, 'Harus false');
});

runner.test('ID null saat hapus harus false', () => {
  const manager = new StudentManager();

  const result = manager.removeStudent(null);

  runner.assertFalse(result, 'Harus false');
});

// --------------------------------------------------
// TES STUDENTMANAGER - METHOD findStudent
// --------------------------------------------------
runner.test('Cari siswa dengan ID yang ada', () => {
  const manager = new StudentManager();
  const student = new Student('S001', 'Budi Santoso', '10A');
  manager.addStudent(student);

  const found = manager.findStudent('S001');

  runner.assertNotNull(found, 'Harus ketemu');
  runner.assertEqual(found.id, 'S001', 'ID cocok');
  runner.assertEqual(found.name, 'Budi Santoso', 'Nama cocok');
});

runner.test('ID tidak ada harus null', () => {
  const manager = new StudentManager();

  const found = manager.findStudent('NONEXISTENT');

  runner.assertNull(found, 'Harus null');
});

runner.test('ID kosong harus null', () => {
  const manager = new StudentManager();

  const found = manager.findStudent('');

  runner.assertNull(found, 'Harus null');
});

runner.test('ID null harus null', () => {
  const manager = new StudentManager();

  const found = manager.findStudent(null);

  runner.assertNull(found, 'Harus null');
});

runner.test('ID dengan spasi tetap ketemu', () => {
  const manager = new StudentManager();
  const student = new Student('S001', 'Budi', '10A');
  manager.addStudent(student);

  const found = manager.findStudent('  S001  ');

  runner.assertNotNull(found, 'Harus ketemu');
  runner.assertEqual(found.id, 'S001');
});

runner.test('Cari siswa yang tepat saat banyak data', () => {
  const manager = new StudentManager();
  manager.addStudent(new Student('S001', 'Budi', '10A'));
  manager.addStudent(new Student('S002', 'Ahmad', '10B'));
  manager.addStudent(new Student('S003', 'Siti', '10C'));

  const found = manager.findStudent('S002');

  runner.assertEqual(found.name, 'Ahmad', 'Nama harus Ahmad');
});

runner.summary();
