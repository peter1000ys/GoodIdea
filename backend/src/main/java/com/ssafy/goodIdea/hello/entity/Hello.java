package com.ssafy.goodIdea.hello.entity;

import com.ssafy.goodIdea.common.entity.BaseTime;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "hello")
@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
public class Hello extends BaseTime {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "hello_id")
    Long id;

//    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;

    String content;

    @Builder
    public Hello(String content){
        this.content = content;
    }
}
