import moment from "moment";

const itemRender = ({ item, itemContext, getItemProps, getResizeProps }) => {
  // const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
  // const backgroundColor = itemContext.selected
  //   ? itemContext.dragging
  //     ? "red"
  //     : "yellow"
  //   : "gray";
  console.log(item);
  const getDayNamesBetweenDates = (startDate, endDate) => {
    const dayNames = [];
    const currentDate = moment(startDate);

    while (currentDate.isBefore(endDate)) {
      // Use isBefore instead of isSameOrBefore
      dayNames.push(currentDate.format("ddd"));
      currentDate.add(1, "day");
    }

    return dayNames;
  };
  const leaveDays = getDayNamesBetweenDates(item.start_time, item.end_time);
  console.log(leaveDays);
  return (
    <div
      {...getItemProps({
        style: {
          color: item.color,
          borderRadius: 50,
          borderColor: "none",
          boxShadow: `0 1px 5px 0 rgba(0, 0, 0, 0.2),
             0 2px 2px 0 rgba(0, 0, 0, 0.14),
             0 3px 1px -2px rgba(0, 0, 0, 0.12)`,
          // Apply different background color for weekends
          // background: isWeekend ? "lightgray" : backgroundColor,
        },
      })}
    >
      {leaveDays.map((day) => {
        if (day === "Sat" || day === "Sun") {
          return (
            <div
              className="itemBox"
              style={{ background: "transparent" }}
            ></div>
          );
        }

        return <div className="itemBox"></div>;
      })}
    </div>
  );
};

export default itemRender;
{
  /* <div
{...getItemProps({
  style: {
    backgroundColor,
    color: item.color,
    borderRadius: 50,
    boxShadow: `0 1px 5px 0 rgba(0, 0, 0, 0.2),
             0 2px 2px 0 rgba(0, 0, 0, 0.14),
             0 3px 1px -2px rgba(0, 0, 0, 0.12)`,
    // Apply different background color for weekends
    background: isWeekend ? "lightgray" : backgroundColor,
  },
})}
>
{itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

<div
  className="ripple"
  style={{
    height: itemContext.dimensions.height,
    paddingLeft: 3,
    whiteSpace: "nowrap",
    fontSize: "0.7rem",
  }}
>
  {itemContext.title}
</div>

{itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
</div> */
}
