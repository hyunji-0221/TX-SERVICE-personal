package com.bangez.api.user.service;

import com.bangez.api.common.component.MessengerVO;
import com.bangez.api.user.model.UserDTO;
import com.bangez.api.user.model.UserModel;

public interface UserService {
    MessengerVO login(UserDTO param);
    Boolean logout(String accessToken);

    MessengerVO existsUsername(String username);

    default UserDTO entityToDto(UserModel ent){
        return UserDTO.builder()
                .userId(ent.getUserId())
                .userName(ent.getUserName())
                .email(ent.getEmail())
                .password(ent.getPassword())
                .name(ent.getName())
                .token(ent.getToken())
                .build();
    }

    default UserModel dtoToEntity(UserDTO dto){
        System.out.println("UserService dto to entity: "+dto);
        return UserModel.builder()
                .userId(dto.getUserId())
                .userName(dto.getUserName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .name(dto.getName())
                .build();
    }

    MessengerVO register(UserDTO user);
}
