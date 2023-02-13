const express = require("express");
const cors = require("cors");
const { isNil } = require("lodash");
const path = require("path");
const data = require("./data");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join('public')))

const LIMIT = 8;

function containsColors(colors, product) {
  // base case, do not skip products when there are no color filters
  if (!colors) return true;

  const selectedColors = new Set(colors.split(","));
  const productColors = product.color;

  // check if any of the product colors are in the filter
  for (const color of productColors) {
    if (selectedColors.has(color)) {
      return true;
    }
  }

  // does not contain any of the filtered colors, skip this product
  return false;
}

function applyFilters(products, { query, sort, colors, minPrice, maxPrice }) {
  const filteredProducts = [];

  // skip products based on filters
  for (const product of products) {
    if (
      query &&
      !product.name.toLowerCase().includes(query.toLowerCase()) &&
      !product.category.toLowerCase().includes(query.toLowerCase())
    ) {
      continue;
    }

    if (!containsColors(colors, product)) {
      continue;
    }

    if (!isNil(minPrice) && product.price / 100 < minPrice) {
      continue;
    }

    if (!isNil(maxPrice) && product.price / 100 > maxPrice) {
      continue;
    }

    filteredProducts.push(product);
  }

  return filteredProducts.sort((a, b) => {
    const { name, price } = a;
    const { name: nameB, price: priceB } = b;

    switch (sort) {
      case "priceDesc":
        return priceB - price;
      case "priceAsc":
        return price - priceB;
      default:
        return name.localeCompare(nameB);
    }
  });
}

const paginate = (model, { page }) => {
  const selectedPage = page ? +page : 1;
  const limit = LIMIT;

  const startIndex = (selectedPage - 1) * limit;
  const endIndex = selectedPage * limit;

  const result = {};
  if (endIndex < model.length) {
    result.next = {
      page: selectedPage + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    result.previous = {
      page: selectedPage - 1,
      limit: limit,
    };
  }

  const itemCounts = model.reduce((initial, item) => {
    if (!isNaN(initial[item.category])) {
      initial[item.category] += 1;
    } else {
      initial[item.category] = 1;
    }
    return initial;
  }, {});
  itemCounts.totalResults = model.length;

  result.results = model.slice(startIndex, endIndex);
  result.totalPages = Math.ceil(model.length / limit);
  result.itemCounts = itemCounts;
  result.page = selectedPage;
  return result;
};

app.get("/items", (req, res) => {
  // compute the max price for the filter
  const maxPrice = Math.round(
    Math.max(...data.map((product) => product.price))
  );

  let filteredProducts = applyFilters(data, req.query);
  let paginateData = paginate(filteredProducts, req.query);
  paginateData["products"] = paginateData["results"];
  delete paginateData["results"];

  // fake the request to a backend search service like solr or elasticsearch
  setTimeout(() => {
    res.json({ ...paginateData, maxPrice });
  }, 250);
});


// app.use((req,res,next)=>{
//   res.sendFile(path.resolve(__dirname,'public','index.html'))
// })

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.info("server listening on: " + PORT);
});
