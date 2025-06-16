import './FormContainer.css';

function FormContainer({ title, children }) {
  return (
    <div className="form-container">
      <h2>{title}</h2>
      <div className="form-box">
        {children}
      </div>
    </div>
  );
}

export default FormContainer;