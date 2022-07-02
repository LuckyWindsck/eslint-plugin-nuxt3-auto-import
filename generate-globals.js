/**
 * Issue
 * - [nuxt/eslint-plugin-nuxt vs nuxt/eslint-config and nuxt3 globals](https://github.com/nuxt/eslint-plugin-nuxt/issues/173)
 *
 * Related Resources
 * - [List of default presets](https://github.com/nuxt/framework/blob/main/packages/nuxt/src/auto-imports/presets.ts)
 * - [Source code of auto-imports](https://github.com/nuxt/framework/blob/main/packages/nuxt/src/auto-imports/module.ts)
 * - [Available hooks](https://github.com/nuxt/framework/blob/main/packages/schema/src/types/hooks.ts)
 */

(async () => {
  const { resolve } = await import('path');
  const { defineNuxtModule, addTemplate } = await import('@nuxt/kit');
  const { rmSync } = await import('fs');
  const { loadNuxt, build } = await import('nuxt');

  const outDir = 'lib';
  const filename = 'globals.js';
  const fullPath = resolve(process.cwd(), outDir, filename);

  const autoImportEslint = defineNuxtModule({
    setup(_, nuxt) {
      // Hook
      //   The "autoImports:extends" hook in the issue solution doesn't work.
      //   I tried "autoImports:sources" and it works.
      //
      // typeof defaultPresets === unimport.Preset[]
      //   defaultPresets is passed when the hook "autoImports:sources" is called, and is defined by
      //   using the defineUnimportPreset funtion in unjs/unimport module. I save unjs/unimport as
      //   devDependency for reference.
      //   [unimport/src/types.ts](https://github.com/unjs/unimport/blob/main/src/types.ts)
      nuxt.hook('autoImports:sources', (defaultPresets) => {
        const padding = ' '.repeat(4);

        const globalsString = defaultPresets.map((preset) => {
          const presetGlobals = preset.imports.map((variableName) => `${padding}${variableName}: 'readonly',`).join('\n');

          return `${padding}/* ${preset.from} */\n${presetGlobals}`;
        }).join('\n');

        addTemplate({
          dst: fullPath,
          filename,
          getContents: () => {
            // To prevent formatter accidentally fix padding of template string
            let contents = '';
            contents += '// Auto generate by nuxt modules\n';
            contents += 'module.exports = {\n';
            contents += '  globals: {\n';
            contents += `${globalsString}\n`;
            contents += '  },\n';
            contents += '};\n';

            return contents;
          },
          write: true,
        });
      });
      nuxt.hook('app:templatesGenerated', () => {
        /* eslint no-console: ['error', { allow: ['log'] }] */
        console.log(`globals file is generated at ${fullPath}`);
        rmSync('.nuxt', { recursive: true, force: true });
        process.exit(0);
      });
    },
  });

  const nuxt = await loadNuxt({
    dev: false,
    ready: true,
    rootDir: '.',
    overrides: {
      modules: [autoImportEslint],
    },
  });

  await build(nuxt);
})();
