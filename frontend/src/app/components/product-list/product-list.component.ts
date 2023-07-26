import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    public term : string
    public products : Product[] = [];
    public loading:boolean = true;


    constructor(router : Router, route : ActivatedRoute, private productsService : ProductsService) { 
        this.term = route.snapshot.paramMap.get('term') || ""
    }

    ngOnInit(): void {
        this.productsService.getProducts().subscribe((products : Product[]) => {
            this.products = products.filter(product => {
                if(product.name.toLowerCase().includes(this.term.toLowerCase())) return product;
            });

            for (let product of this.products) {
                product.imageUrl = `/assets/static/images/${product.image}`;
                
            }
            this.loading = false;
        }, (error: ErrorEvent) => {
            this.loading = false;
        })
    }
}
