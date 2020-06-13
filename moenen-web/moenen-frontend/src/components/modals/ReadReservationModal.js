import React from 'react';

class ReadReservationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tables: [],
    };
  }

  componentDidMount() {
    this.getAllTablesOfReservation();
  }

  getAllTablesOfReservation = () => {
    this.props.reservation.tableIds.forEach((element) => {
      fetch(`https://localhost:44325/api/table/${element}`).then((response) =>
        response
          .json()
          .then((res) => this.setState({ tables: [...this.state.tables, res] }))
      );
    });
  };

  render() {
    return (
      <div
        style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.23)' }}
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Bekijk {this.props.reservation.name}
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => this.props.setModalActive()}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                <b>Gereserveerd op naam:</b> {this.props.reservation.name}
              </p>
              <p>
                <b>Telefoonnummer:</b> {this.props.reservation.phoneNumber}
              </p>
              <p>
                <b>Aantal gasten:</b> {this.props.reservation.guests}
              </p>
              <p>
                <b>Locatie:</b> {this.props.reservation.setting}
              </p>
              <span>
                <b>Tafelnummers:</b>
              </span>
              <ul>
                {this.state.tables.map((table) => (
                  <li key={table.id}>{table.number}</li>
                ))}
              </ul>
              <p>
                <b>Tijd:</b>{' '}
                {this.props.reservation.reservationArrival
                  .slice(0, 16)
                  .replace('T', ' ') +
                  ' - ' +
                  this.props.reservation.reservationDepature
                    .slice(0, 16)
                    .replace('T', ' ')}
              </p>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReadReservationModal;
