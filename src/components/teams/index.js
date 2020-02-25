import React from 'react';

const TeamsComponent =  props => {
    console.log(props);
    const { teams, timestamp } = props;
    return <div>Team {timestamp}
        <ul>
            {teams.map((team, index) => <li key={index}>{team.TEAM_NAME}</li>)}
        </ul>
        </div>
};

export default TeamsComponent;