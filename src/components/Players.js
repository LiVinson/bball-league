import React, { Component } from "react"
import { Route, Link } from "react-router-dom"
import Sidebar from "./Sidebar"
import { getPlayers } from "../api"
import { parse } from "query-string"
import slug from "slug"

export default class Players extends Component {
  state = {
    players: [],
    loading: true,
  }

  componentDidMount() {
    const { location } = this.props
    //If there is a query parameter (e.g. teamId=bulls' render filtered players or render all)
    location.search
      ? this.fetchPlayers(parse(location.search).teamId)
      : this.fetchPlayers()
  }
  fetchPlayers = (teamId) => {
    getPlayers(teamId).then((players) =>
      this.setState(() => ({
        loading: false,
        players,
      }))
    )
  }

  render() {
    const { loading, players } = this.state
    const { match, location } = this.props
    console.log(match.url)
    return (
      <div className="container two-column">
        <Sidebar
          loading={loading}
          title="Players"
          list={players.map((player) => player.name)}
          {...this.props} //includes all of the routing props - match, location, history
        />
        {loading === false && location.pathname === "/players" ? (
          <div className="sidebar-instruction">Select a Player</div>
        ) : null}

        <Route
          path={`${match.url}/:playerId`}
          render={({ match }) => {
            if (loading === true) {
              return null
            }
            const {
              name,
              position,
              teamId,
              number,
              avatar,
              apg,
              ppg,
              rpg,
              spg,
            } = players.find((player) => {
              console.log(match.params)
              return slug(player.name) === match.params.playerId
            })

            return (
              <div className="panel">
                <img className="avatar" src={`${avatar}`} alt={`${name}`} />
                <h1 className="medium-header">{name}</h1>
                <h3 className="header">#{number}</h3>
                <div className="row">
                  <ul className="info-list" style={{ marginRight: 80 }}>
                    <li>
                      Team
                      <div>
                        <Link to={`/${teamId}`} style={{ color: "#68809a" }}>
                          {teamId[0].toUpperCase() + teamId.slice(1)}
                        </Link>
                      </div>
                    </li>
                    <li>
                      Position<div>{position}</div>
                    </li>
                    <li>
                      PPG<div>{ppg}</div>
                    </li>
                  </ul>
                  <ul className="info-list">
                    <li>
                      APG<div>{apg}</div>
                    </li>
                    <li>
                      SPG<div>{spg}</div>
                    </li>
                    <li>
                      RPG<div>{rpg}</div>
                    </li>
                  </ul>
                </div>
              </div>
            )
          }}
        />
      </div>
    )
  }
}
