import React from "react"
import PropTypes from "prop-types"
import { Link, Route } from "react-router-dom"
import slug from "slug"

function CustomLink({ to, children }) {
  return (
    /*children: Route will always render even if path does not match.
     match is true if route path matches app path*/
    <Route
      path={to.pathname}
      children={({ match }) => (
        <li
          style={{
            listStyleType: "none",
            fontWeight: match ? "bold" : "normal",
          }}
        >
          <Link to={to}>{children}</Link>
        </li>
      )}
    />
  )
}

export default function Sidebar({ title, list, loading, location, match }) {
  return loading === true ? (
    <h1>Loading</h1>
  ) : (
    <div>
      <h3 className="header">{title}</h3>
      <ul className="sidebar-list">
        {list.map((item) => {
          console.log(item)
          return (
            <CustomLink
              key={item}
              to={{
                //match.url is of parent component
                pathname: `${match.url}/${slug(item)}`,
                search: location.search,
              }}
            >
              {item.toUpperCase()}
            </CustomLink>
          )
        })}
      </ul>
    </div>
  )
}

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}
