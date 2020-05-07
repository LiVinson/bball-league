import React, {Component} from "react"
import PropTypes from "prop-types"

export default class Loading extends Component {

    state = {
        text: this.props.text
    }

    static propTypes = {
        text: PropTypes.string.isRequired
    }

    static defaultProps = {
        text: "Loading"
    }
    componentDidMount(){
        const stopper = this.props.text + "..."

        this.interval = setInterval(()=> {
            this.state.text === stopper 
            ? this.setState({text: this.props.text})
            : this.setState((state) => ({text: state.text + "."}))
        }, 300)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render() {
        return (
            <div className="container">
                <p className="text-center">{this.state.text}</p>
            </div>
        )
    }
}