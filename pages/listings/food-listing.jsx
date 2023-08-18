import Image from 'next/image';
import { dummyData } from '../../public/data';
import FoodCard from '../../public/components/food-card';
import styles from '../../styles/FoodListing.module.css'
import { useEffect, useState } from 'react';
import Overlay from '../../public/components/OverLay';
import Filter from '../../public/components/Filter';
export default function FirstPost() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOverLay, setShowOverLay] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedProductCount, setSelectedCount] =  useState(1);
  const [productData,setProductData] = useState(dummyData);
  const handleSelect = (data) =>{
    setSelectedProduct((prev)=>{prev=data; return prev });
    setShowOverLay(true);
  }
  useEffect(()=>{
    setSelectedCount(1)
  },[showOverLay])
  console.log(productData.length,'------------------>cart')
    return (
      <>
      {
        showCart&&
        <Overlay
          children={<>
           {
            cart.length>0?
            <div className={styles.overlay_wrapper}>
              <div className={styles.overlay_top}>
               {
                 cart.map((items,index)=>{
                   return(
                     <div className={styles.overlay_cartlist} key={index}>
                       <div>
                          <span className={styles.overlay_cartitem}>{items.cartItems.title}</span>
                          <button 
                          className={styles.remove_button}
                          onClick={()=>{
                            setCart((prev)=>{
                             return prev.reduce((accumulator, value)=>{
                               if(value.cartItems.productCode !== items.cartItems.productCode){
                                accumulator.push(value);
                               }
                               return accumulator;
                              },[]);
                            })
                          }}>
                          Remove
                          </button>
                       </div>
                       <span className={styles.overlay_cartitemcount}>{items.count}</span>
                       <span className={styles.overlay_cartitemprice}>{items.count*items.cartItems.price}</span>
                     </div>
                   )
                 })
               }
              </div>
              <div className={styles.overlay_bottom}>
                <span className={styles.close_button} onClick={()=>setShowCart(false)}>Close</span>
              </div>
            </div>
            :
            <div className={styles.overlay_wrapper}>
              <span className={styles.overlay_top}>
                No items in your cart!
              </span>
              <div className={styles.overlay_bottom}>
                <span className={styles.add_button} onClick={()=>setShowCart(false)}>Add</span>
              </div>
            </div>
           }

          </>}
        />
      }
      {
        showOverLay&&
        <Overlay
          children={<>
           {
            selectedProduct?
            <div className={styles.overlay_wrapper}>
              <div className={styles.overlay_top}>
                <div className={styles.overlay_cartlist}>
                  <span className={styles.overlay_cartitem}>{selectedProduct.title}</span>
                  <span className={styles.overlay_cartitemprice}>{selectedProduct.price}</span>
                  <span className={styles.overlay_cartitemcount}>
                  <button className={styles.minus_button} disabled={selectedProductCount<2} onClick={()=>setSelectedCount((prev)=>{return prev-=1})}>
                  -
                  </button>
                  {selectedProductCount}
                  <button className={styles.add_button} onClick={()=>setSelectedCount((prev)=>{return prev+=1})}>
                  +
                  </button>
                  </span>
                </div> 
                <div>
                  <span className={styles.overlay_cartitemprice}>Total</span>
                  <span className={styles.overlay_cartitemprice}>{selectedProduct.price*selectedProductCount}</span>
                </div>
              </div>
              <div className={styles.overlay_bottom}>
                <span className={styles.close_button} onClick={()=>setShowOverLay(false)}>Add</span>
                <span 
                className={styles.aclose_button} 
                onClick={()=>{
                setCart((prev)=>{return [...prev, {cartItems:selectedProduct,count:selectedProductCount}]});
                setShowOverLay(false);
                }}
                >Add to cart</span>
              </div>
            </div>
            :
            <div className={styles.overlay_wrapper}>
              <span className={styles.overlay_top}>
                No items in your cart!
              </span>
              <div className={styles.overlay_bottom}>
                <span className={styles.add_button} onClick={()=>setShowCart(false)}>Add</span>
              </div>
            </div>
           }

          </>}
        />
      }
        <div className={styles.title_wrapper}>
          <div className={styles.logo_wrapper}>
            <div className={styles.logo}>
              EASYMEALS
              <div className={styles.recipe}>
                recipe
              </div>
            </div>
          </div>

          <div className={styles.category_wrapper}>
            <div className={styles.category_box}>
              <div className={styles.select_wrapper}>
                <select placeholder='All Categories' value={"All Categories"} onChange={(e)=>console.info(e.target.value)}>
                  <option>All Categories</option>
                </select>
              </div>
              <div className={styles.input_wrapper}>
                <input type='text' value={"Search recipies..."} placeholder="Search recipies..." onChange={(e)=>console.info(e.target.value)}/>
              </div>
            </div>
            <div className={styles.search_wrapper}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/> </svg>
            </div>
          </div>


          <div className={styles.right_wrapper}>
            <div className={styles.favourite_wrapper}>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16"> <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/> </svg>
                Favourites
              </button>
            </div>
            <div className={styles.cart_wrapper} onClick={()=>setShowCart(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket3" viewBox="0 0 16 16"> <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6h-9.21z"/> </svg>
              Cart ({cart.reduce((accumulator,currentValue)=>{
                return accumulator+=currentValue.cartItems.price*currentValue.count
              },0).toFixed(2) || "0.00"})
            </div>
          <div>
        </div>
        </div>
        </div>
        <div className={styles.listing_wrapper}>
          <div className={styles.filter_wrapper}>
          <Filter
            data={dummyData}
            filteredData={productData}
            setFilteredData={(filteredData)=>setProductData(filteredData)}
          />
          </div>
          <div className={styles.card_mainwrapper}>
           {productData.length>0?
           <div className={styles.card_wrapper}>
              {
                 productData.map((data,index)=>{
                   return (
                     <div key={index} onClick={()=>handleSelect(data)}>
                       <FoodCard data={data} key={index}/>
                     </div>
                     )
                 })
              }
           </div>
           :
           <div>
             No matching recipe found! Try modifying the filters!
           </div>}
          </div>
        </div>
      </>
    );
  }