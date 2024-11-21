package com.ssafy.project_service.mindMap.service;


import com.ssafy.project_service.client.UserServiceClient;
import com.ssafy.project_service.common.dto.UserDto;
import com.ssafy.project_service.common.exception.BaseException;
import com.ssafy.project_service.common.exception.ErrorType;
import com.ssafy.project_service.keyword.dto.KeywordResponseDto;
import com.ssafy.project_service.keyword.entity.Keyword;
import com.ssafy.project_service.keyword.repository.KeywordRepository;
import com.ssafy.project_service.mindMap.dto.request.MindMapCreateRequestDto;
import com.ssafy.project_service.mindMap.dto.response.MindMapResponseDto;
import com.ssafy.project_service.mindMap.entity.MindMap;
import com.ssafy.project_service.mindMap.repository.MindMapRepository;
import com.ssafy.project_service.project.entity.Project;
import com.ssafy.project_service.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MindMapService {

    private final MindMapRepository mindMapRepository;
    private final KeywordRepository keywordRepository;
    private final ProjectRepository projectRepository;


    /*
    * @param User
    * @param projectId
    * */
    public MindMapResponseDto getMindMap(UserDto user, Long projectId){
        MindMap mindMap = mindMapRepository.findByProject_Id(projectId)
                .orElseThrow( ()-> new BaseException(ErrorType.MINDMAP_NOT_FOUND));

        return MindMapResponseDto.builder()
                .mindMapId(mindMap.getId())
                .mainKeyword(mindMap.getMainKeyword())
                .keywords(
                        keywordRepository.findAllByMindMap_Id(mindMap.getId()).stream()
                        .map( key -> {
                            return KeywordResponseDto.builder()
                                    .content(key.getContent())
                                    .build();
                        })
                                .collect(Collectors.toList())
                )
                .build();
    }

    /*
     * @param User
     * @param projectId
    * */
    @Transactional
    public MindMapResponseDto createMindMap(UserDto user, Long projectId, MindMapCreateRequestDto dto){
        Project project = projectRepository.findById(projectId)
                .orElseThrow( () -> new BaseException(ErrorType.PROJECT_NOT_FOUND));

//        이미 존재하는 마인드맵이 있을 경우 삭제
        Optional<MindMap> md = mindMapRepository.findByProject_Id(projectId);
        if ( md.isPresent() ){
            keywordRepository.deleteAll(keywordRepository.findAllByMindMap_Id(md.get().getId()));
            mindMapRepository.delete(md.get());
        }

        MindMap mindMap = mindMapRepository.save(
                MindMap.builder()
                        .mainKeyword(dto.getMainKeyword())
                        .project(project)
                        .build()
        );

        List<Keyword> sub_keyword = dto.getKeywords().stream()
                .map( content -> keywordRepository.save(
                        Keyword.builder()
                                .content(content)
                                .mindMap(mindMap)
                        .build()))
                .toList();

        return MindMapResponseDto.builder()
                .mainKeyword(mindMap.getMainKeyword())
                .keywords(
                        sub_keyword.stream()
                        .map( key-> { return KeywordResponseDto.builder().content(key.getContent()).build(); })
                        .collect(Collectors.toList())
    )
                .build();
    }

}
