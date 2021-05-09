import React from "react";
import { Carousel, Card } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReactStars from "react-rating-stars-component";
import { XCircle } from "react-feather";
class Carousal extends React.Component {
  state = {
    index: this.props.value,
  };
  handleClose = () => {
    this.props.showC();
  };
  handleSelect = (selectedIndex, e) => {
    // console.log(selectedIndex, e);
    this.setState({ index: selectedIndex });
  };
  componentDidMount = () => {
    this.setState({ index: this.props.value });
  };
  componentWillReceiveProps = (props) => {
    this.setState({ index: props.value });
  };

  render() {
    // console.log(this.props.value);
    return (
      <Dialog
        open={true}
        fullWidth={true}
        fullScreen={true}
        className="crosoule"
        onClose={this.handleClose}
      >
        <DialogTitle className="mt-5">
          <div>
            <XCircle
              onClick={this.handleClose}
              className="close"
              size={40}
              color="white"
            />
          </div>
        </DialogTitle>
        <Carousel activeIndex={this.state.index} onSelect={this.handleSelect}>
          {this.props.data.map((item, index) => (
            <Carousel.Item className="text-center" pause={true}>
              <Card
                style={{
                  width: "80%",
                  margin: "auto",
                }}
              >
                <Card.Img variant="top" src={item?.media[0]?.mediaurl} />
                <Card.Body>
                  <div className="d-flex justify-content-around">
                    <div className="d-flex flex-row">
                      {item.typeofday?.map((item) => (
                        <div
                          className={`color-bullet text-center ${item
                            .toLowerCase()
                            .split(" ")
                            .join("-")} p-2 th-8`}
                          style={{ marginRight: "3px" }}
                        >
                          {item
                            .toUpperCase()
                            .split(" ")
                            .map((legend) => legend.charAt(0))}
                        </div>
                      ))}
                    </div>
                    <ReactStars
                      count={5}
                      value={item.rating}
                      size={15}
                      activeColor="#95D0F0"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <Card.Text className="th-16">{item.text}</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      </Dialog>
    );
  }
}

export default Carousal;
