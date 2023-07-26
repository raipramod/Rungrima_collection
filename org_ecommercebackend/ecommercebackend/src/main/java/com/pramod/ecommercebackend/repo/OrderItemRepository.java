package com.pramod.ecommercebackend.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pramod.ecommercebackend.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
