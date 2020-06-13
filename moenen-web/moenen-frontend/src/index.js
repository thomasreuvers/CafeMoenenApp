import React from 'react';
import ReactDOM from 'react-dom';
import ReservationTable from './components/ReservationTable';
import Modal from './components/Modal';
import OrderTable from './components/OrderTable';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsActive: false,
      modalAction: null,
      modalObj: null,
      res: null,
    };
  }

  ToggleModal = (action, obj) => {
    this.setState({
      modalIsActive: !this.state.modalIsActive,
      modalAction: action,
      modalObj: obj,
    });
  };

  getReservation = (res) => {
    this.setState({ res: res });
    console.log(res);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="text-center">Reserveringen</h3>
            <div className="table-responsive">
              <ReservationTable
                setModalActive={this.ToggleModal}
                getReservation={this.getReservation}
              />
              {this.state.res && (
                <OrderTable
                  setModalActive={this.ToggleModal}
                  res={this.state.res}
                />
              )}
            </div>
          </div>
        </div>
        {this.state.modalIsActive && (
          <Modal
            action={this.state.modalAction}
            setModalActive={this.ToggleModal}
            obj={this.state.modalObj}
          />
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));

/* TODO:
 * Maak modal
 * Maak edit, delete en create functie voor reserveringen: https://www.youtube.com/watch?v=c3qWHnJJbSY
 * Show order table van specifieke reservering, wanneer er op een reservering word geklikt.
 * Haal elke 5 seconde all orders op van deze specifieke reservering.
 * Maak hiervoor een create order functie in het modal component
 * Verdere frontend aanpassingen.
 */
