import Image from 'next/image';
import { dummyData } from '../../public/data';
import FoodCard from '../../public/components/food-card';
import styles from '../../styles/FoodListing.module.css'
import { useEffect, useState } from 'react';
import Overlay from '../../public/components/OverLay';
import Filter from '../../public/components/Filter';
import { useRouter } from 'next/router';
import Layout from '../layout';

export default function FirstPost() {
  const [showFavs, setShowFavs] = useState(false)
  const Router =  useRouter();
  // useEffect(()=>{
  //   let any = sessionStorage.getItem("isLoggedIn");
  //   console.log(any,"=any")
  //   if(any!=="true"){
  //     Router.push('/signin')
  //   }
  // },[])
  const [favList, setFavList] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOverLay, setShowOverLay] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedProductCount, setSelectedCount] =  useState(1);
  const [productData,setProductData] = useState(dummyData);
  const handleSelect = (data) =>{
    if(cart.some((items)=>{return items.cartItems.productCode===data.productCode})){
      console.log(cart.find((items)=>{
        return items.cartItems.productCode===data.productCode
      }).count,"'find cart")
      setSelectedCount((prev)=>{return prev=cart.find((items)=>{
        return items.cartItems.productCode===data.productCode
      }).count})
    }
    else{
      setSelectedCount((prev)=>{return prev=1})
    }
    setSelectedProduct((prev)=>{prev=data; return prev });
    setShowOverLay(true);
  }
  console.log(cart,'------------------>cart')
    return (
      <Layout>
      {
        showCart&&
        <Overlay
          showOverLay={(show)=>setShowCart(show)}
          children={<>
           {
            !!cart&&cart.length>0?
            <div className={styles.overlay_wrapper}>
              <div className={styles.overlay_top}>
               <span className={styles.add_to_cart}>Your Cart</span>
               {
                 cart.filter((cart)=>{return cart.count>0}).map((items,index)=>{
                   return(
                     <div className={styles.overlay_cartlist} key={index}>
                       <div className={styles.overlay_cartListFlex}>
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
                          &#x2716;
                          </button>
                       </div>
                       <span className={styles.overlay_cartitemprice}>Rs. {items.cartItems.price}</span>
                       <span className={styles.overlay_cartitemcount}>
                          <button 
                            className={styles.minus_button} 
                            onClick={()=>
                            setCart((prev)=>prev.map((item)=>
                            items.cartItems.productCode===item.cartItems.productCode?{...item,count:item.count-1}:item=item
                            ))
                            }>
                            -
                          </button>
                          <span className={styles.overlay_cartitemcount}>{items.count} No(s)</span>
                          <button 
                            className={styles.add_button} 
                            onClick={()=>
                              setCart((prev)=>prev.map((item)=>
                            items.cartItems.productCode===item.cartItems.productCode?{...item,count:item.count+1}:item=item
                            ))
                            }>
                            +
                          </button>
                        </span>
                        <span className={styles.overlay_cartitemprice}>Rs. {items.count*items.cartItems.price}</span>
                     </div>
                   )
                 })
               }
               <div className={styles.overlay_cart_totalprice_wrapper}>
                  <span className={styles.overlay_cart_totalprice}>Total</span>
                  <span className={styles.overlay_cartitemprice}>Rs. {cart.reduce((accumulator,currentvalue)=>{
                  return accumulator+=currentvalue.cartItems.price*currentvalue.count
                   },0)}</span>
               </div>
              </div>
              <div className={styles.overlay_bottom}>
                <span className={styles.close_button} onClick={()=>setShowCart(false)}>Close</span>
              </div>
            </div>
            :
            <div className={styles.overlay_wrapper}>
              <span className={styles.overlay_empty}>
                No items in your cart!
              </span>
              <div className={styles.empty_bottom}>
                <span className={styles.empty_add_button} onClick={()=>setShowCart(false)}>Add</span>
              </div>
            </div>
           }

          </>}
        />
      }


      {
        showFavs&&
        <Overlay
          showOverLay={(show)=>setShowFavs(show)}
          children={<>
           {
            !!favList&&favList.length>0?
            <div className={styles.fav_overlay_wrapper}>
              <div className={styles.overlay}>
               <span className={styles.add_to_cart}>Your favourites</span>
               <div className={styles.fav_card_wrapper}>
               {
                 favList.map((items,index)=>{
                   return(
                    <div className={styles.fav_card} onClick={()=>{setShowFavs(false); setSelectedProduct(items); setShowOverLay(true)}}>
                      <FoodCard data={items} key={index}/>
                      <button className={styles.fav_clear} onClick={()=>setFavList((prev)=>prev.filter((item)=>item.productCode!==items.productCode))}>
                        &#x2716;
                      </button>
                    </div>
                   )
                 })
               }
               </div>
              </div>
              <div className={styles.overlay_bottom}>
                <span className={styles.close_button} onClick={()=>setShowFavs(false)}>Close</span>
              </div>
            </div>
            :
            <div className={styles.overlay_wrapper}>
              <span className={styles.overlay_empty}>
                No products in favourite list!
              </span>
              <div className={styles.empty_bottom}>
                <span className={styles.empty_add_button} onClick={()=>setShowFavs(false)}>Add</span>
              </div>
            </div>
           }

          </>}
        />
      }



      {
        showOverLay&&
        <Overlay
          showOverLay={(show)=>setShowOverLay(show)}
          children={<>
           {
            selectedProduct?
            <div className={styles.overlay_wrapper}>
              <div className={styles.overlay_top}>
                <span className={styles.add_to_cart}>
                  Add to cart
                  <button onClick={()=>{
                    setFavList((prev)=>
                    prev.some((items)=>items.productCode===selectedProduct.productCode)?
                    prev.filter((items)=>items.productCode!==selectedProduct.productCode):
                    [...prev,selectedProduct])
                  }}>
                    {favList.some((items)=>items.productCode===selectedProduct.productCode)?
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-heart-fill" viewBox="0 0 16 16"> <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/> </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={`bi bi-bookmark`} viewBox="0 0 16 16"> <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/> </svg>
                    }
                  </button>
                </span>
                <div className={styles.overlay_cartlist}>
                  <span className={styles.overlay_cartitem}>{selectedProduct.title}</span>
                  <span className={styles.overlay_cartitemprice}>Rs. {selectedProduct.price}</span>
                  <span className={styles.overlay_cartitemcount}>
                  <button className={styles.minus_button} disabled={selectedProductCount<1}  onClick={()=>setSelectedCount((prev)=>{return prev-=1})}>-</button>
                  {selectedProductCount}
                  <button className={styles.add_button} onClick={()=>setSelectedCount((prev)=>{return prev+=1})}>+</button>
                  </span>
                </div> 
                <div className={styles.overlay_cart_totalprice_wrapper}>
                  <span className={styles.overlay_cart_totalprice}>Total</span>
                  <span className={styles.overlay_cartitemprice}>Rs. {selectedProduct.price*selectedProductCount}</span>
                </div>
              </div>
              <div className={styles.overlay_bottom}>
                <span className={styles.close_button} onClick={()=>setShowOverLay(false)}>Close</span>
                <button 
                  className={styles.add_to_button} 
                  disabled={selectedProductCount<1}
                  onClick={()=>{
                  setCart((prev)=>{ 
                    if(prev.some((items)=>{return items.cartItems.productCode === selectedProduct.productCode})) {
                      prev[prev.findIndex((items)=>{return items.cartItems.productCode === selectedProduct.productCode})].count=selectedProductCount;
                    }
                    else{
                      prev=[...prev, {cartItems:selectedProduct,count:selectedProductCount}]
                    }
                    return prev});
                  setShowOverLay(false);
                  }}>
                  {cart.some((items)=>{return items.cartItems.productCode === selectedProduct.productCode})?"Update cart":"Add to cart"}
                </button>
              </div>
            </div>
            :
            <div className={styles.overlay_wrapper}>
              <span className={styles.overlay_empty}>
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
              <button onClick={()=>setShowFavs(true)}>
              <span className={styles.cart_icon} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16"> <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/> </svg>
                {favList.length>0&&<span className={styles.cart_bubble}>{favList.length}</span>}
              </span>
                Favourites
              </button>
            </div>
            <div className={styles.cart_wrapper} onClick={()=>setShowCart(true)}>
              <span className={styles.cart_icon} >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-basket3" viewBox="0 0 16 16"> <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6h-9.21z"/> </svg>
              <span className={styles.cart_bubble}>{cart.reduce((accumulator,currentValue)=>{
                return accumulator+=currentValue.count
              },0)}</span>
              </span>
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
      </Layout>
    );
  }