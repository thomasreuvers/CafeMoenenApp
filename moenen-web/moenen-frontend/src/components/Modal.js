import React from 'react';
import CreateReservationModal from './modals/CreateReservationModal';
import EditReservationModal from './modals/EditReservationModal';
import DeleteReservationModal from './modals/DeleteReservationModal';
import ReadReservationModal from './modals/ReadReservationModal';
import CreateOrderModal from './modals/CreateOrderModal';

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let popUp = null;

    if (this.props.action) {
      if (this.props.action === 'create') {
        popUp = (
          <CreateReservationModal
            action={this.props.action}
            setModalActive={this.props.setModalActive}
          />
        );
      } else if (this.props.action === 'edit' && this.props.obj) {
        popUp = (
          <EditReservationModal
            action={this.props.action}
            setModalActive={this.props.setModalActive}
            reservation={this.props.obj}
          />
        );
      } else if (this.props.action === 'delete' && this.props.obj) {
        popUp = (
          <DeleteReservationModal
            action={this.props.action}
            setModalActive={this.props.setModalActive}
            reservation={this.props.obj}
          />
        );
      } else if (this.props.action === 'read' && this.props.obj) {
        popUp = (
          <ReadReservationModal
            action={this.props.action}
            setModalActive={this.props.setModalActive}
            reservation={this.props.obj}
          />
        );
      } else if (this.props.action === 'createOrder' && this.props.obj) {
        popUp = (
          <CreateOrderModal
            action={this.props.action}
            setModalActive={this.props.setModalActive}
            reservation={this.props.obj}
          />
        );
      }
    }

    return <div>{popUp}</div>;
  }
}

export default Modal;
