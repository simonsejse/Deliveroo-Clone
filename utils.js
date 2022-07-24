export const getColorFromRating = (rating) => {
  if (rating < 3) return 'pink';
  return 'green';
};
