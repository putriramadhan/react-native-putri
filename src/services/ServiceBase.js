export const ServiceBaseIsDuplicateArray = (items, val, by) => {
    let flatItems = items.map((value) => value[by]);
    return flatItems.includes(val);
  };