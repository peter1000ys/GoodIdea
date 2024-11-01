package com.ssafy.goodIdea.user.service;

import com.ssafy.goodIdea.auth.PrincipalDetails;
import com.ssafy.goodIdea.common.exception.BaseException;
import com.ssafy.goodIdea.common.exception.ErrorType;
import com.ssafy.goodIdea.user.entity.User;
import com.ssafy.goodIdea.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class CustomUserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow();
        return new PrincipalDetails(user);
    }

    @Bean
    public Function<UserDetails, User> fetchUser() {
        return userDetails -> userRepository.findByUsername(userDetails.getUsername()).orElseThrow(
                () -> new BaseException(ErrorType.NOT_FOUND_USER)
        );
    }
}