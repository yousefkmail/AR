export const GetPageCount = (pageSize: number, total: number) => {
  return Math.ceil(total / pageSize);
};
