import React from "react";

const DetailedCountry = ({filteredCountry}) =>{
    const labelStyle ={
        fontWeight: 'bold',
    }
    return(
        <div>
          <h2>{filteredCountry.countryName.common}</h2> 
            <div> capital {filteredCountry.countryCapital}</div>
            <div> area {filteredCountry.countryArea}</div>
            <br />
            <div style={labelStyle}>languages</div>
            <ul>
            {Object.values(filteredCountry.countryLanguage).map(language => <li key={languageid ++}>{language}</li>)}
            </ul>
            <div>{filteredCountry.countryFlag}</div>
        </div>
    )
}
let languageid = 0
export default DetailedCountry