
import React, { useState, useEffect } from 'react';
import RankingComponent from '../../components/ranking';
import SkySportLiveService from '../../services/skysportlive';

const Ranking = props => {

    const { ranking: initRanking, query } = props;

    const [ranking, setRanking] = useState(initRanking);

    useEffect(() => {
        const subscription = SkySportLiveService
        .rankingSubscription(query)
        .subscribe({
            error: (error) => { console.log('error', error) },
            next: v => {
                setRanking(v.value.data.createTeamSubscription.TEAMS);
                console.log('data from subscription', v);
            }
        });
        
        /*return () => {
            if (subscription) subscription.unsubscribe();
            console.log('unsubscribe', subscription);
        }*/
    });

    return <RankingComponent ranking={ranking} />
};

Ranking.config = {
    name: 'ranking',
    query: {
        name: 'row',
        select: ['POS', 'TEAM_NAME'],
        variables: [
            {
                name: 'query',
                paramname: 'championship',
                defaultValue: 21,
                required: true
            }
        ]
    },
    subscription: {
        name: 'row_added',
        select: ['POS']
    }
};

export default Ranking;
