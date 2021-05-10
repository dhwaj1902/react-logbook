import React from "react";
import moment from "moment";
import { Calendar } from "react-feather";
import StarRatings from "react-star-ratings";
import Tooltip from "@material-ui/core/Tooltip";

class Calander extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.myTop = React.createRef();
  }
  state = {
    dates: [],
    data: [],
    dataDate: [],
    dates1: [],
  };

  componentDidMount = () => {
    var arr = [];
    for (var i = 0; i < this.props.data.length; i++) {
      arr.push(
        moment(new Date(this.props.data[i].calendardatetime)).format(
          "DD MMM YY"
        )
      );
    }
    // console.log(arr);
    this.setState({ data: this.props.data, dataDate: arr });
    var today = new Date();
    var endDate = new Date(
      today.getFullYear() + 1,
      today.getMonth(),
      today.getDate()
    );
    var pendDate = new Date(
      today.getFullYear() - 1,
      today.getMonth(),
      today.getDate()
    );
    var todayDay = pendDate.getDay();
    // console.log(today, endDate, pendDate, todayDay);
    var arr = [];
    for (var i = 0; i < todayDay; i++) {
      arr.push("");
    }
    for (var i = pendDate; i < endDate; i.setDate(i.getDate() + 1)) {
      arr.push(new Date(i));
    }
    // console.log(arr, new Date());
    this.setState({ dates: arr });
  };

  componentWillReceiveProps = (props) => {
    var arr = [];
    for (var i = 0; i < props.data.length; i++) {
      arr.push(
        moment(new Date(props.data[i].calendardatetime)).format("DD MMM YY")
      );
    }
    // console.log(arr);
    this.setState({ data: props.data, dataDate: arr });
  };

  executeScroll = () => this.myRef.current.scrollIntoView();

  scrollCheck = (event) => {
    // console.log(event.target.scrollTop);
    const bottom =
      Math.floor(event.target.scrollHeight - event.target.scrollTop) <=
      event.target.clientHeight + 20;
    const top = event.target.scrollTop === 0;
    if (bottom) {
      // console.log("At The Bottom");
      var date = new Date(this.state.dates[this.state.dates.length - 1]);
      var endDate = new Date(
        date.getFullYear() + 1,
        date.getMonth(),
        date.getDate()
      );
      var arr = this.state.dates;
      for (var i = date; i < endDate; i.setDate(i.getDate() + 1)) {
        arr.push(new Date(i));
      }
      this.setState({ dates: arr });
    }
    if (top) {
      // console.log("At The Top");
      var date = new Date(this.state.dates[0]);
      for (var i = 0; i < 7; i++) {
        if (this.state.dates[i] !== "") {
          date = new Date(this.state.dates[i]);
          break;
        }
      }
      var endDate = new Date(
        date.getFullYear() - 1,
        date.getMonth(),
        date.getDate()
      );
      var arr = [];
      var todayDay = endDate.getDay();
      for (var i = 0; i < todayDay; i++) {
        arr.push("");
      }
      for (var i = endDate; i < date; i.setDate(i.getDate() + 1)) {
        arr.push(new Date(i));
      }
      // var arrr = this.state.dates;
      for (var i = 0; i < this.state.dates.length; i++) {
        if (this.state.dates[i] !== "") {
          arr.push(this.state.dates[i]);
        }
      }
      this.setState({ dates: arr });
      console.log(arr, todayDay);
    }
  };

  render() {
    return (
      <>
        <div className="wrapper">
          <div className="calender" onScroll={this.scrollCheck}>
            <div className="weekends sticky-top">
              <div className="week sun">Sun</div>
              <div className="week">Mon</div>
              <div className="week">Tue</div>
              <div className="week">Wed</div>
              <div className="week">Thu</div>
              <div className="week">Fri</div>
              <div className="week">Sat</div>
            </div>
            <div className="days">
              {this.state.dates.map((item, index) => {
                //   console.log(item === new Date() ? "here" : "");
                var car;
                var dat = this.state.dataDate.filter((d, ind) => {
                  car = ind;
                  return d === moment(item).format("DD MMM YY");
                });
                var car = this.state.dataDate.indexOf(
                  moment(item).format("DD MMM YY")
                );
                return (
                  <div
                    className={`day calendarCard ${
                      item === "" ? "" : item.getDate() === 1 ? "th-bold" : ""
                    } ${
                      index % 7 === 0
                        ? moment(item).format("DD MMM YY") ===
                          moment(new Date()).format("DD MMM YY")
                          ? "daytoday"
                          : "sun"
                        : ""
                    } ${
                      item === ""
                        ? ""
                        : moment(item).format("DD MMM YY") ===
                          moment(new Date()).format("DD MMM YY")
                        ? "daytoday"
                        : ""
                    } `}
                    ref={
                      moment(item).format("DD MMM YY") ===
                      moment(new Date()).format("DD MMM YY")
                        ? this.myRef
                        : null
                    }
                    onClick={() =>
                      dat.length > 0 ? this.props.showC(car) : null
                    }
                  >
                    {item === ""
                      ? ""
                      : item.getDate() === 1
                      ? moment(item).format("DD MMM YY")
                      : moment(item).format("D")}
                    <br />
                    {dat.length > 0 ? (
                      <>
                        <StarRatings
                          rating={5}
                          starRatedColor="blue"
                          numberOfStars={this.state.data[car]?.rating}
                          name="rating"
                          starDimension="10px"
                          starSpacing="5px"
                        />
                        <br />
                        <img
                          src={this.state.data[car]?.media[0]?.mediaurl}
                          width="100%"
                        />
                        <br />
                        <div className="d-flex text-center flex-row">
                          {this.state.data[car].typeofday.map((item) => (
                            <>
                              <span
                                className={`color-bullet text-center ${item
                                  .toLowerCase()
                                  .split(" ")
                                  .join("-")} th-8`}
                                style={{ marginRight: "3px" }}
                              >
                                {item
                                  .toUpperCase()
                                  .split(" ")
                                  .map((legend) => legend.charAt(0))}
                              </span>
                            </>
                          ))}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Tooltip title="Today Date" aria-label="add">
          <div onClick={this.executeScroll} className="today-button p-3">
            <Calendar />
          </div>
        </Tooltip>
      </>
    );
  }
}

export default Calander;
