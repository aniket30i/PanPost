import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchPostCode = createAsyncThunk("postal/fetchPostCode",async (postcode)=>{
    const url="https://lab.pixel6.co/api/get-postcode-details.php";
    const requestBody = {postcode};

    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(requestBody);
        });
        
        const data = response.json();
        if (data.status === 'Success' && data.statusCode === 200) {
            return {
              city: data.city,
              state: data.state,
            };
          } else {
            throw new Error('Failed to fetch postcode details');
          }
        } catch (error) {
          throw new Error('Failed to fetch postcode details');
        }
    });
