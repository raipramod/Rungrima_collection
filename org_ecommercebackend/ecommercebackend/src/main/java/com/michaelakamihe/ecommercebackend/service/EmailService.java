package com.michaelakamihe.ecommercebackend.service;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.michaelakamihe.ecommercebackend.model.Order;


@Service
public class EmailService {
	@Autowired
	private JavaMailSender mailSender;
	
	@Value("${spring.mail.verify.host}")
	private String host;
	
	@Value("${spring.mail.username}")
	private String fromEmail;
	
	@Autowired
	private TemplateEngine templateEngine;
	
	@Async 
	public void sendHtmlEmail(Order order, String to, String name, String address, String phone) {
		try {
			// setting thymeleaf variables to use in variables in our html file			
			Context context = new Context();
			context.setVariable("name", name);
			context.setVariable("address", address);
			context.setVariable("phone", phone);
			context.setVariable("tracking", order.getOrderTrackingNumber());
			
			context.setVariable("price", order.getTotalPrice());
			context.setVariable("quantity", order.getTotalQuantity());
			
			String text = templateEngine.process("emailtemplate", context); // setting emailtemplate on html file by emailtemplate is the filename in templates
			
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

			helper.setPriority(1); // so that it will not go to spam setting high priority
			
			helper.setSubject("Congratulations - Order has been placed successfully");
			helper.setFrom(fromEmail);
			helper.setTo(to);
			helper.setText(text, true); // true means this is a html text
			
			
			mailSender.send(message);
		} catch(Exception ex) {
			System.out.println(ex.getMessage());
			throw new RuntimeException(ex.getMessage());
		}			
	}
	
}
