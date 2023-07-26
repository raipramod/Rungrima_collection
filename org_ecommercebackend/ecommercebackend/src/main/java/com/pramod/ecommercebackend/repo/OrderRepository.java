package com.pramod.ecommercebackend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pramod.ecommercebackend.model.Order;
import com.pramod.ecommercebackend.model.User;

public interface OrderRepository extends JpaRepository<Order, Long> {

	List<Order> findByUser(User user);
}
