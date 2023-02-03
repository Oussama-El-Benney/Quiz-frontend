export class Question{
  public id! : number ;
  public question!: string;
  public choices: string[];
  public correctChoice: string;
  public quizFatherId: number;
 public constructor(id: number,question: string, choices: Array<string>, correctChoice: string,quizFatherId: number) {
    this.id=id;
    this.question=question;
    this.choices=choices;
    this.correctChoice=correctChoice;
    this.quizFatherId=quizFatherId
  };
}

// id: number;
// name: string;
// quantity : number;
// description : string;
// imageSrc: string;
// price: number;
// availability: boolean;
// note: number;
