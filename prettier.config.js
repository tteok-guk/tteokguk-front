module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
  tailwindAttributes: ['className', 'class'],
  tailwindFunctions: ['clsx', 'tw'],
  endOfLine: 'lf',
  singleQuote: true,
  semi: false,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 100,
}
