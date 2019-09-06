import React, { Component, Fragment } from "react";
import Request from "superagent";

class InfiniteUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            users: []
        };

        window.onscroll = () => {
            const {
                loadUsers,
                state: {
                    error,
                    hasMore,
                    isLoading,
                },
            } = this;

            if (error || isLoading || !hasMore) return;
            if (window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight) {
                loadUsers();
            }
        }
    }
    componentWillMount() {
        this.loadUsers();
    }

    loadUsers = () => {
        this.setState({ isLoading: true }, () => {

            setTimeout(() => {
                Request
                    .get('https://randomuser.me/api/?results=10')
                    .then((result) => {
                        const nextUser = result.body.results.map(user => ({
                            email: user.email,
                            name: Object.values(user.name).join(' '),
                            photo: user.picture.medium,
                            username: user.login.username,
                            uuid: user.login.uuid,
                        }));

                        this.setState({
                            hasMore: (this.state.users.length < 100),
                            isLoading: false,
                            users: [
                                ...this.state.users, ...nextUser
                            ],
                        });
                    })
                    .catch((err) => {
                        this.setState({
                            error: err.message,
                            isLoading: false,
                        });
                    })
            }, 3000);
        })
    }
    render() {
        const {
            error,
            hasMore,
            isLoading,
            users
        } = this.state;
        return (
            <div>
                <h1>Infinite Scroll!</h1>
                <p>Scroll down to load more!!</p>
                {users.map(data => (
                    <Fragment key={data.uuid}>
                        <hr />
                        <div style={{ display: 'flex' }}>
                            <img
                                alt={data.username}
                                src={data.photo}
                                style={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: '50%',
                                    marginRight: 20
                                }}
                            ></img>
                            <div>
                                <h2 style={{ marginTop: 0 }}>
                                    {data.username}
                                </h2>
                                <p>Name: {data.name}</p>
                                <p>Email: {data.email}</p>
                            </div>

                        </div>

                    </Fragment>

                ))}
                <hr />
                {error &&
                    <div style={{ color: '#900' }}>
                        {error}
                    </div>
                }
                {isLoading &&

                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                        }}
                    >
                        <img
                            alt="loading"
                            src={require('../images/loadMore.gif')}
                            style={{
                                width: 72,
                                height: 72
                            }}>
                        </img>
                    </div>
                }
                {!hasMore &&
                    <div>You did it! You reached the end!</div>
                }
            </div>
        );
    }
}
export default InfiniteUsers;