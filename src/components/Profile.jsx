import React, { Fragment } from 'react'

export const Profile = ({user}) => {
    if(Object.keys(user).length===0)return null
    return (
        <div className='profile' > 
            <h2>
            {user?.login}
            </h2>
                <img src={user?.avatar_url} width={"100%"}/>
            <p>
                {user?.bio}
            </p>
            <span>
                No. of Public Repos: 
                {" " + user?.public_repos}
            </span>
            <span>
                Following
                {" " + user?.following + " "}
                 other user{user.following!==1 && "s"}.
            </span>
            <span> 
                {user?.followers + " "}
                user{ user.followers!==1 && "s"} follow{ user.followers==1 && "s"} {user?.login}.

            </span>
        </div>
    )
}
