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

runner.summary();
