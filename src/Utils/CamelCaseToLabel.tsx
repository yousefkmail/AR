export function camelCaseToLabel(str: string) {
  return str
    .replace(/([A-Z])/g, " $1") // Insert space before uppercase letters
    .replace(/^./, (match) => match.toUpperCase()); // Capitalize first letter
}
