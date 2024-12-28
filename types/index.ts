import { MouseEventHandler } from "react";

export interface CustomButtonProps{
    title : string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    textStyles?: String;
    rightIcon?:String;
    isDisabled?:boolean;
}

export interface SearchManufacturerProps {
    selected: String;
    setSelectedManufacturuer:(manufacturer :String) =>void;
}

// creating the interface for the car props
 export interface CarProps{
    city_mpg:number;
class:string;
combination_mpg:number;
cylinders:number;
displacement:number;
drive:"string";
fuel_type:"string";
highway_mpg:number;
make:"string";
model:"string";
transmission:"string";
year:number;
 }



 export interface FilterProps{
    manufacturer: string;
    year:number;
    fuel:string;
    limit:number;
    model:string;

 } 

 export interface CustomFilterProps{
    title: string;
    options: OptionProps[];
 }

 export interface ShowMoreProps{
    pageNumber: number;
    isNext:boolean;
 }