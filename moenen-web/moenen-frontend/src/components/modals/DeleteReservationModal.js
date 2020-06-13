import React from 'react';

class DeleteReservationModal extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteReservation = () => {
    fetch(
      `https://localhost:44325/api/reservation/${this.props.reservation.id}`,
      {
        method: 'DELETE',
      }
    );

    // Close current modal
    this.props.setModalActive();
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
              <h5 className="modal-title">Verwijder reservering</h5>
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
                Weet u zeker dat u de reservering op de naam{' '}
                <b>{this.props.reservation.name}</b> wilt verwijderen?
              </p>
            </div>
            <div className="modal-footer">
              <button
                onClick={this.deleteReservation}
                type="button"
                className="btn btn-danger"
              >
                Verwijder
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteReservationModal;
