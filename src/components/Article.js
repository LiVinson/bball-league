import {Component} from "react"
import { getArticle } from "../api"


export default class Article extends Component {

    state = {
      article: null
    }

    

    componentDidMount(){
        const {articleId, teamId} = this.props

        this.fetchArticle(teamId, articleId)
    }

    fetchArticle(teamId, articleId) {      
        this.setState({
            article: null
        })
        getArticle(teamId, articleId)
        .then(article => this.setState({
            loading: false,
            article
        }))
    }

    componentWillReceiveProps(nextProps){
        if (this.props.articleId !== nextProps.articleId) {
            this.fetchArticle(this.nextProps.teamId, this.nextProps.articleId)
        }
    }
    render(){
        return (
            this.props.children(this.state.article)
        )

    }
}