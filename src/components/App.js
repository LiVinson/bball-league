import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// import Home from "./Home"
// import Players from "./Players"
// import Teams from "./Teams"
// import TeamPage from "./TeamPage"
// import Articles from "./Articles"
import Navbar from "./Navbar"
import Loading from "./Loading"
import DynamicImport from "./DynamicImport"

const Home = (props) => (
  <DynamicImport load={() => import("./Home")}>
    {
      (Component) => (
        Component === null ? <Loading /> 
        : <Component {...props}/>
      )
    }
  </DynamicImport>
)

const Players = (props) => (
  <DynamicImport load={() => import("./Players")}>
    {
      (Component) => (
        Component === null ? <Loading /> 
        : <Component {...props}/>
      )
    }
  </DynamicImport>
)

const Teams = (props) => (
  <DynamicImport load={() => import("./Teams")}>
    {
      (Component) => (
        Component === null ? <Loading /> 
        : <Component {...props}/>
      )
    }
  </DynamicImport>
)

const TeamPage = (props) => (
  <DynamicImport load={() => import("./TeamPage")}>
    {
      (Component) => (
        Component === null ? <Loading /> 
        : <Component {...props}/>
      )
    }
  </DynamicImport>
)

const Articles = (props) => (
  <DynamicImport load={() => import("./Articles")}>
    {
      (Component) => (
        Component === null ? <Loading /> 
        : <Component {...props}/>
      )
    }
  </DynamicImport>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/players" component={Players} />
            <Route path="/teams" component={Teams} />
            <Route path="/:teamId/articles" component={Articles} />
            <Route path="/:teamId" component={TeamPage} />


            <Route render={() => <h1 className="text-center">404</h1>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
