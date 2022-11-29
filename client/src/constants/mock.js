export const restaurantItemData = {
  restaurantId: "_-9pMxBWtG_x8l4rHWBasg",
  restaurantName: "Black Chile Mexican Grill",
  reviewCount: 98,
  address: "2502 E Camelback Rd Phoenix, AZ 85016",
  categories: "Mexican, Restaurants",
  avgRating: 3,
  open: "Y",
  longitude: -112.027204,
  latitude: 33.510207,
  city: "Phoenix",
  state: "AZ",
};

export const reviewItemData = {
  reviewId: "-__GOJabOJ-QMiiZxMNUkQ",
  restaurantId: "cqIHyZ3Q0D4vBi-vb4mi-g",
  reviewerId: "W7zmm1uzlyUkEqpSG7PlBw",
  rating: 5,
  funnyCount: 4,
  usefulCount: 3,
  coolCount: 2,
  content:
    "I love the Bikini. Its within stumbling distance of my girl's house, which makes it the best bar in Phoenix to begin with. That, coupled with the fact that it really is \"never the same bar twice\" I love going there. Its cash only, which I like even more. I can put X amount of money in my pocket, and when I am out of money, I go home. Its cheap, the drinks are strong, and the people that run the place don't give a fuck in the most loving way.",
  date: "4/4/2011",
};

export const reviewerItemData = {
  reviewerId: "__7iSC6XCyWW4pHd8Cz0SQ",
  name: "Scott",
  avgRating: 3.57,
  funnyCount: 10,
  usefulCount: 29,
  coolCount: 8,
  reviewCount: 91,
};

export const restaurantListData = Array(100).fill(restaurantItemData);

export const reviewListData = Array(100).fill(reviewItemData);

export const restaurantAnalyticsData = Array(5).fill(restaurantItemData);
