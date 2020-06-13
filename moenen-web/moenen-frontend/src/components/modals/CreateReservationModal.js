import React from 'react';

class CreateReservationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resName: '',
      resPhone: '',
      resSetting: 'Binnen',
      resGuests: 0,
      resArrival: '',
    };
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    console.log(this.state);
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    // Close current modal
    this.props.setModalActive();

    if (
      !this.state.resName ||
      !this.state.resPhone ||
      !this.state.resSetting ||
      !this.state.resGuests ||
      !this.state.resArrival
    ) {
      alert('Vul alle velden in! PROPER ERROR MESSAGE');
      return;
    } else if (this.state.resGuests < 1) {
      alert('Het aantal gasten kan niet minder zijn dan 1');
      return;
    }

    const reservation = {
      name: this.state.resName,
      phoneNumber: this.state.resPhone,
      setting: this.state.resSetting,
      guests: parseInt(this.state.resGuests),
      reservationArrival: this.state.resArrival,
    };

    const response = fetch('https://localhost:44325/api/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    });

    console.log(response);
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
              <h5 className="modal-title">Reservering aanmaken</h5>
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
                  <label htmlFor="formNameInput">Naam</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formNameInput"
                    placeholder="Naam"
                    name="resName"
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formPhoneInput">Telefoonnummer</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formPhoneInput"
                    placeholder="telefoonnummer"
                    name="resPhone"
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formSettingInput">Locatie</label>
                  <select
                    className="form-control"
                    id="formSettingInput"
                    name="resSetting"
                    onChange={this.onChangeHandler}
                  >
                    <option value="Binnen">Binnen</option>
                    <option value="Buiten">Buiten</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="formGuestsInput">Gasten</label>
                  <input
                    type="number"
                    className="form-control"
                    id="formGuestsInput"
                    placeholder="0"
                    name="resGuests"
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formArrivalInput">Aankomst</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="formArrivalInput"
                    name="resArrival"
                    onChange={this.onChangeHandler}
                  />
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

export default CreateReservationModal;
