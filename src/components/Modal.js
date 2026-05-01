import "../styles/Modal.css";

export default function Modal({ isOpen, title, message, type = "info", onConfirm, onCancel, confirmText = "Confirmar", cancelText = "Cancelar" }) {
  if (!isOpen) return null;

  // Verifica se a mensagem contém HTML
  const containsHtml = typeof message === "string" && /<[^>]*>/.test(message);

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-header modal-${type}`}>
          <h2>{title}</h2>
          <button className="modal-close" onClick={onCancel}>×</button>
        </div>

        <div className="modal-body">
          {containsHtml ? (
            <p dangerouslySetInnerHTML={{ __html: message }} />
          ) : (
            <p>{message}</p>
          )}
        </div>

        <div className="modal-footer">
          {onConfirm && (
            <button className={`modal-btn modal-btn-${type}`} onClick={onConfirm}>
              {confirmText}
            </button>
          )}
          <button className="modal-btn modal-btn-cancel" onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
