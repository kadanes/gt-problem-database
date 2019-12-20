import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProblemStatement from "./ProblemStatement";
import Tag from "./Tag";

import logo from "../assets/logo.svg";
import sheet from "../assets/sheets.png";
import "../styles/App.css";
import "../styles/Problem.css";

class App extends Component {
  render() {
    var problems = this.props.problems;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={sheet} className="Sheet-logo" alt="sheet" />
          <h1 className="App-title">Problem Database: React + Google Sheets</h1>
        </header>
        <div>
          {Object.keys(problems).map(function(key, index) {
            var problem = problems[key];
            var id = problem["uid"];
            var problemStatement = problem["Problem Statement"];
            var tags = problem["Tags"].split(",");
            var sponsor = problem["Affiliated Organization"];

            return (
              <div key={id} className="problem-preview">
                <pre>
                  <div className="problemStatement">
                    <Link to={"/details/" + id}>
                      <ProblemStatement problemStatement={problemStatement} />
                    </Link>
                  </div>
                  <div className="sponsor">
                    <span>{"Sponsor: " + sponsor}</span>
                  </div>
                  <div className="tag-container">
                    {tags.map((tag, index) => {
                      return (
                        <span key={"tag_" + index}>{<Tag tag={tag} />}</span>
                      );
                    })}
                  </div>
                </pre>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    problems: state.problems
  };
};

const connectedApp = connect(mapStateToProps)(App);

export default connectedApp;
