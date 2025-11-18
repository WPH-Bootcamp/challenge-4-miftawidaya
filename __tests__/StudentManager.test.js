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

runner.summary();
