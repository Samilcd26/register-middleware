class CustomError extends Error{
    constructor(message,status) {
        super(message,status);
        this.status=status;
        this.message=message;
    }
}

module.exports=CustomError;