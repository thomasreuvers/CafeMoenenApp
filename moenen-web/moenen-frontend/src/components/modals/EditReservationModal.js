import React from 'react';

class EditReservationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resName: this.props.reservation.name,
      resPhone: this.props.reservation.phoneNumber,
    };
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    // Close current modal
    this.props.setModalActive();

    if (!this.state.resName || !this.state.resPhone) {
      alert('Vul alle velden in! DO PROPER ERROR MESSAGE');
      return;
    }

    // Update reservation
    const updateReservation = {
      id: this.props.reservation.id,
      name: this.state.resName,
      phoneNumber: this.state.resPhone,
    };

    fetch('https://localhost:44325/api/reservation', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateReservation),
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
              <h5 className="modal-title">Verander reservering</h5>
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
                    value={this.state.resName}
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
                    value={this.state.resPhone}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Opslaan"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditReservationModal;
