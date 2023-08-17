import Image from 'next/image';
import { dummyData } from '../../public/data';
import FoodCard from './food-card';
import styles from '../../styles/FoodListing.module.css'
import { useState } from 'react';
export default function FirstPost() {
  const [cartPrice, setCartPrice] = useState(0.00);
  console.log(dummyData[0])
    return (
      <>
        <div className={styles.title_wrapper}>

          <div className={styles.logo_wrapper}>
            EASYMEALS
            <div className={styles.recipe}>
              recipe
            </div>
          </div>

          <div className={styles.category_wrapper}>
            <div className={styles.category_box}>
              <div className={styles.select_wrapper}>
                <select placeholder='All Categories' value={"All Categories"}>
                  <option>All Categories</option>
                </select>
              </div>
              <div className={styles.input_wrapper}>
                <input type='text' value={"Search recipies..."} placeholder="Search recipies..."/>
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
            <div className={styles.cart_wrapper}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket3" viewBox="0 0 16 16"> <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6h-9.21z"/> </svg>
              Cart ({cartPrice.toFixed(2)})
            </div>
          <div>

          
        </div>
        </div>
        </div>
        <div className={styles.listing_wrapper}>
          <div className={styles.filter_wrapper}>

          </div>
          <div className={styles.card_wrapper}>
           {
              dummyData.map((data,index)=>{
                return <FoodCard data={data} key={index}/>
              })
           }
          </div>
        </div>
      </>
    );
  }