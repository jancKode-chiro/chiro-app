function currencyPrettyPrint(cents: number) {
  // const dollars = cents / 100;
  return cents.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

export default currencyPrettyPrint;
