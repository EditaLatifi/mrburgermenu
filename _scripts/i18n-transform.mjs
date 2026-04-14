import fs from "node:fs";

const translations = {
  "Shrimps Burger":
    "Shrimp burger with avocado, mixed greens and tomato, topped with sweet chili or spicy mayo and crispy rice chips for a fresh, crunchy experience.",
  "Classic Cheeseburger":
    "Perfectly juicy beef, melted cheese, pickles, fresh tomatoes and mixed greens, all brought together with our bold MrBurger sauce in a soft, fluffy bun. A classic that never disappoints — full of flavor in every bite.",
  "Bacon Lovers":
    "Juicy beef, melted slices of cheddar and gouda, honest crispy bacon, mixed greens and creamy bacon mayo in a soft, fluffy bun. The perfect pick for anyone who loves bold bacon flavor.",
  "Premium Beef":
    "Made with premium beef, topped with melted cheddar and gouda, crispy bacon, pickles, fresh tomato and mixed greens. All brought together with our exclusive MrBurger sauce in a soft bun.",
  "Mr Kimchi":
    "A juicy burger in a fresh bun with beef, melted cheddar and gouda. Topped with egg, homemade kimchi, fresh greens, smooth mayo and a bold Korean sauce that gives this burger a truly unique flavor. A perfect balance of freshness, creaminess and gentle heat.",
  "Classic Fried Chicken":
    "Tender fried chicken breast made with our special recipe, slices of gouda, pickles, fresh tomato, lettuce and our signature MrBurger sauce.",
  "Grilled BBQ Chicken":
    "Juicy grilled chicken breast, melted cheddar, fresh greens and crispy pickles, topped with a combination of our homemade BBQ sauce and creamy mayo.",
  "Honey Mustard Fried Chicken":
    "Tender fried chicken breast made with our special recipe, slices of gouda, pickles, mixed greens and our delicious honey mustard sauce.",
  "Korean Fried Chicken":
    "Juicy chicken made with our own recipe, melted cheddar, fresh greens and tomato, topped with fresh kimchi slaw, crispy pickles, creamy mayo and a bold sweet-and-spicy Korean sauce.",
  "BBQ Fried Chicken":
    "Crispy fried chicken made with our own recipe, melted cheddar and gouda, fresh tomato and crunchy lettuce, topped with a combination of our homemade BBQ sauce and creamy mayo.",
  "Spicy Fried Chicken":
    "Crispy fried chicken made with our own recipe, melted cheddar slices, pickles and fresh tomato, all finished with our gently spicy mayo sauce.",
  "Chicken lover":
    "Our classic chicken burger made to our original recipe — juicy chicken, melted cheese, pickles, fresh tomatoes, lettuce and our signature MrBurger sauce in a soft bun. Served with 3 juicy chicken wings, crispy fries and 1 sauce of your choice.",
  "Chicken mix MENU":
    "3 juicy chicken wings coated in a rich, glossy glaze, perfectly tender inside and full of flavor. Plus 4 crispy chicken strips with a bold golden coating, crunchy outside and juicy inside. Served with hot golden fries and 2 delicious sauces of your choice.",
  "Wings Bucket":
    "A hearty portion of 20 chicken wings with four glazes — sweet-savory teriyaki, mild Buffalo, homemade BBQ and bold Korean. Juicy inside, beautifully glazed and packed with flavor in every bite.",
  "Combo for two !":
    "A classic beef and chicken burger made to our recipe — juicy meat, melted cheese, pickles, fresh tomatoes, lettuce and our bold MrBurger sauce in a soft bun. Served with 4 chicken wings, 2 crispy strips, golden fries and 2 sauces of your choice.",
  "Chicken Bowl":
    "A rice bowl with avocado, wakame, cherry tomatoes, corn, coleslaw and teriyaki mayo sauce.",
  "Fried Chicken Bowl":
    "A rice bowl with avocado, wakame, cherry tomatoes, corn, kimchi slaw and teriyaki sauce.",
  "Shrimp Bowl":
    "A rice bowl with avocado, wakame, cherry tomatoes, corn, coleslaw and sweet chili sauce.",
  "Teriyaki Wings":
    "Juicy chicken wings marinated in bold spices, slow-roasted until golden, then coated in a delicious sweet-savory teriyaki sauce. Finished with toasted sesame for perfect flavor and aroma. A great pick for lovers of Asian flavors who want something truly irresistible.",
  "Bufallo wings":
    "Crispy chicken wings coated in the iconic spicy homemade Buffalo sauce with bold chili and butter flavor. Perfectly juicy inside, properly hot outside — exactly how it should be. The right pick for anyone who loves bold, fiery flavors and a solid hit of American classic.",
  "Korean Style Wings":
    "Crispy Korean-style chicken wings coated in our homemade sweet-and-spicy glaze. Juicy meat, a glossy flavor-packed coating and a gentle balance of sweet and spicy make for an irresistible experience in every bite. A great pick for lovers of bold flavors and authentic Korean cuisine.",
  Strips:
    "Golden chicken strips, crispy outside and juicy inside — perfect for dipping or sharing.",
};

const stripEmoji = (s) =>
  (s || "")
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Presentation}\uFE0F]/gu, "")
    .replace(/\s+/g, " ")
    .trim();

const data = JSON.parse(fs.readFileSync("src/data/menu.json", "utf8"));

for (const cat of data.categories) {
  for (const item of cat.items) {
    const cs = stripEmoji(item.description || "");
    const en = translations[item.name] || "";
    item.description = { cs, en };
    if (item.name === "Shrimps Burger") {
      item.image = "https://mr-burger.cz/wp-content/uploads/2026/01/Shrimp-burger.png";
    }
  }
}

fs.writeFileSync("src/data/menu.json", JSON.stringify(data, null, 2));
console.log("Transform complete");
for (const cat of data.categories) {
  for (const item of cat.items) {
    const cs = item.description.cs ? "cs" : "  ";
    const en = item.description.en ? "en" : "  ";
    console.log(`  [${cs}|${en}] ${item.name}`);
  }
}
