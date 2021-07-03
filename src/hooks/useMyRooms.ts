import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type DataRooms = {
  authorId: string;
  countQuestions: string;
  countResponses: boolean;
  endedAt: Date;
  roomKey: string;
  title: string;
};

type FirebaseDataRooms = Record<
  string,
  {
    authorId: string;
    countQuestions: string;
    countResponses: boolean;
    endedAt: Date;
    roomKey: string;
    title: string;
  }
>;

export default function useMyRooms() {
  const { user } = useAuth();
  const [dataRooms, setDataRooms] = useState<DataRooms[]>([]);

  useEffect(() => {
    const roomRef = database.ref(`users/${user?.id}`);
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseDataRooms: FirebaseDataRooms = databaseRoom ?? {};

      const parsedDataRooms = Object.entries(firebaseDataRooms).map(
        ([key, value]) => {
          return {
            authorId: value.authorId,
            countQuestions: value.countQuestions,
            countResponses: value.countResponses,
            endedAt: value.endedAt,
            roomKey: value.roomKey,
            title: value.title,
          };
        }
      );

      const filterParsedDataRooms = parsedDataRooms.filter(
        (data) => data.authorId != null
      );

      setDataRooms(filterParsedDataRooms);
    });

    return () => {
      roomRef.off("value");
    };
  }, [user?.id]);

  return { dataRooms };
}
