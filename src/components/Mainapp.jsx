import React, {useState} from 'react'
import * as api from "../api/Api"
import { Barchart } from './Barchart';
import { Radialchart } from './Radialchart';
import { Linechart } from "./Linechart";
import { Radarchart } from './Radarchart';
import { Areachart } from './Areachart';
import { Searchbar } from './Searchbar';
import { Profile } from './Profile';

export const Mainapp = () => {
    
    
    const [thisUser, setUser] = useState({});
    const [commits, setCommits] = useState([]);
    const allCommits= (user) => {
        api.getRepos(user).then( async (result)=>{
            let res = []
            for (const repo of result) {
                let commits = await api.getCommits(user, repo.name)
                console.log(commits)
                if(commits.err)console.error(commits.err)
                else res.push({name:repo.name, value:commits.length})
            }
            setCommits(res);
            console.log(res)
        })
    }


    const [contributors, setContributors] = useState([]);
    
    const allContributors = (user, repo) => {
        api.getContributors(user, repo).then((result)=>{
            let res = []
            for (const contributor of result) {
                res.push({name:contributor.login, value:contributor.contributions})
            }
            setContributors(res);
            console.log(res)
        
        })
    }

    const [activity, setActivity] = useState([]);
    
    const allActivity = (user, repo) => {
        api.getCommitActivity(user, repo).then((result)=>{
            let res = []
            for (const activity of result) {
                res.push({weeks:result, commits:activity.total})
            }
            setActivity(res);
            console.log(res)
        
        })
    }


    const getUser = (user) => {
        api.getUser(user).then(result=>{
            setContributors([])
            setUser(result)
            console.log(result)
            allCommits(user)
            console.log(api.getCommitActivity("swissspidy", "preferred-languages"))
        })
    }


    return (
       
        <div style={{ paddingTop:"4.5rem"}}>
            <header> 
                <span>Metric Visualiser</span>
                <Searchbar placeholder="Search User" onClick={ getUser }/>
            </header>
            <div className="flex-wrapper">
                <div className="flex-column">
                    <div className="flex-item">
                        <h2>
                            Commits
                        </h2>
                        <Barchart user={thisUser.login} data={commits} dataKey={"value"} onSelect={allContributors}></Barchart>
                        <Radarchart  data={contributors} dataKey={"value"}></Radarchart>

                    </div>
                </div>
                <div className="flex-column">
                    <div className="flex-item">
                        <h2>
                            Profile
                        </h2>
                        <Profile user={thisUser}></Profile>
                    </div>
                </div>
                <div className="flex-column">
                    <div className="flex-item">
                        <h2>
                            Contributions
                        </h2>

                            <Areachart  data={activity} dataKey={"commits"}></Areachart>
                    </div>
                </div>
            </div>
            {/* <button onClick={()=>allCommits("DominikGuzowski")}>Commits yo</button> */}
            {/* <Barchart data={commits} dataKey={"value"}></Barchart> */}
            
          
           <button onClick={()=>allActivity("swissspidy", "preferred-languages")}>Who be Contributing</button>
            
        </div>
    )

}
