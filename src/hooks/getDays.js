export function getDays(data) {
  const createdDate = new Date(data);
  const today = new Date();
  const diffTime = Math.abs(today - createdDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const result =
    diffDays === 1 ? `${diffDays} day ago.` : `${diffDays} days ago.`;
  return result;
}
