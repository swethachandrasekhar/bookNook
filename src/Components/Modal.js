import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";

class Modal extends Component {
    render() {

        return this.props.itemAdded ? (
          <div className="modal">
            <p>Item has been added to {this.props.addedTo}</p>
            <button
              className="closeModal"
               onClick={this.props.handleModalClose}
            >
              <FontAwesomeIcon icon={faTimes} aria-label="Close" />
            </button>
          </div>
        ) : null;
    }
}



export default Modal;
