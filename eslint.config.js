import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import hooks from 'eslint-plugin-react-hooks';
export default tseslint.config(
  { ignores: ['node_modules/**', 'dist/**', 'shopify/theme/assets/**', 'evidence/**', 'test-results/**', 'playwright-report/**', 'tmp/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ['**/*.tsx'], plugins: { 'react-hooks': hooks }, rules: { 'react-hooks/rules-of-hooks': 'error', 'react-hooks/exhaustive-deps': 'warn' } },
);
