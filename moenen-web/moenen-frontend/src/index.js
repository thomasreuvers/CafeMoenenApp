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
    // console.log(res);
  };

  render() {
    return (
      <div className="container h-100">
        <br />
        <div className="row">
          <div className="col-12">
            <h3 className="text-center" style={{ color: 'white' }}>
              Reserveringen
            </h3>
            <div className="table-responsive">
              <ReservationTable
                setModalActive={this.ToggleModal}
                getReservation={this.getReservation}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <hr style={{ borderColor: 'white' }} className="mt-5 mb-5" />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              {this.state.res && (
                <div>
                  <h3 className="text-center" style={{ color: 'white' }}>
                    Bestellingen - {this.state.res.name}
                  </h3>
                  <OrderTable
                    setModalActive={this.ToggleModal}
                    res={this.state.res}
                  />
                </div>
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
        <div
          className="footer"
          style={{ position: 'fixed', bottom: 0, top: 800, left: 0, right: 0 }}
        >
          <h3 style={{ color: 'white' }} className="text-center">
            Cafe Moenen WebApp - By Thomas
          </h3>
        </div>
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
