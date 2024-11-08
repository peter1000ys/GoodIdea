package com.ssafy.auth_service.auth;

import com.ssafy.auth_service.auth.service.client.UserServiceClient;
import com.ssafy.auth_service.common.dto.UserDto;
import com.ssafy.auth_service.common.exception.BaseException;
import com.ssafy.auth_service.common.exception.ErrorType;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserServiceClient userServiceClient;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto userEntity =userServiceClient.getUser(username).orElseThrow( () -> new BaseException(ErrorType.NOT_FOUND_USER));
        return new PrincipalDetails(userEntity);
    }
}
