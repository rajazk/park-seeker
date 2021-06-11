import React, { useState } from "react";
import { connect } from "react-redux";
import { parkNews } from "../../components/constants";
import Map from "../../components/map/ParkMap";
import thumbUp from "../../assets/images/up.png";
import thumbDown from "../../assets/images/down.png";
import "./parkDetails.css";

const PartDetails = ({ selectedPark }) => {
  const [upScore, setUpScore] = useState(67);
  const [downScore, setDownScore] = useState(23);
  const [voteClick, setVoteClick] = useState(false);

  const voteUp = () => {
    if (voteClick) {
      return;
    }
    setUpScore(upScore + 1);
    setVoteClick(true);
  };

  const voteDown = () => {
    if (voteClick) {
      return;
    }
    setDownScore(downScore - 1);
    setVoteClick(true);
  };

  if (Object.keys(selectedPark).length === 0) {
    return <p>There is no selected park yet.</p>;
  }

  const operatingHours = selectedPark?.operatingHours[0];
  return (
    <div className="parksWrapper">
      <div className="container">
        <div className="imagesWrapper">
          <div
            className="mainImage"
            style={{ backgroundImage: `url(${selectedPark.images[0].url})` }}
          ></div>
          <div className="imagesList">
            {selectedPark.images.slice(1, 5).map((image, index) => {
              return (
                <div
                  style={{ backgroundImage: `url(${image.url})` }}
                  key={index}
                ></div>
              );
            })}
          </div>
        </div>

        <div>
          <h1>{selectedPark.fullName}</h1>
          <p>{selectedPark.states}</p>
          <p>{selectedPark.description}</p>
        </div>
        <div className="parkSection">
          <div className="parkDes">
            <div className="operatingWrapper">
              <h2>Operating Hours</h2>
              {operatingHours &&
                Object.keys(operatingHours?.standardHours).map(
                  (item, index) => {
                    return (
                      <div className="operatingHours" key={index}>
                        <span className="day">{item}: </span>
                        <span className="hours">
                          {operatingHours?.standardHours[item]}
                        </span>
                      </div>
                    );
                  }
                )}
            </div>
            <div className="detailsWrapper">
              <div className="entranceFees">
                <h2>Entrance Fees</h2>
                {selectedPark.entranceFees.map((item, index) => {
                  return (
                    <div key={index}>
                      <p>{item.cost}</p>
                      <p>{item.title}</p>
                    </div>
                  );
                })}
              </div>
              <div>
                <h2>Contact Details</h2>
                <div className="contactWrapper">
                  <div className="contactPhone">
                    {selectedPark.contacts.phoneNumbers.map((item, index) => {
                      return <p key={index}>{item.phoneNumber}</p>;
                    })}
                  </div>
                  <div className="contactEmail">
                    {selectedPark.contacts.emailAddresses.map((item, index) => {
                      return <p key={index}>{item.emailAddress}</p>;
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2>Activities</h2>
              <div>
                {selectedPark.activities.slice(0, 5).map((item, index) => {
                  return <p key={index}>{item.name}</p>;
                })}
              </div>
            </div>
            <div>
              <h2>Vote</h2>
              <div className="vote">
                <div>
                  <img
                    className={voteClick && "disabled"}
                    src={thumbUp}
                    onClick={() => voteUp()}
                  />
                  <span>{upScore}</span>
                </div>
                <div>
                  <img
                    className={voteClick && "disabled"}
                    src={thumbDown}
                    onClick={() => voteDown()}
                  />
                  <span>{downScore}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mapWrapper">
            <Map
              mapHeight={253}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAYOSagGu0Cov4nDXACNHsbroj-a6xBlvw`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              latlng={{
                latitude: selectedPark?.latitude,
                longitude: selectedPark?.longitude,
              }}
            />
          </div>
        </div>

        <div>
          <h2>Parks Seeker</h2>
          <p>{parkNews.des}</p>
          <p>With Parks Seeker, you can:</p>
          <div className="newsList">
            <ul>
              {parkNews.newsList.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ul>
            <div>
              <img src={parkNews.img} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedPark: state.entities.parkListReducer.selectedPark,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PartDetails);
