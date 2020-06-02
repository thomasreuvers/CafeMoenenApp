import React from 'react';
import ReactDOM from 'react-dom';
import ReservationTable from './Components/ReservationTable';
import CreatePopup from './Components/CreatePopup';
import OrderTable from './Components/OrderTable';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false,
      reservation: null,
    };
  }

  togglePopup(type) {
    this.setState({ showPopup: !this.state.showPopup, popUpType: type });
  }

  setReservation(reservation) {
    this.setState({
      reservation: reservation,
    });
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          {this.state.showPopup ? (
            <CreatePopup
              closePopup={this.togglePopup.bind(this)}
              popUpType={this.state.popUpType}
              reservation={this.state.reservation}
            />
          ) : null}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-7">
              <ReservationTable
                openPopup={this.togglePopup.bind(this)}
                getValues={this.setReservation.bind(this)}
              />
            </div>
            <div className="col-5">
              {this.state.reservation ? (
                <OrderTable
                  key={this.state.reservation.id}
                  reservation={this.state.reservation}
                  openPopup={this.togglePopup.bind(this)}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
