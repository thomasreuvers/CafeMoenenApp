import React from 'react';

class CreateOrderModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      beverages: [],
      tables: [],
      tableId: null,
      beverageByUser: [],
    };
  }

  componentDidMount() {
    this.getTables();
    this.getBeverages();
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === 'beverageByUser') {
      this.setState({
        [name]: [...this.state.beverageByUser, value],
      });
    } else {
      this.setState({
        [name]: value,
      });
    }

    if (this.state.tables.length === 1) {
      this.setState({ tableId: this.state.tables[0] });
    }
    console.log(this.state);
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    if (!this.state.tableId || this.state.beverageByUser.length <= 0) {
      alert('Vul alle velden in!');
      return;
    }

    fetch('https://localhost:44325/api/order/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        beverageIds: this.state.beverageByUser,
        tableId: this.state.tableId,
        reservationId: this.props.reservation.id,
      }),
    }).then((response) => console.log(response));

    // Close current modal
    this.props.setModalActive();
  };

  getTables = () => {
    this.props.reservation.tableIds.forEach((element) => {
      fetch(`https://localhost:44325/api/table/${element}`).then((response) =>
        response
          .json()
          .then((res) => this.setState({ tables: [...this.state.tables, res] }))
      );
    });
  };

  getBeverages = () => {
    fetch(`https://localhost:44325/api/order/beverages`).then((response) =>
      response.json().then((res) => this.setState({ beverages: res }))
    );
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
              <h5 className="modal-title">Bestelling maken</h5>
              <button
                type="button"
                className="close"
                onClick={() => this.props.setModalActive()}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmitHandler}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="formBeverageSelect">Drankjes</label>
                  <select
                    className="form-control"
                    id="formBeverageSelect"
                    name="beverageByUser"
                    onChange={this.onChangeHandler}
                    multiple
                  >
                    {this.state.beverages.map((beverage) => (
                      <option value={beverage.id}>
                        {beverage.beverageName} - ${beverage.beverageCost}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="formTableSelect">Tafel</label>
                  <select
                    className="form-control"
                    id="formTableSelect"
                    name="tableId"
                    onChange={this.onChangeHandler}
                  >
                    {this.state.tables.map((table) => (
                      <option value={table.id}>{table.number}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="submit"
                  className="btn btn-success"
                  value="Aanmaken"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateOrderModal;
