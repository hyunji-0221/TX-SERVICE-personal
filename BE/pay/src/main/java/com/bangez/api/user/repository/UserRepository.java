package com.bangez.api.user.repository;

import com.bangez.api.user.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {

    Optional<UserModel> findByUserName(String username);
    Boolean existsByUserName(String username);

    @Modifying//상태변화
    @Query("update users u set u.token = :token where u.userId = :id")
    void modifyTokenById(@Param("token") String token, @Param("id") Long id);

}
