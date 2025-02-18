"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import {SearchManufacturer} from "./";
import { model } from 'mongoose';
import{useRouter} from 'next/navigation';

const SearchButtom =({otherClasses}:{ otherClasses:string})=>(
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image 
   src={"/magnifying-glass.svg"}
    alt='magnifying glass'
    width={40}
    height={40}
    className='object-conatin'
    />
  </button>
)

const SearchBar = ({setManufacturer, setModel}) => {
  const [searchManufacturer, setSearchManufacturer] = useState('');
  const [searchModel, setSearchModel] = useState('');

   const router = useRouter();

    const handleSearch = (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();

      if(searchManufacturer === '' && searchModel ===''){
        return alert('please fill in the search bar')
      }

      setModel(searchModel)
       setManufacturer(searchManufacturer)
    }

  

  return (
    <form className='searchbar' onSubmit={handleSearch}>
        <div className='searchbar__item'>
            <SearchManufacturer
            selected={searchManufacturer}
            setSelected={setSearchManufacturer}
            />

            <SearchButtom otherClasses="sm:hidden" />

        </div>
        <div className='searchbar__item'>
        <Image
          src='/model-icon.png'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
          alt='car model'
        />
        <input type="text"
        name='model'
        value={searchModel} 
        onChange={(e)=> setSearchModel(e.target.value)}
        placeholder='Tiguan'
        className='searchbar__input'/>

        <SearchButtom otherClasses='sm:hidden' />
        </div>
        <SearchButtom otherClasses='max-sm:hidden' />
    </form>
  )
}

export default SearchBar
