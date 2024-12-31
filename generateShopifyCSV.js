const fs = require("fs");
const path = require("path");
const { parse } = require("json2csv");

// Shopify CSV column headers based on your template
const fields = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Product Category",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Option2 Name",
  "Option2 Value",
  "Option3 Name",
  "Option3 Value",
  "Image Src",
  "Image Position",
  "Image Alt Text",
  "Gift Card",
  "SEO Title",
  "SEO Description",
  "Status",
];

const products = [
  {
    url: "https://www.premierhousewares.com/lyon-2-door-natural-rattan-and-oak-cabinet-5528694.html",
    title: "Lyon 2 Door Natural Rattan And Oak Cabinet",
    sku: "5528694",
    description:
      "The Lyon two door wardrobe has a solid oak wood frame with woven rattan doors which are sure to elevate sophistication and timeless charm of your abode.",
    detailedDescription:
      "This wardrobet has an elegant arched structure made from oak wood, with doors boasting intertwined rattan fronts. The minimalistic design will create a focal point and the natural elements enhance warmth and texture. This wardrobe has a shelf, hanging rail and 2 drawers.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528694.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528694_liv_07.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528694_liv_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528694.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528694_liv_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528694_liv_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528694_liv_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528694_liv_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528694_liv_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528694_liv_06.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528694_liv_07.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528694.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/gabelle-console-table-5527832.html",
    title: "Gabelle Console Table",
    sku: "5527832",
    description:
      "Crafted from bamboo wood this console table has clean lines featuring a sunburst design on its frontside.",
    detailedDescription:
      "This dark brown, clean-lined console table is made of ebony bamboo for long-lasting use. The rectangular-shaped console table has a contemporary design featuring sunburst pattern in natural wood hues. The warm metallic base gives a touch of glam styling.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527832.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527832_liv_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527832_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527832.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527832_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527832_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527832_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527832_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527832_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527832_mac_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527832_liv_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527832.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/jakara-natural-wooden-cabinet-5528073.html",
    title: "Jakara Natural Wooden Cabinet",
    sku: "5528073",
    description:
      "Featuring a combo of rustic and modern style, this cabinet offers storage of multiple small items.",
    detailedDescription:
      "This Jakara wooden cabinet in natural finish features carved wood effect of abstract geometric patterns. The sleek minimalist black metal base and legs complements with modern decors.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_liv_11.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_01_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_03_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_04_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_liv_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_liv_03_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_liv_04_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_liv_06_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_liv_07_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_liv_14_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_mac_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_mac_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_mac_03_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_mac_04_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_liv_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_liv_08.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_liv_10.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_liv_11.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528073_-_web_size.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/templar-gold-finish-beaded-coffee-table-5527833.html",
    title: "Templar Gold Finish Beaded Coffee Table",
    sku: "5527833",
    description:
      "This striking coffee table in luxe accent will be a stylish and functional addition for a contemporary living room.",
    detailedDescription:
      "A series of warm metallic finish beads fuse together to form the rounded design of this coffee table. This coffee table with a flat edge is sure to make a decorative statement with the elegant, symmetrical design.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527833.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527833_mac_04.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527833_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527833.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527833_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527833_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527833_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527833_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527833_mac_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527833.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/flori-1-drawer-draw-side-table-with-hairpin-legs-2406261.html",
    title: "Flori 1 Drawer Draw Side Table with Hairpin Legs",
    sku: "2406261",
    description:
      "This side table flaunts a traditional accent with its minimal design and shape to the living area.",
    detailedDescription:
      "Equipped with convenient storage space and featuring a wood veneering effect, this small side table is well-suited for mid-century modern themes. The slanted hairpin metal legs in the warm metallic finish create an instant focal point in the room.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261_liv_03.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261_ils_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261_ils_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261_mac_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261_liv_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261_liv_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261_liv_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406261.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/lyon-4-door-natural-rattan-and-oak-sideboard-5528695.html",
    title: "Lyon 4 Door Natural Rattan And Oak Sideboard",
    sku: "5528695",
    description:
      "The Lyon sideboard effortlessly combines rustic charm and sophistication with a durable oak wood frame adorned with natural rattan inserts.",
    detailedDescription:
      "This four door sideboard has a solid oak wood frame with woven rattan front panels exuding contemporary minimalism. Its clean lines and tapered legs add sophistication, while the four spacious compartments provide ample storage.",
    features: [[Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_liv_06.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_01_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_03_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_04_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_mac_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_mac_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_mac_03_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_mac_04_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_mac_05_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_mac_06_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_mac_07_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_mac_08_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_liv_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_liv_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_liv_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_liv_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_liv_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_liv_06.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528695_-_web_size.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/gabor-side-table-5529231.html",
    title: "Gabor Side Table",
    sku: "5529231",
    description:
      "This natural bamboo side table with an ebony finish base combines light and dark hues to create a modern statement piece.",
    detailedDescription:
      "This natural bamboo side table has a square shape with clean sides in two tonal contrast. An angular line gently intersects the upper part in rich grain character with a base in a dark ebony finish, which combine to create an eye catching look.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529231.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529231_mac_03.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529231_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529231.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529231_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529231_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529231_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529231_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529231.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/lyon-oak-wood-sideboard-2404973.html",
    title: "Lyon Oak Wood Sideboard",
    sku: "2404973",
    description:
      "The subtly sculpted plinth base of the Lyon sideboard complements its carved sides, contributing to the rustic style of this significant piece.",
    detailedDescription:
      "Four glass panelled doors open to reveal a shelf, perfect for storage and display purposes. Juxtaposing the golden wood is a pair of intricately carved handles, made from black metal. This wooden sideboard will complement most decor settings.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2404973.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2404973_mac_03.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2404973_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2404973.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2404973_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2404973_fcn_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2404973_fcn_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2404973_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2404973_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2404973_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2404973.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/lyon-rattan-and-oak-wood-two-drawer-chest-5528691.html",
    title: "Lyon Rattan and Oak Wood Two Drawer Chest",
    sku: "5528691",
    description:
      "The Lyon two drawer chest evokes a nostalgic charm with its warm oak wood structure and rattan drawer fronts.",
    detailedDescription:
      "The chest has a mid century modern style that pairs well with boho chic, retro and scandi interiors. It has a clean structure with two drawers, each with a rattan front. It is  great for keeping home items organised while adding style to the space.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_mac_05_-_web_size_1.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_01_-_web_size_1.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_01_-_web_size_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_liv_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_02_-_web_size_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_liv_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_liv_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_liv_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_liv_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_mac_06_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_03_-_web_size_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_04_-_web_size_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_mac_01_-_web_size_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_mac_02_-_web_size_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_mac_03_-_web_size_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_mac_04_-_web_size_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_mac_05_-_web_size_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528691_-_web_size.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/doha-side-table-5528577.html",
    title: "Doha Side Table",
    sku: "5528577",
    description:
      "This side table has a white veined marble top and dark wood base with golden trim, giving the design a touch of sophistication and luxury.",
    detailedDescription:
      "This side table has a striking contrast of a rounded white marble top with a dark wood base that has a golden trim. Featuring a fluted pattern, the sturdy dark wood base creates visual interest with its unique design details and dimensions.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528577.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528577_liv_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528577_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528577.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528577_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528577_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528577_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528577_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528577_mac_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528577_liv_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528577.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/gabor-coffee-table-5529232.html",
    title: "Gabor Coffee Table",
    sku: "5529232",
    description:
      "This natural bamboo rectangular coffee table with an ebony finish base combines light and dark hues to create a modern statement piece.",
    detailedDescription:
      "This natural bamboo coffee table has a minimal profile with clean sides in two tonal contrast. An angular line gently intersects the upper part in rich grain character with a base in a dark ebony finish, which combine to create an eye catching look.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529232_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529232_mac_03_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529232_01_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529232_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529232_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529232_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529232_liv_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529232_liv_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529232_liv_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529232_liv_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529232_liv_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529232_mac_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529232_mac_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529232_mac_03_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529232_-_web_size.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/corso-three-door-sideboard-5527882.html",
    title: "Corso Three Door Sideboard",
    sku: "5527882",
    description:
      "The Corso three door sideboard will suit nordic decors with the simple and elegant design.",
    detailedDescription:
      "Made from renewable rattan, this black finish sideboard has clean lines creating a sophisticated aesthetic. Offering ample storage, three doors have natural criss cross pattern and matching handles which combine to give the low profile design a touch of warmth and texture.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882_mac_07.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882_mac_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882_mac_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882_mac_06.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882_mac_07.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527882.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/gabelle-square-side-table-5527831.html",
    title: "Gabelle Square Side Table",
    sku: "5527831",
    description:
      "Featuring a striking sunburst design tabletop in natural wood hues, this square side table is ideal for modern interiors with an edge.",
    detailedDescription:
      "This dark brown, clean-lined side table is made of ebony bamboo for long-lasting use. The squared- shape table has a contemporary and understated design featuring a sunburst patterned tabletop and warm metallic base.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527831.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527831_liv_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527831_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527831.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527831_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527831_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527831_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527831_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527831_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527831_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527831_liv_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527831.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/gabo-large-coffee-table-5527562.html",
    title: "Gabo Large Coffee Table",
    sku: "5527562",
    description:
      "Add a touch of warmth with understated elegance to the living room with this large natural bamboo coffee table.",
    detailedDescription:
      "Handcrafted from bamboo, this large coffee table features smooth sides with a sleek edge. The countered base in dark ebony and natural shade contrasts the decorative sunburst pattern on the rounded top and elevates natural charm and style.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527562.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527562_mac_04.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527562_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527562.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527562_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527562_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527562_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527562_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527562_mac_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527562.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/trento-set-of-2-side-tables-5502693.html",
    title: "Trento Set Of 2 Side Tables",
    sku: "5502693",
    description:
      "The Trento set of 3 round side tables features a contemporary designed black coated metal frames and grey glass tops.",
    detailedDescription:
      "Each of these two Trento side tables has a round grey glass top that is neatly set into a metallic frame. It is complemented by a round base that is connected to the top via the sleek black finish wires. The open design bases of these sleek and stylish nesting tables allow then to be nested together when not in use.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502693.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502693_mac_02.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502693_ils_02.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502693.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502693_ils_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502693_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502693_ils_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502693_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502693_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502693_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502693_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502693.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/jakara-sideboard-with-metal-legs-5528067.html",
    title: "Jakara Sideboard With Metal Legs",
    sku: "5528067",
    description:
      "Combining style and simplicity, this sideboard will provide ample storage.",
    detailedDescription:
      "The Jakara sideboard has a carved effect wood that features an abstract pattern. This side board has black finish metal legs contributing to its rustic design.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_mac_05_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_01_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_03_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_04_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_liv_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_liv_06.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_liv_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_liv_03_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_liv_04_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_liv_05_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_mac_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_mac_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_mac_03_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_mac_04_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_mac_05_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528067_-_web_size.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/trento-coffee-table-with-black-glass-top-5502683.html",
    title: "Trento Coffee Table With Black Glass Top",
    sku: "5502683",
    description:
      "The Trento coffee table has a sleek design with a black metal wireframe that lends an open and airy aesthetic to the overall design.",
    detailedDescription:
      "This round coffee table has a cylindrical matte black base wrapepd with a sleek metal wireframe that extends gracefully to the top to form a wide rim. The black glass stop sits atop the sculptural frame and elevates modern sophistication.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502683.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502683_mac_02.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502683_ils_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502683.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502683_ils_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502683_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502683_ils_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502683_liv_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502683_liv_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502683_liv_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502683_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502683_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5502683.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/covent-sideboard-5527865.html",
    title: "Covent Sideboard",
    sku: "5527865",
    description:
      "Create a traditional, yet modern look and feel with the Covent four door black mahogany sideboard.",
    detailedDescription:
      "The Covent sideboard is a modern take on a traditional style. The sleek and sturdy mahogany has a black finish, while the four doors offer display and storage space.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865_liv_03.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865_mac_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865_mac_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865_liv_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865_liv_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865_liv_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527865.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/gabor-console-table-5529234.html",
    title: "Gabor Console Table",
    sku: "5529234",
    description:
      "This natural bamboo console table with an ebony finish base combines light and dark hues to create a modern statement piece.",
    detailedDescription:
      "This natural bamboo console table features a minimal profile with clean sides in two tonal contrast. An angular line intersects the upper part in rich grain character with a base in a dark ebony finish, which combine to create an eye catching look.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529234.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529234_mac_03.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529234_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529234.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529234_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529234_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529234_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529234_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529234_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529234_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529234.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/sherman-white-wood-side-cabinet-2406553.html",
    title: "Sherman White Wood Side Cabinet",
    sku: "2406553",
    description:
      "The Sherman side cabinet offers both sophistication and a rustic charm with its white wood and natural rattan build.",
    detailedDescription:
      "This side cabinet is crafted from wood with a white paint finish. It features two closed shelves with natural rattan panels on their doors that bring a warm and earthy aesthetic. It comes with an undershelf that offers additional storage space.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406553_1.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406553_mac_03_1.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406553_01_1.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406553_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406553_01_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406553_02_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406553_ils_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406553_ils_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406553_03_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406553_04_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406553_mac_01_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406553_mac_02_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406553_mac_03_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406553_1.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/corso-one-drawer-bedside-table-5527879.html",
    title: "Corso One Drawer Bedside Table",
    sku: "5527879",
    description:
      "Suited for nordic decors, the Corso one drawer bedside will make an elegant statement with the low profile design and minimalism.",
    detailedDescription:
      "Made from rattan and wood , this black finish bedside table has clean lines creating a sophisticated aesthetic. The is feathured with a woven rattan drawer and a storage shelf.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527879.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527879_mac_02.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527879_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527879.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527879_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527879_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527879_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527879_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527879_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527879_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527879_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527879.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/depok-coffee-table-with-hairpin-legs-2406748.html",
    title: "Depok Coffee Table With Hairpin Legs",
    sku: "2406748",
    description:
      "This coffee table has a natural rattan storage shelf with black metal top and hairpin legs that will add style to your decor.",
    detailedDescription:
      "This modern coffee table has a round black metal top supported with sleek hairpin legs which give it a an airy feel, a woven natural rattan shelf at the bottom, adds organic and textural element to the overall design.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406748.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406748_ils_02_1.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406748_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406748.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406748_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406748_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406748_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406748_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406748_mac_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406748_ils_01_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406748_ils_02_1.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406748.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/depok-nest-of-two-tables-2406750.html",
    title: "Depok Nest Of Two Tables",
    sku: "2406750",
    description:
      "This set of two black metal and natural rattan tables is differently sized to fit in smaller living spaces compactly.",
    detailedDescription:
      "These two nesting tables are made from black metal which provides a sturdy and durable framework, and have a top surface made of both natural rattan and metal. The smaller table seamlessly fits underneath the large one to save space when not in use and will add style to your decor.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406750.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406750_ils_02.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406750_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406750.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406750_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406750_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406750_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406750_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406750_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406750_mac_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406750_mac_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406750_ils_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406750_ils_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406750.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/corso-console-table-5527880.html",
    title: "Corso Console Table",
    sku: "5527880",
    description:
      "Suited for nordic decors, the Corso two drawer console table will make an elegant statement with the low profile design and minimalism.",
    detailedDescription:
      "The black finish renewable rattan console table has clean lines creating a sophisticated aesthetic. Two storage drawers have natural criss cross pattern and matching handle which enhance warmth while the open lower shelf is ideal to display items.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527880.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527880_mac_04.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527880_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527880.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527880_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527880_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527880_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527880_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527880_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527880_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527880_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527880_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527880_mac_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527880.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/brando-sideboard-5529083.html",
    title: "Brando Sideboard.",
    sku: "5529083",
    description:
      "This sideboard with a mix patterned acacia wood and warm metallic accents, is sure to transform overall aesthetic in a contemporary setting.",
    detailedDescription:
      "This sideboard offers ample warmth with acacia veneer finish frame featuring a herringbone pattern in light and dark brown tones. Offering ample storage, the drawers and shelves are complemented with antique brass finish handles that coordinate with sleek legs enhancing luxe sophistication.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_liv_04.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_liv_07.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_liv_08.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_liv_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_liv_09.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_liv_06.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_liv_10.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_mac_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_mac_07.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_mac_08.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_mac_09.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_liv_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_liv_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_liv_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083_liv_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5529083.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/jakara-natural-finish-wooden-coffee-table-5528069.html",
    title: "Jakara Natural Finish Wooden Coffee Table",
    sku: "5528069",
    description:
      "The Jakara coffee table has an abstract geometric pattern that complements the metal frame.",
    detailedDescription:
      "This coffee table has a natural finish carved wood effect creating an abstract geometric pattern. Sleek metal legs have black colour that'll contribute to the modern minimalism of the design.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_mac_04_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_01_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_03_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_04_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_liv_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_liv_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_liv_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_liv_07.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_liv_06.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_liv_03_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_mac_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_mac_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_mac_03_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_mac_04_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528069_-_web_size.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/gabelle-rectangle-coffee-table-5527572.html",
    title: "Gabelle Rectangle Coffee Table",
    sku: "5527572",
    description:
      "The ebony finish is applied to the clean sides of this rectangular bamboo coffee table with a contrasting gold tone base, to make a statement.",
    detailedDescription:
      "This bamboo coffee table has a rectangular profile with a minimalist look. The clean frame in a dark ebony finish contrasts the tabletop in a carved sunburst pattern. The gold finish base lifts the luxe aesthetic of the otherwise understated design.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527572.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527572_mac_04.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527572_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527572.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527572_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527572_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527572_liv_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527572_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527572_liv_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527572_liv_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527572_liv_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527572_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527572_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527572_mac_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527572.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/jakara-natural-finish-wooden-media-unit-5528071.html",
    title: "Jakara Natural Finish Wooden Media Unit",
    sku: "5528071",
    description:
      "This Jakara media unit is a rustic accent piece with black metal legs.",
    detailedDescription:
      "This wooden unit in natural finish has carved wood effect that makes a statement of abstract design. With the sleek metal legs in black colour, this unit complements the modern art.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528071.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528071_mac_05.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528071_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528071.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528071_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528071_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528071_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528071_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528071_mac.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528071_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528071_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528071_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528071_mac_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528071_mac_05.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528071.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/corso-coffee-table-5527885.html",
    title: "Corso Coffee Table",
    sku: "5527885",
    description:
      "This coffee table will introduce traditional charm and organic simplicity with carved frame and eco-friendly rattan.",
    detailedDescription:
      "This coffee table features a black finish rectangular frame with four turned legs that are elegantly carved to create a spindle design. A clear glass piece is encased in the top section complete with a lower shelf that is formed from natural rattan in an",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527885.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527885_mac_03.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527885_02.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527885.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527885_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527885_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527885_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527885_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5527885.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/ramus-black-and-white-ombre-side-table-5509138.html",
    title: "Ramus Black And White Ombre Side Table",
    sku: "5509138",
    description:
      "The Ramus ombre side table in black and white elevates decor with a contemporary touch through its pedestal base and circular top.",
    detailedDescription:
      "This side table features a minimalist aesthetic with a circular top on a pedestal base. The smooth colour transition on the top gives it an elegant look suitable for decoration. The iron build ensures longevity by providing stability and durability.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5509138.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5509138_nos_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5509138_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5509138.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5509138_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5509138_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5509138_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5509138_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5509138_mac_04.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5509138_nos_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5509138.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/doha-coffee-table-5528576.html",
    title: "Doha Coffee Table",
    sku: "5528576",
    description:
      "This coffee table has a white veined marble top and dark wood base with golden trim, giving the design a touch of sophistication and luxury.",
    detailedDescription:
      "This coffee table has a striking contrast of a rounded white marble top with a dark wood base that has a golden trim. Featuring a fluted pattern, the sturdy dark wood base creates visual interest with unique design details and dimensions.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528576_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528576_mac_03_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528576_01_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528576_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528576_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528576_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528576_03_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528576_liv_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528576_mac_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528576_mac_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528576_mac_03_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/5/5/5528576_-_web_size.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/sherman-white-wood-console-table-2406550.html",
    title: "Sherman White Wood Console Table",
    sku: "2406550",
    description:
      "The Sherman console table offers both sophistication and a rustic charm with its white wood and natural rattan build.",
    detailedDescription:
      "This console table is crafted from wood with a white paint finish. The natural rattan panels on the front of the drawers give the table a warm and earthy aesthetic. The table comes with an undershelf for additional storage.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406550_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406550_mac_04_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406550_01_-_web_size.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406550_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406550_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406550_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406550_03_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406550_ils_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406550_ils_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406550_04_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406550_mac_01_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406550_mac_02_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406550_mac_04_-_web_size.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406550_-_web_size.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
  {
    url: "https://www.premierhousewares.com/depok-rectangular-console-table-2406749.html",
    title: "Depok Rectangular Console Table",
    sku: "2406749",
    description:
      "This black metal console table with a rattan shelf is a versatile addition that adds a touch of modern sophistication to any room.",
    detailedDescription:
      "This modern console table has a rectangular metal top supported with sleek black metal frame which give it a an open, airy feel. This stylish console table add a decortive touch in any home decor.",
    features: [[Object], [Object], [Object], [Object], [Object]],
    images: [
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406749.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406749_ils_02.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406749_01.jpg?optimize=high&fit=bounds&height=700&width=700&canvas=700:700",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406749.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406749_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406749_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406749_mac_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406749_mac_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406749_mac_03.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406749_ils_01.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406749_ils_02.jpg?optimize=high&fit=bounds&height=90&width=90&canvas=90:90",
      "https://cdn.premierhousewares.com/media/catalog/product/2/4/2406749.jpg?optimize=high&fit=bounds&height=&width=&canvas=:",
    ],
  },
];

// Function to generate CSV data
const generateShopifyCSV = (products) => {
  const rows = [];

  products.forEach((product) => {
    const handle = product.sku;
    const title = product.title;
    const body_html = `${product.description} ${product.detailedDescription}`;
    const vendor = ""; // Change as needed
    const product_type = ""; // Change as needed
    const tags = "Abstract"; // Change as needed
    const published = "TRUE";

    // Main product row
    const mainProductRow = {
      Handle: handle,
      Title: title,
      "Body (HTML)": body_html,
      Vendor: vendor,
      Type: product_type,
      Tags: tags,
      Published: published,
      "Variant SKU": handle,
      "Image Src": product.images[0], // Main image
      Status: "active",
    };

    rows.push(mainProductRow);

    // Additional image rows (starting from the second image)
    product.images.slice(1).forEach((imageUrl, index) => {
      const imageRow = {
        Handle: handle,
        "Image Src": imageUrl,
        "Image Position": index + 2, // Position starts from 2 for additional images
      };
      rows.push(imageRow);
    });
  });

  return rows;
};

// Convert product data into CSV and save to file
const convertToShopifyCSV = (products, outputFilePath) => {
  const csvData = generateShopifyCSV(products);

  const opts = { fields }; // Using the specified fields
  try {
    const csv = parse(csvData, opts);
    fs.writeFileSync(outputFilePath, csv);
    console.log(`CSV file saved to ${outputFilePath}`);
  } catch (err) {
    console.error("Error generating CSV:", err);
  }
};

// Path to save the generated CSV file
const outputFilePath = path.join(__dirname, "shopify_products.csv");

// Call the conversion function
convertToShopifyCSV(products, outputFilePath);
