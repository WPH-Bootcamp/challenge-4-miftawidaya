/**
 * Shared TestRunner utility for challenge test suites.
 * Provides a minimal assertion API and summary reporting.
 */
class TestRunner {
  passed = 0;
  failed = 0;
  tests = [];
  stopOnFailure = false;

  constructor(options = {}) {
    this.stopOnFailure = options.stopOnFailure ?? this.stopOnFailure;
  }

  test(description, testFn) {
    this.tests.push(description);

    try {
      const result = testFn();
      if (
        result &&
        typeof result === 'object' &&
        typeof result.then === 'function'
      ) {
        throw new Error(
          'Async tests are not supported. Please run tests synchronously.'
        );
      }

      this.passed++;
      console.log(`✓ ${description}`);
    } catch (error) {
      this.failed++;
      console.log(`✗ ${description}`);
      console.log(`  Error: ${error.message}`);

      if (this.stopOnFailure) {
        throw error;
      }
    }
  }

  assertEqual(actual, expected, message = '') {
    if (actual !== expected) {
      throw new Error(
        `${message}\n  Expected: ${expected}\n  Got: ${actual}`.trim()
      );
    }
  }

  assertNotEqual(actual, expected, message = '') {
    if (actual === expected) {
      throw new Error(
        `${message}\n  Expected value to differ from: ${expected}`.trim()
      );
    }
  }

  assertTrue(condition, message = 'Expected condition to be true') {
    if (!condition) {
      throw new Error(message);
    }
  }

  assertFalse(condition, message = 'Expected condition to be false') {
    if (condition) {
      throw new Error(message);
    }
  }

  assertNull(value, message = 'Expected value to be null') {
    if (value !== null) {
      throw new Error(`${message}\n  Got: ${value}`);
    }
  }

  assertNotNull(value, message = 'Expected value to not be null') {
    if (value === null) {
      throw new Error(message);
    }
  }

  assertTypeOf(value, expectedType, message = '') {
    if (typeof value !== expectedType) {
      throw new TypeError(
        `${message}\n  Expected type: ${expectedType}\n  Got type: ${typeof value}`
      );
    }
  }

  assertArrayLength(array, expectedLength, message = '') {
    if (!Array.isArray(array)) {
      throw new TypeError(
        `${message}\n  Expected an array but got ${typeof array}`
      );
    }

    if (array.length !== expectedLength) {
      throw new Error(
        `${message}\n  Expected length: ${expectedLength}\n  Got length: ${array.length}`
      );
    }
  }

  assertArrayContains(array, item, message = '') {
    if (!Array.isArray(array) || !array.includes(item)) {
      throw new Error(`${message}\n  Array does not contain: ${item}`);
    }
  }

  assertThrows(fn, expectedMessage = '') {
    try {
      fn();
      throw new Error('Expected function to throw an error, but it did not');
    } catch (error) {
      if (expectedMessage && !error.message.includes(expectedMessage)) {
        throw new Error(
          `Expected error message to contain "${expectedMessage}", but got "${error.message}"`
        );
      }
    }
  }

  summary() {
    console.log('\n' + '='.repeat(50));
    console.log(`Total Tests: ${this.passed + this.failed}`);
    console.log(`Passed: ${this.passed}`);
    console.log(`Failed: ${this.failed}`);
    console.log('='.repeat(50));

    if (this.failed === 0) {
      console.log('Semua tes lulus.');
    } else {
      console.log('Ada tes gagal. Perbaiki.');
    }
  }
}

export default TestRunner;
