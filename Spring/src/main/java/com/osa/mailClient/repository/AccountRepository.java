package com.osa.mailClient.repository;

import com.osa.mailClient.entity.Account;
import com.osa.mailClient.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    User findByUsername(String username );
    List<Account> findAllByUser(User user);
    Account findById(long id);


}