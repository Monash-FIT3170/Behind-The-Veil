import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn"
        }
    },
    {
        ignores: [
            ".meteor/*",
            "node_modules/*",
            ".idea/*",
            "postcss.config.js",
            "tailwind.config.js",
        ]
    }
];