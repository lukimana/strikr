export function parseStrikrMarkup(data: string) {
  // Regular expression pattern
  const pattern = /{([^:{}]+):([^{}]+)}/g

  // Extracting class and content
  const result = data.replace(pattern, '<span class="markup $1">$2</span>')

  return result
}