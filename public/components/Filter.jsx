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
        // creating dummy array to count no of products in each type
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
        // filtering and adding type and its count as an aray of objects to main array
        setSeasonMainArray(createNameCountArray(dummySeasonArray));
        setDietaryPreferenceMainArray(createNameCountArray(dummyDietaryPreferenceArray));
        setMealMainArray(createNameCountArray(dummyMealArray));
        setSweetThingsMainArray(createNameCountArray(dummySweetThingsArray));
    },[filteredData])

    function countOccurrences(arr) {
        //function to count occurences
        const counts = {};
        for (let i = 0; i < arr.length; i++) {
          const str = arr[i];
          counts[str] = counts[str] ? counts[str] + 1 : 1;
        }
        return counts;
    }

    function createNameCountArray(arr) {
        //creating an aray eith item and no of occurrence
        const counts = countOccurrences(arr);
        const result = [];
        for (const str in counts) {
          result.push({ name: str, count: counts[str] });
        }
        return result;
      }

    function Filter(productData,filterData,filterKeyWord){           // filter function
        if(filterData.length==0){
            return productData;
        }
        else{
            let dummyArray=[];   // dummy array in which fileterd products to be added
            for(let products of productData){
                if(filterData.includes(products[filterKeyWord])){  // if product dat has the keywiord, add it to dummmy array
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

    function searchFilter(productData){  //filter by name
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
        //master usseffect that runs whenehver the filter is clicked or the particular-type arrays gets changed
        // any chnage in one filter type, the data undergoes through filter to maintain prev filter states
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
                <div className={styles.title_wrapper}>
                    <span className={styles.title}>
                        By Season:
                    </span>
                    <span className={styles.reset} onClick={()=>{setSeasonArray([])}}>
                        Reset
                    </span>
                </div>
                <hr/>
                <div className={styles.checkbox_innerwrapper}>
                    {
                        seasonMainArray.map((seasons)=>{
                            return (
                               <Checkbox
                                name={seasons.name}
                                label={seasons.name.replaceAll("-"," ")+" ("+seasons.count+")"}
                                defaultChecked={seasonArray.includes(seasons.name)}
                                onChange={(checked)=>{   //if cheked adding the type to  particular type of array
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
                <div className={styles.title_wrapper}>
                    <span className={styles.title}>
                        By Diet Preference:
                    </span>
                    <span className={styles.reset} onClick={()=>{setDietaryPreferenceArray([])}}>
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
                <div className={styles.title_wrapper}>
                    <span className={styles.title}>
                        By Meal Type:
                    </span>
                    <span className={styles.reset} onClick={()=>{setMealArray([])}}>
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
                <div className={styles.title_wrapper}>
                    <span  className={styles.title}>
                        By Sweet Things:
                    </span>
                    <span className={styles.reset} onClick={()=>{setSweetThingsArray([])}}>
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
            <h2 className={styles.title}>Search Recipe Titles</h2>
            <input
              type="text"
              placeholder="Enter keyword..."
              className={styles.filter_name}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        );
    };

  return (
    <div className={styles.filter_wrapper}>
      <div className={styles.heading_wrapper}>
         <h2>
            Filter recipes:
         </h2>
         <p>
            Click multiple boxes below to narrow recipe search results
         </p>
      </div>
      <div className={styles.filter_comp_wrapper}>
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
