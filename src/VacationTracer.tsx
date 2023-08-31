import moment from "moment";
import "react-calendar-timeline/lib/Timeline.css";
import Timeline, { DateHeader } from "react-calendar-timeline";
import itemRender from "./itemRender";
import "./index.css";

import { TimelineHeaders, SidebarHeader } from "react-calendar-timeline";
import { TimelineItemBase } from "react-calendar-timeline";

const groups = [
  { id: 1, title: "Employee 1" },
  { id: 2, title: "Employee 2" },
  { id: 3, title: "Employee 3" },
  { id: 4, title: "Employee 4" },
  { id: 5, title: "Employee 5" },
];

const items: TimelineItemBase<number>[] = [
  {
    id: 1,
    group: 1,
    title: "leave",
    start_time: moment("2023-08-30").valueOf(),
    end_time: moment("2023-09-05").set("hour", 24).valueOf(),
  },
  {
    id: 2,
    group: 2,
    title: "leave",
    start_time: moment()
      .add(1, "days")
      .set("hour", 24)
      .set("minute", 0)
      .valueOf(),
    end_time: moment()
      .add(4, "days")
      .set("hour", 24)
      .set("minute", 0)
      .valueOf(),
  },
  {
    id: 3, // Use a unique id here
    group: 3,
    title: "leave",
    start_time: moment().set("hour", 24).set("minute", 0).valueOf(),
    end_time: moment().add(1, "day").set("hour", 24).set("minute", 0).valueOf(),
  },
  {
    id: 4, // Use a unique id here
    group: 4,
    title: "leave",
    start_time: moment().set("hour", 24).set("minute", 0).valueOf(),
    end_time: moment()
      .add(10, "day")
      .set("hour", 24)
      .set("minute", 0)
      .valueOf(),
  },
  {
    id: 5,
    group: 5,
    title: "leave",
    start_time: moment().set("hour", 24).set("minute", 0).valueOf(),
    end_time: moment().add(3, "day").set("hour", 24).set("minute", 0).valueOf(),
  },
];

console.log(items);

const VacationTracer = () => {
  // const [itemss, setItemss] = useState(items);
  // const handleItemMove = (itemId: string | number, dragTime: number) => {
  //   setItemss((currentItems) => {
  //     return currentItems.map((item) => {
  //       if (item.id === itemId) {
  //         const updatedItem = { ...item };
  //         updatedItem.start_time = moment(dragTime).valueOf();
  //         updatedItem.end_time = moment(dragTime)
  //           .add(moment(item.end_time).diff(item.start_time))
  //           .valueOf();
  //         return updatedItem;
  //       }
  //       return item;
  //     });
  //   });
  // };

  // const handleItemResize = (
  //   itemId: string | number,
  //   timeDelta: number,
  //   edge: "left" | "right"
  // ) => {
  //   setItemss((currentItems) => {
  //     return currentItems.map((item) => {
  //       if (item.id === itemId) {
  //         const updatedItem = { ...item };
  //         if (edge === "left") {
  //           updatedItem.start_time = moment(timeDelta)
  //             .set("hour", 0)
  //             .set("minute", 0)
  //             .valueOf();
  //         } else if (edge === "right") {
  //           updatedItem.end_time = moment(timeDelta)
  //             .set("hour", 24)
  //             .set("minute", 0)
  //             .valueOf();
  //         }
  //         return updatedItem;
  //       }
  //       return item;
  //     });
  //   });
  // };

  const handleItemClick = (itemId: string | number) => {
    // Handle click events on items here
    console.log("Item clicked:", itemId);
  };
  const handleCanvasClick = (itemId: string | number) => {
    // Handle click events on items here
    console.log("Canvas clicked:", itemId);
  };

  const visibleTimeStart = moment().set("hour", 0);
  const visibleTimeEnd = moment().add(4, "weeks");
  return (
    <div className="header">
      <Timeline
        groups={groups}
        items={items}
        canMove={false}
        defaultTimeStart={visibleTimeStart}
        defaultTimeEnd={visibleTimeEnd}
        // onItemMove={handleItemMove}
        // onItemResize={handleItemResize}
        onItemClick={handleItemClick}
        lineHeight={36}
        itemRenderer={itemRender}
        onCanvasClick={handleCanvasClick}
        maxZoom={0.8 * 86400 * 1000 * 7 * 3}
        minZoom={0.8 * 86400 * 1000 * 7 * 3}
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return (
                <div
                  {...getRootProps()}
                  style={{
                    textAlign: "start",
                    width: "150px",
                    fontWeight: "bold",
                    verticalAlign: "center",
                    alignSelf: "center",
                  }}
                >
                  <span>{moment().format("MMMM")}</span>
                </div>
              );
            }}
          </SidebarHeader>

          <DateHeader className="weekdays" />
          <DateHeader unit="day" labelFormat="ddd" className="weekdayNames" />
        </TimelineHeaders>
      </Timeline>
    </div>
  );
};

export default VacationTracer;
