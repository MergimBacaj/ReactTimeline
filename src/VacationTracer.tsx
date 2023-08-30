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
  { id: 5, title: "Employee 5" },
];

const items = [
  {
    id: 1,
    group: 1,
    title: "leave",
    start_time: moment("2023-08-30"),
    end_time: moment("2023-09-05").set("hour", 24),
  },
  {
    id: 2,
    group: 2,
    title: "leave",
    start_time: moment().add(1, "days").set("hour", 24).set("minute", 0),
    end_time: moment().add(4, "days").set("hour", 24).set("minute", 0),
  },
  {
    id: 3, // Use a unique id here
    group: 3,
    title: "leave",
    start_time: moment().set("hour", 24).set("minute", 0),
    end_time: moment().add(1, "day").set("hour", 24).set("minute", 0),
  },
  {
    id: 4, // Use a unique id here
    group: 4,
    title: "leave",
    start_time: moment().set("hour", 24).set("minute", 0),
    end_time: moment().add(10, "day").set("hour", 24).set("minute", 0),
  },
  {
    id: 5,
    group: 5,
    title: "leave",
    start_time: moment().set("hour", 24).set("minute", 0),
    end_time: moment().add(3, "day").set("hour", 24).set("minute", 0),
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

  const visibleTimeStart = moment().set("hour", 0);
  const visibleTimeEnd = moment().add(4, "weeks");
  return (
    <div className="header">
      Rendered by react!
      <Timeline
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
        maxZoom={0.8 * 86400 * 1000 * 7 * 3}
        minZoom={0.8 * 86400 * 1000 * 7 * 3}
      />
    </div>
  );
};

export default VacationTracer;
