type MergeStylesArg = {
  style: Record<string, any>;
  active: boolean;
}[];

export const mergeStyles = (...style: MergeStylesArg) => {
  return style.reduce((acc, styleItem) => {
    if (!styleItem.active) {
      return acc;
    }
    return {
      ...acc,
      ...styleItem.style,
    };
  }, {} as Record<string, any>);
};
