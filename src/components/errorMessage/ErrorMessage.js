import errorMessage from './error.gif';


const ErrorMessage = () => {
    return (
        <img 
            src={errorMessage} alt="ERROR" 
            style={{
                display: 'block',
                margin: '0 auto'
            }}
        />
    );
}

export default ErrorMessage;