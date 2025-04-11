export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  let lastFn: NodeJS.Timeout;
  let lastTime: number;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= limit) {
          fn(...args);
          lastTime = Date.now();
        }
      }, limit - (Date.now() - lastTime));
    }
  };
};

export const useThrottle = <T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  return throttle(fn, limit);
}; 