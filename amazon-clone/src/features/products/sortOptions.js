// AI FEATURE 2 - PRODUCT SORTING

export const SORT_OPTION_IDS = {
  featured: "featured",
  priceAsc: "priceAsc",
  priceDesc: "priceDesc",
  rating: "rating",
  newest: "newest",
  bestsellers: "bestsellers",
};

export const SORT_OPTIONS = [
  { id: SORT_OPTION_IDS.featured, label: "Featured" },
  { id: SORT_OPTION_IDS.priceAsc, label: "Price: Low to High" },
  { id: SORT_OPTION_IDS.priceDesc, label: "Price: High to Low" },
  { id: SORT_OPTION_IDS.rating, label: "Avg. Customer Review" },
  { id: SORT_OPTION_IDS.newest, label: "Newest Arrivals" },
  { id: SORT_OPTION_IDS.bestsellers, label: "Best Sellers" },
];

export function sortProducts(list, sortId) {
  const items = [...list];
  switch (sortId) {
    case SORT_OPTION_IDS.priceAsc:
      items.sort((a, b) => a.price - b.price);
      break;
    case SORT_OPTION_IDS.priceDesc:
      items.sort((a, b) => b.price - a.price);
      break;
    case SORT_OPTION_IDS.rating:
      items.sort((a, b) => b.rating - a.rating || b.sales - a.sales);
      break;
    case SORT_OPTION_IDS.newest:
      items.sort((a, b) => b.id - a.id);
      break;
    case SORT_OPTION_IDS.bestsellers:
      items.sort((a, b) => b.sales - a.sales || b.rating - a.rating);
      break;
    default:
      break;
  }
  return items;
}
