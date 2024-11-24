export const ClassnameMerge = (...args: (string | undefined)[]) => {
  let classnames = "";

  args.forEach((item) => {
    if (item) {
      classnames += item;
      classnames += " ";
    }
  });

  return classnames;
};
