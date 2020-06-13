import React from 'react';

class OrderTable extends React.Component {
  constructor(props) {
    super(props);

    this.LoadOrdersInterval = setInterval(this.LoadOrders, 500);

    this.state = { orders: [] };
  }

  // componentDidMount() {
  //   this.LoadOrders();
  //   console.log(this.props.res.id);
  // }

  componentWillUnmount() {
    clearInterval(this.LoadOrdersInterval);
  }

  LoadOrders = async () => {
    try {
      const res = await fetch(
        `https://localhost:44325/api/order/${this.props.res.id}`
      );

      console.log(this.props.res.id);

      if (res && res.ok !== true) {
        return;
      }

      const orders = await res.json();
      this.setState({ orders: orders });
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
                  this.props.setModalActive('createOrder', this.props.res)
                }
              >
                <i className="fas fa-plus"></i>
              </button>
            </th>
            <th>{this.props.res.name}</th>
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
