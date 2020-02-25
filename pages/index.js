import React from 'react';
import Teams from '../src/containers/teams';
import SkySportLiveService from '../src/services/skysportlive';

const Index = props => {
    console.log('>>>>>>next', props)
    return (
        <Teams {...props} />
    );
};

Index.getInitialProps = async ({ query = {} }) => {
    
    try {
        const teams = await SkySportLiveService.teamsQuery(query);
        console.log('teams', teams.length);
        return {
            teams,
            query
        }
    }
    catch (error) {
        console.log(error);
        return {
            teams: null,
            query
        };

    }
};

export default Index;