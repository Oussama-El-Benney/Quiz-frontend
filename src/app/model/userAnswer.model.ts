export class UserAnswer{

  public questionId: number;
  public userChoice!: string;
 public constructor(questionId: number,userChoice: string) {

    this.questionId=questionId;
    this.userChoice=userChoice;
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
