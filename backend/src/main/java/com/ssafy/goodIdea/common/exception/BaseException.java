package com.ssafy.goodIdea.common.exception;

import lombok.Getter;
import org.springframework.validation.Errors;

@Getter
public class BaseException extends RuntimeException {
    private final ErrorType errorCode;
    private final String message;
    private Errors errors;

    public BaseException(Throwable cause) {
        super(cause);
        this.errorCode = ErrorType.SERVER_ERROR;
        this.message = cause.getMessage();
    }

    public BaseException(ErrorType errorCode, Throwable cause) {
        super(cause);
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }

    public BaseException(ErrorType errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }

    public BaseException(ErrorType errorCode, Errors errors) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
        this.errors = errors;
    }

    public BaseException(ErrorType errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
    }

    public BaseException(ErrorType errorCode, String message, Throwable cause) {
        super(cause);
        this.errorCode = errorCode;
        this.message = message;
    }
}
