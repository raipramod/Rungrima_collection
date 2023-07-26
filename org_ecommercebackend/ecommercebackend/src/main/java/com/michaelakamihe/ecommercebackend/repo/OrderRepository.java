package com.michaelakamihe.ecommercebackend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.michaelakamihe.ecommercebackend.model.Order;
import com.michaelakamihe.ecommercebackend.model.User;

public interface OrderRepository extends JpaRepository<Order, Long> {

	List<Order> findByUser(User user);
}
