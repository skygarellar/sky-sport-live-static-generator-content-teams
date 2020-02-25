import React from 'react';

const RankingComponent =  props => {
    console.log(props);
    const { ranking } = props;
    return <div>Ranking
        <ul>
            {ranking.map((rank, index) => <li key={index}>{rank.TEAM_NAME}</li>)}
        </ul>
        </div>
};

export default RankingComponent;