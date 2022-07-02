/**
 * @fileoverview A plugin that adds ESLint globals for nuxt3 auto imported functions
 * @author LuckyWindsck
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const globals = require('./globals');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const plugin = {
  environments: {
    nuxt: { globals },
  },
};

module.exports = plugin;
