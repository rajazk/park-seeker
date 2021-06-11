import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { parkDetails } from "../../store/actions/parkDetails";
import Spinner from "../../components/spinner/Spinner";
import "../../App.css";

const Home = ({ parkDetails }) => {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchPark, setSearchPark] = useState("");
  const [checkSearch, setCheckSearch] = useState(true);
  useEffect(() => {
    getData(true);
  }, []);

  const handleSearchPark = () => {
    if (searchPark !== "") {
      let res = searchPark.split(",");
      let initial = res[0].trim().length;
      setCheckSearch(true);
      if (res.every((e) => e.trim().length === initial)) {
        if (initial < 2 || initial === 3) {
          setCheckSearch(false);
        } else if (initial === 2) {
          getData(false, true);
        } else {
          getData(false, false);
        }
      } else {
        setCheckSearch(false);
      }
    } else {
      setCheckSearch(true);
      getData(true);
    }
  };

  const getData = (initialStage, status) => {
    let code = searchPark.replace(/\s+/g, "");
    setLoading(true);
    axios
      .get("https://developer.nps.gov/api/v1/parks", {
        params: {
          stateCode: initialStage ? "" : status ? code : "",
          parkCode: initialStage ? "" : status ? "" : code,
          api_key: "9VbqJ7YZ7zukk1qDQ68b7byjBgvC0oALZU6Fx1OS",
        },
      })
      .then((response) => {
        setLoading(false);
        setParks(response.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="parksWrapper">
      <div className="container">
        {!checkSearch && (
          <div className="alert">
            <strong>Warning!</strong> Please enter valid state(s) code OR
            park(s) code
          </div>
        )}

        <div className="search">
          <input
            type="text"
            placeholder="Search parks by US state codes or park codes"
            name="search"
            value={searchPark}
            onChange={(e) => setSearchPark(e.target.value)}
          />
          <button onClick={() => handleSearchPark()}>Search</button>
        </div>
        <div className="parksBox">
          {parks &&
            parks.data?.map((data, index) => {
              return (
                <div className="box" key={index}>
                  <div>
                    <img src={data.images[0].url} alt="" />
                    <div className="description">
                      <p className="name">{data.fullName}</p>
                      <p className="outOfStock">{data.states}</p>
                      <p>{data.description}</p>
                    </div>
                    <ul>
                      {data.activities.slice(0, 5).map((activity, ind) => {
                        return <li key={ind}>{activity.name}</li>;
                      })}
                    </ul>
                  </div>
                  <Link to="/parkDetails">
                    <button onClick={() => parkDetails(data)}>Details</button>
                  </Link>
                </div>
              );
            })}

          {parks && parks?.data?.length === 0 && <p>Data not found</p>}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    parkDetails: (data) => dispatch(parkDetails(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
