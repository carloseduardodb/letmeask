import logoImg from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import Button from "./../../components/All/Button";
import RoomCode from "../../components/All/RoomCode";
import { useHistory, useParams } from "react-router-dom";
import useRoom from "../../hooks/useRoom";
import { database } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import useMyRooms from "../../hooks/useMyRooms";
import VoidImage from "./../../assets/images/void-page.svg";
import AnsweringNow from "../../components/Admin/AnsweringNow";
import MostVoted from "../../components/Admin/MostVoted";
import AllNewQuestions from "../../components/Admin/AllNewQuestions";
import ExistsQuestions from "../../components/Admin/ExistsQuestions";
import Question from "../../components/All/Question";
import StatusRoom from "../../components/All/StatusRoom/index.tsx";
import { FaTimes } from "react-icons/fa";

type RoomParams = {
  id: string;
};

type QuestionProps = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

const AdminRoom = () => {
  const params = useParams<RoomParams>();
  const { user } = useAuth();
  const history = useHistory();
  const { dataRooms } = useMyRooms();
  const { id } = params;
  const {
    questions,
    title,
    questionsAnswered,
    questionHighlighted,
    questionsMostVoted,
  } = useRoom(id);

  async function handleEndRoom() {
    await database.ref(`rooms/${id}`).update({
      endedAt: new Date(),
    });

    await database.ref(`users/${user?.id}/${id}`).update({
      endedAt: new Date(),
    });

    history.push("/rooms/new");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${id}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${id}/questions/${questionId}`).update({
      isAnswered: true,
      isHighlighted: false,
    });
  }

  async function handleHighlightQuestion(
    questionId: string,
    isHighLighted: boolean
  ) {
    if (!isHighLighted) {
      questionHighlighted.length > 0 &&
        database
          .ref(`rooms/${id}/questions/${questionHighlighted[0].id}`)
          .update({
            isHighlighted: false,
            isAnswered: true,
          });
      await database.ref(`rooms/${id}/questions/${questionId}`).update({
        isHighlighted: true,
      });
    } else {
      await database.ref(`rooms/${id}/questions/${questionId}`).update({
        isHighlighted: false,
      });
    }
  }

  return (
    <div className="justify-items-center items-center flex flex-col min-h-screen dark:bg-gray-900 overflow-x-hidden">
      {dataRooms[0] !== undefined && (
        <>
          {dataRooms[0].authorId !== user?.id ? (
            <div className="flex flex-col my-20 gap-y-9">
              <h1 className="font-display text-2xl text-p-black font-semibold dark:text-p-white">
                Oooooooops <span className="text-red-700">acesso restrito</span>
                !
                <br />
                <Link className="text-base underline text-purple-900" to="/">
                  Crie uma sala para você!
                </Link>
              </h1>
              <img src={VoidImage} width={550} alt="Vazio" />
            </div>
          ) : (
            <>
              <header
                className="px-5 py-4 border-b border-p-white-dark bg-white 
              dark:bg-gray-900 dark:border-gray-800 w-screen pt-4
              "
              >
                <div
                  className="max-w-6xl m-auto lg:flex-row flex flex-row md:flex-row 
                justify-between items-center"
                >
                  <Link to="/rooms/new">
                    <img
                      src={logoImg}
                      alt="Teasker"
                      className="lg:max-h-14 max-h-9 dark:bg-p-white rounded-md px-5"
                    />
                  </Link>
                  <div className="flex flex-row md:flex-row gap-x-3 gap-y-3 md:gap-y-0">
                    <RoomCode code={id} />
                    <div className="max-h-10 w-full">
                      <Button
                        onClick={handleEndRoom}
                        className="bg-red-500 p-2 rounded-md text-white h-10 w-10 md:w-full flex justify-center items-center"
                      >
                        <span className="hidden md:flex">Encerrar Sala</span>
                        <span className="md:hidden">
                          <FaTimes />
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </header>
              <main className="lg:max-w-5xl m-0 w-screen mt-0 px-5">
                {questions.length > 0 && (
                  <div>
                    <div className="flex flex-col-reverse lg:flex-row gap-x-16 w-full">
                      <div className="lg:w-7/12 w-full py-5 gap-y-4 flex flex-col h-96">
                        <StatusRoom title={title} questions={questions} />
                        <AnsweringNow
                          handleCheckQuestionAsAnswered={
                            handleCheckQuestionAsAnswered
                          }
                          handleDeleteQuestion={handleDeleteQuestion}
                          questionHighlighted={questionHighlighted}
                          handleHighlightQuestion={handleHighlightQuestion}
                        />
                      </div>

                      <div className="lg:w-5/12 w-full py-5 gap-y-4 flex flex-col h-96">
                        <h1 className="font-display text-md my-4 text-p-black dark:text-p-white font-semibold">
                          Últimas questões respondidas
                        </h1>
                        <div className="overflow-y-scroll scrollbar scrollbar-thumb-blue-500 scrollbar-thin scrollbar-track-transparent flex flex-col gap-y-5">
                          {questionsAnswered.map((question: QuestionProps) => (
                            <div className="mr-5">
                              <Question
                                key={question.id}
                                content={
                                  question.content.substr(0, 150) + "..."
                                }
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                              ></Question>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <MostVoted
                      handleCheckQuestionAsAnswered={
                        handleCheckQuestionAsAnswered
                      }
                      handleDeleteQuestion={handleDeleteQuestion}
                      questionsMostVoted={questionsMostVoted}
                      handleHighlightQuestion={handleHighlightQuestion}
                    />
                    <AllNewQuestions
                      handleCheckQuestionAsAnswered={
                        handleCheckQuestionAsAnswered
                      }
                      handleDeleteQuestion={handleDeleteQuestion}
                      questionsMostVoted={questionsMostVoted}
                      handleHighlightQuestion={handleHighlightQuestion}
                    />
                  </div>
                )}

                <ExistsQuestions questions={questions} />
              </main>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdminRoom;
