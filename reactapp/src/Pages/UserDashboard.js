/* eslint-disable no-unused-vars */
// noinspection JSUnresolvedVariable,ES6ConvertVarToLetConst,JSUnresolvedFunction,SpellCheckingInspection,JSUnusedLocalSymbols

import React, { useEffect, useState, useContext } from "react";
import {
  OpinionCard,
  OpinionCardContent,
  OpinionCardContentTime,
} from "../Components/Styled/OpinionCard.style";
import {
  UserDetailsCard,
  UserDetailsCardContent,
} from "../Components/Styled/UserDetails.style";
import { dateConverter } from "../Util/dateConverter";
import axios from "../api/axios";
import JSOG from "jsog";
import AuthApi from "../api/AuthApi";
import {EntityLi, EntityTypeSelector, EntityUl} from "../Components/Styled/EntityList.style";
import {
  AddOpinionButton,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent, ModalFooter,
  ModalHeader, ModalTextarea,
    ModalInput
} from "../Components/Styled/Modal.style";
import LoadingSpinner from "../Components/Styled/LoadingSpinner.style";
import {findParentThread} from "../Util/findParentThread";

function UserDashboard() {
  const { auth, setAuth } = useContext(AuthApi);

  const [user, setUser] = useState(null);
  const [loadedUser, setLoadedUser] = useState(false);
  const [authoredPosts, setAuthoredPosts] = useState(null);
  const [loadedAuthoredPosts, setLoadedAuthoredPosts] = useState(false);

  const [fetchError, setFetchError] = useState(false);

  const [postReports, setPostReports] = useState(null);
  const [loadedPostReports, setLoadedPostReports] = useState(false);

  const [reportModalDisplay, setReportModalDisplay] = useState("none");
  const [reportForModal, setReportForModal] = useState(null);

  const [actionType, setActionType] = useState(0);

  const [newPostContent, setNewPostContent] = useState("");
  const [newOpinionTargetProfessorId, setNewOpinionTargetProfessorId] = useState("");
  const [newParentPostId, setNewParentPostId] = useState("-1");

  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newParentThreadId,setNewParentThreadId] = useState("-1");
  const [newTargetSubjectId, setNewTargetSubjectId] = useState("");


  const [markResolved, setMarkResolved] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const handleModalCloseClick = () => {
    setReportForModal(null);
    setReportModalDisplay("none");
    document.body.style.overflowY = "auto";
  };

  const handleViewReportButtonClick = (e,report) => {
    e.preventDefault();
    setReportForModal(report);
  }

  useEffect(() => {
    if(reportForModal!==null) {
      if (reportForModal.post !== null) {
        setNewPostContent(reportForModal.post.content);
        if(reportForModal.post.title !== null) setNewThreadTitle(reportForModal.post.title);
        if(reportForModal.post.targetProfessor !== undefined) setNewOpinionTargetProfessorId(reportForModal.post.targetProfessor.professorId); //prvicnoto
        if(reportForModal.post.targetProfessor === undefined) setNewTargetSubjectId(reportForModal.post.targetSubject.subjectId); //prvicnoto
      }
      setReportModalDisplay("block");
      document.body.style.overflowY = "hidden";
    }
  }, [reportForModal]);

  const [newOpinionTargetProfessor, setNewOpinionTargetProfessor] = useState(null);
  const [loadedNewProfessor,setLoadedNewProfessor] = useState(false);
  const [newProfessorRelatedOpinions, setNewProfessorRelatedOpinions] = useState(null);
  const [loadedNewProfessorRelatedOpinions, setLoadedNewProfessorRelatedOpinions] = useState(false);
  const [loadingProf, setLoadingProf] = useState(false);

  const handleNewTargetProfessorChange = async (e) => {
    setLoadingProf(true);
    e.preventDefault();
    if (newOpinionTargetProfessorId!=="") {
        try {
          Promise.all([fetch(`http://192.168.1.254:8080/public/professor/${newOpinionTargetProfessorId}`),
            fetch(`http://192.168.1.254:8080/public/professor/${newOpinionTargetProfessorId}/relatedOpinions`)])
              .then(([resNewOpinionTargetProfessor, resNewProfessorRelatedOpinions]) => Promise.all([resNewOpinionTargetProfessor.json(), resNewProfessorRelatedOpinions.json()]))
              .then(([dataNewOpinionTargetProfessor, dataNewProfessorRelatedOpinions]) => {
                let cyclicGraph1 = dataNewOpinionTargetProfessor;
                var jsogStructure1 = JSOG.encode(cyclicGraph1);
                cyclicGraph1 = JSOG.decode(jsogStructure1);
                setNewOpinionTargetProfessor(cyclicGraph1);
                setLoadedNewProfessor(true);

                let cyclicGraph2 = dataNewProfessorRelatedOpinions;
                var jsogStructure2 = JSOG.encode(cyclicGraph2);
                cyclicGraph2 = JSOG.decode(jsogStructure2);
                setNewProfessorRelatedOpinions(cyclicGraph2);
                setLoadedNewProfessorRelatedOpinions(true);

                setLoadingProf(false);
              })
        } catch (error) {
          setFetchError(true);
        }
    }
  }

  const [newTargetSubject, setNewTargetSubject] = useState(null);
  const [loadedNewSubject, setLoadedNewSubject] = useState(false);
  const [newTargetSubjectThreads, setNewTargetSubjectThreads] = useState(null);
  const [loadedNewSubjectThreads, setLoadedNewSubjectThreads] = useState(false);
  const [loadingSubj, setLoadingSubj] = useState(false);

  const handleNewTargetSubjectChange = async (e) => {
    e.preventDefault();
    setLoadingSubj(true);
    if (newTargetSubjectId!=="") {
      try {
        Promise.all([fetch(`http://192.168.1.254:8080/public/subject/${newTargetSubjectId}`),
        fetch(`http://192.168.1.254:8080/public/subject/${newTargetSubjectId}/threads`)])
            .then(([resNewTargetSubject, resNewTargetSubjectThreads]) => Promise.all([resNewTargetSubject.json(), resNewTargetSubjectThreads.json()]))
            .then(([dataNewTargetSubject, dataNewTargetSubjectThreads]) => {
              let cyclicGraph1 = dataNewTargetSubject;
              var jsogStructure1 = JSOG.encode(cyclicGraph1);
              cyclicGraph1 = JSOG.decode(jsogStructure1);
              setNewTargetSubject(cyclicGraph1);
              setLoadedNewSubject(true);

              let cyclicGraph2 = dataNewTargetSubjectThreads;
              var jsogStructure2 = JSOG.encode(cyclicGraph2);
              cyclicGraph2 = JSOG.decode(jsogStructure2);
              setNewTargetSubjectThreads(cyclicGraph2);
              setLoadedNewSubjectThreads(true);

              setLoadingSubj(false);
            })
        } catch (error) {
            setFetchError(true);
        }
    }
  }

  useEffect(() => {
    const fetchUser = () => {
      try {
        if(!loadedUser) {
          Promise.all([axios.get(`http://192.168.1.254:8080/secure/currentUser`, {withCredentials:true}),
            axios.get(`http://192.168.1.254:8080/secure/currentUser/posts`, {withCredentials:true})])
              .then(([resUser, resAuthoredPosts]) => Promise.all([resUser.data, resAuthoredPosts.data]))
              .then(([dataUser, dataAuthoredPosts]) => {
                let cyclicGraph1 = dataUser;
                let jsogStructure1 = JSOG.encode(cyclicGraph1);
                cyclicGraph1 = JSOG.decode(jsogStructure1);
                setUser(cyclicGraph1);
                setLoadedUser(true);

                let cyclicGraph2 = dataAuthoredPosts;
                let jsogStructure2 = JSOG.encode(cyclicGraph2);
                cyclicGraph2 = JSOG.decode(jsogStructure2);
                setAuthoredPosts(cyclicGraph2);
                setLoadedAuthoredPosts(true);
              })
        }
        if(user.userRole==='MODERATOR') fetchPostReports();
      } catch (error) {
        setFetchError(true);
      }
    };

    const fetchPostReports = async () => {
      try {
        const response = await axios.get(`http://192.168.1.254:8080/secure/getAllPostReports`, {withCredentials: true});
        var cyclicGraph = await response.data;
        var jsogStructure = JSOG.encode(cyclicGraph);
        cyclicGraph = JSOG.decode(jsogStructure);
        setPostReports(cyclicGraph);
        setLoadedPostReports(true);
      } catch (error) {
        setFetchError(true);
      }
    };

    if (auth) fetchUser();

  }, [user]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      if(reportForModal.post !== null && reportForModal.post.targetProfessor !== undefined) {
        await axios(`http://192.168.1.254:8080/secure/updateOpinion/${reportForModal.post.postId}`,
            {
              method: "put",
              data: {
                newContent: newPostContent,
                newTargetProfessorId: reportForModal.post.targetProfessor.professorId,
                newParentPostId: reportForModal.post.parent !== null ? reportForModal.post.parent.postId : "-1"
              },
              withCredentials: true,
            })
        await axios(`http://192.168.1.254:8080/secure/markReportResolved/${reportForModal.postReportId}/${markResolved ? `resolve` : `open`}`,{
          method: "get",
          withCredentials: true
        })
      } else if(reportForModal.post !== null && reportForModal.post.targetProfessor === undefined) {
        await axios(`http://192.168.1.254:8080/secure/updateThread/${reportForModal.post.postId}`,
            {
              method: "put",
              data: {
                newTitle: newThreadTitle,
                newContent: newPostContent,
                newTargetSubjectId: reportForModal.post.targetSubject.subjectId,
                newParentThreadId: reportForModal.post.parent !== null ? reportForModal.post.parent.postId : "-1"
              },
              withCredentials: true,
            })
      }
      await axios(`http://192.168.1.254:8080/secure/markReportResolved/${reportForModal.postReportId}/${markResolved ? `resolve` : `open`}`,{
          method: "get",
          withCredentials: true
      })
    } catch (error) {
      setFetchError(true);
    }
    window.location.reload();
  }

  const handleRelocate = async (e) => {
    e.preventDefault();
    try {
      if(reportForModal.post !== null && reportForModal.post.targetProfessor !== undefined) {
        var response = await axios(`http://192.168.1.254:8080/secure/updateOpinion/${reportForModal.post.postId}`,
            {
              method: "put",
              data: {
                newContent: reportForModal.post.content,
                newTargetProfessorId: newOpinionTargetProfessorId,
                newParentPostId: newParentPostId==="Постави како самостојно мислење" ? "-1" : newParentPostId //:)
              },
              withCredentials: true,
            })
        await axios(`http://192.168.1.254:8080/secure/markReportResolved/${reportForModal.postReportId}/${markResolved ? `resolve` : `open`}`,{
          method: "get",
          withCredentials: true
        })
      } else if(reportForModal.post !== null && reportForModal.post.targetProfessor === undefined) {
        var response = await axios(`http://192.168.1.254:8080/secure/updateThread/${reportForModal.post.postId}`,
            {
              method: "put",
              data: {
                newTitle: newThreadTitle,
                newContent: reportForModal.post.content,
                newTargetSubjectId: newTargetSubjectId,
                newParentThreadId: newParentThreadId==="Постави како самостојно мислење (нова тема)" ? "-1" : newParentThreadId //:)
              },
              withCredentials: true,
            })
      }
      await axios(`http://192.168.1.254:8080/secure/markReportResolved/${reportForModal.postReportId}/${markResolved ? `resolve` : `open`}`,{
        method: "get",
        withCredentials: true
      })
    } catch (error) {
      setFetchError(true);
    }
    setErrMsg(response.data);
    if (response.data==="") window.location.reload();
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      if(reportForModal.post !== null && reportForModal.post.targetProfessor !== undefined) {
        await axios(`http://192.168.1.254:8080/secure/deleteOpinion/${reportForModal.post.postId}`,
            {
              method: "delete",
              withCredentials: true,
            })
        window.location.reload();
      } else if(reportForModal.post !== null && reportForModal.post.targetProfessor === undefined) {
        await axios(`http://192.168.1.254:8080/secure/deleteThread/${reportForModal.post.postId}`,
            {
              method: "delete",
              withCredentials: true,
            })
      }
    } catch (error) {
      setFetchError(true);
    }
    window.location.reload();
  }

  const handleMarkResolved = () => {
    if (actionType !== 1) setMarkResolved(!markResolved);
  }

  return loadedUser ? (
    <>
      <h3>Кориснички податоци:</h3>
      <UserDetailsCard>
        {user.fullName && (
          <UserDetailsCardContent>
            <b>Име:</b> {user.fullName}{" "}
          </UserDetailsCardContent>
        )}
        <UserDetailsCardContent>
          <b>Корисничко име:</b> {user.username}{" "}
        </UserDetailsCardContent>
        <UserDetailsCardContent>
          <b>E-mail:</b> {user.email}
        </UserDetailsCardContent>
        <UserDetailsCardContent>
          <b>Карма:</b>{" "}
          <span style={{ color: user.karma < 0 ? "indianred" : "green" }}>
            {user.karma}
          </span>
        </UserDetailsCardContent>
      </UserDetailsCard>
      {loadedPostReports ? postReports.length > 0 ? (
          <h3 style={{ marginBottom: "10px" }}>Пријави за мислења:</h3>
      ) : (
          <h3>Нема пријавени мислења</h3>
      ) : loadedUser && user.userRole==='MODERATOR' ? <LoadingSpinner/> : ""}
      <EntityUl style={{marginTop:"25px"}}>
      {loadedPostReports && postReports.map((postReport) => {
        return <EntityLi bgcolor="cornsilk" key={postReport.postReportId} style={{padding:"15px"}}>
          <p style={{color: postReport.resolved ? "grey" : "black"}}><span style={{fontSize:"14px", fontStyle:"italic", fontWeight:"normal"}}>{dateConverter(
              new Date(postReport.time).toString().slice(4, -43)
          )}</span><br/>{postReport.description.substring(0,45 )}{postReport.description.length >= 45 ? ("...") : ("")} {postReport.resolved ? <span style={{fontStyle:"italic"}}>(разрешено)</span> : ""}
            </p>
          <AddOpinionButton onClick={(e)=>handleViewReportButtonClick(e,postReport)} style={{height:"30px", padding:"5px", fontSize:"14px", position:"absolute", top:"30%", right:"20px" }}>Разгледај</AddOpinionButton>
        </EntityLi>;
      })}
      </EntityUl>
      {authoredPosts.length > 0 ? (
        <h3 style={{ marginBottom: "10px", marginTop:"30px" }}>Ваши мислења:</h3>
      ) : (
        <h3 style={{ marginBottom: "10px" }}>Немате објавени мислења</h3>
      )}
      {authoredPosts.map((post) => {
        return (
          <div key={post.postId}>
            <OpinionCard>
              <OpinionCardContent>
                <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
                  во дискусија за{" "}
                  {post.targetProfessor !== undefined ? (
                    <a href={"/professor/" + post.targetProfessor.professorId}>
                      {post.targetProfessor.professorName}
                    </a>
                  ) : (
                    <a
                      href={
                        post.parent === null
                          ? "/topic/" + post.postId
                          : "/topic/" + findParentThread(post).postId
                      }
                    >
                      {post.targetSubject.subjectName}
                    </a>
                  )}
                </p>
                <p style={{ marginBottom: "10px" }}>{post.content}</p>
                <OpinionCardContentTime>
                  {dateConverter(
                    new Date(post.timePosted).toString().slice(4, -43)
                  )} <span style={{fontStyle:"normal",color:"blue"}}>#{post.postId}</span>
                </OpinionCardContentTime>
              </OpinionCardContent>
            </OpinionCard>
          </div>
        );
      })}
      {reportForModal && (
          <Modal display={reportModalDisplay}>
            <ModalContent>
              <ModalHeader>
                <ModalClose onClick={handleModalCloseClick}>&times;</ModalClose>
                <h3 style={{ marginTop: "5px" }}>
                  Преглед на пријава за мислење
                </h3>
              </ModalHeader>
                <ModalBody>
                  <p style={{fontWeight:"bold",marginBottom:"15px"}}>Пријавил: <span style={{fontWeight:"normal"}}>{reportForModal.user !== null ? <a href={"/user/"+reportForModal.user.id}>{reportForModal.user.username}</a> : "(избришан корисник)"}</span></p>
                  <p style={{fontWeight:"bold",marginBottom:"15px"}}>Време на пријава: <span style={{fontWeight:"normal"}}>{dateConverter(
                      new Date(reportForModal.time).toString().slice(4, -43)
                  )}</span></p>
                  <p style={{fontWeight:"bold",marginBottom:"15px"}}>Образложение: </p> <p style={{marginBottom:"15px"}}>{reportForModal.description}</p>
                  <p style={{fontWeight:"bold", marginBottom:"15px"}}>Информации за пријавеното мислење:</p>
                  {reportForModal.post !== null ?
                    <OpinionCard>
                      <OpinionCardContent>
                        <p style={{fontStyle: "italic", marginBottom: "10px"}}>
                          во дискусија за{" "}
                          {reportForModal.post.targetProfessor !== undefined ? (
                              <a href={"/professor/" + reportForModal.post.targetProfessor.professorId}>
                                {reportForModal.post.targetProfessor.professorName}
                              </a>
                          ) : (
                              <a
                                  href={
                                    reportForModal.post.parent === null
                                        ? "/topic/" + reportForModal.post.postId
                                        : "/topic/" + findParentThread(reportForModal.post).postId
                                  }
                              >
                                {reportForModal.post.targetSubject.subjectName}
                              </a>
                          )}
                        </p>
                        {reportForModal.post.title === null ?
                        <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
                          <a href={"/user/" + reportForModal.post.author.id}>
                            {reportForModal.post.author.username}
                          </a>{" "}
                          напишал
                        </p> :
                            <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
                              <a href={"/user/" + reportForModal.post.author.id}>
                                {reportForModal.post.author.username}
                              </a>{" "}
                              отворил тема со наслов <span style={{fontWeight:"bold"}}>{reportForModal.post.title}</span>
                            </p>
                        }
                        <p style={{marginBottom: "10px"}}>{reportForModal.post.content}</p>
                        <OpinionCardContentTime>
                          {dateConverter(
                              new Date(reportForModal.post.timePosted).toString().slice(4, -43)
                          )} <span style={{fontStyle:"normal",color:"blue"}}>#{reportForModal.post.postId}</span>
                        </OpinionCardContentTime>
                      </OpinionCardContent>
                    </OpinionCard>
                  : "Пријавеното мислење или неговиот автор се избришани"}

              {reportForModal.post !== null &&
              <div style={{ display: "flex" }}>
                {actionType===0 ? <EntityTypeSelector
                    backgroundcolor="rgba(0, 102, 204, 1)"
                    color="white"
                    boxshadow="none"
                    boxshadowhover="none"
                    opacityhover="0.6"
                    cursor="auto"
                >
                  Измени содржина или наслов
                </EntityTypeSelector> : <EntityTypeSelector
                    boxshadow="2px 2px 5px #aaaaaa"
                    cursor="pointer"
                    boxshadowhover="2px 2px 10px #aaaaaa"
                    opacityhover="1"
                    onClick={() => setActionType(0)}
                >
                  Измени содржина или наслов
                </EntityTypeSelector>}
                {actionType===1 ? <EntityTypeSelector
                    backgroundcolor="rgba(0, 102, 204, 1)"
                    color="white"
                    boxshadow="none"
                    boxshadowhover="none"
                    opacityhover="0.6"
                    cursor="auto"
                >
                  Избриши
                </EntityTypeSelector> : <EntityTypeSelector
                    boxshadow="2px 2px 5px #aaaaaa"
                    cursor="pointer"
                    boxshadowhover="2px 2px 10px #aaaaaa"
                    opacityhover="1"
                    onClick={() => {setActionType(1); setMarkResolved(true)}}
                >
                  Избриши
                </EntityTypeSelector>}
                {actionType===2 ? <EntityTypeSelector
                    backgroundcolor="rgba(0, 102, 204, 1)"
                    color="white"
                    boxshadow="none"
                    boxshadowhover="none"
                    opacityhover="0.6"
                    cursor="auto"
                >
                  Премести
                </EntityTypeSelector> : <EntityTypeSelector
                    boxshadow="2px 2px 5px #aaaaaa"
                    cursor="pointer"
                    boxshadowhover="2px 2px 10px #aaaaaa"
                    opacityhover="1"
                    onClick={() => setActionType(2)}
                >
                  Премести
                </EntityTypeSelector>}
              </div>}
              {reportForModal.post !== null ?
                  actionType === 0 ?
              (<form onSubmit={e => handleEdit(e)}>
                {reportForModal.post.title !== null &&
                    <label>
                  <b>Нов наслов на тема:</b>
                  <ModalInput
                      value={newThreadTitle}
                      onChange={e => setNewThreadTitle(e.target.value)}
                      id="title"
                      spellCheck={false}
                      style={{marginTop:"10px"}}
                  />
                </label>}
                <label>
                  <b>Нова содржина:</b>
                  <ModalTextarea
                      value={newPostContent}
                      onChange={e => setNewPostContent(e.target.value)}
                      id="content"
                      rows="8"
                      cols="100"
                      spellCheck={false}
                      style={{marginTop:"10px"}}
                  />
                </label>
                <div style={{marginTop:"15px"}}>
                <label>
                  <input
                      type="checkbox"
                      onChange={handleMarkResolved}
                  />
                  <span style={{marginLeft:"10px", fontWeight:"bold"}}>Означи како разрешено</span>
                </label>
                </div>
                <ModalFooter type="submit">ПОТВРДИ</ModalFooter>
              </form>)
                      : actionType === 1 ?
                          (<form onSubmit={e => handleDelete(e)}>
                            <p style={{color:"red", display:"flex", justifyContent:"space-around"}}>Избриши го мислењето? (оваа акција е иреверзибилна)</p>
                            <div style={{marginTop:"15px"}}>
                            <label>
                              <input
                                  type="checkbox"
                                  checked={markResolved}
                                  onChange={handleMarkResolved}
                              />
                              <span style={{marginLeft:"10px", fontWeight:"bold"}}>Означи како разрешено</span>
                            </label>
                            </div>
                            <ModalFooter type="submit">ПОТВРДИ</ModalFooter>
                          </form>)
                          :
                          (reportForModal.post.targetProfessor !== undefined ?
                              (<form onSubmit={e => handleRelocate(e)}>
                                <p style={{color:"black"}}>Внеси <span style={{fontWeight:"bold"}}>ID</span> на секцијата за дискусија (за <span style={{fontWeight:"bold"}}>професор</span>)
                                    во која треба да биде преместено мислењето:</p>
                                    <div style={{marginTop:"15px"}}>
                                        <ModalInput
                                            value={newOpinionTargetProfessorId}
                                            onChange={e => {e.preventDefault();setNewOpinionTargetProfessorId(e.target.value)}}
                                            id="newOpinionTargetProfessorId"
                                            spellCheck={false}
                                            style={{marginTop:"10px", marginBottom:"10px", width:"90px"}}
                                        />
                                        <button onClick={async (e) => {await handleNewTargetProfessorChange(e);}} style={{marginBottom:"10px", padding:"5px", fontFamily: "Roboto Mono, monospace"}}>Зачувај</button>
                                        {newOpinionTargetProfessor!==null && !loadingProf ? <p style={{color:"black", marginBottom:"20px", opacity:"50%"}}>Мислењето ќе се премести во секцијата за професорот со <span style={{fontWeight:"bold"}}>ID=
                                          {newOpinionTargetProfessor.professorId}</span> (<span style={{fontWeight:"bold"}}>{newOpinionTargetProfessor.professorName}</span>)</p> : loadingProf ? <LoadingSpinner style={{marginBottom:"15px", marginTop:"15px"}}/> : null}
                                        {newOpinionTargetProfessor && <p style={{color:"black", marginBottom:"10px"}}>Постави како дете на мислење со ID:</p>}
                                        {newOpinionTargetProfessor &&
                                        <select value={newParentPostId} onChange={e => setNewParentPostId(e.target.value)} style={{width:"280px", display:"block", padding:"5px",marginBottom:"5px", fontFamily: "Roboto Mono, monospace"}}>
                                          <option value="-1">Постави како самостојно мислење</option>
                                          {newProfessorRelatedOpinions.filter((opinion)=>opinion.postId!==reportForModal.post.postId).map((opinion) => {
                                            return <option key={opinion.postId} value={opinion.postId}>{opinion.postId}</option>})
                                          }
                                        </select>}
                                        <br/>
                                        <label>
                                          <input
                                              type="checkbox"
                                              onChange={handleMarkResolved}
                                          />
                                          <span style={{marginLeft:"10px", fontWeight:"bold"}}>Означи како разрешено</span>
                                        </label>
                                    </div>
                                {errMsg!=="" && <p style={{color:"red", display:"flex", justifyContent:"space-around"}}>{errMsg}</p>}
                                    <ModalFooter type="submit">ПОТВРДИ</ModalFooter>
                                  </form>) :
                              //THREAD CASE
                              (<form onSubmit={e => handleRelocate(e)}>
                                <p style={{color:"black"}}>Внеси <span style={{fontWeight:"bold"}}>ID</span> на секцијата за дискусија (за <span style={{fontWeight:"bold"}}>предмет</span>)
                                  во која треба да биде преместено мислењето:</p>
                                <div style={{marginTop:"15px"}}>
                                  <label>
                                    <ModalInput
                                        value={newTargetSubjectId}
                                        onChange={e => {e.preventDefault();setNewTargetSubjectId(e.target.value)}}
                                        id="newTargetSubjectId"
                                        spellCheck={false}
                                        style={{marginTop:"10px", marginBottom:"10px", width:"90px"}}
                                    />
                                    <button onClick={async (e) => {await handleNewTargetSubjectChange(e);}} style={{marginBottom:"10px", padding:"5px", fontFamily: "Roboto Mono, monospace"}}>Зачувај</button>
                                    {newTargetSubject!==null && !loadingSubj ? <p style={{color:"black", marginBottom:"20px", opacity:"50%"}}>Мислењето ќе се премести во секцијата за предметот со <span style={{fontWeight:"bold"}}>ID=
                                      {newTargetSubject.subjectId}</span> (<span style={{fontWeight:"bold"}}>{newTargetSubject.subjectName}</span>)</p> : loadingSubj ? <LoadingSpinner style={{marginBottom:"15px", marginTop:"15px"}}/> : null}
                                    {newTargetSubject && <p style={{color:"black", marginBottom:"10px"}}>Постави како дете на мислење со ID:</p>}
                                    {newTargetSubject &&
                                        <select value={newParentThreadId} onChange={e => setNewParentThreadId(e.target.value)} style={{width:"370px", display:"block", padding:"5px",marginBottom:"5px", fontFamily: "Roboto Mono, monospace"}}>
                                          <option value="-1">Постави како самостојно мислење (нова тема)</option>
                                          {newTargetSubjectThreads.filter((thread)=>thread.postId!==reportForModal.post.postId).map((thread) => {
                                            return <option key={thread.postId} value={thread.postId}>{thread.postId}</option>})
                                          }
                                        </select>}
                                    {newParentThreadId==="-1" && loadedNewSubject &&
                                        <>
                                        <p style={{marginTop:"10px"}}>Наслов на нова тема:</p>
                                      <ModalInput
                                        value={newThreadTitle}
                                        onChange={e => setNewThreadTitle(e.target.value)}
                                        id="titleChangeRelocate"
                                        spellCheck={false}
                                        style={{marginTop:"10px"}}
                                    />
                                    </>}
                                    <br/>
                                    <input
                                        type="checkbox"
                                        defaultChecked={reportForModal.resolved}
                                        onChange={handleMarkResolved}
                                    />
                                    <span style={{marginLeft:"10px", fontWeight:"bold"}}>Означи како разрешено</span>
                                  </label>
                                </div>
                                {errMsg!=="" && <p style={{color:"red", display:"flex", justifyContent:"space-around"}}>{errMsg}</p>}
                                <ModalFooter type="submit">ПОТВРДИ</ModalFooter>
                              </form>))
                  : null
              }
                </ModalBody>
            </ModalContent>
          </Modal>
      )}
    </>
  ) : (
      <LoadingSpinner/>
  );
}

export default UserDashboard;
