import React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Icon, Header } from "semantic-ui-react";

const TeamHeader = (props) => {
  const { team, sectionActive, setSectionActive } = props;
  const sectionItems = [
    {
      icon: "book",
      text: "Boards",
    },
    {
      icon: "users",
      text: "Members",
    },
  ];

  const Section = ({ icon, text, index }) => {
    const handleClick = () => {
      setSectionActive(index);
      localStorage.setItem("teamSectionSelection", index);
    };
    return (
      <Link
        style={{
          color: "black",
          fontWeight: "bold",
          border: "1px solid rgba(200,200,200,0.8)",
          borderBottom: "none",
          padding: "5px 10px",
          margin: " 0 7px",
          backgroundColor:
            sectionActive === index
              ? "rgba(255,255,255,1)"
              : "rgba(223,225,230, 1)",
        }}
        onClick={handleClick}>
        {icon && (
          <Icon name={icon} size="small" style={{ marginRight: "5px" }} />
        )}
        {text}
      </Link>
    );
  };

  const TeamLogo = ({ teamName }) => {
    return (
      <Icon
        bordered
        size="huge"
        style={{
          borderRadius: "10px",
          borderWidth: "0",
          background: "linear-gradient(to bottom, red, orange",
          color: "white",
          transform: "scale(0.7)",
        }}>
        {teamName.charAt(0)}
      </Icon>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(244,245,247, 1)",
        height: "220px",
      }}>
      <TeamLogo teamName={team?.name} />
      <Header
        content={team.name}
        size="large"
        style={{ margin: "0", padding: "0" }}
      />
      <div
        style={{
          bottom: "0",
          display: "flex",
          position: "absolute",
        }}>
        {sectionItems.map((section, index) => (
          <Section
            icon={section.icon}
            text={section.text}
            link={section.link}
            key={`section_id_${index}`}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamHeader;
