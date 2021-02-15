
import dayjs from "dayjs";
import customParser from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(customParser).extend(isSameOrAfter);

export const dateChecker = (day) => {
  return dayjs().isSameOrAfter(
    dayjs(`${("0" + day).substr(-2)}/12/2020`, "DD/MM/YYYY")
  );
};