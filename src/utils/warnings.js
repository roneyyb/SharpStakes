import { LogBox } from 'react-native';

// Ignore all warnings
LogBox.ignoreAllLogs();

// Or if you want to be more specific and only ignore certain warnings:
// LogBox.ignoreLogs([
//   'Warning: ...',
//   'VirtualizedLists should never be nested',
//   'Non-serializable values were found in the navigation state',
// ]);

// Optional: You can also ignore specific warning patterns
const IGNORED_WARNINGS = [
  'VirtualizedLists should never be nested',
  'Non-serializable values were found in the navigation state',
  'Require cycle:',
];

const originalWarn = console.warn;
console.warn = function filterWarnings(msg, ...args) {
  if (IGNORED_WARNINGS.some(entry => msg.includes(entry))) {
    return;
  }
  originalWarn(msg, ...args);
};

// Optionally suppress console logs in production
if (__DEV__ === false) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}
