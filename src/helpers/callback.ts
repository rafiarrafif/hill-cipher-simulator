export const callback = (
  success: boolean,
  data: {
    result: string;
    process?: any[];
  },
) => {
  return {
    success,
    data,
  };
};
