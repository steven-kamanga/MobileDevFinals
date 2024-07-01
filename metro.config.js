const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Retrieve the default configuration
const config = getDefaultConfig(__dirname, { isCSSEnabled: true });

// Modify the resolver to include 'cjs' in the list of source extensions
config.resolver.sourceExts.push("cjs");

module.exports = withNativeWind(
  {
    ...config,
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
      ...config.transformer,
    },
    resolver: {
      assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...config.resolver.sourceExts, "svg"], // 'cjs' is already added above
      ...config.resolver,
    },
  },
  { input: "./global.css" }
);
