 import React from 'react';
 
 const ScorersComponent = props => {
    const { data } = props;
    return <div id="next-component-scorers">Scorers {data.length}</div>
};

export default ScorersComponent;