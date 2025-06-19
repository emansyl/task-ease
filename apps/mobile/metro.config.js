const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Supabase fix
config.resolver.unstable_conditionNames = ["browser"];
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
