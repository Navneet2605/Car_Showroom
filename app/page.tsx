'use client';

import Image from "next/image";
import {CarCard , CustomFilter, SearchBar , Hero, ShowMore } from "@/components";
import { fetchCars } from "@/utils";
 import { fuels, yearsOfProduction } from "@/constants";
import { useEffect, useState } from "react";



export default  function Home() {
   const [allCars, setAllCars] = useState([]);
   const [loading, setLoading] = useState(false);

   // all the search states 
   const [manufacturer, setManufacturer] = useState("");
   const [model, setModel] = useState("");


   //filter states 
   const [fuel, setFuel] = useState("");
   const [year, setYear] = useState(2022);

   //pagination state
   const [limit, setLimit] = useState(10);

const getCars = async ( )=> {
  setLoading(true);
  try {
    const result = await fetchCars({
      manufacturer: manufacturer || '',
      year:year || 2022,
      fuel:fuel || '',
      limit:limit || 10,
      model:model || '',
    });
    setAllCars(result);
  } catch (error) {
    console.log(error)
  }finally{
    setLoading(false);
  }
}

   useEffect(() => {
   //  console.log(fuel, year, limit, manufacturer,model);
    getCars();
   },[fuel, year, limit, manufacturer,model])
 
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
 //  console.log(allCars);
 
  return (
    <main className="overflow-hidden">
    <Hero/>

    <div className="mt-12 padding-x padding-y max-width" id="discover">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold"> Car Catalogue</h1>
        <p>Explore the Cars you might like</p>
      </div>
      <div className="home__filters">
        <SearchBar setManufacturer = {setManufacturer}
        setModel={setModel}/>
     
      <div className="home__filter-container">
        <CustomFilter title="fuel"  options={fuels} setFilter={setFuel} />
        <CustomFilter title="year"options={yearsOfProduction}  setFilter={setYear} />
        </div>
      </div>
      {allCars.length > 0? (
        <section>
          <div className="home__cars-wrapper">
            {allCars?.map((car)=> (<CarCard car={car}/>))}
          </div>
          
          {loading && (
            <div className="mt-16 w-full flex-centre">
              <Image 
              src="/loader.svg"
              alt="loader"
              width={50}
              height={50}
              className="object-conatin"
              />
            </div>
          )}

          <ShowMore
          pageNumber={limit/ 10}
          isNext={limit > allCars.length}
          setLimit={setLimit}
          />
        </section>
      ):(
        <div className="home__error-container">
          <h2 className="text-black text-xl fonr-bold">Oops, no results</h2>
          <p>{allCars?.message}</p>
        </div>
    ) }
    </div>
    </main>
  );
}
