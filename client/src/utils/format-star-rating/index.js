const formatStarRating = (rating) =>
  rating >= 1 && rating <= 5 ? Math.round(rating * 2) / 2 : 5;

export default formatStarRating;
