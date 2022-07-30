//date format == Jul 30 2022 14:06

export const dateConverter = (date) => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var meseci = [
    "јануари",
    "февруари",
    "март",
    "април",
    "мај",
    "јуни",
    "јули",
    "август",
    "септември",
    "октомври",
    "ноември",
    "декември",
  ];

  var datum = "";
  var day = date.substring(4, 6);
  datum = datum + day;
  var month = date.substring(0, 3);
  datum = datum + " " + meseci[months.indexOf(month)];
  var year = date.substring(7, 11);
  datum = datum + " " + year;
  var time = date.substring(12, 17);
  datum = datum + " " + "во" + " " + time;

  return datum;
};
