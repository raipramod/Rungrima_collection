import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { Order, OrderService } from 'src/app/services/order/order.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  user:User;
  loading:boolean = true;
  orders:Order[] = [];

  selectedOrder:Order;

  constructor(
    private orderService: OrderService,
    private usersService: UsersService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.usersService.getUserByToken().subscribe((user : User) => {
      this.user = user

      this.orderService.getUserOrder(this.user.id.toString()).subscribe(
        res => {
          if(res.length > 0) {
            this.orders = res;
            this.selectedOrder = this.orders[0];
          } 

          
          this.loading = false;
        },
        err => {
          
          this.loading = false;
        }
      )
    }, (error : ErrorEvent) => {
        this.loading = false;
    })
  }

  showOrderItems(order:Order):void {
    this.selectedOrder = order;
  }

  navigateToProduct(productId:any):void {
    this.router.navigateByUrl(`/shop/products/${productId}`);

  }

}
