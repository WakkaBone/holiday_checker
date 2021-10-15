import React from 'react';

const OneHoliday = ({holidays}) => {
    return (
        <div className='moreSpace'>{holidays.map((item, index) => <div key={index}><h5>{index + 1}. {item.name}</h5>
            <p>Type: {item.type.map((type, index) => {
                if (index === holidays.length - 1) return <span key={index}>{type}.</span>
                else return <span key={index}>{type}</span>
            })}<br/>
                {item.description}</p>
            <hr/>
        </div>)}</div>
    );
};

export default OneHoliday;