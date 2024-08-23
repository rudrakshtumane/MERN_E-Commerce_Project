/* eslint-disable react/prop-types */


const Toast = ({ message, type, onClose }) => {
    const toastClasses = {
      success: "alert alert-success",
      error: "alert alert-error",
    };
  
    return (
      <div className={`fixed top-4 p-4 rounded-md shadow-lg ${toastClasses[type]}`}>
        <div className="flex">
          <div className="flex-1">
            {message}
          </div>
          <button className="ml-4" onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
    );
  };
  
  export default Toast;
  