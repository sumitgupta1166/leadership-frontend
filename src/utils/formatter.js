export const formatPoints = (points = 0) =>
  new Intl.NumberFormat().format(points);