import React from "react"
import { Route } from "react-router-dom"
import Sidebar from "./Sidebar"
import { getTeamsArticles } from "../api"
import Article from "./Article"

export default class Articles extends React.Component{
    state = {
        loading: true,
        teamArticles: [],
        article: {}
    }
    
    componentDidMount(){
        getTeamsArticles(this.props.match.params.teamId)
        .then(teamArticles => 
            this.setState({
                loading: false,
                teamArticles: teamArticles.map((article) => article.title)
            }))
    }

    render(){
        const { params, url } = this.props.match
        const {teamId} = params
        const { loading, teamArticles } = this.state
        return (

            loading === true
             ? <h1>Loading</h1> 
             : <div className="container two-column">
                <Sidebar
                    loading={loading}
                    title="Articles"
                    list = {teamArticles}
                    {...this.props}
                />

                <Route 
                    path={`${url}/:articleId`}
                    render={({match}) => {
                        return (
                            <Article articleId={match.params.articleId} teamId={teamId}>
                                {(article)=> (
                                    article === null
                                     ? <h1>Loading</h1>
                                     :  <div className="panel">
                                            <article className="article" key={article.id}>
                                                <h1 className="header">{article.title}</h1>
                                                <p>{article.body}</p>                                    
                                            </article>
                                        </div>
                                )}
                            </Article>
                        )




                    }}
                />
                
                </div>
        )
    }

}