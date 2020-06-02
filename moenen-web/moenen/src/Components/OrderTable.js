import React from 'react';

class OrderTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { reservation: this.props.reservation, orders: null };
  }

  // Fetch order details every 2 seconds
  componentDidMount() {
    this.setState({ reservation: this.props.reservation });
    try {
      var periodicAPICall = setInterval(() => {
        fetch(`https://localhost:44325/api/order/${this.state.reservation.id}`)
          .then((res) => res.json())
          .then(
            (result) => {
              if (
                (result != null && result.status == null) ||
                result.status !== 404
              ) {
                this.setState({ orders: result });
              } else {
                console.log(
                  'Result is null or has a 404 status, clear interval'
                );
                clearInterval(periodicAPICall);
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }, 800);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let items = null;
    var status = 404;
    if (
      this.state.orders !== null &&
      !this.state.orders.hasOwnProperty(status)
    ) {
      items = this.state.orders.map((order) => (
        <tr key={order.id}>
          <td>{order.beverages.map((beverage) => beverage.beverageName)}</td>
          <td>{order.table.number}</td>
          <td>{order.table.setting}</td>
          <td>{order.cost}</td>
          <td></td>
        </tr>
      ));
    }

    return (
      <table className="table table-responsive table-bordered">
        <thead>
          <tr>
            <th scope="col">Drankjes</th>
            <th scope="col">Tafelnummer</th>
            <th scope="col">Locatie</th>
            <th scope="col">Kosten</th>
            <th scope="col">
              <button
                className="btn btn-sm btn-success"
                onClick={() => this.props.openPopup(1)}
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

export default OrderTable;
