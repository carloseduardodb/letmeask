import emptyQuestions from "../../assets/images/empty-questions.svg";

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

type ExistQuestionsProps = {
  questions: QuestionProps[];
};

const ExistsQuestions = ({ questions }: ExistQuestionsProps) => {
  return (
    <>
      {questions.length === 0 && (
        <div className="my-12">
          <h3>
            Sua aula está tão boa que seus alunos estão sem palavras
            <br />
            <span className="text-blue-700 font-bold">OU</span>
            <br />
            Eles foram abduzidos
          </h3>
          <div className="flex justify-center">
            <img
              src={emptyQuestions}
              width={250}
              alt="Imagem de uma pessoa sendo abduzida"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ExistsQuestions;
