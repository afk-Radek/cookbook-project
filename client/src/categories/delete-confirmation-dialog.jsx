import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteConfirmationDialog({
  showDeleteConfirmationDialog,
  setShowDeleteConfirmationDialog,
  handleDelete,
}) {
  return (
    <Modal show={true} onHide={() => setShowDeleteConfirmationDialog(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Opravdu chceš smazat kategorii?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Kategorie {showDeleteConfirmationDialog.name} bude smazána.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowDeleteConfirmationDialog(false)}
        >
          Zrušit
        </Button>
        <Button
          variant="danger"
          onClick={() => handleDelete(showDeleteConfirmationDialog.id)}
        >
          Smazat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationDialog;
