import React, {useEffect, useState} from 'react';
import {UserDetailsCard, UserDetailsCardContent} from "../Components/Styled/UserDetails.style";
import {useParams} from "react-router-dom";
import JSOG from "jsog";
import LoadingSpinner from "../Components/Styled/LoadingSpinner.style";

const PublicUserProfile = () => {
    let params = useParams();

    const [publicProfile, setPublicProfile] = useState(null);
    const [loadedPublicProfile, setLoadedPublicProfile] = useState(false);

    useEffect(() => {
            const fetchPublicProfile = async () => {
                const resp = await fetch(`http://192.168.1.108:8080/public/user/${params.userId}`)
                let cyclicGraph = await resp.json();
                let jsogStructure = JSOG.encode(cyclicGraph);
                cyclicGraph = JSOG.decode(jsogStructure);
                setPublicProfile(cyclicGraph);
                setLoadedPublicProfile(true);
            }
            fetchPublicProfile();
        },
        []
    )

    return <>
        {loadedPublicProfile ?
            (<>
                <h3>Кориснички податоци за корисник #{publicProfile.id}:</h3>
            <UserDetailsCard>
                {publicProfile.fullName && (
                    <UserDetailsCardContent>
                        <b>Име:</b> {publicProfile.fullName}{" "}
                    </UserDetailsCardContent>
                )}
                <UserDetailsCardContent>
                    <b>Корисничко име:</b> {publicProfile.username}{" "}
                </UserDetailsCardContent>
                <UserDetailsCardContent>
                    <b>E-mail:</b> {publicProfile.email}
                </UserDetailsCardContent>
                <UserDetailsCardContent>
                    <b>Карма:</b>{" "}
                    <span style={{color: publicProfile.karma < 0 ? "indianred" : "green"}}>
                {publicProfile.karma}
              </span>
                </UserDetailsCardContent>
            </UserDetailsCard>
            </>)
            :
            <LoadingSpinner/>
        }
    </>
};

export default PublicUserProfile;
