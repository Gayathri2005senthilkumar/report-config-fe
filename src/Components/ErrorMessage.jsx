const ErrorMessage = ({error}) => {
    return (error && <p className="text-red-500 text-sm">{error}</p>)
}

export default ErrorMessage;