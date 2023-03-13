import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getMembersRoute } from "../Utils/APIRoutes";

const GroupMembers = ({ currentGroup,setCurrentPosition,setCurrentMember,currentUser, }) => {
const [members, setMembers] = useState([]);

  useEffect(() => {
    getGroupMembers();
  }, [currentGroup]);

  const getGroupMembers = async () => {
    console.log(currentGroup);
    const { data } = await axios.post(getMembersRoute, {
      group: currentGroup._id,
    });
    console.log(data);
    const memberIds = data.members.map((member) => member.member);
    console.log(memberIds);
    setMembers(data.users.filter((user) => memberIds.includes(user._id)));
  };

    const viewMemberDetails=(name,id)=>{
  if (currentUser._id!=id) {
  const selectedMember = members.find((member) => member._id == id);
    setCurrentMember(selectedMember)
    setCurrentPosition(name)
  }
  }

  return (
    <div className="contacts-container px-4">
      <h3 className="text-center text-white py-4">Group Members</h3>
      <div className="contacts">
        {members.map((member) => {
          return (
            <div className="contact" key={member._id} onClick={()=>viewMemberDetails("Current Member",member._id)}>
              <div className="image">
                <img
                  src={member.profileImage}
                  alt="picture"
                />
              </div>
              <div className="username text-white w-100">
                {member._id == currentGroup.admin ? (
                  <div className="admin">
                    <h5>{member.userName}</h5> <span>admin</span>
                  </div>
                ) : (
                  <h5>{member.userName}</h5>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupMembers;