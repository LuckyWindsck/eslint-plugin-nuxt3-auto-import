/**
 * @fileoverview A plugin that adds ESLint globals for nuxt3 auto imported functions
 * @author LuckyWindsck
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const autoImportedGlobals = require('./globals');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const plugin = {
  environments: {
    nuxt: autoImportedGlobals,
  },
};

module.exports = plugin;
