const formatRatingScore = (rating) =>
  (Math.round(rating * 100) / 100).toFixed(1);

export default formatRatingScore;
