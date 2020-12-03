const formatDate = (date) => {
  //   console.log("date in formatDate: ", date);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "2-digit",
  }).format(date);
};

export { formatDate };
