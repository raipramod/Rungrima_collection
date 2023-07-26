package com.michaelakamihe.ecommercebackend.model;

import java.math.BigDecimal;

public class OrderItemDTO {
    private Long id;
    private String imageUrl;
    private BigDecimal unitPrice;
    private int quantity;
    private Long productId;
	    
    public OrderItemDTO() {}

	public OrderItemDTO(Long id, String imageUrl, BigDecimal unitPrice, int quantity, Long productId) {
		this.id = id;
		this.imageUrl = imageUrl;
		this.unitPrice = unitPrice;
		this.quantity = quantity;
		this.productId = productId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	@Override
	public String toString() {
		return "OrderItemDTO [id=" + id + ", imageUrl=" + imageUrl + ", unitPrice=" + unitPrice + ", quantity="
				+ quantity + ", productId=" + productId + "]";
	}
}
