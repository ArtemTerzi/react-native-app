export const sortItemsByPostTime = (items, type) => {
  switch (type) {
    case 'asc':
      return items.sort((a, b) => {
        const timeA = new Date(a.postTime);
        const timeB = new Date(b.postTime);
        return timeA - timeB;
      });
    case 'dsc':
      return items.sort((a, b) => {
        const timeB = new Date(b.postTime);
        const timeA = new Date(a.postTime);
        return timeB - timeA;
      });
    default:
    case 'asc':
      return items.sort((a, b) => {
        const timeA = new Date(a.postTime);
        const timeB = new Date(b.postTime);
        return timeA - timeB;
      });
  }
};
