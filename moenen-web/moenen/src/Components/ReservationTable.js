import React from 'react';

class ReservationTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reservations: null,
    };
  }

  // Fetch reservations every 2 seconds
  componentDidMount() {
    try {
      setInterval(async () => {
        fetch('https://localhost:44325/api/reservation')
          .then((response) => response.json())
          .then((reservations) => {
            this.setState({ reservations });
          });
      }, 800);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let items = null;
    if (this.state.reservations) {
      items = this.state.reservations.map((reservation) => (
        <tr
          key={reservation.id}
          onClick={() => this.props.getValues(reservation)}
        >
          <td>{reservation.name}</td>
          <td>{reservation.phoneNumber}</td>
          <td>{reservation.guests}</td>
          <td>{Date.parse(reservation.reservationArrival)}</td>
          <td>{Date.parse(reservation.reservationDepature)}</td>
          <td></td>
        </tr>
      ));
    }

    return (
      <table className="table table-responsive table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Naam</th>
            <th scope="col">Telefoonnummer</th>
            <th scope="col">Gasten</th>
            <th scope="col">Aankomst</th>
            <th scope="col">Vertrek</th>
            <th scope="col">
              <button
                className="btn btn-sm btn-success"
                onClick={() => this.props.openPopup(0)}
              >
                <i className="fas fa-plus"></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    );
  }
}

export default ReservationTable;
