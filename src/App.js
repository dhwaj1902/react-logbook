import React from "react";
import Calander from "./components/calander";
import Carousel from "./components/Carousel";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  state = {
    data: [],
    showView: false,
    value: 0,
  };
  componentDidMount = () => {
    var obj = {
      requestobjects: [
        {
          posts: {
            operationtype: "read",
            id: {
              return: true,
            },
            userid: {
              searchvalues: ["41329663-5834-11eb-8e6e-3ca82abc3dd4"],
              return: true,
            },
            iscalendarentry: {
              searchvalues: ["true"],
              return: true,
            },
            media: {
              return: true, //contains image url
            },
            rating: {
              return: true,
            },
            text: {
              return: true,
            },
            privacy: {
              searchvalues: [18],
              return: true,
            },
            typeofday: {
              return: true,
            },

            // Don't change anything above ^^
            //editable variables start below //

            calendardatetime: {
              // Date Time of a particular post
              return: true, // please note: there can be multiple posts on a single day
              sort: "descending", // you can sort fetched dates by ascending/descending.
            },
            maxitemcount: "20", //you can ask between 1 to 50 posts (max) at a time.
            continuationtoken: null, //replace with the continuation token from response to get the next set
          },
        },
      ],
    };
    axios.post("http://devapi.quinn.care/graph", obj).then((res) => {
      // console.log(res.data.responseobjects[0].posts);
      this.setState({ data: res.data.responseobjects[0].posts });
    });
  };
  render() {
    return (
      <div className="App">
        <Calander
          data={this.state.data}
          showC={(e) => this.setState({ value: e, showView: true })}
        />
        {this.state.showView ? (
          <Carousel
            data={this.state.data}
            showC={() => this.setState({ showView: false })}
            value={this.state.value}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
