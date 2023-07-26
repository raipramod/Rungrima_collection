import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    public product : Product
    public user : User
    public isProductInCart : boolean
    public loading:boolean = true;

    buyLoader:boolean = false;

    constructor(
        private route : ActivatedRoute, 
        private productsService : ProductsService, 
        private usersService : UsersService,
        private cartItemsService : CartItemsService,
        private orderService:OrderService
    ) { }

    ngOnInit(): void {
        this.productsService.getProduct(this.route.snapshot.paramMap.get('id')).subscribe((product : Product) => {
            this.product = product
            this.product.imageUrl = `/assets/static/images/${product.image}`;

            this.loading = false;

            let imz = this.imageZoom;
            setTimeout(() => {
                imz('featured');
            }, 1000);

        }, (error: ErrorEvent) => {
            console.log(this.product);
            this.loading = false;
        })

        try {

            this.usersService.getUserByToken().subscribe((user : User) => {
                this.user = user
                console.log(this.user.id);
    
                this.getCartItem()
            }, (error : ErrorEvent) => {
                console.log(error)
            })
        } catch(e) {}
    }

    createOrder():void {
        this.buyLoader = true;

        this.orderService.createSingleOrder(this.user.id, 1, this.product.price, this.product.imageUrl, this.product.id)
        .subscribe(
            res => {
                this.buyLoader = false;
                let id = document.getElementById("toast-id");
                id.classList.toggle('hide-o-msg');
                setTimeout(() => {
                    id.classList.toggle('hide-o-msg');
                }, 3000);

            },
            error => {
                this.buyLoader = false;
            }
        )
    }

    addToCart () {
        this.cartItemsService.addToUserCart(this.user.id.toString(), this.product.id.toString()).subscribe(res => {
            this.getCartItem()
        })

        let id = document.getElementById("toast");
        id.classList.toggle('hidel');
        setTimeout(() => {
            id.classList.toggle('hidel');
        }, 5000)
    }


    getCartItem () {
        this.cartItemsService.getCartItem(this.user.id.toString(), this.product.id.toString()).subscribe(res => {
            this.isProductInCart = true
        }, (error : ErrorEvent) => {
            this.isProductInCart = false
        })
    }
    
    imageZoom(imgID:string){
        let img:any = document.getElementById(imgID)
        let lens:any = document.getElementById('lens')
    
        lens.style.backgroundImage = `url( ${img.src} )`
    
        let ratio = 3
    
        lens.style.backgroundSize = (img.width * ratio) + 'px ' + (img.height * ratio) + 'px';
    
        img.addEventListener("mousemove", moveLens)
        lens.addEventListener("mousemove", moveLens)
        img.addEventListener("touchmove", moveLens)
    
        function moveLens(){
            /*
            Function sets sets position of lens over image and background image of lens
            1 - Get cursor position
            2 - Set top and left position using cursor position - lens width & height / 2
            3 - Set lens top/left positions based on cursor results
            4 - Set lens background position & invert
            5 - Set lens bounds
        
            */
    
            //1
            let pos = getCursor()
            //console.log('pos:', pos)
    
            //2
            let positionLeft = pos.x - (lens.offsetWidth / 2)
            let positionTop = pos.y - (lens.offsetHeight / 2)
    
            //5
            if(positionLeft < 0 ){
                positionLeft = 0
            }
    
            if(positionTop < 0 ){
                positionTop = 0
            }
    
            if(positionLeft > img.width - lens.offsetWidth /3 ){
                positionLeft = img.width - lens.offsetWidth /3
            }
    
            if(positionTop > img.height - lens.offsetHeight /3 ){
                positionTop = img.height - lens.offsetHeight /3
            }
    
    
            //3
            lens.style.left = positionLeft + 'px';
            lens.style.top = positionTop + 'px';
    
            //4
            lens.style.backgroundPosition = "-" + (pos.x * ratio) + 'px -' +  (pos.y * ratio) + 'px'
        }
    
        function getCursor(){
            /* Function gets position of mouse in dom and bounds
             of image to know where mouse is over image when moved
            
            1 - set "e" to window events
            2 - Get bounds of image
            3 - set x to position of mouse on image using pageX/pageY - bounds.left/bounds.top
            4- Return x and y coordinates for mouse position on image
            
             */
    
            let e:any = window.event
            let bounds = img.getBoundingClientRect()
    
            //console.log('e:', e)
            //console.log('bounds:', bounds)
            let x = e.pageX - bounds.left
            let y = e.pageY - bounds.top
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            
            return {'x':x, 'y':y}
        }
    
    }
    

}
