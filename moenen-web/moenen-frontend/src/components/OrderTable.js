import React from 'react';

class OrderTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { orders: [] };
  }

  componentDidMount() {
    if (this.props.res) {
      this.setState({ reservation: this.props.res });
    }
    console.log(this.state);

    this.LoadOrders();
    setInterval(this.LoadOrders, 2000);
  }

  LoadOrders = async () => {
    try {
      const res = await fetch(
        `https://localhost:44325/api/order/${this.state.reservation.id}`
      );

      if (res && res.ok !== true) {
        return;
      }

      this.setState({ orders: [] });
      const json = await res.json();
      this.setState({ orders: json });
    } catch (error) {
      //   console.log(error);
    }
  };

  render() {
    return (
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Drankjes</th>
            <th>Tafelnummer</th>
            <th>Kosten</th>
            <th>
              <button
                className="btn btn-sm btn-success"
                onClick={() =>
                  this.props.setModalActive(
                    'createOrder',
                    this.state.reservation
                  )
                }
              >
                <i className="fas fa-plus"></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.orders > 0 ||
            (this.state.orders &&
              this.state.orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <ul>
                      {order.beverages.map((beverage) => (
                        <li key={beverage.id + Math.random()}>
                          {beverage.beverageName}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{order.table.number}</td>
                  <td>${order.cost}</td>
                </tr>
              )))}
        </tbody>
      </table>
    );
  }
}

export default OrderTable;
