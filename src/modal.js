import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ModalError = (props) => {
  const [show, setShow] = React.useState(props.show);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 // setShow(props.show);
  
  
	return (
<Modal
size="sm"
show={show}
onHide={() => setShow(false)}
aria-labelledby="example-modal-sizes-title-sm"
>
	<Modal.Header closeButton>
		<Modal.Title id="example-modal-sizes-title-sm">
			props.title
		</Modal.Title>
	</Modal.Header>
	<Modal.Body>Error</Modal.Body>
	<Modal.Footer>
		<Button onClick={() => setShow(false)} variant="secondary">
			Close
		</Button>
	</Modal.Footer>
</Modal>
);

}

export default ModalError

/*<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{props.title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>{props.text}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>*/