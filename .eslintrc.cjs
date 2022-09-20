module.exports = {
  plugins: ["react", "import"],
  extends: [
    "airbnb",
    "prettier",
    "plugin:import/recommended",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  env: {
    browser: true,
    es2021: true,
  },
  rules: {
    "import/no-unresolved": [2, { commonjs: true, amd: true }],
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2,
    "react/react-in-jsx-scope": "off",
    "import/no-useless-path-segments": [1, { extensions: [".js", ".jsx"] }],
  },
};
