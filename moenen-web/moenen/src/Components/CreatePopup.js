import React from 'react';

class CreatePopup extends React.Component {
  _tables = [];
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      phone: null,
      setting: 'Buiten',
      guests: null,
      arrival: null,
      depature: null,
      error: null,
      reservation: this.props.reservation,
      tableId: null,
      reservationId: null,
      beverages: null,
      tables: [],
    };
  }

  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.props.popUpType === 0) {
      if (
        this.state.name &&
        this.state.phone &&
        this.state.setting &&
        this.state.guests &&
        this.state.arrival &&
        this.state.depature
      ) {
        fetch('https://localhost:44325/api/reservation/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.name,
            phoneNumber: this.state.phone,
            setting: this.state.setting,
            guests: this.state.guests,
            reservationArrival: this.state.arrival,
            reservationDepature: this.state.depature,
          }),
        }).then((response) => console.log(response));

        this.props.closePopup();
      } else {
        this.setState({
          error: (
            <div className="form-group">
              <p className="text-danger text-center">
                Vul alle velden in alstublieft!
              </p>
            </div>
          ),
        });
      }
    } else {
      if (
        this.state.table &&
        this.state.reservationId &&
        this.state.beverages
      ) {
        fetch('https://localhost:44325/api/order/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            beverageIds: this.state.beverages,
            tableId: this.state.tableId,
            reservationId: this.state.reservationId,
          }),
        }).then((response) => console.log(response));

        this.props.closePopup();
      } else {
        this.setState({
          error: (
            <div className="form-group">
              <p className="text-danger text-center">
                Vul alle velden in alstublieft!
              </p>
            </div>
          ),
        });
      }
    }
  };

  componentDidMount() {
    if (this.props.popUpType != 0) {
      fetch('https://localhost:44325/api/order/beverages').then((response) =>
        response.json().then((res) => this.setState({ drinks: res }))
      );

      this.state.reservation.tableIds.forEach((element) => {
        fetch(`https://localhost:44325/api/table/${element}`).then((response) =>
          response
            .json()
            .then((res) =>
              this.setState({ tables: [...this.state.tables, res] })
            )
        );
      });
    }
  }

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
          {this.props.popUpType === 0 ? (
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reservering aanmaken</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.props.closePopup}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Naam</label>
                    <input
                      className="form-control"
                      name="name"
                      type="text"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Telefoon</label>
                    <input
                      className="form-control"
                      name="phone"
                      type="text"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Aantal personen</label>
                    <input
                      className="form-control"
                      name="guests"
                      type="number"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Locatie</label>
                    <select
                      name="setting"
                      className="form-control"
                      onChange={this.handleChange}
                    >
                      <option value="Buiten">Buiten</option>
                      <option value="Binnen">Binnen</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Aankomst</label>
                    <input
                      className="form-control"
                      name="arrival"
                      type="datetime-local"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Vertrek</label>
                    <input
                      className="form-control"
                      name="depature"
                      type="datetime-local"
                      onChange={this.handleChange}
                    />
                  </div>

                  {this.state.error}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.props.closePopup}
                  >
                    Close
                  </button>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Aanmaken"
                  />
                </div>
              </form>
            </div>
          ) : (
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Bestelling plaatsen</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.props.closePopup}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Dranken</label>
                    <select
                      multiple
                      className="form-control"
                      name="beverages"
                      onChange={this.handleChange}
                    >
                      {this.state.drinks
                        ? this.state.drinks.map((beverage) => (
                            <option key={beverage.id} value={beverage.id}>
                              {beverage.beverageName} - ${beverage.beverageCost}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tafel</label>
                    <select
                      className="form-control"
                      name="table"
                      onChange={this.handleChange}
                    >
                      {this.state.tables != null
                        ? this.state.tables.map((table) => (
                            <option key={table.id} value={table.id}>
                              Tafel {table.number}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.props.closePopup}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Aanmaken
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CreatePopup;
