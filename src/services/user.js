import axios from "axios";

/* get user info */
const fetchUser = (user) => {
    return axios.get(`https://api.github.com/users/${user}`);
};

/* get user repos in desc order by stars */
const fetchRepos = (user) => {
    return axios.get(
        `https://api.github.com/search/repositories?q=user:${user}+stars:>=0`
    );
};

export { fetchUser, fetchRepos };
