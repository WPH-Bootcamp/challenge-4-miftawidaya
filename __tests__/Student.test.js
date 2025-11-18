/**
 * Test Suite for Student Class
 *
 * Run with: npm run test:student
 */

import Student from '../src/Student.js';
import TestRunner from './utils/TestRunner.js';

const runner = new TestRunner();

console.log('\n' + '='.repeat(50));
console.log('TES STUDENT - KONSTRUKTOR');
console.log('='.repeat(50) + '\n');

console.log('--- Kategori 1: Konstruktor Valid ---\n');

runner.test('Buat siswa dengan data valid', () => {
  const student = new Student('S001', 'Budi Santoso', '10A');

  runner.assertEqual(student.id, 'S001', 'ID sama');
  runner.assertEqual(student.name, 'Budi Santoso', 'Nama sama');
  runner.assertEqual(student.class, '10A', 'Kelas sama');
});

runner.test('Nilai awal kosong', () => {
  const student = new Student('S002', 'Ahmad', '10B');

  runner.assertTypeOf(student.grades, 'object', 'Nilai berbentuk objek');
  runner.assertEqual(
    Object.keys(student.grades).length,
    0,
    'Nilai masih kosong'
  );
});

runner.test('ID angka jadi string', () => {
  const student = new Student(123, 'Test Student', '11A');

  runner.assertTypeOf(student.id, 'string', 'ID berubah ke string');
  runner.assertEqual(student.id, '123', 'ID angka jadi "123"');
});

runner.test('ID campuran diterima', () => {
  const student1 = new Student('STU001', 'Student One', '10A');
  const student2 = new Student('2024-001', 'Student Two', '10B');

  runner.assertEqual(student1.id, 'STU001');
  runner.assertEqual(student2.id, '2024-001');
});

runner.test('Spasi dibersihkan', () => {
  const student = new Student('  S003  ', '  John Doe  ', '  10C  ');

  runner.assertEqual(student.id, 'S003', 'ID rapi');
  runner.assertEqual(student.name, 'John Doe', 'Nama rapi');
  runner.assertEqual(student.class, '10C', 'Kelas rapi');
});

console.log('\n--- Kategori 2: Validasi ID ---\n');

runner.test('Gagal saat ID kosong', () => {
  runner.assertThrows(() => new Student('', 'Nama Valid', '10A'), 'kosong');
});

runner.test('Gagal saat ID null', () => {
  runner.assertThrows(() => new Student(null, 'Nama Valid', '10A'), 'kosong');
});

runner.test('Gagal saat ID undefined', () => {
  runner.assertThrows(
    () => new Student(undefined, 'Nama Valid', '10A'),
    'kosong'
  );
});

runner.test('Gagal saat ID hanya spasi', () => {
  runner.assertThrows(() => new Student('   ', 'Nama Valid', '10A'), 'kosong');
});

console.log('\n--- Kategori 3: Validasi Nama ---\n');

runner.test('Gagal saat nama kosong', () => {
  runner.assertThrows(() => new Student('S001', '', '10A'), 'kosong');
});

runner.test('Gagal saat nama null', () => {
  runner.assertThrows(() => new Student('S001', null, '10A'), 'kosong');
});

runner.test('Gagal saat nama undefined', () => {
  runner.assertThrows(() => new Student('S001', undefined, '10A'), 'kosong');
});

runner.test('Gagal saat nama hanya spasi', () => {
  runner.assertThrows(() => new Student('S001', '   ', '10A'), 'kosong');
});

console.log('\n--- Kategori 4: Validasi Kelas ---\n');

runner.test('Gagal saat kelas kosong', () => {
  runner.assertThrows(() => new Student('S001', 'Nama Valid', ''), 'kosong');
});

runner.test('Gagal saat kelas null', () => {
  runner.assertThrows(() => new Student('S001', 'Nama Valid', null), 'kosong');
});

runner.test('Gagal saat kelas undefined', () => {
  runner.assertThrows(
    () => new Student('S001', 'Nama Valid', undefined),
    'kosong'
  );
});

runner.test('Gagal saat kelas hanya spasi', () => {
  runner.assertThrows(() => new Student('S001', 'Nama Valid', '   '), 'kosong');
});

console.log('\n--- Kategori 5: Kasus Khusus ---\n');

runner.test('Nama panjang diterima', () => {
  const longName = 'A'.repeat(100);
  const student = new Student('S001', longName, '10A');

  runner.assertEqual(student.name, longName, 'Nama panjang oke');
});

runner.test('Nama dengan karakter khusus', () => {
  const student = new Student('S001', "O'Brien-Smith", '10A');

  runner.assertEqual(student.name, "O'Brien-Smith");
});

runner.test('Nama dengan huruf unikode', () => {
  const student = new Student('S001', 'Müller José', '10A');

  runner.assertEqual(student.name, 'Müller José');
});

runner.test('Format kelas beragam', () => {
  const student1 = new Student('S001', 'Name', '10-IPA-1');
  const student2 = new Student('S002', 'Name', 'XII Science');

  runner.assertEqual(student1.class, '10-IPA-1');
  runner.assertEqual(student2.class, 'XII Science');
});

runner.test('Objek siswa saling bebas', () => {
  const student1 = new Student('S001', 'Student One', '10A');
  const student2 = new Student('S002', 'Student Two', '10B');

  runner.assertTrue(student1 !== student2, 'Objek beda');
  runner.assertTrue(student1.grades !== student2.grades, 'Nilai terpisah');
});

console.log('\n--- Kategori 6: Tipe Data ---\n');

runner.test('Tipe properti benar', () => {
  const student = new Student('S001', 'Test Student', '10A');

  runner.assertTypeOf(student.id, 'string', 'ID tipe string');
  runner.assertTypeOf(student.name, 'string', 'Nama tipe string');
  runner.assertTypeOf(student.class, 'string', 'Kelas tipe string');
  runner.assertTypeOf(student.grades, 'object', 'Nilai tipe objek');
});

runner.test('Nilai objek biasa', () => {
  const student = new Student('S001', 'Test', '10A');

  runner.assertTrue(student.grades !== null, 'Nilai bukan null');
  runner.assertTrue(
    Array.isArray(student.grades) === false,
    'Nilai bukan array'
  );
});

console.log('\n' + '='.repeat(50));
console.log('TES STUDENT - METHOD addGrade');
console.log('='.repeat(50) + '\n');

console.log('\n--- Kategori 7: addGrade Nilai Valid ---\n');

runner.test('Tambah satu nilai mata pelajaran', () => {
  const student = new Student('S001', 'Budi', '10A');

  student.addGrade('Matematika', 90);

  runner.assertEqual(
    student.grades.Matematika,
    90,
    'Nilai Matematika disimpan dengan benar'
  );
});

runner.test('Tambah beberapa mata pelajaran', () => {
  const student = new Student('S001', 'Budi', '10A');

  student.addGrade('Matematika', 80);
  student.addGrade('IPA', 85);
  student.addGrade('Bahasa Indonesia', 90);

  runner.assertEqual(Object.keys(student.grades).length, 3, 'Ada 3 mapel');
  runner.assertEqual(student.grades.Matematika, 80);
  runner.assertEqual(student.grades.IPA, 85);
  runner.assertEqual(student.grades['Bahasa Indonesia'], 90);
});

runner.test('Update nilai mata pelajaran yang sama', () => {
  const student = new Student('S001', 'Budi', '10A');

  student.addGrade('Matematika', 70);
  student.addGrade('Matematika', 95);

  runner.assertEqual(
    student.grades.Matematika,
    95,
    'Nilai terakhir yang dipakai'
  );
});

console.log('\n--- Kategori 8: addGrade Validasi Subject ---\n');

runner.test('Gagal saat nama mata pelajaran kosong', () => {
  const student = new Student('S001', 'Budi', '10A');

  runner.assertThrows(
    () => student.addGrade('', 80),
    'Nama mata pelajaran tidak boleh kosong'
  );
});

runner.test('Gagal saat nama mata pelajaran hanya spasi', () => {
  const student = new Student('S001', 'Budi', '10A');

  runner.assertThrows(
    () => student.addGrade('   ', 80),
    'Nama mata pelajaran tidak boleh kosong'
  );
});

runner.test('Gagal saat nama mata pelajaran null/undefined', () => {
  const student = new Student('S001', 'Budi', '10A');

  runner.assertThrows(
    () => student.addGrade(null, 80),
    'Nama mata pelajaran tidak boleh kosong'
  );
  runner.assertThrows(
    () => student.addGrade(undefined, 80),
    'Nama mata pelajaran tidak boleh kosong'
  );
});

console.log('\n--- Kategori 9: addGrade Validasi Nilai ---\n');

runner.test('Gagal saat nilai bukan angka', () => {
  const student = new Student('S001', 'Budi', '10A');

  runner.assertThrows(
    () => student.addGrade('Matematika', '90'),
    'Nilai harus berupa angka'
  );
});

runner.test('Gagal saat nilai NaN atau Infinity', () => {
  const student = new Student('S001', 'Budi', '10A');

  runner.assertThrows(
    () => student.addGrade('Matematika', Number.NaN),
    'Nilai tidak valid'
  );
  runner.assertThrows(
    () => student.addGrade('Matematika', Infinity),
    'Nilai tidak valid'
  );
});

runner.test('Gagal saat nilai di luar 0-100', () => {
  const student = new Student('S001', 'Budi', '10A');

  runner.assertThrows(
    () => student.addGrade('Matematika', -10),
    'Nilai harus antara 0-100'
  );
  runner.assertThrows(
    () => student.addGrade('Matematika', 120),
    'Nilai harus antara 0-100'
  );
});

console.log('\n' + '='.repeat(50));
console.log('TES STUDENT - METHOD getAverage');
console.log('='.repeat(50) + '\n');

console.log('\n--- Kategori 10: getAverage Perhitungan ---\n');

runner.test('Rata-rata 0 saat belum ada nilai', () => {
  const student = new Student('S001', 'Budi', '10A');

  runner.assertEqual(student.getAverage(), 0, 'Tanpa nilai, rata-rata 0');
});

runner.test('Rata-rata dengan satu nilai', () => {
  const student = new Student('S001', 'Budi', '10A');

  student.addGrade('Matematika', 88);

  runner.assertEqual(student.getAverage(), 88, 'Rata-rata satu nilai sama');
});

runner.test('Rata-rata beberapa nilai dibulatkan 2 desimal', () => {
  const student = new Student('S001', 'Budi', '10A');

  student.addGrade('Matematika', 80);
  student.addGrade('IPA', 81);
  student.addGrade('Bahasa Indonesia', 82);
  student.addGrade('Bahasa Inggris', 83); // (80+81+82+83)/4 = 81.5

  runner.assertEqual(student.getAverage(), 81.5, 'Rata-rata 81.5');
});

console.log('\n--- Kategori 11: getGradeStatus Status Kelulusan ---\n');

runner.test('Status belum ada nilai', () => {
  const student = new Student('S001', 'Budi', '10A');

  runner.assertEqual(
    student.getGradeStatus(),
    'Belum Ada Nilai',
    'Tanpa nilai, status khusus'
  );
});

runner.test('Status Lulus saat rata-rata >= 75', () => {
  const student = new Student('S001', 'Budi', '10A');

  student.addGrade('Matematika', 80);
  student.addGrade('IPA', 90);

  runner.assertEqual(student.getGradeStatus(), 'Lulus', 'Harus lulus');
});

runner.test('Status Tidak Lulus saat rata-rata < 75', () => {
  const student = new Student('S001', 'Budi', '10A');

  student.addGrade('Matematika', 60);
  student.addGrade('IPA', 70);

  runner.assertEqual(
    student.getGradeStatus(),
    'Tidak Lulus',
    'Harus tidak lulus'
  );
});

runner.test('Status Lulus tepat di batas 75', () => {
  const student = new Student('S001', 'Budi', '10A');

  student.addGrade('Matematika', 75);
  student.addGrade('IPA', 75);

  runner.assertEqual(student.getGradeStatus(), 'Lulus', 'Batas 75 tetap lulus');
});

console.log('\n' + '='.repeat(50));
console.log('TES STUDENT - METHOD displayInfo');
console.log('='.repeat(50) + '\n');

console.log('\n--- Kategori 12: displayInfo Output ---\n');

runner.test('displayInfo tanpa nilai', () => {
  const student = new Student('S001', 'Budi Santoso', '10A');

  const logs = [];
  const originalLog = console.log;
  console.log = (msg) => logs.push(String(msg));

  student.displayInfo();

  console.log = originalLog;

  runner.assertArrayContains(logs, 'ID: S001', 'ID tercetak');
  runner.assertArrayContains(logs, 'Nama: Budi Santoso', 'Nama tercetak');
  runner.assertArrayContains(logs, 'Kelas: 10A', 'Kelas tercetak');
  runner.assertArrayContains(logs, 'Mata Pelajaran:', 'Header mapel tercetak');
  runner.assertArrayContains(
    logs,
    '  (Belum ada nilai)',
    'Pesan belum ada nilai'
  );
  runner.assertArrayContains(
    logs,
    'Rata-rata: 0.00',
    'Rata-rata 0.00 tercetak'
  );
  runner.assertArrayContains(
    logs,
    'Status: Belum Ada Nilai',
    'Status belum ada nilai tercetak'
  );
});

runner.test('displayInfo dengan nilai', () => {
  const student = new Student('S001', 'Budi Santoso', '10A');

  student.addGrade('Matematika', 80);
  student.addGrade('IPA', 90);

  const logs = [];
  const originalLog = console.log;
  console.log = (msg) => logs.push(String(msg));

  student.displayInfo();

  console.log = originalLog;

  runner.assertArrayContains(logs, 'ID: S001');
  runner.assertArrayContains(logs, 'Nama: Budi Santoso');
  runner.assertArrayContains(logs, 'Kelas: 10A');
  runner.assertArrayContains(logs, 'Mata Pelajaran:');
  runner.assertArrayContains(logs, '  - Matematika: 80');
  runner.assertArrayContains(logs, '  - IPA: 90');
  runner.assertArrayContains(logs, 'Rata-rata: 85.00');
  runner.assertArrayContains(logs, 'Status: Lulus');
  runner.assertArrayContains(logs, '------------------------');
});

runner.summary();
