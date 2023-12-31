package com.pramod.ecommercebackend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import com.pramod.ecommercebackend.repo.OrderItemRepository;
import com.pramod.ecommercebackend.repo.OrderRepository;
import com.pramod.ecommercebackend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pramod.ecommercebackend.model.Order;
import com.pramod.ecommercebackend.model.OrderDTO;
import com.pramod.ecommercebackend.model.OrderItem;
import com.pramod.ecommercebackend.model.OrderItemDTO;
import com.pramod.ecommercebackend.model.User;

@Service
public class CheckOutService {

	@Autowired
    OrderRepository orderRepository;
	
	@Autowired
    UserRepository userRepository;
	
	@Autowired
    OrderItemRepository orderItemRepository;
	
	@Autowired
	EmailService emailService;
	
	public List<Order> getUserOrders (Long id) {
		Optional<User> opt = userRepository.findById(id);
		List<Order> orders = new ArrayList<>();
		
		if(opt.isPresent()) {
			List<Order> o =  orderRepository.findByUser(opt.get());
			orders = o;
		}
		
    	return orders;
	}
	
	@Transactional
    public Order placeOrder(OrderDTO dto, Long id) {
    	Order obj = new Order();
        String orderTrackingNumber = generateOrderTrackingNumber();
        obj.setOrderTrackingNumber(orderTrackingNumber);
        obj.setStatus("Cash On Delivery");
        obj.setDateCreated(new Date());
        obj.setLastUpdated(new Date());
        
		Optional<User> opt = userRepository.findById(id);
		if(opt.isPresent()) {
			obj.setUser(opt.get());
		}
		
		obj.setTotalPrice(dto.getTotalPrice());
		obj.setTotalQuantity(dto.getTotalQuantity());

		for (OrderItemDTO oi : dto.getOrderItems()) {
			OrderItem noi = new OrderItem(oi.getId(), oi.getImageUrl(), oi.getUnitPrice(), oi.getQuantity(), oi.getProductId(), obj);
			obj.getOrderItems().add(orderItemRepository.save(noi));
		}

		Order savedOrder = orderRepository.save(obj);
		
       if(opt.isPresent()) {
    	   User user = opt.get();
    	   emailService.sendHtmlEmail(obj, user.getEmail(), user.getUsername(), user.getAddress(), user.getPhone());
              
       }
	
       return savedOrder;
    }
	
	private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
