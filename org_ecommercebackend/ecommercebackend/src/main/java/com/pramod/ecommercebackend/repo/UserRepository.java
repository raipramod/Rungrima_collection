package com.pramod.ecommercebackend.repo;

import com.pramod.ecommercebackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    void deleteById(Long id);

    User findByUsername (String username);
    Optional<User> findById (Long id);
}
