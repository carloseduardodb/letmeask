import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

type Question = {
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

export default function useRoom(id: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsAnswered, setQuestionsAnswered] = useState<Question[]>([]);
  const [newQuestions, setNewQuestions] = useState<Question[]>([]);
  const [questionsMostVoted, setQuestionsMostVoted] = useState<Question[]>([]);
  const [questionHighlighted, setQuestionHighlighted] = useState<Question[]>(
    []
  );
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`);
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0],
          };
        }
      );

      const parsedQuestionsHighlighted = parsedQuestions.filter((question) => {
        return question.isHighlighted === true;
      });

      const parsedQuestionsAnswered = parsedQuestions.filter((question) => {
        return question.isAnswered === true;
      });

      const parsedNewQuestionsFilter = parsedQuestions.filter(
        (question) => !question.isAnswered && !question.isHighlighted
      );

      const parseQuestionsMostVoted = parsedNewQuestionsFilter.sort(function (
        a,
        b
      ) {
        if (a.likeCount < b.likeCount) {
          return -1;
        }
        if (a.likeCount > b.likeCount) {
          return 1;
        }
        return 0;
      });

      parsedQuestions.reverse();
      setTitle(databaseRoom.title);
      setQuestionsAnswered(parsedQuestionsAnswered);
      setQuestionsMostVoted(parseQuestionsMostVoted.reverse());
      setNewQuestions(parsedNewQuestionsFilter);
      setQuestionHighlighted(parsedQuestionsHighlighted);
      setQuestions(parsedQuestions);
    });

    return () => {
      roomRef.off("value");
    };
  }, [id, user?.id]);

  useEffect(() => {
    const result = async () => {
      const idUser = await user?.id;
      if (idUser !== undefined) {
        const userRoomRef = database.ref(`users/${user?.id}/${id}`);
        userRoomRef.update({
          countQuestions: questions.length,
          countResponses: questions.filter(
            (question) => question.isAnswered === true
          ).length,
        });
      }
    };
    result();
  }, [user?.id, id, questions]);

  return {
    newQuestions,
    questionsMostVoted,
    questionsAnswered,
    questionHighlighted,
    questions,
    title,
  };
}
