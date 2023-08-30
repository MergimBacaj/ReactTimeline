import moment from "moment";
import "react-calendar-timeline/lib/Timeline.css";
import Timeline from "react-calendar-timeline";
import { useState } from "react";
import itemRender from "./itemRender";
import "./index.css";
const groups = [
  { id: 1, title: "Employee 1" },
  { id: 2, title: "Employee 2" },
  { id: 3, title: "Employee 3" },
  { id: 4, title: "Employee 4" },
];

const items = [
  {
    id: 1,
    group: 1,
    title: "leave",
    start_time: moment().set("hour", 24).set("minute", 0),
    end_time: moment().add(1, "day").set("hour", 24).set("minute", 0),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      "data-custom-attribute": "Random content",
      "aria-hidden": true,
      onDoubleClick: () => {
        console.log("You clicked double!");
      },
      className: "weekend",
      style: {
        background: "fuchsia",
      },
    },
  },
  {
    id: 2,
    group: 2,
    title: "leave",
    start_time: moment().add(1, "days").set("hour", 24).set("minute", 0),
    end_time: moment().add(4, "days").set("hour", 24).set("minute", 0),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      "data-custom-attribute": "Random content",
      "aria-hidden": true,
      onDoubleClick: () => {
        console.log("You clicked double!");
      },
      className: "weekend",
      style: {
        background: "fuchsia",
      },
    },
  },
  {
    id: 3, // Use a unique id here
    group: 3,
    title: "leave",
    start_time: moment().set("hour", 0).set("minute", 0),
    end_time: moment().add(1, "day").set("hour", 24).set("minute", 0),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      "data-custom-attribute": "Random content",
      "aria-hidden": true,
      onDoubleClick: () => {
        console.log("You clicked double!");
      },
      className: "weekend",
      style: {
        background: "fuchsia",
      },
    },
  },
  {
    id: 4, // Use a unique id here
    group: 4,
    title: "leave",
    start_time: moment().set("hour", 24).set("minute", 0),
    end_time: moment().add(1, "day").set("hour", 24).set("minute", 0),
    itemProps: {
      className: "dot-item",
    },
  },
];

const VacationTracer = () => {
  const [itemss, setItemss] = useState(items);
  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    console.log(newGroupOrder);
    setItemss((currentItems) => {
      return currentItems.map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item };
          updatedItem.start_time = moment(dragTime);
          updatedItem.end_time = moment(dragTime).add(
            moment(item.end_time).diff(item.start_time)
          ); // Maintain the duration while moving
          return updatedItem;
        }
        return item;
      });
    });
  };

  const handleItemResize = (itemId, timeDelta, edge) => {
    setItemss((currentItems) => {
      return currentItems.map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item };
          if (edge === "left") {
            updatedItem.start_time = moment(timeDelta)
              .set("hour", 0)
              .set("minute", 0);
          } else if (edge === "right") {
            updatedItem.end_time = moment(timeDelta)
              .set("hour", 24)
              .set("minute", 0);
          }
          return updatedItem;
        }
        return item;
      });
    });
  };

  const handleItemClick = (itemId) => {
    // Handle click events on items here
    console.log("Item clicked:", itemId);
  };
  const handleCanvasClick = (itemId) => {
    // Handle click events on items here
    console.log("Item clicked:", itemId);
  };
  const filterWeekends = (date) => {
    return date.getDay() !== 0 && date.getDay() !== 6; // 0 is Sunday, 6 is Saturday
  };
  const visibleTimeStart = moment().set("hour", 0);
  const visibleTimeEnd = moment().add(4, "week");
  return (
    <div className="header">
      Rendered by react!
      <Timeline
        className="bg-yellow"
        groups={groups}
        items={itemss} // Use the stateful itemss here
        defaultTimeStart={visibleTimeStart}
        defaultTimeEnd={visibleTimeEnd}
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
        onItemClick={handleItemClick}
        lineHeight={36}
        canResize={"both"}
        sidebarContent={<p id="hh">month</p>}
        sidebarWidth={300}
        itemRenderer={itemRender}
        onCanvasClick={handleCanvasClick}
        maxZoom={1.24 * 86400 * 1000 * 7 * 3}
        minZoom={1.24 * 86400 * 1000 * 7 * 3}
        showWeekends={false}
      />
    </div>
  );
};

export default VacationTracer;
