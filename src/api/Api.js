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
 
const headers=()=> {
     return{
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.tkn}`,
     }
}