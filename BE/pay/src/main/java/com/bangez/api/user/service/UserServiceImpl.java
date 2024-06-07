package com.bangez.api.user.service;

import com.bangez.api.common.component.MessengerVO;
import com.bangez.api.common.component.security.JwtProvider;
import com.bangez.api.user.model.UserDTO;
import com.bangez.api.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository repository;
    private final JwtProvider jwtProvider;

    @Override
    public MessengerVO existsUsername(String username) {
        return MessengerVO.builder()
                .message(repository.existsByUserName(username)? "SUCCESS": "FAILURE").build();
    }

    @Override
    public MessengerVO register(UserDTO dto) {
        return MessengerVO.builder()
                .message(repository.save(dtoToEntity(dto)).getUserId() != null ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Transactional
    @Override
    public MessengerVO login(UserDTO dto) {
        var user = repository.findByUserName(dto.getUserName()).get();
        var accessToken = jwtProvider.createToken(entityToDto(user));
        var flag = user.getPassword().equals(dto.getPassword());

        jwtProvider.printPayload(accessToken);

        repository.modifyTokenById(accessToken,user.getUserId());

        return MessengerVO.builder()
                .message(flag ? "SUCCESS" : "FAILURE")
                .accessToken(flag ? accessToken : "None")
                .build();
    }

    @Transactional
    @Override
    public Boolean logout(String accessToken) {
        Long id = jwtProvider.getPayload(accessToken.substring(7)).get("userId",Long.class);
        String deleteToken = "";
        repository.modifyTokenById(deleteToken,id);
        return repository.findById(id).get().getToken().isEmpty();
    }


}
