import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/CartItem';
import { environment } from 'src/environments/environment';

export interface Order {
  id: number,
  orderTrackingNumber: string,
  totalQuantity: number,
  totalPrice: number,
  status: string,
  dateCreated: string,
  lastUpdated: string,
  userId: number,
  orderItems:OrderItem[];
}

export interface OrderItem {
  id: number,
  imageUrl: string,
  unitPrice: number,
  quantity: number,
  productId: number
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }

  getUserOrder (userId : string) : Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.API_URL}/api/orders/${userId}`);
  }

  createSingleOrder(
    userId : Number, quantity:Number, price:Number,
    imageUrl:string, productId:Number
  ): Observable<Order> {
    let order = {
      "userId": userId,
      "totalQuantity": quantity,
      "totalPrice": price,
      "orderItems": [
          {
              "imageUrl": imageUrl,
              "unitPrice": price,
              "quantity": quantity,
              "productId": productId
          }
      ]
  }
    return this.http.post<Order>(`${environment.API_URL}/api/orders/${userId}`, order);
  }

  checkOutCartOrder(cartItems:CartItem[], userId): Observable<Order>  {
    let order = {
      "userId": userId,
      "totalQuantity": 0,
      "totalPrice": 0,
      "orderItems": []
    };

    cartItems.map(obj => {
      order.totalQuantity += obj.quantity;
      order.totalPrice += (obj.totalPrice as number);

      order.orderItems.push({
        "imageUrl": `/assets/static/images/${obj.product.image}`,
        "unitPrice": obj.totalPrice,
        "quantity": obj.quantity,
        "productId": obj.product.id
      })
    });
       
    console.log(cartItems);
    console.log(userId);
    
    
    // return null;
    return this.http.post<Order>(`${environment.API_URL}/api/orders/${userId}`, order);
  }
}
