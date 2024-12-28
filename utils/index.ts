

//making a function to call to that api the api is
//https://rapidapi.com/apininjas/api/cars-by-api-ninjas/playground/apiendpoint_751d3e33-1f5a-4a8b-afda-f78ffa2219c2
//  target:javascript             client: fetch

import { CarProps, FilterProps } from "@/types";


export async function fetchCars( filters: FilterProps) {
    const {manufacturer, year, model, limit, fuel}=filters;
// old key '9150299415mshf30490d59919828p1e9523jsnc1e9a2364736'
// new key '287e053e3dmsh2d682b83fdd7c77p176b29jsna66cb6bd486d'
    const headers ={
            'x-rapidapi-key': '9150299415mshf30490d59919828p1e9523jsnc1e9a2364736',
            'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'   
    }

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}
        &year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,{
        headers:headers,
    });
    const result = await response.json();
    return result;
}

export const calculateCatRent =(city_mpg: number, year: number) =>{
    const basePricePerDay = 50;     //base rental pricein dollars
    const mileageFactor = 0.1;      // Additional rate per mile driven
    const ageFactor = 0.05;         // Additional rate per year of vehicle age 


    // calculate additional rate based on milege and age 
    const milegeRate = city_mpg*mileageFactor;
    const ageRate =(new Date().getFullYear()-year)*ageFactor;

    //Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + milegeRate + ageRate;

    return rentalRatePerDay.toFixed(0);
};

// creating a new function to use the other api features like images of multiple cars

export const generateCarImageUrl=(car:CarProps, angle?:string) => {
       // here i have to save the link and api key for the future use
       const url = new URL("https://cdn.imagin.studio/getimage");


       const{make, year,model}=car;

       url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');  //  <<-------------------
       // here with the customer we have to add our own key that we get from the company with the api
       // if not here i am using  the key that i got form the video

       url.searchParams.append('make',make);

       url.searchParams.append('modelFamily',model.split(' ')[0]);

       url.searchParams.append('zoomType','fullscreen');

       url.searchParams.append('modelYear',`${year}`);

       url.searchParams.append('angle',`${angle}`);
       return `${url}`;

}


export const updateSearchParams=(type:string, value:string)=>{
    const searchParams =new URLSearchParams(window.location.search);

    searchParams.set(type, value)

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`
  return newPathname;
}