import React from 'react';

class ReservationTable extends React.Component {
  constructor(props) {
    super(props);

    this.LoadReservationsInterval = setInterval(this.LoadReservations, 2000);
    this.state = { reservations: [] };
  }

  // componentDidMount() {
  //   this.LoadReservations();
  // }

  componentWillUnmount() {
    clearInterval(this.LoadReservationsInterval);
  }

  LoadReservations = async () => {
    try {
      const res = await fetch('https://localhost:44325/api/reservation');
      const json = await res.json();

      this.setState({ reservations: json });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <table
        style={{ cursor: 'pointer' }}
        className="table table-striped table-dark table-hover"
      >
        <thead>
          <tr>
            <th>Naam</th>
            <th>Telefoonnummer</th>
            <th>Locatie</th>
            <th>Gasten</th>
            <th>Aankomst</th>
            <th>Vertrek</th>
            <th>
              <button
                className="btn btn-sm btn-success"
                onClick={() => this.props.setModalActive('create')}
              >
                <i className="fas fa-plus"></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.reservations > 0 ||
            (this.state.reservations &&
              this.state.reservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  onClick={() => this.props.getReservation(reservation)}
                >
                  <td>{reservation.name}</td>
                  <td>{reservation.phoneNumber}</td>
                  <td>{reservation.setting}</td>
                  <td>{reservation.guests}</td>
                  <td>
                    {reservation.reservationArrival
                      .slice(0, 16)
                      .replace('T', ' ')}
                  </td>
                  <td>
                    {reservation.reservationDepature
                      .slice(0, 16)
                      .replace('T', ' ')}
                  </td>
                  <td colSpan="3">
                    <button
                      className="btn btn-sm btn-info mr-1"
                      onClick={() =>
                        this.props.setModalActive('edit', reservation)
                      }
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger mr-1 ml-1"
                      onClick={() =>
                        this.props.setModalActive('delete', reservation)
                      }
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-secondary ml-1"
                      onClick={() =>
                        this.props.setModalActive('read', reservation)
                      }
                    >
                      <i className="far fa-eye"></i>
                    </button>
                  </td>
                </tr>
              )))}
        </tbody>
      </table>
    );
  }
}

export default ReservationTable;
