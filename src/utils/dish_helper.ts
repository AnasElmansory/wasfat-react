export function formatDescription(description?: string): string | null {
  if (!description) return null;
  const stepsExp = /((<h2>)(الخطوات|طريقه التحضير|طريقة التحضير)(<\/h2>))/g;
  const result = description.match(stepsExp);
  return result != null ? result[0] : null;
}

export function extractText(html: string): string {
  return html
    .replaceAll(/(<h2>)|(<p>)|(" ")/g, "")
    .replaceAll(/(<\/h2>)|(<\/p>)|(" ")/g, "")
    .trim();
}

export function extractImages(text: string) {
  const imgExp = /(<img\s*src\s*=\s*)(https)([a-zA-Z0-9@:\/.\-%_?=&>])*/g;
  const result = text.match(imgExp);
  if (result != null) {
    for (const image of result) {
      text = text.replace(image, `image${result.indexOf(image) + 1}`);
    }
    return text;
  } else {
    return text;
  }
}

export function getIngredients(description: string): string {
  const formatedDescription = formatDescription(description);
  if (formatedDescription != null) {
    const endIndex = description.indexOf(formatedDescription);
    const ingredientsHtml = description.substring(0, endIndex);
    const ingredientsString = extractText(ingredientsHtml);
    return ingredientsString;
  } else {
    return "Ingredients Format Error";
  }
}

export function getDescription(description: string): string {
  const formatedDescription = formatDescription(description);
  if (formatedDescription != null) {
    const startIndex = description.indexOf(formatedDescription);
    const descriptionHtml = description.substring(startIndex);
    const descriptionString = extractText(descriptionHtml);
    const finalDescriptionString = extractImages(descriptionString);
    return finalDescriptionString;
  } else {
    return "Description Format Error";
  }
}
