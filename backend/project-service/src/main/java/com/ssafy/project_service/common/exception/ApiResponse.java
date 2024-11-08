package com.ssafy.project_service.common.exception;


import com.ssafy.project_service.common.entity.MsgType;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiResponse<T> {

    private int code;
    private HttpStatus status;
    private String message;
    private T data;

    public ApiResponse(HttpStatus status, String message, T data) {
        this.code = status.value();
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public ApiResponse(HttpStatus status, String message) {
        this.code = status.value();
        this.status = status;
        this.message = message;
        this.data = null;
    }

    public static <T> ApiResponse<T> of(HttpStatus httpStatus, String message, T data) {
        return new ApiResponse<>(httpStatus, message, data);
    }

    public static <T> ApiResponse<T> of(HttpStatus httpStatus, T data) {
        return of(httpStatus, httpStatus.name(), data);
    }

    public static <T> ApiResponse<T> ok(T data) {
        if (data instanceof MsgType) {
            // data가 enum MsgType일 경우, 메시지를 추출
            MsgType msgType = (MsgType) data;
            return new ApiResponse<>(HttpStatus.OK, msgType.getMessage());
        }
        return of(HttpStatus.OK, data);
    }

}
