exports.getdate = () => {
  var today = new Date();
  var option = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-US", option);
  return day;
};
