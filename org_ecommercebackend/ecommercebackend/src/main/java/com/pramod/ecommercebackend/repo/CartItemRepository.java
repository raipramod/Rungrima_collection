package com.pramod.ecommercebackend.repo;

import com.pramod.ecommercebackend.model.cart.CartItem;
import com.pramod.ecommercebackend.model.cart.CartItemPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository <CartItem, CartItemPK> {
}
