export const generateUtilities = (count: number) => {
  const utilities: Record<string, string> = {}
  for (let i = 0; i <= count; i++) {
    utilities[`${i}`] = `${i}px`
  }
  return utilities
}
