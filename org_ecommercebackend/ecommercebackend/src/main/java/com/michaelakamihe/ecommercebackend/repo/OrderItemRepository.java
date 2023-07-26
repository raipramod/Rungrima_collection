package com.michaelakamihe.ecommercebackend.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.michaelakamihe.ecommercebackend.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
