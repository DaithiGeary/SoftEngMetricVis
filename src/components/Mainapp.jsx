import React, {useState, useEffect} from 'react'
import * as api from "../api/Api"
import { Barchart } from './Barchart';
import { Radialchart } from './Radialchart';
import { Linechart } from "./Linechart";
import { Radarchart } from './Radarchart';
import { Areachart } from './Areachart';
import { Searchbar } from './Searchbar';
import { Profile } from './Profile';

export const Mainapp = () => {
    
    useEffect(() => {
        getUser(sessionStorage.getItem("user"))
    }, [])

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
            allActivity(user, repo)
            for (const contributor of result) {
                res.push({name:contributor.login, commits:contributor.contributions})
            }
            setContributors(res);
            console.log(res)
        
        })
    }

    const [activity, setActivity] = useState([]);
    
    const allActivity = (user, repo) => {
        api.getCommitActivity(user, repo).then((result)=>{
            setActivity([])
            let res = []
            let count = 1
            for (const activity of result) {
                res.push({name:"Wk "+ count++ , commits:activity.total})
            }
            setActivity(res);
            console.log(res)
        
        })
    }


    const getUser = (user) => {
        api.getUser(user).then(result=>{
            setContributors([])
            setCommits([])
            setActivity([])
            setUser(result)
            console.log(result)
            allCommits(user)
            // allActivity(user, api.getRepos(user).then(res=>res[0]))
            api.getRepos(user).then(repos=>{allActivity(user, repos[0].name)})
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
                        <p> 
                            Click on a bar
                        </p>
                        <Barchart user={thisUser.login} data={commits} dataKey={"value"} onSelect={allContributors}></Barchart>
                        <Radarchart  data={contributors} dataKey={"commits"}></Radarchart>

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
                        Commit Activity in the last year
                        </h2>

                            <Areachart  data={activity} dataKey={"commits"} ></Areachart>
                            
                    </div>
                </div>
            </div>
          
           {/* <button onClick={()=>allActivity("swissspidy", "preferred-languages")}>Who be Contributing</button> */}
            
        </div>
    )

}
