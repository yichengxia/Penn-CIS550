const paginateResults = (arr, page, pageSize = 10) => {
  if (!page || page <= 0 || !arr || arr.length === 0) return [];
  return arr.slice(
    (page - 1) * pageSize,
    Math.min(arr.length, (page - 1) * pageSize + pageSize)
  );
};

export default paginateResults;
