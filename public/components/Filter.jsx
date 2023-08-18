// components/Overlay.js
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Filter.module.css';
import Checkbox from './CheckBox';


const Filter = ({ data, filteredData, setFilteredData}) => {
    const [seasonArray,setSeasonArray] = useState([]);
    const [dietaryPreferenceArray,setDietaryPreferenceArray] = useState([]);
    const [mealArray,setMealArray] = useState([]);
    const [sweetThingsArray,setSweetThingsArray] = useState([]);
    const [seasonMainArray,setSeasonMainArray] = useState([]);
    const [dietaryPreferenceMainArray,setDietaryPreferenceMainArray] = useState([]);
    const [mealMainArray,setMealMainArray] = useState([]);
    const [sweetThingsMainArray,setSweetThingsMainArray] = useState([]);
    const [searchValue, setSearchValue] = useState("");
  

    useEffect(()=>{
        let dummySeasonArray = [];
        let dummyDietaryPreferenceArray = [];
        let dummyMealArray = [];
        let dummySweetThingsArray = [];
        for (let products of data){
            dummyDietaryPreferenceArray.push(products.dietaryPreference);
            dummyMealArray.push(products.mealType);
            dummySeasonArray.push(products.season);
            dummySweetThingsArray.push(products.sweetThings);
        }
        setSeasonMainArray(createNameCountArray(dummySeasonArray));
        setDietaryPreferenceMainArray(createNameCountArray(dummyDietaryPreferenceArray));
        setMealMainArray(createNameCountArray(dummyMealArray));
        setSweetThingsMainArray(createNameCountArray(dummySweetThingsArray));
    },[filteredData])

    function countOccurrences(arr) {
        const counts = {};
        for (let i = 0; i < arr.length; i++) {
          const str = arr[i];
          counts[str] = counts[str] ? counts[str] + 1 : 1;
        }
        return counts;
    }

    function createNameCountArray(arr) {
        const counts = countOccurrences(arr);
        const result = [];
        for (const str in counts) {
          result.push({ name: str, count: counts[str] });
        }
        return result;
      }

    function Filter(productData,filterData,filterKeyWord){
        if(filterData.length==0){
            return productData;
        }
        else{
            let dummyArray=[];
            for(let products of productData){
                // console.log(products[filterKeyWord],filterData,filterData.includes(products[filterKeyWord]),"-------->bugfix")
                if(filterData.includes(products[filterKeyWord])){
                    dummyArray.push(products);
                }
                else{
                    dummyArray=dummyArray;
                }
            }
            console.log(dummyArray,filterData,"bug fix")
            return dummyArray;
        }
    }

    function searchFilter(productData){
        if(searchValue===""){
          return productData;
        }
        else{
        let dummyArray=[];
        for (let product of productData){
            console.log(product,'inside name filter')
            if((product.title.toLowerCase().includes(searchValue.toLowerCase())))
               dummyArray.push(product)
        }
        return dummyArray;
        } 
    };

    useEffect(()=>{
        let productData = data;
        let seasonFilteredArray = Filter(productData,seasonArray,"season");
        let dietaryPreferenceFilteredArray = Filter(seasonFilteredArray,dietaryPreferenceArray,"dietaryPreference");
        let mealFilteredArray = Filter(dietaryPreferenceFilteredArray,mealArray,"mealType");
        let sweetThingsFilteredArray = Filter(mealFilteredArray,sweetThingsArray,"sweetThings")
        let nameFilteredArray = searchFilter(sweetThingsFilteredArray)
        setFilteredData(nameFilteredArray)
    },[seasonArray,dietaryPreferenceArray,mealArray,sweetThingsArray,searchValue])


    const renderSeasonType=(seasonMainArray)=>{
        return(
            <div className={styles.checkbox_wrapper} key={"season"}>
                <div>
                    <span>
                        By Season:
                    </span>
                    <span onClick={()=>{setSeasonArray([])}}>
                        Reset
                    </span>
                </div>
                <hr/>
                <div>
                    {
                        seasonMainArray.map((seasons)=>{
                            return (
                               <Checkbox
                                name={seasons.name}
                                label={seasons.name.replaceAll("-"," ")+" ("+seasons.count+")"}
                                defaultChecked={seasonArray.includes(seasons.name)}
                                onChange={(checked)=>{
                                    checked?
                                    setSeasonArray((prev)=>{return [...prev,seasons.name]})
                                    :
                                    setSeasonArray((prev)=>{return prev.filter((season)=>{return season!==seasons.name})})
                                }}
                               />
                            )
                        })
                    }
                </div>
            </div>
        );
    };

    const renderDietaryPreferenceType=(dietaryPreferenceMainArray)=>{
        return(
            <div className={styles.checkbox_wrapper} key={"diet preference"}>
                <div>
                    <span>
                        By Diet Preference:
                    </span>
                    <span onClick={()=>{setDietaryPreferenceArray([])}}>
                        Reset
                    </span>
                </div>
                <hr/>
                <div>
                    {
                        dietaryPreferenceMainArray.map((dietaryPreference)=>{
                            return (
                               <Checkbox
                                name={dietaryPreference.name}
                                label={dietaryPreference.name.replaceAll("-"," ")+" ("+dietaryPreference.count+")"}
                                defaultChecked={dietaryPreferenceArray.includes(dietaryPreference.name)}
                                onChange={(checked)=>{
                                    checked?
                                    setDietaryPreferenceArray((prev)=>{return [...prev,dietaryPreference.name]})
                                    :
                                    setDietaryPreferenceArray((prev)=>{return prev.filter((dietaryPreferences)=>{return dietaryPreferences!==dietaryPreference.name})})
                                }}
                               />
                            )
                        })
                    }
                </div>
            </div>
        );
    };

    const renderMealType=(mealMainArray)=>{
        return(
            <div className={styles.checkbox_wrapper} key={"mealtype"}>
                <div>
                    <span>
                        By Meal Type:
                    </span>
                    <span onClick={()=>{setMealArray([])}}>
                        Reset
                    </span>
                </div>
                <hr/>
                <div>
                    {
                        mealMainArray.map((meals)=>{
                            return (
                               <Checkbox
                                name={meals.name}
                                label={meals.name.replaceAll("-"," ")+" ("+meals.count+")"}
                                defaultChecked={mealArray.includes(meals.name)}
                                onChange={(checked)=>{
                                    checked?
                                    setMealArray((prev)=>{return [...prev,meals.name]})
                                    :
                                    setMealArray((prev)=>{return prev.filter((meal)=>{return meal!==meals.name})})
                                }}
                               />
                            )
                        })
                    }
                </div>
            </div>
        );
    };


    const renderSweetThingsType=(sweetThingsMainArray)=>{
        return(
            <div className={styles.checkbox_wrapper} key={"sweetThings"}>
                <div>
                    <span>
                        By Sweet Things:
                    </span>
                    <span onClick={()=>{setSweetThingsArray([])}}>
                        Reset
                    </span>
                </div>
                <hr/>
                <div>
                    {
                        sweetThingsMainArray.map((sweetThings)=>{
                            return (
                               <Checkbox
                                name={sweetThings.name}
                                label={sweetThings.name.replaceAll("-"," ")+" ("+sweetThings.count+")"}
                                defaultChecked={sweetThingsArray.includes(sweetThings.name)}
                                onChange={(checked)=>{
                                    console.log(checked,"checked----->")
                                    checked?
                                    setSweetThingsArray((prev)=>{return [...prev,sweetThings.name]})
                                    :
                                    setSweetThingsArray
                                    ((prev)=>{return prev.filter((sweetThing)=>{return sweetThing!==sweetThings.name})})
                                }}
                               />
                            )
                        })
                    }
                </div>
            </div>
        );
    };

    const searchBar = () => {
        return (
          <div key={"searchBar"}>
            <h2>Search Recipe Titles</h2>
            <input
              type="text"
              placeholder="Enter keyword..."
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        );
    };

  return (
    <div>
      <div>
         <h2>
            Filter recipes:
         </h2>
         <p>
            Click multiple boxes below to narrow recipe search results
         </p>
      </div>
      <div>
         {renderSeasonType(seasonMainArray)}
         {renderDietaryPreferenceType(dietaryPreferenceMainArray)}
         {renderMealType(mealMainArray)}
         {renderSweetThingsType(sweetThingsMainArray)}
         {searchBar()}
      </div>
    </div>
  );
};

export default Filter;
