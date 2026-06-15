var sum_to_n_a = function (n) {
  let sum = 0;
  const count = n < 0 ? -1 : 1;

  for (let i = count; n < 0 ? count >= n : count <= n; i += count) {
    sum += i;
  }

  return sum;
};

var sum_to_n_b = function (n) {
  if (n == 0) return 0;
  return n + sum_to_n_c(n < 0 ? n + 1 : n - 1);
};

var sum_to_n_c = function (n) {
  const sum = (Math.abs(n) / 2) * (Math.abs(n) + 1);
  return n < 0 ? -sum : sum;
};
