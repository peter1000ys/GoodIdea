package com.ssafy.goodIdea.common.entity;

import lombok.Getter;

@Getter
public enum MsgType {

//    common
    USER_CREATE_SUCCESS("유저 생성 성공"),
    USER_UPDATE_SUCCESS("유저 정보 수정 성공"),
//    project
    PROJECT_CREATE_SUCCESS("프로젝트 생성 성공"),
    PROJECT_DELETE_SUCCESS("프로젝트 삭제 성공"),
    PROJECT_UPDATE_SUCCESS("프로젝트 생성 성공"),

    ;

    private final String msg;

    MsgType(String msg){
        this.msg = msg;
    }

    public String getMessage() {
        return msg;
    }
}

