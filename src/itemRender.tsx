const itemRender = ({ item, itemContext, getItemProps, getResizeProps }) => {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
  const backgroundColor = itemContext.selected
    ? itemContext.dragging
      ? "red"
      : "yellow"
    : "gray";
  const filterWeekends = (date) => {
    return date.day() !== 0 && date.day() !== 6;
  };
  const isWeekend = !filterWeekends(item.start_time);

  return (
    <div
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
    </div>
  );
};

export default itemRender;
