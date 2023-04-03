import errorMessage from './error.gif';


const ErrorMessage = () => {
    return (
        <div className="error-container">
            <img 
                src={errorMessage} alt="ERROR" 
                style={{
                    display: 'block',
                    margin: '0 auto',
                }}
            />
        </div>
    );
}

export default ErrorMessage;