import axios from "axios";

export const getRepos = async (username) => {
    const {data} = await axios({
        url:`https://api.github.com/users/${username}/repos`,headers:headers() 
    });
    return data
}

export const getUser = async (username) => {
    console.log(headers)
    const {data} = await axios({

        url:`https://api.github.com/users/${username}`,headers:headers() 
    });
    return data
}

export const getCommits = async (username, repo) => {
    try{
    const {data} = await axios({
        url:`https://api.github.com/repos/${username}/${repo}/commits`,headers:headers()
    });
    return data
    }
    catch(err){
        return {err:err.message}
    }
}

export const getContributors = async (username, repo) => {
    const {data} = await axios({
        url:`https://api.github.com/repos/${username}/${repo}/contributors`,headers:headers()
    });
    return data
}

export const getRepoLanguages = async (username, repo) => {
    const {data} = await axios({
        url:`https://api.github.com/repos/${username}/${repo}/languages`,headers:headers() 
         
    });
    return data
}

export const getCommitActivity = async (username, repo) => {
    const {data} = await axios({
        url:`https://api.github.com/repos/${username}/${repo}/stats/commit_activity`,headers:headers() 
         
    });
    return data
} 

export const getLanguages = async (username) => {
    const data = await getRepos(username)
    let languages = {}
    for(const repo of data){
        const L = await getRepoLanguages(username, repo.name)
        for(const [key, value] of Object.entries(L)){
            if(!languages[key])languages[key]=value
            else languages[key]+=value
        }
    }
    const res = Object.entries(languages).map(([name, value])=>({name, value}))
    return res
} 
 
const headers=()=> {
     return{
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.tkn}`,
     }
}