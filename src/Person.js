import React, { useState } from 'react';

function Person (Props){
    return(
        <div>
            <h1>{Props.name}</h1>
            <label>Email</label>
            <input type='text' pla />
            <br/>
            <label>Password</label>
            <input type='password' />
            <br/>
            <input type='submit'  />
        </div>
    )
}

export default Person;