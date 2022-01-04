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

    const [languages, setLanguages] = useState([]);

    


    const getUser = (user) => {
        api.getUser(user).then(result=>{
            setContributors([])
            setCommits([])
            setActivity([])
            setUser(result)
            console.log(result)
            allCommits(user)
            api.getLanguages(user).then(setLanguages).catch(()=>setLanguages([]))
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
                        {commits.length!==0?
                        <Barchart user={thisUser.login} data={commits} dataKey={"value"} onSelect={allContributors}></Barchart>:<h3>Getting Data...</h3>
                        }
                    </div>
                    {contributors.length!==0&&
                    <div className="flex-item">
                        <h2>
                            Contributors
                        </h2>
                        <Radarchart  data={contributors} dataKey={"commits"}></Radarchart>

                    </div>}
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
                        <h2 style={{marginBottom:"3rem"}}>
                        Commit Activity in the last year
                        </h2>
                            {activity.length!==0?
                            <Areachart  data={activity} dataKey={"commits"} ></Areachart>:<h3>Getting Data...</h3>
                            }                           
                    </div>
                    {contributors.length!==0&&
                        <div className="flex-item"> 
                            <h2>
                                User Languages
                            </h2>
                            <ol className='language-list'>
                                {languages.map(x=>{return <li key={x.name}>{x.name}: {x.value} </li>})}
                            </ol>
                        </div>}
                </div>
            </div>            
        </div>
    )

}
