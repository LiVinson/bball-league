import React, { Component } from "react"
import { Route, Link } from "react-router-dom"
import Sidebar from "./Sidebar"
import { getTeamNames } from "../api"
import Team from "./Team"
import TeamLogo from "./TeamLogo"
import Loading from "./Loading"
import slug from "slug"

export default class Teams extends Component {
  state = {
    teamNames: [],
    selectedTeam: {},
    loading: true,
  }
  componentDidMount() {
    getTeamNames().then((teamNames) => {
      console.log(teamNames)
      this.setState({
        teamNames,
        loading: false,
      })
    })
  }

  render() {
    const { teamNames, loading } = this.state
    const { location, match } = this.props
    return (
      <div className="container two-column">
        <Sidebar
          title="Teams"
          list={teamNames}
          loading={loading}
          {...this.props}
        />
        {loading === false && location.pathname === "/teams" ? (
          <div className="sidebar-instruction">Select a Team</div>
        ) : null}
        <Route
          path={`${match.url}/:teamId`}
          render={({ match }) => (
            <div className="panel">
              {/*Component responsible for fetching data */}
              <Team id={match.params.teamId}>
                {(team) =>
                  team === null ? (
                    <Loading text=""/> 
                  ) : (
                    <div style={{ width: "100%" }}>
                      <TeamLogo id={team.id} className="center" />
                      <h1 className="medium-header">{team.name}</h1>
                      <ul className="info-list row">
                        <li>
                          Established<div>{team.established}</div>
                        </li>
                        <li>
                          Manager<div>{team.manager}</div>
                        </li>
                        <li>
                          Coach<div>{team.coach}</div>
                        </li>
                      </ul>
                      <Link
                        className="center btn-main"
                        to={`/${match.params.teamId}`}
                      >
                        {team.name} Team Page
                      </Link>
                    </div>
                  )
                }
              </Team>
            </div>
          )}
        />
      </div>
    )
  }
}
