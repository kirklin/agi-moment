import kirklin from "@kirklin/eslint-config";

export default kirklin({
  react: true,
  rules: {
    "node/prefer-global/process": "off",
    "react/display-name": "off",
  },
});
