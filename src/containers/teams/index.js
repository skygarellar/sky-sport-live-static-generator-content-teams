
import React, { useState, useEffect } from 'react';
import TeamsComponent from '../../components/teams';
import SkySportLiveService from '../../services/skysportlive';
import dayjs from 'dayjs';

const getNow = () => dayjs().format('YYYY-MM-DD HH:mm:ss:SSS');

const Teams = props => {

    const { teams: initTeams, query } = props;

    const [teams, setTeams] = useState(initTeams);
    const [timestamp, setTimestamp] = useState(getNow());

    useEffect(() => {
        const getTeams = async () => {
            const teams = await SkySportLiveService.teamsQuery(query);
            setTeams(teams);
            setTimestamp(getNow());
        }
        getTeams();
    },[]);

    useEffect(() => {
        const subscription = SkySportLiveService
        .teamsSubscription(query)
        .subscribe({
            error: (error) => { console.log('error', error) },
            next: v => {
                setTeams(v.value.data.createTeamSubscription.TEAMS);
                setTimestamp(getNow());
                console.log('data from subscription', v);
            }
        });
        
        /*return () => {
            if (subscription) subscription.unsubscribe();
            console.log('unsubscribe', subscription);
        }*/
    });

    return <TeamsComponent teams={teams} timestamp={timestamp}/>
};

export default Teams;
