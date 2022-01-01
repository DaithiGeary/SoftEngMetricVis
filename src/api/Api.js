import axios from "axios";

export const getRepos = async (username) => {
    const {data} = await axios({
        url:`https://api.github.com/users/${username}/repos`,headers 
    });
    return data
}

export const getUser = async (username) => {
    const {data} = await axios({
        url:`https://api.github.com/users/${username}`,headers 
    });
    return data
}

export const getCommits = async (username, repo) => {
    try{
    const {data} = await axios({
        url:`https://api.github.com/repos/${username}/${repo}/commits`,headers 
    });
    return data
    }
    catch(err){
        return {err:err.message}
    }
}

export const getContributors = async (username, repo) => {
    const {data} = await axios({
        url:`https://api.github.com/repos/${username}/${repo}/contributors`,headers 
    });
    return data
}

export const getRepoLanguages = async (username, repo) => {
    const {data} = await axios({
        url:`https://api.github.com/repos/${username}/${repo}/languages`,headers 
         
    });
    return data
}

export const getCommitActivity = async (username, repo) => {
    const {data} = await axios({
        url:`https://api.github.com/repos/${username}/${repo}/stats/commit_activity`,headers 
         
    });
    return data
} 
 
const headers = {
     
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.tkn}`,
    
}