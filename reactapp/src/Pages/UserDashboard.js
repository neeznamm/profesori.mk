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

function UserDashboard() {
  const { auth, setAuth } = useContext(AuthApi);

  const [user, setUser] = useState(null);
  const [loadedUser, setLoadedUser] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const [postReports, setPostReports] = useState(null);
  const [loadedPostReports, setLoadedPostReports] = useState(false);

  const [reportModalDisplay, setReportModalDisplay] = useState("none");
  const [reportForModal, setReportForModal] = useState(null);

  const [actionType, setActionType] = useState(0);

  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");

  const [markResolved, setMarkResolved] = useState(false);

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
        if(reportForModal.post.title !== null) setNewPostTitle(reportForModal.post.title);
      }
      setReportModalDisplay("block");
      document.body.style.overflowY = "hidden";
    }
  }, [reportForModal]);

  useEffect(() => {
    const url1 = `http://192.168.0.19:8080/secure/currentUser`;
    const url2 = `http://192.168.0.19:8080/secure/getAllPostReports`;

    const fetchUser = async () => {
      try {
        if(!loadedUser) {
          const response = await axios.get(url1, {withCredentials: true});
          let cyclicGraph = await response.data;
          var jsogStructure = JSOG.encode(cyclicGraph);
          cyclicGraph = JSOG.decode(jsogStructure);
          setUser(cyclicGraph);
          setLoadedUser(true);
        }
        if(user.userRole==='MODERATOR')fetchPostReports();
      } catch (error) {
        setFetchError(true);
      }
    };

    const fetchPostReports = async () => {
      try {
        const response = await axios.get(url2, {withCredentials: true});
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

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (user === null) window.location.reload(false); <---- :-)
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  function findParentThread(post) {
    if (post.parent === null) return post;
    return findParentThread(post.parent);
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      if(reportForModal.post !== null && reportForModal.post.targetProfessor !== undefined) {
        await axios(`http://192.168.0.19:8080/secure/updateOpinion/${reportForModal.post.postId}`,
            {
              method: "put",
              data: {
                newContent: newPostContent,
                newTargetProfessorId: reportForModal.post.targetProfessor.professorId,
              },
              withCredentials: true,
            })
        window.location.reload(false);
      } else if(reportForModal.post !== null && reportForModal.post.targetProfessor === undefined) {
        await axios(`http://192.168.0.19:8080/secure/updateThread/${reportForModal.post.postId}`,
            {
              method: "put",
              data: {
                newTitle: newPostTitle,
                newContent: newPostContent,
                newTargetSubjectId: reportForModal.post.targetSubject.subjectId
              },
              withCredentials: true,
            })
        window.location.reload(false);
      }
    } catch (error) {
      setFetchError(true);
    }
  }

  const handleDelete = (e) => {
    e.preventDefault();
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
      ) : loadedUser && user.userRole==='MODERATOR' ? "се вчитува..." : ""}
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
      {user.authoredPosts.length > 0 ? (
        <h3 style={{ marginBottom: "10px", marginTop:"30px" }}>Ваши мислења:</h3>
      ) : (
        <h3 style={{ marginBottom: "10px" }}>Немате објавени мислења</h3>
      )}
      {user.authoredPosts.map((post) => {
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
                  )}
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
                          )}
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
                {reportForModal.post.title !== null && <label>
                  <b>Нов наслов на тема:</b>
                  <ModalInput
                      value={newPostTitle}
                      onChange={e => setNewPostTitle(e.target.value)}
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
                      checked={markResolved}
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
                          ("123")
                          : null
              }
                </ModalBody>
            </ModalContent>
          </Modal>
      )}
    </>
  ) : (
    <>се вчитува...</>
  );
}

export default UserDashboard;
