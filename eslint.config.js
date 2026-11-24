import fs from 'node:fs';
import path from 'node:path';
import tseslint from 'typescript-eslint';

const pkgPath = path.resolve(import.meta.dirname, 'package.json');

const reexportSubpathsRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require every subpath export in package.json#exports to be re-exported from src/index.ts',
    },
    schema: [],
  },
  create(context) {
    const exportedSources = new Set();

    const recordSource = (node) => {
      if (node.source && typeof node.source.value === 'string') {
        const normalized = node.source.value
          .replace(/^\.\//, '')
          .replace(/\.[mc]?[jt]s$/, '');
        exportedSources.add(normalized);
      }
    };

    return {
      ExportAllDeclaration: recordSource,
      ExportNamedDeclaration: recordSource,
      'Program:exit'(node) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        const exportsMap = pkg.exports ?? {};
        for (const key of Object.keys(exportsMap)) {
          if (key === '.' || key.startsWith('./json-schema/') || !key.startsWith('./')) {
            continue;
          }
          const subpath = key.slice(2);
          if (!exportedSources.has(subpath)) {
            context.report({
              node,
              message: `Subpath '${key}' in package.json#exports must be re-exported from src/index.ts.`,
            });
          }
        }
      },
    };
  },
};

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'json-schema/**'],
  },
  {
    files: ['src/*.ts'],
    ignores: ['src/index.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: './index',
              message: 'Subpath modules must not import ./index (causes circular dependency).',
            },
            {
              name: './index.js',
              message: 'Subpath modules must not import ./index.js (causes circular dependency).',
            },
            {
              name: './index.ts',
              message: 'Subpath modules must not import ./index.ts (causes circular dependency).',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/index.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      local: {
        rules: {
          'reexport-subpaths': reexportSubpathsRule,
        },
      },
    },
    rules: {
      'local/reexport-subpaths': 'error',
    },
  },
];
