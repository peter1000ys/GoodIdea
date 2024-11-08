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
//    idea
    IDEA_CREATE_SUCCESS("아이디어 생성 성공"),
    IDEA_LIST_SUCCESS("아이디어 목록 조회 성공"),
    IDEA_DETAIL_SUCCESS("아이디어 상세 조회 성공"),
    IDEA_COMMENT_CREATE_SUCCESS("아이디어 댓글 작성 성공"),
    IDEA_COMMENT_UPDATE_SUCCESS("아이디어 댓글 수정 성공"), 
    IDEA_COMMENT_DELETE_SUCCESS("아이디어 댓글 삭제 성공"),
    IDEA_SELECT_SUCCESS("아이디어 채택 성공"),
    IDEA_UNSELECT_SUCCESS("아이디어 채택 취소 성공"),
    IDEA_UPDATE_SUCCESS("아이디어 수정 성공"),
    IDEA_DELETE_SUCCESS("아이디어 삭제 성공"),
//    idea_planner
    IDEA_PLAN_SUCCESS("기획서 조회 성공"),
    IDEA_PLAN_PDF_SUCCESS("기획서 PDF 생성 성공"),
//    idea_requirement
    IDEA_REQUIREMENT_SUCCESS("요구사항 명세서 조회 성공"),
    IDEA_REQUIREMENT_CREATE_SUCCESS("요구사항 생성 성공"),
    IDEA_REQUIREMENT_PDF_SUCCESS("요구사항 명세서 PDF 생성 성공"),
//    idea_api-docs
    IDEA_API_DOCS_SUCCESS("API 명세서 조회 성공"),
    IDEA_API_DOCS_CREATE_SUCCESS("API 명세서 생성 성공"), 
    IDEA_API_DOCS_PDF_SUCCESS("API 명세서 PDF 생성 성공"),
//    idea_erd
    IDEA_ERD_SUCCESS("ERD 조회 성공"),
    IDEA_ERD_PDF_SUCCESS("ERD PDF 생성 성공"),
//    idea_flowchart
    IDEA_FLOWCHART_SUCCESS("플로우차트 조회 성공"),
    IDEA_FLOWCHART_PDF_SUCCESS("플로우차트 PDF 생성 성공"),
//    idea_final_output
    IDEA_FINAL_OUTPUT_SUCCESS("최종 산출물 조회 성공"),
    IDEA_FINAL_OUTPUT_PDF_SUCCESS("최종 산출물 PDF 생성 성공")
    ;

    private final String msg;

    MsgType(String msg){
        this.msg = msg;
    }

    public String getMessage() {
        return msg;
    }
}

