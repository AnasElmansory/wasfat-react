import { Dish } from "../firebase/store/types";

//helper function to determine the position of ingredients and steps in html text
export function formatDescription(description?: string): string | null {
  if (!description) return null;
  const stepsExp = /((<h2>)(الخطوات|طريقه التحضير|طريقة التحضير)(<\/h2>))/g;
  const result = description.match(stepsExp);
  return result != null ? result[0] : null;
}

// extract text from html
export function extractText(html: string): string {
  return html
    .replaceAll(/(<h2>)|(<p>)|(" ")/g, "")
    .replaceAll(/(<\/h2>)|(<\/p>)|(" ")/g, "")
    .trim();
}

// replace image tags in html to image(index) text pattern
export function extractImages(text: string) {
  // eslint-disable-next-line
  const imgExp = /(<img\s*src\s*=\s*)([a-zA-Z0-9@:\/."\-%_?=&>])*/g;
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

//get dish ingredients from html text
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

// get dish steps from html text
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

// generate dish description html
export function generateDishDescription({
  ingredients,
  description,
  dishImages,
}: {
  ingredients: string;
  description: string;
  dishImages: string[];
}): string {
  const filteredIngredients = ingredients
    .replace(/(المكونات|المقادير|المكوّنات)/, "")
    .trim();
  const filteredSteps = description
    .replace(/(طريقه التحضير|طريقة التحضير|الخطوات)/, "")
    .trim();

  const ingredientsHtml =
    "<h2>المكونات</h2>\n" +
    filteredIngredients
      .split("\n")
      .map((line) => `<p>${line.trim()}</p>`)
      .join("\n");

  const descriptionHtml =
    "<h2>طريقة التحضير</h2>\n" +
    filteredSteps
      .split("\n")
      .map((line) => {
        if (line.includes("image")) {
          const imageIndex = Number.parseInt(line.trim().charAt(5));
          return line.replace(
            /image([0-2])/,
            `<img src= "${dishImages[imageIndex - 1]}">`
          );
        } else {
          return `<p>${line.trim()}</p>`;
        }
      })
      .join("\n");
  const dishDescription = `${ingredientsHtml}\n${descriptionHtml}`;
  return dishDescription;
}

//validate dish before adding it to firestore

export function validateDish(dish: Dish): string | null {
  if (!dish.id) {
    return "Error: invalid dish id";
  } else if (!dish.name || dish.name.length < 5) {
    return "Error: invalid dish name";
  } else if (
    !dish.subtitle ||
    dish.subtitle.length > 500 ||
    dish.subtitle.length < 10
  ) {
    return "Error: invalid dish subtitle, subtitle should vary from 10 to 150 characters";
  } else if (!dish.categoryId || dish.categoryId.length === 0) {
    return "Error: invalid dish categories, must contain at least one category";
  } else if (!dish.dishDescription || dish.dishDescription.length === 0) {
    return "Error: invalid dish Description";
  } else {
    return null;
  }
}
