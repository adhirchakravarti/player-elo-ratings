const K = 32;

export function calculateExpectedScore(ratingSelf, ratingOpponent) {
  const expectedScore =
    1 / (1 + Math.pow(10, (ratingOpponent - ratingSelf) / 400));
  return expectedScore;
}

export function calculateNewRating(rating, actualScore, expectedScore) {
  const newRating = rating + Math.round(K * (actualScore - expectedScore));
  return newRating;
}
