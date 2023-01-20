import React, {useEffect, useState} from 'react';
import JSOG from "jsog";
import {OpinionCard, OpinionCardContent, OpinionCardContentTime} from "../Components/Styled/OpinionCard.style";
import LoadingSpinner from "../Components/Styled/LoadingSpinner.style";
import {dateConverter} from "../Util/dateConverter";
import {findParentThread} from "../Util/findParentThread";
import {CurrentPageNav} from "../Components/Styled/Main.style";

const Home = () => {
    const [latestOpinions, setLatestOpinions] = useState(null);
    const [loadedLatestOpinions, setLoadedLatestOpinions] = useState(false);
    const [latestThreads, setLatestThreads] = useState(null);
    const [loadedLatestThreads, setLoadedLatestThreads] = useState(false);

    useEffect(() => {
        Promise.all([fetch(`http://192.168.1.254:8080/public/latest10opinions`),
            fetch(`http://192.168.1.254:8080/public/latest10threads`)])
            .then(([resOpinions, resThreads]) => Promise.all([resOpinions.json(), resThreads.json()]))
            .then(([dataOpinions, dataThreads]) => {
                let cyclicGraph1 = dataOpinions;
                let jsogStructure1 = JSOG.encode(cyclicGraph1);
                cyclicGraph1 = JSOG.decode(jsogStructure1);
                setLatestOpinions(cyclicGraph1);
                setLoadedLatestOpinions(true);

                let cyclicGraph2 = dataThreads;
                let jsogStructure2 = JSOG.encode(cyclicGraph2);
                cyclicGraph2 = JSOG.decode(jsogStructure2);
                setLatestThreads(cyclicGraph2);
                setLoadedLatestThreads(true);
            })

    }, []);

    return (
        <>
            <CurrentPageNav>
                &#187;{" "}
                <a href={"/university/1"}>
                    Универзитет „Св. Кирил и Методиј“
                </a>
            </CurrentPageNav>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"40px", marginTop:"60px"}}>

        <div id="latestOpinions" style={{gridColumn:"1", paddingLeft:"20px"}}>
            <h2 style={{fontWeight:"normal", marginBottom:"30px"}}>Последни мислења за <span style={{fontWeight:"bold"}}>професори</span></h2>
            {loadedLatestOpinions ? latestOpinions.slice(5).map(opinion => {
                opinion.timePosted = undefined;
                return <OpinionCard key={opinion.postId}>
                    <OpinionCardContent>
                        <p style={{marginBottom:"10px"}}>
                        во дискусија за{" "}
                        <a href={"/professor/" + opinion.targetProfessor.professorId}>
                                    {opinion.targetProfessor.professorName}
                        </a>
                        </p>
                        <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
                            <a href={"/user/" + opinion.author.id}>
                                {opinion.author.username}
                            </a>{" "}
                            напишал
                        </p>
                        <p style={{ marginBottom: "10px", maxWidth: "90%" }}>
                            {opinion.content}
                        </p>
                        {new Date(opinion.timePosted).setMilliseconds(0) === new Date(opinion.timeLastEdited).setMilliseconds(0) ? (
                            <OpinionCardContentTime>
                                {dateConverter(
                                    new Date(opinion.timePosted).toString().slice(4, -43)
                                )} <span style={{fontStyle:"normal",color:"blue"}}>#{opinion.postId}</span>
                            </OpinionCardContentTime>
                        ) : (
                            <OpinionCardContentTime>
                                {dateConverter(
                                    new Date(opinion.timeLastEdited)
                                        .toString()
                                        .slice(4, -43)
                                )}{" "} <span style={{fontStyle:"normal",color:"blue"}}>#{opinion.postId}</span>{" "}
                                (едитирано од модератор)
                            </OpinionCardContentTime>
                        )}
                    </OpinionCardContent>
                </OpinionCard>
            }) : <LoadingSpinner/>}
        </div>

    <div id="latestThreads" style={{gridColumn:"2", paddingRight:"20px"}}>
        <h2 style={{fontWeight:"normal", marginBottom:"30px"}}>Последни мислења за <span style={{fontWeight:"bold"}}>предмети</span></h2>
        {loadedLatestThreads ? latestThreads.slice(5).map(thread => {
            return <OpinionCard key={thread.postId}>
                <OpinionCardContent>
                    <p style={{marginBottom:"10px"}}>
                        во дискусија за{" "}
                        <a href={
                                thread.parent === null
                                    ? "/topic/" + thread.postId
                                    : "/topic/" + findParentThread(thread).postId
                            }
                        > {thread.targetSubject.subjectName}
                        </a>
                    </p>
                    <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
                        <a href={"/user/" + thread.author.id}>
                            {thread.author.username}
                        </a>{" "}
                        напишал
                    </p>
                    <p style={{ marginBottom: "10px", maxWidth: "90%" }}>
                        {thread.content}
                    </p>
                    {new Date(thread.timePosted).setMilliseconds(0) === new Date(thread.timeLastEdited).setMilliseconds(0) ? (
                        <OpinionCardContentTime>
                            {dateConverter(
                                new Date(thread.timePosted).toString().slice(4, -43)
                            )} <span style={{fontStyle:"normal",color:"blue"}}>#{thread.postId}</span>
                        </OpinionCardContentTime>
                    ) : (
                        <OpinionCardContentTime>
                            {dateConverter(
                                new Date(thread.timeLastEdited)
                                    .toString()
                                    .slice(4, -43)
                            )}{" "} <span style={{fontStyle:"normal",color:"blue"}}>#{thread.postId}</span>{" "}
                            (едитирано од модератор)
                        </OpinionCardContentTime>
                    )}
                </OpinionCardContent>
            </OpinionCard>
        }) : null}
    </div>
        </div>
        </>
    );
};

export default Home;